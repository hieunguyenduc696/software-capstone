import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


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

export {
    getSectionByTestIds,
    createSections,
    updateSection,
    deleteSections,
}