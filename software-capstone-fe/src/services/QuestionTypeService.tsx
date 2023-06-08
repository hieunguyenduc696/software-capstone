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

export interface IReadingParagraph {
  order: number;
  title: string | null;
  content: string | null; // save format html
  previewImage: string | null;
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
  },
  // {
  //     sectionKey: 4,
  //     start: 41,
  //     end: 53,
  // }
];

export const MAX_QUESTION_SECTION_ONE = 18;
export const DEFAULT_NUMBER_OF_QUESTION = 3;
export const MAX_READING_QUESTION = 40;

// name: separated by '-' means firstLine-secondLine when displayed in AddTest.jsx
export const TYPE_OF_QUESTION: IQuestionItem[] = [
  {
    index: 1,
    type: "TRUE-FALSE-NOT-GIVEN",
    icon: "true-false-not-given.png",
    name: "True False-Not Given",
  },
  {
    index: 2,
    type: "SHORT-ANSWER",
    icon: "short-answer.png",
    name: "Short-answer",
  },
  {
    index: 3,
    type: "MULTIPLE-CHOICE",
    icon: "multiple-choice.png",
    name: "Multiple-choice",
  },
  // { index: 4, type: 'MAPPING-HEADING', icon: 'mapping.png', name: 'Mapping-heading' },
];

export const QUESTION_TEMPLATES = {
  "TRUE-FALSE-NOT-GIVEN": {
    template_type_id: TYPE_OF_QUESTION[0].index,

    template_index: TYPE_OF_QUESTION[0].index,
    title: "",
    content: "",
    expand_clumn: null,
  },
  "SHORT-ANSWER": {
    template_type_id: TYPE_OF_QUESTION[1].index,

    template_index: TYPE_OF_QUESTION[1].index,
    title: "",
    content: "",
    expand_clumn: null,
  },
  "MULTIPLE-CHOICE": {
    template_type_id: TYPE_OF_QUESTION[2].index,

    template_index: TYPE_OF_QUESTION[2].index,
    title: "",
    content: "",
    expand_clumn: null,
  },
};

function compare( a: any, b: any ) {
    if ( a.first_index < b.first_index ){
      return -1;
    }
    if ( a.first_index > b.first_index ){
      return 1;
    }
    return 0;
  }

export const formatSections = (questionsOfSection: IQuestionDetail[]) => {
  const TrueFalseTemplate = QUESTION_TEMPLATES["TRUE-FALSE-NOT-GIVEN"];
  const MultipleChoiceTemplate = QUESTION_TEMPLATES["MULTIPLE-CHOICE"];
  const ShortAnswer = QUESTION_TEMPLATES["SHORT-ANSWER"];
  const trueFalseQuestions = [];
  const multipleChoiceQuestions = [];
  const shortAnswerQuestions = [];

  for (let i = 0; i < questionsOfSection.length; i++) {
    if (questionsOfSection[i].type === "TRUE-FALSE-NOT-GIVEN") {
      trueFalseQuestions.push({
        ...questionsOfSection[i],
        question_index: questionsOfSection[i].order,
        content: questionsOfSection[i].question,
      });
    } else if (questionsOfSection[i].type === "MULTIPLE-CHOICE") {
      multipleChoiceQuestions.push({
        ...questionsOfSection[i],
        question_index: questionsOfSection[i].order,
        content: questionsOfSection[i].question,
      });
    } else if (questionsOfSection[i].type === "SHORT-ANSWER") {
      shortAnswerQuestions.push({
        ...questionsOfSection[i],
        question_index: questionsOfSection[i].order,
        content: questionsOfSection[i].question,
      });
    }
  };

  const templates = [
    {
      ...TrueFalseTemplate,
      questions: trueFalseQuestions,
      first_index: trueFalseQuestions[0]?.order,
    },
    {
      ...MultipleChoiceTemplate,
      questions: multipleChoiceQuestions,
      first_index: multipleChoiceQuestions[0]?.order,
    },
    {
      ...ShortAnswer,
      questions: shortAnswerQuestions,
      first_index: shortAnswerQuestions[0]?.order,
    },
  ];

  templates.sort(compare);

  return templates;
};

export const updateQuestionGroupInfo = (infoList: QuestionGroupInfo[]) => {
  return infoList.map((info: QuestionGroupInfo, index: number) => {
    console.log("INDEX: ", index, info);
    if (index !== 0) {
      const distance = info.to - info.from;
      const newStart = infoList[index - 1].to + 1;
      const newInfo = {
        ...info,
        from: newStart,
        to: newStart + distance,
      };
      console.log("NEW INFO: ", newInfo);
      return newInfo;
    }
    return info;
  });
};

export const generateReadingQuestionDetails = () => {
  const details: IQuestionDetail[] = [];

  for (let i = 0; i < MAX_READING_QUESTION; i++) {
    const detail: IQuestionDetail = {
      order: i + 1,
      type: null,
      question: null,
      options: null,
      answer: null,
    };
    details.push(detail);
  }

  return details;
};

export const generateReadingParagraphs = () => {
  const paragraphs: IReadingParagraph[] = [];

  for (let i = 0; i < 3; i++) {
    const newParagraphs: IReadingParagraph = {
      order: i + 1,
      title: null,
      content: null, // save format html
      previewImage: null,
    };
    paragraphs.push(newParagraphs);
  }

  return paragraphs;
};
