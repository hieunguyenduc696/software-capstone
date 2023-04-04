import React, { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Typography, message, Input } from "antd";
import { FloatButton } from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";

import { Divider } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SectionOne = () => {
  const [title, setTitle] = useState<string>();
  const titleRef = useRef<HTMLInputElement>(null);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleRef.current) {
      setTitle(event.target.value);
    }
  };

  const [content, setContent] = useState<string>("Enter content");
  const contentRef = useRef<HTMLInputElement>(null);
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (contentRef.current) {
      setContent(event.target.value);
    }
  };

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
        <input
          type="text"
          required
          ref={titleRef}
          style={{
            backgroundColor: "transparent",
            marginBottom: "15px",
            fontSize: "18px",
            marginLeft: "10px"
          }}
          className={`${styles["ip-title"]} ${styles.paragraph}`}
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter paragraph title..."
        />

        <TextArea
          className={`${styles.paragraph} ${styles.full}`}
          placeholder="Enter paragraph content..."
          autoSize={{ minRows: 3 }}
          bordered={false}
        />
      </div>
    </>
  );
};

export default SectionOne;
