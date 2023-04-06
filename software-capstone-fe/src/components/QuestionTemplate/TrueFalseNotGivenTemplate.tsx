import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import { Col } from "antd";

const TrueFalseNotGivenTemplate: React.FC = () => {
  const [questionQuantity, setQuestionQuantity] = useState<number>(3);
  const [collapse, setCollapse] = useState<boolean>(false);

  const handleCollapseStatusChange = () => {
    setCollapse((prev: boolean) => !prev);
  };

  const handleQuestionQuantityUpdate = (value: number | null) => {
    if (value) {
      setQuestionQuantity(value);
      console.log("DEBUG: ", value);
    }
  };

  return (
    <Col span={24}>
      <QuestionTypeHeader
        typeOfQuestion="True False Not Given"
        onQuantityUpdateCallback={handleQuestionQuantityUpdate}
        collapsed={collapse}
        onCollapseStatusUpdate={handleCollapseStatusChange}
      />

      <TrueFalseInstruction
        from={1}
        to={questionQuantity ? questionQuantity : 0}
        collapsed={collapse}
      />
      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(questionQuantity)
          .fill(null)
          .map((_, index) => {
            return <TrueFalseType order={index + 1} />;
          })}
      </div>
    </Col>
  );
};

export default TrueFalseNotGivenTemplate;