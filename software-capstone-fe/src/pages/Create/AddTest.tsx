import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Typography } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import ShortAnswerType from "components/QuestionType/ShortAnswer/ShortAnswerType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import ShortAnswerInstruction from "components/Instruction/ShortAnswerInstruction/ShortAnswerInstruction";

import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";

const { Paragraph } = Typography;

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
            <TrueFalseInstruction from={1} to={7} />

            {/* <TrueFalseType order={1} />
            <TrueFalseType order={2} />
            <TrueFalseType order={3} />
            <TrueFalseType order={4} />
            <TrueFalseType order={5} />
            <TrueFalseType order={6} />
            <TrueFalseType order={7} /> */}
            <TrueFalseType order={7} />
{/* 
            <Col span={24} className={styles.container}>
              <Paragraph className={`${styles.paragraph}`} >
                Answer the questions below.
              </Paragraph>

              <Paragraph className={`${styles.paragraph}`} style={{width: '100%'}}>
                Choose <span className={`${styles.paragraph} ${styles.important}`}>NO MORE THAN THREE WORDS</span> from the passage for each answer:
              </Paragraph>

              <Paragraph className={`${styles.paragraph}`}>
                Write your answers in <span className={`${styles.paragraph} ${styles.limit}`}>boxes 8-13</span> on your answer sheet.
              </Paragraph>
            </Col> */}
            <ShortAnswerInstruction from={8} to={13}/>
            <ShortAnswerType order={7} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
