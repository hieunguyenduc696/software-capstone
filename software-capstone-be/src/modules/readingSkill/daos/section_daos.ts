import { PoolConnection } from "mariadb";

import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { createTemplatesProcess } from "./template_daos";
import { createParagraphsProcess } from "./paragraph_dao";

import { 
    ReadingSectionDto,
    TemplateDto, 
    ParagraphDto, 
} from "../datatypes/test";

const tableName = "section";

//Query closure, without transaction (for later use)
const getSectionByTestIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['section_id', 'section_index', 'section_type'], 'test_id'
);
const createSectionsClosure = getCreateMethodQueryClosure(
    tableName, ['section_index', 'section_type']
);
const updateSectionClosure = getUpdateMethodQueryClosure(tableName);
const deleteSectionsClosure = getDeleteByKeyMethodQueryClosure(tableName, "section_id");

//Wrap the query closure with/without transaction
const getSectionByTestIds = queryExecutionWrapper(getSectionByTestIdsClosure, false);
const createSections = queryExecutionWrapper(createSectionsClosure, true);
const updateSection = queryExecutionWrapper(updateSectionClosure, true);
const deleteSections = queryExecutionWrapper(deleteSectionsClosure, true);

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
}