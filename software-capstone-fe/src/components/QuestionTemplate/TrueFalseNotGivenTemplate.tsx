import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import { Col } from "antd";
import { DEFAULT_NUMBER_OF_QUESTION, TYPE_OF_QUESTION, QuestionGroupInfo, updateQuestionGroupInfo } from "services/QuestionTypeService";
import TemplateProps from "./TemplateInterface";

const TYPE = TYPE_OF_QUESTION[0].type; // TRUE-FALSE...

const TrueFalseNotGivenTemplate: React.FC<TemplateProps> = ({initialFrom, initialTo, updateQuestionGroupInfoCallback}: TemplateProps) => {
  const [questionQuantity, setQuestionQuantity] = useState<number>(initialTo - initialFrom + 1);
  const [collapse, setCollapse] = useState<boolean>(false);

  // {order, question, answer}
  const [templateDetails, setTemplateDetails] = useState<any>([]);

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
        questionQuantity={questionQuantity}
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