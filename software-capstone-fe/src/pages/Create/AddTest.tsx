import React, { useState, useRef } from "react";
import styles from "./AddTest.module.css";
import { Row, Col, Tabs, Typography } from "antd";
import { AppHeader } from "../../components/AppHeader";
import TrueFalseType from "components/QuestionType/MultipleChoice/TrueFalseType";
import TrueFalseInstruction from "components/Instruction/TrueFalseInstruction/TrueFalseInstruction";
import { EditOutlined } from "@ant-design/icons";

import type { TabsProps } from "antd";
import { Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const SectionOne = () => {
  const [title, setTitle] = useState<string>("Paragraph Title");
  const [content, setContent] = useState<string>("Enter paragraph content....");
  const [image, setImage] = useState<any>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleAddFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: "90%",
              height: "150px",
              borderRadius: "10px",
              border: "1px solid #4985CD",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InboxOutlined style={{ fontSize: "45px", color: "#4985CD" }} />
            <p style={{ fontSize: "20px" }}>Click to upload Image</p>
          </div>
        </Col>
      </Row>

      <Divider style={{ color: "#000" }} />
      <Typography.Title
        className={`${styles.title}`}
        editable={{
          icon: <EditOutlined />,
          tooltip: "Edit title",
          onChange: setTitle,
          enterIcon: null,
        }}
        level={3}
        style={{ margin: 0 }}
      >
        {title}
      </Typography.Title>
      <Typography.Paragraph
        editable={{
          icon: <EditOutlined />,
          tooltip: "click to edit text",
          onChange: setContent,
          enterIcon: null,
        }}
        className={`${styles.paragraph} ${styles.full}`}
      >
        {content}
      </Typography.Paragraph>
    </>
  );
};

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
              <div className={styles.questionHeader}>Question 1 - 7</div>
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
        </Col>
      </Row>
    </div>
  );
};

export default AddingTestPage;
