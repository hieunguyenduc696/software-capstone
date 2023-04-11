import React, { useState, useRef, useContext } from "react";
import styles from "./index.module.css";
import { Row, Col, Tooltip } from "antd";
import Icon from "@ant-design/icons";
import ReadingTestContext from "context/ReadingTestContext";
import { IQuestionDetail } from "services/QuestionTypeService";


interface ShortAnswerProps {
  order: number;
}

const ShortAnswer = ({ order }: ShortAnswerProps) => {


  const { questionDetails, setQuestionDetails } = useContext(ReadingTestContext);
  console.log('D: ', questionDetails);

  const [answer, setAnswer] = useState<string>(questionDetails?.[order - 1].answer ? questionDetails[order - 1].answer : "");
  const [question, setQuestion] = useState<string>(questionDetails?.[order - 1].question ? questionDetails[order - 1].question : "");
  const answerRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLInputElement>(null);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (answerRef.current) {
      setAnswer(event.target.value);
      setQuestionDetails((prev: IQuestionDetail[]) => {
        return prev?.map((item: IQuestionDetail) => {
          if (item?.order === order) {
            return {
              ...item,
              answer: event.target.value
            }
          }
          return item;
        })
      })
    }
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (questionRef.current) {
      setQuestion(event.target.value);
      setQuestionDetails((prev: IQuestionDetail[]) => {
        return prev?.map((item: IQuestionDetail) => {
          if (item?.order === order) {
            return {
              ...item,
              question: event.target.value
            }
          }
          return item;
        })
      })
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
