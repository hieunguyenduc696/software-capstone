
export interface IQuestionItem {
    index: number;
    type: string;
    icon: string;
    name: string;
}

// name: separated by '-' means firstLine-secondLine when displayed in AddTest.jsx
export const TYPE_OF_QUESTION: IQuestionItem[] = [
    { index: 1, type: 'TRUE-FALSE-NOT-GIVEN', icon: 'true-false-not-given.png', name: 'True False-Not Given'},
    // { index: 2, type: 'MULTIPLE-CHOICE', icon: 'multiple-choice.png', name: 'Multiple-choice'},
    { index: 3, type: 'SHORT-ANSWER', icon: 'short-answer.png', name: 'Short-answer'}
];