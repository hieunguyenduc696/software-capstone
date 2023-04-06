import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import { Select, Typography, Col, Tooltip, Input } from "antd";
import Icon from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { TextArea } = Input;

const TrueFalseSelect = () => {
  const options = [
    { value: "T", label: "True" },
    { value: "F", label: "False" },
    { value: "NG", label: "Not Given" },
  ];

  return <Select className={`${styles.select}`} options={options} />;
};

interface TrueFalseTypeProps {
  order: number;
}

const TrueFalseType: React.FC<TrueFalseTypeProps> = ({
  order,
}: TrueFalseTypeProps) => {
  const questionRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState<string>();

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (questionRef.current) {
      setQuestion(event.target.value);
    }
  };

  return (
    <Col
      span={24}
      style={{ boxSizing: "border-box" }}
      className={styles.question}
    >
      <div className={styles.number}>{`${order}`}</div>
      <TrueFalseSelect />
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "75%",
        }}
      >
        <input
          type="text"
          required
          ref={questionRef}
          style={{
            backgroundColor: "transparent",
            marginRight: "0.5rem"
          }}
          className={`${styles["ip-title"]} ${styles.paragraph}`}
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter the question"
        />
        <Icon
          component={() => (
            <Tooltip title="Add explanation">
              <img style={{ width: "13px" }} src="quotation.png" />
            </Tooltip>
          )}
        />
      </div>
    </Col>
  );
};

export default TrueFalseType;
