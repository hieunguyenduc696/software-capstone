import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import { Col } from "antd";
import { DEFAULT_NUMBER_OF_QUESTION, TYPE_OF_QUESTION, QuestionGroupInfo, updateQuestionGroupInfo } from "services/animeService/QuestionTypeService";
import TemplateProps from "./TemplateInterface";

const TYPE = TYPE_OF_QUESTION[0].type; // TRUE-FALSE...

const TrueFalseNotGivenTemplate: React.FC<TemplateProps> = ({initialFrom, initialTo, updateQuestionGroupInfoCallback}: TemplateProps) => {
  const [questionQuantity, setQuestionQuantity] = useState<number>(DEFAULT_NUMBER_OF_QUESTION);
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleCollapseStatusChange = () => {
    setCollapse((prev: boolean) => !prev);
  };

  const handleQuestionQuantityUpdate = (value: number | null) => {
    if (value) {
      setQuestionQuantity(value);
      updateQuestionGroupInfoCallback((prev: QuestionGroupInfo[]) => {

        const newQuestionGroupInfo = prev.map((item: QuestionGroupInfo) => {
          if (item.type === TYPE) {
            const updated = {
              ...item,
              to: initialFrom + value - 1,
            }
            return updated;
          }
          return item;
        })
        const updatedQuestionGroupInfo = updateQuestionGroupInfo(newQuestionGroupInfo);

        return updatedQuestionGroupInfo;
      })
    }
  };


  return (
    <Col span={24}>
      <QuestionTypeHeader
        typeOfQuestion="True False Not Given"
        // count its own number of question
        onQuantityUpdateCallback={handleQuestionQuantityUpdate}
        collapsed={collapse}
        onCollapseStatusUpdate={handleCollapseStatusChange}
      />

      <TrueFalseInstruction
        from={initialFrom}
        to={initialTo}
        collapsed={collapse}
      />
      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(questionQuantity)
          .fill(null)
          .map((_, index) => {
            return <TrueFalseType order={index + initialFrom} />;
          })}
      </div>
    </Col>
  );
};

export default TrueFalseNotGivenTemplate;