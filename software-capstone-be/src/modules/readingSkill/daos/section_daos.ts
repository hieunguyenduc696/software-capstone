import { PoolConnection } from "mariadb";

import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { 
    createTemplatesProcess, 
    getTemplateProcess,
 } from "./template_daos";
import { 
    createParagraphsProcess,
    getParagraphProcess,
} from "./paragraph_dao";

import { 
    ReadingSectionDto,
    TemplateDto, 
    ParagraphDto, 
} from "../datatypes/test";

const tableName = "section";

//Query closure, without transaction (for later use)
const getSectionByTestIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['section_id', 'test_id' , 'section_index', 'section_type'], 'test_id'
);
const createSectionsClosure = getCreateMethodQueryClosure(
    tableName, ['test_id', 'section_index', 'section_type']
);
const updateSectionClosure = getUpdateMethodQueryClosure(tableName);
const deleteSectionsClosure = getDeleteByKeyMethodQueryClosure(tableName, "section_id");

//Wrap the query closure with/without transaction
const getSectionByTestIds = queryExecutionWrapper(getSectionByTestIdsClosure, false);
const createSections = queryExecutionWrapper(createSectionsClosure, true);
const updateSection = queryExecutionWrapper(updateSectionClosure, true);
const deleteSections = queryExecutionWrapper(deleteSectionsClosure, true);

const getReadingSectionsProcess = async(testIds: number[], connection: PoolConnection): Promise<any[]> => {
   
    let foundSections: any[] = [];

    try {
        foundSections = await getSectionByTestIdsClosure({keyValue: testIds}, connection);
    } catch (error) {
        throw(error);
    }
    
    if (foundSections) {
        const sectionIds: number[] = foundSections.map(section => section.section_id);

        try {
            const queryDatas = await Promise.all([
                getTemplateProcess(sectionIds, connection),
                getParagraphProcess(sectionIds, connection),
            ]);

            //Fetch the query answer
            const templates: any[]  =  queryDatas[0];
            const paragraphs: any[] = queryDatas[1];

            //Building the template with mapping: section's id => [section's template]
            const templateMap = new Map();
            templates.forEach(template => {
                const sectionId: number = template.section_id;
                if (!templateMap.has(sectionId)) {
                    templateMap.set(sectionId, []);
                }

                templateMap.get(sectionId).push(template);

            });        

            //Building the paragraph with mapping: section's id => [section's paragraph]
            const paragraphMap = new Map();
            paragraphs.forEach(paragraph => {
                const sectionId: number = paragraph.section_id;
                paragraphMap.set(sectionId, paragraph); //the relation between section and paragraph is 1:1
            });        

            //Map the template value to the final result
            for (const foundSection of foundSections) {
                const sectionId = foundSection.section_id;

                //Add template for the section
                if (!templateMap.has(sectionId)) {
                    foundSection.templates = [];
                } else {
                    foundSection.templates = templateMap.get(sectionId);
                }

                //Add the paragraph for the section
                if (paragraphMap.has(sectionId)) {
                    foundSection.paragraphs = paragraphMap.get(sectionId);
                }
            }
 
        } catch (error) {
            throw error;
        }

    }

    return foundSections;
}

const createReadingSectionsProcess = async (dtos: ReadingSectionDto[], connection: PoolConnection): Promise<number[]> => {

    const readingSectionDtos: ReadingSectionDto[] = dtos.map(dto => ({
        test_id: dto.test_id,
        section_index: dto.section_index,
        section_type: dto.section_type,
    }));
    const readingSectionParams = {
        createDtos: readingSectionDtos,
    }

    const sectionIds = await createSectionsClosure(readingSectionParams, connection);
    sectionIds.forEach((readingSectionId, sectionReadingIndex) => {
        dtos[sectionReadingIndex].section_id = readingSectionId;
        dtos[sectionReadingIndex].templates?.forEach((_, templateIndex) => {
            dtos[sectionReadingIndex].templates![templateIndex].section_id = readingSectionId;
        })
        dtos[sectionReadingIndex].paragraph!.section_id = readingSectionId;
    });
    
    const templateDtos: TemplateDto[] = dtos.flatMap(readingSectionDto => readingSectionDto.templates ?? []);
    const templateIds = await createTemplatesProcess(templateDtos, connection);

    const paragraphDtos: ParagraphDto[] = dtos
        .filter(readingSectionDto => undefined !== readingSectionDto.paragraph)
        .map(readingSectionDto => readingSectionDto.paragraph ?? 
            {   //The filter function above make sure that this dummy object will never be created
                wallpaper: "dummy",
                content: "dummy",
                title: "dumym",
            });

    const paragraphIds = await createParagraphsProcess(paragraphDtos, connection);

    return sectionIds;
}

export {
    getSectionByTestIds,
    createSections,
    updateSection,
    deleteSections,

    createReadingSectionsProcess,
    getReadingSectionsProcess,
}