import { PoolConnection } from "mariadb";

import {
    queryExecutionWrapper,

    //CRUD base closure
    getCreateMethodQueryClosure,
    getFindByKeyMethodQueryClosure,
    getUpdateMethodQueryClosure,
    getDeleteByKeyMethodQueryClosure,
} from "../../../app/helpers/query_helper";

import { QuestionDto, AnswerDto } from "../datatypes/test";
import { createAnswersProcess } from "./answer_daos";

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
const getQuestionByTemplateIds = queryExecutionWrapper(getQuestionByTemplateIdsClosure, false);
const createQuestions = queryExecutionWrapper(createQuestionsClosure, true);
const updateQuestion = queryExecutionWrapper(updateQuestionClosure, true);
const deleteQuestions = queryExecutionWrapper(deleteQuestionsClosure, true);

const createQuestionsProcess = async (dtos: QuestionDto[], connection: PoolConnection): Promise<number[]> => {

    const questionDtos: QuestionDto[] = dtos.map(dto => ({
        template_id: dto.template_id,
        question_index: dto.question_index,  
        content: dto.content,  
        options: dto.options, 
        score: dto.score,
    }));
    const questionParams = {
        createDtos: questionDtos,
    }

    const questionIds = await createQuestionsClosure(questionParams, connection);
    questionIds.forEach((questionId, questionIndex) => {
        dtos[questionIndex].question_id = questionId;
        dtos[questionIndex].answers?.forEach((_, answerIndex) => {
            dtos[questionIndex].answers![answerIndex].question_id = questionId;
        })
    });

    const answerDtos: AnswerDto[] = dtos.flatMap(questionDto => questionDto.answers ?? []);
    const answerIds = await createAnswersProcess(answerDtos, connection);

    return questionIds;
}

export {
    getQuestionByTemplateIds,
    createQuestions,
    updateQuestion,
    deleteQuestions,

    createQuestionsProcess
}