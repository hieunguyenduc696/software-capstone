
// used to display choice of various question type
export interface IQuestionItem {
    index: number;
    type: string;
    icon: string;
    name: string;
}

// used to manage index for each type of question in one section
// example 
/* [{
        type: Short answer,
        from: 1,
        to: 3,
        index: 0
    },{
        type: True false,
        from: 4,
        to: 9,
        index: 1
    }, {
        type: ABC Multiple Choice,
        from: 10,
        to: 18,
        index: 2
    }] */
export interface QuestionGroupInfo {
    type: string;
    from: number;
    to: number;
    // order of this question type in questionTemplate list in AddTest.tsx
    index: number;
}

export interface IReadingSectionLimit {
    sectionKey: number;
    start: number;
    end: number;
}

export interface IQuestionDetail {
    order: number;
    type: string | null;
    question: string | null;
    options: any | null;
    answer: string | null;
}

export const READING_SECTION_LIMIT: IReadingSectionLimit[] = [
    {
        sectionKey: 1,
        start: 1,
        end: 13,
    },
    {
        sectionKey: 2,
        start: 14,
        end: 26,
    },
    {
        sectionKey: 3,
        start: 27,
        end: 40,
    }
];

export const MAX_QUESTION_SECTION_ONE = 18;
export const DEFAULT_NUMBER_OF_QUESTION = 3;
export const MAX_READING_QUESTION = 40;

// name: separated by '-' means firstLine-secondLine when displayed in AddTest.jsx
export const TYPE_OF_QUESTION: IQuestionItem[] = [
    { index: 1, type: 'TRUE-FALSE-NOT-GIVEN', icon: 'true-false-not-given.png', name: 'True False-Not Given' },
    { index: 2, type: 'SHORT-ANSWER', icon: 'short-answer.png', name: 'Short-answer' },
    { index: 3, type: 'MULTIPLE-CHOICE', icon: 'multiple-choice.png', name: 'Multiple-choice' },
];

export const updateQuestionGroupInfo = (infoList: QuestionGroupInfo[]) => {
    return infoList.map((info: QuestionGroupInfo, index: number) => {
        console.log('INDEX: ', index, info);
        if (index !== 0) {
            const distance = info.to - info.from;
            const newStart = infoList[index - 1].to + 1;
            const newInfo = {
                ...info,
                from: newStart,
                to: newStart + distance
            }
            console.log('NEW INFO: ', newInfo);
            return newInfo;
        }
        return info;
    })
}

export const generateReadingQuestionDetails = () => {

    const details: IQuestionDetail[] = [];

    for (let i = 0; i < MAX_READING_QUESTION; i++) {
        const detail: IQuestionDetail = {
            order: i + 1,
            type: null,
            question: null,
            options: null,
            answer: null
        }
        details.push(detail);
    }

    return details;
}
