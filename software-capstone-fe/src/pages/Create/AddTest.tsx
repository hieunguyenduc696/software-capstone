import React, { useState, useRef, useEffect } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Typography } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";

import type { TabsProps } from "antd";
import SectionOne from "components/Section/SectionOne/SectionOne";
import AlphabetType from "components/QuestionType/MultipleChoice/AlphabetType";
import MappingHeadingInstruction from "components/Instruction/MappingHeadingInstruction/MappingHeadingInstruction";
import MappingHeadingTable from "components/Instruction/MappingHeadingInstruction/MappingHeadingTable";

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
            <AlphabetType order={1} />
            <AlphabetType order={2} />
            <AlphabetType order={3} />
            <AlphabetType order={4} />
            <AlphabetType order={5} />
            <AlphabetType order={6} />
            <AlphabetType order={7} />
            <MappingHeadingTable />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
