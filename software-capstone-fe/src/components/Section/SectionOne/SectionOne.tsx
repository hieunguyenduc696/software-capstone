import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Typography, message } from "antd";
import { FloatButton } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

import { Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const SectionOne = () => {
  const [title, setTitle] = useState<string>("Paragraph Title");
  const [content, setContent] = useState<string>("Enter paragraph content....");
  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<string>();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Upload image successfully",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please upload image only",
    });
  };

  const handleAddFileClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  return (
    <>
      <Row>
        {contextHolder}
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          {!image && (
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

                cursor: "pointer",
              }}
              onClick={handleAddFileClick}
            >
              <InboxOutlined style={{ fontSize: "45px", color: "#4985CD" }} />
              <p style={{ fontSize: "20px" }}>Click to upload Image</p>

              <input
                type="file"
                style={{ display: "none" }}
                ref={inputFileRef}
                onChange={(e: any) => {
                  if (e.target.files.length === 1) {
                    const newFile = e.target.files[0];

                    if (newFile.type.includes("image")) {
                      setImage(newFile);
                      success();
                    } else {
                      error();
                    }

                    console.log(newFile);
                  }
                }}
              />
            </div>
          )}

          {image && (
            <div style={{ position: "relative" }}>
              <img
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "10px",
                  border: "1px solid #4985CD",
                }}
                src={preview}
              />
              <FloatButton
                tooltip={<div>Upload image</div>}
                style={{ position: "absolute", top: "90%", right: "0%" }}
                onClick={handleAddFileClick}
                icon={<UploadOutlined />}
              />
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputFileRef}
                onChange={(e: any) => {
                  if (e.target.files.length === 1) {
                    const newFile = e.target.files[0];

                    if (newFile.type.includes("image")) {
                      setImage(newFile);
                      success();
                    } else {
                      error();
                    }

                    console.log(newFile);
                  }
                }}
              />
            </div>
          )}
        </Col>
      </Row>

      <Divider style={{ color: "#000" }} />
      <div style={{ padding: "0.5rem" }}>
        <Typography.Title
          className={`${styles.title}`}
          editable={{
            icon: <EditOutlined />,
            tooltip: "Edit title",
            onChange: setTitle,
            enterIcon: null,
          }}
          level={3}
          style={{ margin: 0, marginBottom: "0.75rem" }}
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
      </div>
    </>
  );
};

export default SectionOne;
