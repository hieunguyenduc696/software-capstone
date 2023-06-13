import { IQuestionDetail, QUESTION_TEMPLATES } from "services/QuestionTypeService";

export const hehe = () => {

}

export const extractTemplate = (template: any) => {
    let type = "TRUE-FALSE-NOT-GIVEN";
    let typeIndex = 1;
    if (template?.template_type_id === QUESTION_TEMPLATES["SHORT-ANSWER"].template_type_id) {
        type = "SHORT-ANSWER";
        typeIndex = 2;
    } else if (template?.template_type_id === QUESTION_TEMPLATES["MULTIPLE-CHOICE"].template_type_id) {
        type = "MULTIPLE-CHOICE";
        typeIndex = 3;
    };

    return { type, typeIndex };
}

export const convertRawQuestion = (rawQuestion: any, type: string) => {
    const question: IQuestionDetail = {
        order: rawQuestion?.question_index, 
        question: rawQuestion?.content,
        options: rawQuestion?.options,
        type: type,
        answer: rawQuestion?.answers[0]?.content
    }

    return question;
}