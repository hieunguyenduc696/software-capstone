import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Collapse, Typography, message, Button } from "antd";
import { AppHeader } from "../../components/AppHeader";
import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";
import Icon from "@ant-design/icons";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
  IQuestionItem,
  TYPE_OF_QUESTION,
  MAX_QUESTION_SECTION_ONE,
  QuestionGroupInfo,
  updateQuestionGroupInfo,
  DEFAULT_NUMBER_OF_QUESTION,
} from "services/animeService/QuestionTypeService";

import { UpOutlined, MehOutlined } from "@ant-design/icons";
import TrueFalseNotGivenTemplate from "components/QuestionTemplate/TrueFalseNotGivenTemplate";
import ShortAnswerTemplate from "components/QuestionTemplate/ShortAnswerTemplate";
import MultipleChoiceTemplate from "components/QuestionTemplate/MultipleChoiceTemplate";

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
  const [countQuestion, setCountQuestion] = useState<number>(0);
  const [questionGroup, setQuestionGroup] = useState<QuestionGroupInfo[]>([]);

  const duplicatedTypeOfQuestionError = () => {
    messageApi.open({
      type: "error",
      content: "This type of question has already existed",
    });
  };

  const showCurrentQuestionCount = (value: number) => {
    messageApi.info(`COUNT: ${value}`);
  };

  const handleQuestionTemplatesUpdate = (typeOfQuestion: string) => {
    const duplicated = questionTemplates?.includes(typeOfQuestion);
    //const duplicated = false;

    if (!duplicated) {
      setQuestionGroup((prev: QuestionGroupInfo[]) => {
        if (prev?.length === 0) {
          return [
            {
              type: typeOfQuestion,
              from: 1,
              to: DEFAULT_NUMBER_OF_QUESTION,
              index: 0,
            },
          ];
        } else {
          const start = prev[prev.length - 1].to + 1;
          return [
            ...prev,
            {
              type: typeOfQuestion,
              from: start,
              to: start + DEFAULT_NUMBER_OF_QUESTION - 1,
              index: prev.length,
            },
          ];
        }
      });

      setQuestionTemplates((prev: string[]) => {
        return [...prev, typeOfQuestion];
      });

      const updated = countQuestion + DEFAULT_NUMBER_OF_QUESTION;
      setCountQuestion(updated);
    } else {
      duplicatedTypeOfQuestionError();
    }
  };

  useEffect(() => {
    console.log("HELLO");
  }, [questionGroup]);

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
            height: "83vh",
            maxHeight: "83vh",
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
              <Col
                span={24}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  marginTop: "5rem",
                }}
              >
                <MehOutlined
                  style={{ color: "var(--secondaryColor)", fontSize: "30px" }}
                ></MehOutlined>
                <p style={{ color: "var(--secondaryColor)", fontSize: "20px" }}>
                  There's nothing here.
                </p>
              </Col>
            )}

            {questionTemplates.length > 0 &&
              questionTemplates.map((item: string, index: number) => {
                if (item === TYPE_OF_QUESTION[0].type)
                  return (
                    <TrueFalseNotGivenTemplate
                      initialFrom={questionGroup[index].from}
                      initialTo={questionGroup[index].to}
                      updateQuestionGroupInfoCallback={setQuestionGroup}
                    />
                  );
                else if (item === TYPE_OF_QUESTION[1].type)
                  return (
                    <ShortAnswerTemplate
                      initialFrom={questionGroup[index].from}
                      initialTo={questionGroup[index].to}
                      updateQuestionGroupInfoCallback={setQuestionGroup}
                    />
                  );
                else if (item === TYPE_OF_QUESTION[2].type)
                  return (
                    <MultipleChoiceTemplate
                      initialFrom={questionGroup[index].from}
                      initialTo={questionGroup[index].to}
                      updateQuestionGroupInfoCallback={setQuestionGroup}
                    />
                  );
              })}
          </Row>
        </Col>
      </Row>
      <div className={`${styles["footer"]}`}>
        <div className={`${styles["footer-children"]}`}>
          <img
            src="default.png"
            style={{ width: "30px", height: "30px", marginRight: "0.5rem" }}
          />
          <p style={{ color: "white" }}>IELTS Recent mock test</p>
        </div>

        <div
          className={`${styles["footer-children"]} ${styles["button-group"]}`}
        >
          <Button className={`${styles["button"]} ${styles["secondary"]}`}>
            Previous
          </Button>
          <Button className={`${styles["button"]} ${styles["secondary"]}`}>
            Next
          </Button>
          <Button
            icon={<img src="save_icon.png" />}
            className={`${styles["button"]} ${styles["primary"]}`}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddingTestPage;
