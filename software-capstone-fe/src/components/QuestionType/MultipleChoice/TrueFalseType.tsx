import React, { useState } from "react";
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
  order: number,
}

const TrueFalseType: React.FC<TrueFalseTypeProps> = ({order} : TrueFalseTypeProps) => {

  const [question, setQuestion] = useState("Enter your question here....");

  return (
    <Col
      span={24}
      style={{ boxSizing: "border-box" }}
      className={styles.question}
    >
      <div className={styles.number}>
        {`${order}`}
      </div>
      <TrueFalseSelect />
      <Paragraph
        editable={{
          icon: <EditOutlined />,
          tooltip: "click to edit text",
          onChange: setQuestion,
          enterIcon: null,
        }}
        className={`${styles.paragraph}`}
      >
        {question}
      </Paragraph>
    </Col>
  );
};

export default TrueFalseType;