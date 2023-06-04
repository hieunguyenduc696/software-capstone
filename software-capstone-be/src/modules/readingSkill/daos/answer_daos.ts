import { PoolConnection } from "mariadb";
import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { AnswerDto } from "../datatypes/test";

const tableName = "answer";

//Query closure, without transaction (for later use)
const getAnswerByQuestionIdsClosure = getFindByKeyMethodQueryClosure(
    tableName, ['answer_id', 'question_id' , 'content', 'options'], 'question_id'
);
const createAnswersClosure = getCreateMethodQueryClosure(
    tableName, ['question_id', 'content', 'options']
);
const updateAnswerClosure = getUpdateMethodQueryClosure(tableName);
const deleteAnswersClosure = getDeleteByKeyMethodQueryClosure(tableName, "answer_id");

//Wrap the query closure with/without transaction
const getAnswerByQuestionIds = queryExecutionWrapper(getAnswerByQuestionIdsClosure, false);
const createAnswers = queryExecutionWrapper(createAnswersClosure, true);
const updateAnswer = queryExecutionWrapper(updateAnswerClosure, true);
const deleteAnswers = queryExecutionWrapper(deleteAnswersClosure, true);

const getAnswerProcess = async (questionIds: number[], connection: PoolConnection): Promise<any[]> => {
    let foundAnswers: any[] = [];

    try {
        foundAnswers = await getAnswerByQuestionIdsClosure({keyValue: questionIds}, connection);

    } catch (error) {
        throw(error);
    }

    return foundAnswers;
}

const createAnswersProcess = async (dtos: AnswerDto[], connection: PoolConnection): Promise<number[]> => {
    const answerDtos = {createDtos: dtos};
    const answerIds = await createAnswersClosure(answerDtos, connection);
    return answerIds;
}

export {
    getAnswerByQuestionIds,
    createAnswers,
    updateAnswer,
    deleteAnswers,

    createAnswersProcess,
    getAnswerProcess,
}