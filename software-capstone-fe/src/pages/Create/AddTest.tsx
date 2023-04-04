import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Typography } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import ShortAnswerType from "components/QuestionType/ShortAnswer/ShortAnswerType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";

import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";


const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Section 1`,
    children: <SectionOne></SectionOne>,
  },
  {
    key: "2",
    label: `Section 2`,
    children: `Content of Tab Pane 2`,
    disabled: true,
  },
  {
    key: "3",
    label: `Section 3`,
    children: `Content of Tab Pane 3`,
    disabled: true,
  },
];

const AddingTestPage = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

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
    <div style={{ background: "#FFF" }}>
      <AppHeader />
      <Row>
        <Col className={`${styles.column} ${styles.left}`} span={12}>
          <Row>
            <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
                className={`${styles.tabs}`}
              />
            </Col>
          </Row>
        </Col>
        <Col className={`${styles.column} ${styles.right}`} span={12}>
          <Row>
            <Col span={24}>
              <div
                className={styles.questionHeader}
                style={{ backgroundColor: "var(--secondaryColor)" }}
              >
                Question 1 - 7
              </div>
            </Col>
          </Row>

          <Row>
            {/* <TrueFalseInstruction from={1} to={7} />
            <TrueFalseType order={1} />
            <TrueFalseType order={2} />
            <TrueFalseType order={3} />
            <TrueFalseType order={4} />
            <TrueFalseType order={5} />
            <TrueFalseType order={6} />
            <TrueFalseType order={7} /> */}
            <TrueFalseType order={7} />

            <ShortAnswerType order={7}/>
            {/* <Col
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
                      marginBottom: "10px"
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
                  span={14}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <div className={styles.number}>{`1`}</div>
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
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
