import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


const tableName = "question";

//Query closure, without transaction (for later use)
const getQuestionByTemplateIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['question_id', 'question_index', 'content', 'options', 'score'], 'template_id'
);
const createQuestionsClosure = getCreateMethodQueryClosure(
    tableName, ['question_index', 'content', 'options', 'score']
);
const updateQuestionClosure = getUpdateMethodQueryClosure(tableName);
const deleteQuestionsClosure = getDeleteByKeyMethodQueryClosure(tableName, "question_id");

//Wrap the query closure with/without transaction
const getQuestionByTemplateIds = queryExecutionWrapper(getQuestionByTemplateIdsClosure, true);
const createQuestions = queryExecutionWrapper(createQuestionsClosure, true);
const updateQuestion = queryExecutionWrapper(updateQuestionClosure, true);
const deleteQuestions = queryExecutionWrapper(deleteQuestionsClosure, true);

export {
    getQuestionByTemplateIds,
    createQuestions,
    updateQuestion,
    deleteQuestions,
}