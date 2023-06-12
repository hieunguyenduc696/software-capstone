import React, { useState, useContext, useEffect } from "react";
import styles from "./ReadingPart.module.css";
import { Row, Col, Tabs, Button } from "antd";
import { AppHeader } from "components";
import type { TabsProps } from "antd";

import ReadingParagraph from "components/ReadingParagraph";
import QuestionSection from "components/QuestionSection";
import {
  QuestionGroupInfo,
  generateReadingQuestionDetails,
  generateReadingParagraphs,
  IReadingParagraph,
} from "services/QuestionTypeService";
import ReadingTestContext from "context/ReadingTestContext";
import { useNavigate } from "react-router";
import TestConfirmModal from "./components/TestConfirmDialog/TestConfirmDialog";

const ReadingPart = () => {
  const navigate = useNavigate();

  //countdown
  const duration = 180;
  const [timeRemaining, setTimeRemaining] = useState(duration);
  // popup confirm
  const [openPopup, setOpenPopup] = useState(false);
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
  }

  const handleSubmit = () => {
    setOpenPopup(true)
  };

  useEffect(() => {
    setQuestionDetails(generateReadingQuestionDetails);
    setParagraphs(generateReadingParagraphs);
  }, []);

  useEffect(() => {
    // Exit early if the countdown is complete
    if (timeRemaining <= 0) {
      return;
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      setTimeRemaining(time => time - 1);
    }, 1000);

    // Clean up the interval
    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining]);

  // Format the time remaining as minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

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
            height: "83vh",
            maxHeight: "83vh",
            overflowY: "auto",
          }}
        >
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

        <div className={`${styles["footer-children"]} ${styles["button-group"]}`}>
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
        </div>

        <div className={`${styles["footer-children"]}`}>
          <img src="./../alarm.png" alt="" />
          <div className={styles["countdown"]}>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div>
        </div>

        <div
          className={`${styles["footer-children"]} ${styles["button-group"]}`}
        >
          <Button
            className={`${styles["button"]} ${styles["cancel"]}`}
            onClick={handleCancelClick}
            icon={<img src="./../review.png" />}
          >
            Review
          </Button>

          <Button
            icon={<img src="./../save_icon.png" />}
            className={`${styles["button"]} ${styles["primary"]}`}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* confirm popup */}
      <TestConfirmModal open={openPopup} setOpen={setOpenPopup} />
    </div>
  );
};

export default ReadingPart;
