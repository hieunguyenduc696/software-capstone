import React, { useState, useContext, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Button } from "antd";
import { AppHeader } from "components";
import type { TabsProps } from "antd";
import { message } from "antd";

import ReadingParagraph from "components/ReadingParagraph";
import QuestionSection from "components/QuestionSection";
import {
  QuestionGroupInfo,
  generateReadingQuestionDetails,
  generateReadingParagraphs,
  formatSections,
  checkSectionValidation,
  READING_TYPE,
} from "services/QuestionTypeService";
import ReadingTestContext from "context/ReadingTestContext";
import { useNavigate, useLocation } from "react-router";
import { createTest } from "services/AdminService";

const NewReadingPart = () => {
  const { state } = useLocation();
  const { title } = state;
  const navigate = useNavigate();

  const [questionSectionKey, setQuestionSectionKey] = useState<number>(1);
  const [paragraphs, setParagraphs] = useState(generateReadingParagraphs);
  const [questionDetails, setQuestionDetails] = useState(
    generateReadingQuestionDetails
  );

  // save question detail of each section
  const [firstQuestionGroup, setFirstQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);
  const [secondQuestionGroup, setSecondQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);
  const [thirdQuestionGroup, setThirdQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Section 1`,
      children: (
        <ReadingParagraph
          sectionKey={1}
          setReadingParagraphsCallback={setParagraphs}
        />
      ),
    },
    {
      key: "2",
      label: `Section 2`,
      children: (
        <ReadingParagraph
          sectionKey={2}
          setReadingParagraphsCallback={setParagraphs}
        />
      ),
    },
    {
      key: "3",
      label: `Section 3`,
      children: (
        <ReadingParagraph
          sectionKey={3}
          setReadingParagraphsCallback={setParagraphs}
        />
      ),
    },
  ];

  const onSectionChange = (key: string) => {
    setQuestionSectionKey(parseInt(key, 10));
  };

  const handlePreviousClick = () => {
    if (questionSectionKey > 1) {
      setQuestionSectionKey(questionSectionKey - 1);
    }
  };

  const handleNextClick = () => {
    if (questionSectionKey < 3) {
      setQuestionSectionKey(questionSectionKey + 1);
    }
  };

  const handleCancelClick = () => {
    navigate("/post-test");
  };

  const [messageApi, contextHolder] = message.useMessage();

  const invalidateDetails = (order: number) => {
    messageApi.open({
      type: "error",
      content: `Question ${order} is not validate`,
    });
  };

  const handleSubmit = async () => {
    console.log("PARAGRAPHS: ", paragraphs);
    console.log("QUESTION DETAILS: ", questionDetails);
    console.table(questionDetails);

    const sections = [];
    let cloneQuestionDetails = questionDetails;

    console.log("RAW: ", questionDetails)
    console.log("CLONE: ", cloneQuestionDetails)

    // slice section
    const sectionOneQuestions = cloneQuestionDetails.slice(0, 13 + 1);
    const sectionTwoQuestions = cloneQuestionDetails.slice(14, 26 + 1);
    const sectionThreeQuestions = cloneQuestionDetails.slice(27, 39 + 1);

    const rawSections = [];

    rawSections.push(sectionOneQuestions);
    rawSections.push(sectionTwoQuestions);
    rawSections.push(sectionThreeQuestions);

    console.log("RAW SECTIONS: ", rawSections);

    // validate each section
    // for (let i = 0; i < rawSections.length; i++) {
    //   let invalidQuestionIndex = checkSectionValidation(rawSections[i]);
    //   if (invalidQuestionIndex !== -1) { // section is not validated
    //     invalidateDetails(sectionOneQuestions[i].order);
    //     return;
    //   }
    // }

    // improve template index nhe
    let templateIndex = 1;
    for (let i = 0; i < rawSections.length; i++) {
      let templates = formatSections(rawSections[i]);
      let convertedTemplates = templates.map(template => {
        const result = {
          ...template,
          template_index: templateIndex,
        }

        templateIndex++;

        return result;
      })
      sections.push({
        section_index: i + 1,
        section_type: 0,
        paragraph: {
          wallpaper: "image_url",
          title: "paragraph title",
          content: "paragraph content",
        },
        templates: convertedTemplates,
      });
    }

    console.log("SECTIONS: ", sections);

    const data = [
      {
        title: "TEST NO.1",
        test_type: READING_TYPE,
        test_level: 0,
        sections: sections,
      },
    ];

    console.log('DATA TEST: ',{ data: data });

    // const res = await createTest({ data: data });
    // console.log(res);


  };

  useEffect(() => {
    setQuestionDetails(generateReadingQuestionDetails);
    setParagraphs(generateReadingParagraphs);
  }, []);

  return (
    <div style={{ background: "#FFF" }}>
      <AppHeader />
      <Row>
        <Col
          className={`${styles.column} ${styles.left}`}
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          style={{
            height: "83vh",
            maxHeight: "83vh",
            overflowY: "auto",
          }}
        >
          <Row>
            <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onSectionChange}
                className={`${styles.tabs}`}
                activeKey={questionSectionKey.toString()}
              />
            </Col>
          </Row>
        </Col>

        <Col
          className={`${styles.column} ${styles.right}`}
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          style={{
            borderLeft: "2px solid #9F9F9F",
            height: "85vh",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {contextHolder}
          <ReadingTestContext.Provider
            value={{ questionDetails, setQuestionDetails }}
          >
            {/* for each section */}
            {questionSectionKey === 1 && (
              <QuestionSection
                sectionKey={1}
                questionGroup={firstQuestionGroup}
                setQuestionGroupCallback={setFirstQuestionGroup}
              />
            )}
            {questionSectionKey === 2 && (
              <QuestionSection
                sectionKey={2}
                questionGroup={secondQuestionGroup}
                setQuestionGroupCallback={setSecondQuestionGroup}
              />
            )}
            {questionSectionKey === 3 && (
              <QuestionSection
                sectionKey={3}
                questionGroup={thirdQuestionGroup}
                setQuestionGroupCallback={setThirdQuestionGroup}
              />
            )}
          </ReadingTestContext.Provider>
        </Col>
      </Row>

      <div className={`${styles["footer"]}`}>
        <div className={`${styles["footer-children"]}`}>
          <img
            src="/default.png"
            style={{ width: "30px", height: "30px", marginRight: "0.5rem" }}
          />
          <p style={{ color: "white" }}>{title}</p>
        </div>

        <div
          className={`${styles["footer-children"]} ${styles["button-group"]}`}
        >
          <Button
            className={`${styles["button"]} ${styles["secondary"]}`}
            onClick={handlePreviousClick}
          >
            Previous
          </Button>

          <Button
            className={`${styles["button"]} ${styles["secondary"]}`}
            onClick={handleNextClick}
          >
            Next
          </Button>

          <Button
            className={`${styles["button"]} ${styles["cancel"]}`}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>

          <Button
            className={`${styles["button"]} ${styles["primary"]}`}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewReadingPart;
