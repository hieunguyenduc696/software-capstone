import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Typography, Tooltip } from "antd";
import Icon from "@ant-design/icons";

interface ShortAnswerProps {
  order: number;
}

const ShortAnswer = ({ order }: ShortAnswerProps) => {
  const [answer, setAnswer] = useState<string>();
  const [question, setQuestion] = useState<string>();
  const answerRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLInputElement>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (answerRef.current) {
      setAnswer(event.target.value);
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (questionRef.current) {
      setQuestion(event.target.value);
    }
  };

  return (
    <Col
      span={24}
      style={{ boxSizing: "border-box" }}
      className={`${styles.shortAnswer}`}
    >
      <Row>
        <Col span={24}>
          <input
            type="text"
            required
            ref={questionRef}
            style={{
              fontSize: "16px",
              width: "100%",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
            className={styles["ip-title"]}
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter the question"
          />
        </Col>
      </Row>

      <Row>
        <Col
          span={16}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div className={`${styles.number}`}>{`${order}`}</div>
          <input
            type="text"
            required
            ref={answerRef}
            style={{
              fontSize: "16px",
              width: "100%",
              backgroundColor: "transparent",
            }}
            className={styles["ip-title"]}
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter the answer for this question"
          />
          <Icon
            component={() => (
              <Tooltip title="Add explanation">
                <img style={{ width: "13px" }} src="quotation.png" />
              </Tooltip>
            )}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default ShortAnswer;
