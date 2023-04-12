import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Collapse, Typography, message, Button } from "antd";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
  IQuestionItem,
  TYPE_OF_QUESTION,
  QuestionGroupInfo,
  IReadingSectionLimit,
  READING_SECTION_LIMIT,
  DEFAULT_NUMBER_OF_QUESTION,
} from "services/QuestionTypeService";

import { MehOutlined } from "@ant-design/icons";
import TrueFalseNotGivenTemplate from "components/QuestionTemplate/TrueFalseNotGivenTemplate";
import ShortAnswerTemplate from "components/QuestionTemplate/ShortAnswerTemplate";
import MultipleChoiceTemplate from "components/QuestionTemplate/MultipleChoiceTemplate";
import MappingHeadingTemplate from "components/QuestionTemplate/MappingHeadingTemplate";

interface QuestionSectionProps {
  sectionKey: number;
  questionGroup: QuestionGroupInfo[];
  setQuestionGroupCallback: (prev: any) => any;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ sectionKey, questionGroup, setQuestionGroupCallback }: QuestionSectionProps) => {
  const [questionTemplates, setQuestionTemplates] = useState<string[]>(questionGroup.map(item => item.type));
  const [messageApi, contextHolder] = message.useMessage();
  // check
  const [countQuestion, setCountQuestion] = useState<number>(0);
  //   const [questionGroup, setQuestionGroupCallback] = useState<QuestionGroupInfo[]>([]);

  const { end: endQuestion, start: startQuestion } = READING_SECTION_LIMIT[sectionKey - 1];

  const duplicatedTypeOfQuestionError = () => {
    messageApi.open({
      type: "error",
      content: "This type of question has already existed",
    });
  };

  const handleQuestionTemplatesUpdate = (typeOfQuestion: string) => {
    const duplicated = questionTemplates?.includes(typeOfQuestion);

    if (!duplicated) {
      setQuestionGroupCallback((prev: QuestionGroupInfo[]) => {
        if (prev?.length === 0) {
          return [
            {
              type: typeOfQuestion,
              from: startQuestion,
              to: startQuestion + DEFAULT_NUMBER_OF_QUESTION - 1,
              index: 0,
            },
          ];
        } else {
          const start = prev[prev.length - 1].to + 1;
          return [
            ...prev,
            {
              type: typeOfQuestion,
              from: start,
              to: start + DEFAULT_NUMBER_OF_QUESTION - 1,
              index: prev.length,
            },
          ];
        }
      });

      setQuestionTemplates((prev: string[]) => {
        return [...prev, typeOfQuestion];
      });

      const updated = countQuestion + DEFAULT_NUMBER_OF_QUESTION;
      setCountQuestion(updated);
    } else {
      duplicatedTypeOfQuestionError();
    }
  };

  useEffect(() => {
    console.log("HELLO");
  }, [questionGroup]);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
          <div className={`${styles["type-options"]}`}>
            {TYPE_OF_QUESTION.map((item: IQuestionItem) => {
              const [firstLine, secondLine] = item.name.split("-");
              return (
                <QuestionItem
                  icon={item.icon}
                  firstLine={firstLine}
                  secondLine={secondLine}
                  type={item.type}
                  addTemplateCallback={handleQuestionTemplatesUpdate}
                />
              );
            })}
          </div>
        </Col>
      </Row>
      <Row>
        {questionTemplates.length === 0 && (
          <Col
            span={24}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              marginTop: "5rem",
            }}
          >
            <MehOutlined
              style={{ color: "var(--secondaryColor)", fontSize: "30px" }}
            ></MehOutlined>
            <p style={{ color: "var(--secondaryColor)", fontSize: "20px" }}>
              {`Section ${sectionKey} is empty`}
            </p>
          </Col>
        )}

        {questionTemplates.length > 0 &&
          questionTemplates.map((item: string, index: number) => {
            if (item === TYPE_OF_QUESTION[0].type)
              return (
                <TrueFalseNotGivenTemplate
                  initialFrom={questionGroup[index].from}
                  initialTo={questionGroup[index].to}
                  updateQuestionGroupInfoCallback={setQuestionGroupCallback}
                />
              );
            else if (item === TYPE_OF_QUESTION[1].type)
              return (
                <ShortAnswerTemplate
                  initialFrom={questionGroup[index].from}
                  initialTo={questionGroup[index].to}
                  updateQuestionGroupInfoCallback={setQuestionGroupCallback}
                />
              );
            else if (item === TYPE_OF_QUESTION[2].type)
              return (
                <MultipleChoiceTemplate
                  initialFrom={questionGroup[index].from}
                  initialTo={questionGroup[index].to}
                  updateQuestionGroupInfoCallback={setQuestionGroupCallback}
                />
              );
            else if (item === TYPE_OF_QUESTION[3].type)
              return (
                <MappingHeadingTemplate
                  initialFrom={questionGroup[index].from}
                  initialTo={questionGroup[index].to}
                  updateQuestionGroupInfoCallback={setQuestionGroupCallback}
                />
              );
          })}
      </Row>
    </>
  );
};

export default QuestionSection;