import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import ShortAnswerInstruction from "components/Instruction/ShortAnswerInstruction/ShortAnswerInstruction";
import ShortAnswer from "components/QuestionType/ShortAnswer/ShortAnswerType";
import { Col } from "antd";

const ShortAnswerTemplate: React.FC = () => {
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
        typeOfQuestion="Short Answer"
        onQuantityUpdateCallback={handleQuestionQuantityUpdate}
        collapsed={collapse}
        onCollapseStatusUpdate={handleCollapseStatusChange}
      />

      <ShortAnswerInstruction
        from={1}
        to={questionQuantity ? questionQuantity : 0}
        collapsed={collapse}
      />
      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(questionQuantity)
          .fill(null)
          .map((_, index) => {
            return <ShortAnswer order={index + 1} />;
          })}
      </div>
    </Col>
  );
};

export default ShortAnswerTemplate;
