import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";


const tableName = "answer";

//Query closure, without transaction (for later use)
const getAnswerByQuestionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['answer_id', 'content', 'options'], 'question_id'
);
const createAnswersClosure = getCreateMethodQueryClosure(
    tableName, ['content', 'options']
);
const updateAnswerClosure = getUpdateMethodQueryClosure(tableName);
const deleteAnswersClosure = getDeleteByKeyMethodQueryClosure(tableName, "answer_id");

//Wrap the query closure with/without transaction
const getAnswerByQuestionIds = queryExecutionWrapper(getAnswerByQuestionIdsClosure, true);
const createAnswers = queryExecutionWrapper(createAnswersClosure, true);
const updateAnswer = queryExecutionWrapper(updateAnswerClosure, true);
const deleteAnswers = queryExecutionWrapper(deleteAnswersClosure, true);

export {
    getAnswerByQuestionIds,
    createAnswers,
    updateAnswer,
    deleteAnswers,
}