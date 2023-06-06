import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import ShortAnswerInstruction from "components/Instruction/ShortAnswerInstruction/ShortAnswerInstruction";
import ShortAnswer from "components/QuestionType/ShortAnswer/ShortAnswerType";
import { Col } from "antd";
import { DEFAULT_NUMBER_OF_QUESTION, TYPE_OF_QUESTION, QuestionGroupInfo, updateQuestionGroupInfo } from "services/QuestionTypeService";
import TemplateProps from "./TemplateInterface";

const TYPE = TYPE_OF_QUESTION[1].type; // SHORT-ANSWER

const ShortAnswerTemplate: React.FC<TemplateProps> = ({ initialFrom, initialTo, updateQuestionGroupInfoCallback }: TemplateProps) => {
  const [questionQuantity, setQuestionQuantity] = useState<number>(initialTo - initialFrom + 1);
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

  // need more time
  const handleDeleteQuestionTemplate = () => {

  }

  return (
    <Col span={24}>
      <QuestionTypeHeader
        typeOfQuestion="Short Answer"
        questionQuantity={questionQuantity}
        onQuantityUpdateCallback={handleQuestionQuantityUpdate}
        collapsed={collapse}
        onCollapseStatusUpdate={handleCollapseStatusChange}
      />

      <ShortAnswerInstruction
        from={initialFrom}
        to={initialTo}
        collapsed={collapse}
      />
      
      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(questionQuantity)
          .fill(null)
          .map((_, index) => {
            return <ShortAnswer order={index + initialFrom} />;
          })}
      </div>
    </Col>
  );
};

export default ShortAnswerTemplate;
