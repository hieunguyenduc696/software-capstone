import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Collapse, Typography, message } from "antd";
import { AppHeader } from "../../components/AppHeader";
import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";
import Icon from "@ant-design/icons";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
  IQuestionItem,
  TYPE_OF_QUESTION,
} from "services/animeService/QuestionTypeService";

import { UpOutlined, MehOutlined } from "@ant-design/icons";
import TrueFalseNotGivenTemplate from "components/QuestionTemplate/TrueFalseNotGivenTemplate";
import ShortAnswerTemplate from "components/QuestionTemplate/ShortAnswerTemplate";

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



  const [messageApi, contextHolder] = message.useMessage();

  const [questionTemplates, setQuestionTemplates] = useState<string[]>([]);
  // check 
  const [totalQuestion, setTotalQuestion] = useState<number>(0);

  const duplicatedTypeOfQuestionError = () => {
    messageApi.open({
      type: "error",
      content: "This type of question has already existed",
    });
  };

  const handleQuestionTemplatesUpdate = (typeOfQuestion: string) => {
    const duplicated = questionTemplates?.includes(typeOfQuestion);

    if (!duplicated) {
      setQuestionTemplates((prev: any) => {
        return [...prev, typeOfQuestion];
      });
    } else {
      duplicatedTypeOfQuestionError();
    }
  };

  


  return (
    <div style={{ background: "#FFF" }}>
      <AppHeader />
      <Row>
        <Col className={`${styles.column}`} span={12}>
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
          {contextHolder}
          <Row>
            <Col span={24}>
              <div className={`${styles["type-options"]}`}>
                {TYPE_OF_QUESTION.map((item: IQuestionItem) => {
                  const [firstLine, secondLine] = item.name.split("-");
                  return (
                    <QuestionItem
                      icon={item.icon}
                      firstLine={firstLine}
                      secondLine={secondLine}
                      type={item.type}
                      addTemplateCallback={handleQuestionTemplatesUpdate}
                    />
                  );
                })}
              </div>
            </Col>
          </Row>

          <Row>
            {questionTemplates.length === 0 && (
              <Col span={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  marginTop: "5rem"
                }}
              >
                <MehOutlined style={{color: "var(--secondaryColor)", fontSize: "30px"}}></MehOutlined>
                <p style={{color: "var(--secondaryColor)", fontSize: "20px"}}>There's nothing here.</p>
              </Col>
            )}

            {questionTemplates.length > 0 &&
              questionTemplates.map((item: any) => {
                if (item === TYPE_OF_QUESTION[0].type)
                  return <TrueFalseNotGivenTemplate />;
                else if (item === TYPE_OF_QUESTION[1].type)
                  return <ShortAnswerTemplate/>
              })}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
