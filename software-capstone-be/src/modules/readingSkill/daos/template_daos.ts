import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


const tableName = "template";

//Query closure, without transaction (for later use)
const getTemplateBySectionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['template_id', 'template_index', 'title', 'content', 'expand_column'], 'section_id'
);
const createTemplatesClosure = getCreateMethodQueryClosure(
    tableName,  ['template_index', 'title', 'content', 'expand_column']
);
const updateTemplateClosure = getUpdateMethodQueryClosure(tableName);
const deleteTemplatesClosure = getDeleteByKeyMethodQueryClosure(tableName, "template_id");

//Wrap the query closure with/without transaction
const getTemplateBySectionIds = queryExecutionWrapper(getTemplateBySectionIdsClosure, false);
const createTemplates = queryExecutionWrapper(createTemplatesClosure, true);
const updateTemplate = queryExecutionWrapper(updateTemplateClosure, true);
const deleteTemplates = queryExecutionWrapper(deleteTemplatesClosure, true);

export {
    getTemplateBySectionIds,
    createTemplates,
    updateTemplate,
    deleteTemplates,
}