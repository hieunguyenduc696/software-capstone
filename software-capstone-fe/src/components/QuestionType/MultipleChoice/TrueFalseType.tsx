import React, { useState, useRef } from "react";
import styles from "./index.module.css";
import { Select, Typography, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const TrueFalseSelect = () => {
  const options = [
    { value: "T", label: "True" },
    { value: "F", label: "False" },
    { value: "NG", label: "Not Given" },
  ];

  return (
    <Select
      className={`${styles.select}`}
      defaultValue={options[0].value}
      options={options}
    />
  );
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
      <input
        type="text"
        required
        ref={questionRef}
        style={{
          backgroundColor: "transparent",
        }}
        className={`${styles["ip-title"]} ${styles.paragraph}`}
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter the question"
      />
    </Col>
  );
};

export default TrueFalseType;
