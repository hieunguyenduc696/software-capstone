import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

const tableName = "test";

//Query closure, without transaction (for later use)
const getTestByIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['test_id', 'title', 'test_type', 'test_level'], 'test_id'
);
const createTestsClosure = getCreateMethodQueryClosure(
    tableName, ['title', 'test_type', 'test_level']
);
const updateTestClosure = getUpdateMethodQueryClosure(tableName);
const deleteTestsClosure = getDeleteByKeyMethodQueryClosure(tableName, "test_id");

const createTestsProcess = async (): Promise<number[]> => {

}

//Wrap the query closure with/without transaction
const getTestByIds = queryExecutionWrapper(getTestByIdsClosure, false);
const createTests = queryExecutionWrapper(createTestsClosure, true);
const updateTest = queryExecutionWrapper(updateTestClosure, true);
const deleteTests = queryExecutionWrapper(deleteTestsClosure, true);

export {
    getTestByIds,
    createTests,
    updateTest,
    deleteTests,
}