import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Divider, InputNumber } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import ShortAnswerType from "components/QuestionType/ShortAnswer/ShortAnswerType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import ShortAnswerInstruction from "components/Instruction/ShortAnswerInstruction/ShortAnswerInstruction";

import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";
import Icon from "@ant-design/icons";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
  IQuestionItem,
  TYPE_OF_QUESTION,
} from "services/animeService/QuestionTypeService";

import { UpOutlined } from '@ant-design/icons';

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

  const onNumberChange = (value: any) => {
    console.log(value);
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

        <Col
          className={`${styles.column} ${styles.right}`}
          span={12}
          style={{
            borderLeft: "2px solid #9F9F9F",
            height: "90vh",
            maxHeight: "90vh",
          }}
        >
          {/* Choose type of question */}
          <Row>
            <Col span={24}>
              <div
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  overflowX: "auto",

                  padding: "0.5rem",
                  marginBottom: "1rem",

                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",

                  backgroundColor: "#FFF",
                }}
              >
                {TYPE_OF_QUESTION.map((item: IQuestionItem) => {
                  const [firstLine, secondLine] = item.name.split("-");
                  return (
                    <QuestionItem
                      icon={item.icon}
                      firstLine={firstLine}
                      secondLine={secondLine}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              {/* Question header */}
              <div
                className={styles.questionHeader}
                style={{ backgroundColor: "var(--mainColor)" }}
              >
                <div style={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                  <InputNumber
                    defaultValue={3}
                    onChange={onNumberChange}
                    className={`${styles["number-input"]}`}
                    style={{marginRight: "1rem"}}
                  />
                  True False Not Given
                </div>
                <UpOutlined />
              </div>
            </Col>
          </Row>

          {/* 
          <Row>
            <TrueFalseInstruction from={1} to={7} />
            <TrueFalseType order={7} />

            <ShortAnswerInstruction from={8} to={13} />
            <ShortAnswerType order={8} />
          </Row> */}
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
