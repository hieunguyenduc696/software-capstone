import { PoolConnection } from "mariadb";

import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { TemplateDto, QuestionDto } from "../datatypes/test";
import { 
    createQuestionsProcess,
    getQuestionProcess,
} from "./question_daos";

const tableName = "template";

//Query closure, without transaction (for later use)
const getTemplateBySectionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['template_id', 'section_id' , 'template_index', 'title', 'content', 'expand_column'], 'section_id'
);
const createTemplatesClosure = getCreateMethodQueryClosure(
    tableName,  ['section_id', 'template_index', 'title', 'content', 'expand_column']
);
const updateTemplateClosure = getUpdateMethodQueryClosure(tableName);
const deleteTemplatesClosure = getDeleteByKeyMethodQueryClosure(tableName, "template_id");

//Wrap the query closure with/without transaction
const getTemplateBySectionIds = queryExecutionWrapper(getTemplateBySectionIdsClosure, false);
const createTemplates = queryExecutionWrapper(createTemplatesClosure, true);
const updateTemplate = queryExecutionWrapper(updateTemplateClosure, true);
const deleteTemplates = queryExecutionWrapper(deleteTemplatesClosure, true);

const getTemplateProcess = async (sectionIds: number[], connection: PoolConnection): Promise<any[]> => {
    let foundTemplates: any[] = [];

    try {
        foundTemplates = await getTemplateBySectionIdsClosure({keyValue: sectionIds}, connection);
    } catch (error) {
        throw(error);
    }

    if (foundTemplates) {
        const templateIds: number[] = foundTemplates.map(template => template.template_id);

        try {
            const questions: any[] = await getQuestionProcess(templateIds, connection);

            //Building the question with mapping: template's id => [template's question]
            const questionMap = new Map();
            questions.forEach(question => {
                const templateId: number = question.template_id;
                if (!questionMap.has(templateId)) {
                    questionMap.set(templateId, []);
                }

                questionMap.get(templateId).push(question);

            });        

            //Map the section value to the final result
            for (const foundTemplate of foundTemplates) {
                const templateId = foundTemplate.template_id;
                if (!questionMap.has(templateId)) {
                    foundTemplate.questions = [];
                } else {
                    foundTemplate.questions = questionMap.get(templateId);
                }
            }

        } catch (error) {
            throw error;
        }

    }

    return foundTemplates;
}

const createTemplatesProcess = async (dtos: TemplateDto[], connection: PoolConnection): Promise<number[]> => {

    const templateDtos: TemplateDto[] = dtos.map(dto => ({
        template_type_id: dto.template_type_id,
        section_id: dto.section_id,

        template_index: dto.template_index,
        title: dto.title,
        content: dto.content,
        expand_column: dto.expand_column ?? null,
    }));
    const templateParams = {
        createDtos: templateDtos,
    }

    const templateIds = await createTemplatesClosure(templateParams, connection);
    templateIds.forEach((templateId, templateIndex) => {
        dtos[templateIndex].template_id = templateId;
        dtos[templateIndex].questions?.forEach((_, questionIndex) => {
            dtos[templateIndex].questions![questionIndex].template_id = templateId;
        })
    });

    const questionDtos: QuestionDto[] = dtos.flatMap(templateDto => templateDto.questions ?? []);
    const questionIds = await createQuestionsProcess(questionDtos, connection);

    return templateIds;
}

export {
    getTemplateBySectionIds,
    createTemplates,
    updateTemplate,
    deleteTemplates,

    createTemplatesProcess,
    getTemplateProcess,
}