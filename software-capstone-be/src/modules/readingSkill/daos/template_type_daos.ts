import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


const tableName = "template_type";

//Query closure, without transaction (for later use)
const getTemplateByIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['template_type_id', 'name', 'description'], 'template_type_id'
);
const createTemplatesClosure = getCreateMethodQueryClosure(
    tableName,  ['name', 'description']
);
const updateTemplateClosure = getUpdateMethodQueryClosure(tableName);
const deleteTemplatesClosure = getDeleteByKeyMethodQueryClosure(tableName, "template_type_id");

//Wrap the query closure with/without transaction
const getTemplateByIds = queryExecutionWrapper(getTemplateByIdsClosure, true);
const createTemplates = queryExecutionWrapper(createTemplatesClosure, true);
const updateTemplate = queryExecutionWrapper(updateTemplateClosure, true);
const deleteTemplates = queryExecutionWrapper(deleteTemplatesClosure, true);

export {
    getTemplateByIds,
    createTemplates,
    updateTemplate,
    deleteTemplates,
}