import React, { useState, useContext, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Button } from "antd";
import { AppHeader } from "../../components/AppHeader";
import type { TabsProps } from "antd";
// import SectionOne from "components/Section/SectionOne/SectionOne";
// import AlphabetType from "components/QuestionType/MultipleChoice/AlphabetType";
// import MappingHeadingInstruction from "components/Instruction/MappingHeadingInstruction/MappingHeadingInstruction";
// import HeadingType from "components/QuestionType/MultipleChoice/HeadingType";
// import AlphabetHeadingType from "components/QuestionType/MultipleChoice/AlphabetHeadingType";

import ReadingParagraph from "components/ReadingParagraph";
import QuestionSection from "components/QuestionSection";
import {
  QuestionGroupInfo,
  generateReadingQuestionDetails,
  generateReadingParagraphs,
  IReadingParagraph,
} from "services/QuestionTypeService";
import ReadingTestContext from "context/ReadingTestContext";

const AddingTestPage = () => {
  // const [letters, setLetters] = useState(
  //   [
  //     {value: "A", label: "A"},
  //     {value: "B", label: "B"},
  //     {value: "C", label: "C"},
  //     {value: "D", label: "D"},
  //     {value: "E", label: "E"},
  //     {value: "F", label: "F"},
  //     {value: "G", label: "G"},
  //     {value: "H", label: "H"},
  //   ]
  // );

  // const onChange = (key: string) => {
  //   console.log(key);
  
  const [questionSectionKey, setQuestionSectionKey] = useState<number>(1);
  const [paragraphs, setParagraphs] = useState(generateReadingParagraphs);
  const [questionDetails, setQuestionDetails] = useState(
    generateReadingQuestionDetails
  );

  const [firstQuestionGroup, setFirstQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);
  const [secondQuestionGroup, setSecondQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);
  const [thirdQuestionGroup, setThirdQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);
  const [forthQuestionGroup, setForthQuestionGroup] = useState<
    QuestionGroupInfo[]
  >([]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Section 1`,
      children: <ReadingParagraph sectionKey={1} setReadingParagraphsCallback={setParagraphs}/>,
    },
    {
      key: "2",
      label: `Section 2`,
      children: <ReadingParagraph sectionKey={2} setReadingParagraphsCallback={setParagraphs}/>,
    },
    {
      key: "3",
      label: `Section 3`,
      children: <ReadingParagraph sectionKey={3} setReadingParagraphsCallback={setParagraphs}/>,
    },
    {
      key: "4",
      label: `Section 4`,
      children: <ReadingParagraph sectionKey={4} setReadingParagraphsCallback={setParagraphs}/>,
    },
  ];

  const onSectionChange = (key: string) => {
    setQuestionSectionKey(parseInt(key, 10));
  };

  const handleSubmit = () => {
    console.log('PARAGRAPHS: ',paragraphs);
    console.log('QUESTION DETAILS');
    console.table(questionDetails);
  };

  useEffect(() => {
    setQuestionDetails(generateReadingQuestionDetails);
    setParagraphs(generateReadingParagraphs);
  }, []);

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
                onChange={onSectionChange}
                className={`${styles.tabs}`}
              />
            </Col>
          </Row>
        </Col>
        {/* <Col className={`${styles.column} ${styles.right}`} span={12}>
          <Row>
            <Col span={24}>
              <div className={styles.questionHeader} style={{ backgroundColor: 'var(--secondaryColor)' }}>Question 1 - 7</div>
            </Col>
          </Row>

          <Row>
            <TrueFalseInstruction from={1} to={7} />
            <TrueFalseType order={1} />
            <TrueFalseType order={2} />
            <TrueFalseType order={3} />
            <TrueFalseType order={4} />
            <TrueFalseType order={5} />
            <TrueFalseType order={6} />
            <TrueFalseType order={7} />
          </Row>

          <Row>
            <Col span={24}>
              <div className={styles.questionHeader} style={{ backgroundColor: 'var(--secondaryColor)' }}>Question 27 - 33</div>
            </Col>
          </Row>

          <Row>
            <MappingHeadingInstruction letterFrom={"A"} letterTo={"H"} questionFrom={27} questionTo={33} />
            <AlphabetHeadingType order={1} letterList={letters}/>
            <AlphabetHeadingType order={2} letterList={letters}/>
            <AlphabetHeadingType order={3} letterList={letters}/>
            <AlphabetHeadingType order={4} letterList={letters}/>
            <AlphabetHeadingType order={5} letterList={letters}/>
            <AlphabetHeadingType order={6} letterList={letters}/>
            <AlphabetHeadingType order={7} letterList={letters}/> 
            <p style={{margin: "10px"}}>List of Headings</p> 
            <HeadingType letter={"A"} />
            <HeadingType letter={"B"} />
            <HeadingType letter={"C"} />
            <HeadingType letter={"D"} />
            <HeadingType letter={"E"} />
            <HeadingType letter={"F"} />
            <HeadingType letter={"G"} />
            <HeadingType letter={"H"} />
          </Row> */}

        <Col
          className={`${styles.column} ${styles.right}`}
          span={12}
          style={{
            borderLeft: "2px solid #9F9F9F",
            height: "83vh",
            maxHeight: "83vh",
          }}
        >
          <ReadingTestContext.Provider
            value={{ questionDetails, setQuestionDetails }}
          >
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
            {questionSectionKey === 4 && (
              <QuestionSection
                sectionKey={4}
                questionGroup={forthQuestionGroup}
                setQuestionGroupCallback={setForthQuestionGroup}
              />
            )}
          </ReadingTestContext.Provider>
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddingTestPage;