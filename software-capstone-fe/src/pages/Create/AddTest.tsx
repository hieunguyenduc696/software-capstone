import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Collapse } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import ShortAnswerType from "components/QuestionType/ShortAnswer/ShortAnswerType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import ShortAnswerInstruction from "components/Instruction/ShortAnswerInstruction/ShortAnswerInstruction";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";
import Icon from "@ant-design/icons";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
  IQuestionItem,
  TYPE_OF_QUESTION,
} from "services/animeService/QuestionTypeService";

import { UpOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

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
          </Row>

        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
