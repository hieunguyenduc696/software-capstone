import { Button, Col, Image, Row } from "antd";
import { AppHeader, UploadImage } from "components";
import { PreviewTestItem } from "components/PreviewTestItem";
import { useRef, useState } from "react";
import styles from "./PostTest.module.css";
import { useNavigate } from "react-router";

const mockPreviewTestItems = [
  {
    image: "default.png",
    title: "IELTS Mock test 2023",
    publishDate: "28/03/2023",
  },
  {
    image: "default.png",
    title: "IELTS Mock test 2022",
    publishDate: "28/03/2022",
  },
  {
    image: "default.png",
    title: "IELTS Mock test 2021",
    publishDate: "28/03/2021",
  },
];

export const PostTest = () => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState<string>("IELTS Recent mock test");
  const [err, setErr] = useState<any>({});
  const navigate = useNavigate();

  const handleTitleChange = (e: any) => {
    const len = e.target.value.length;
    if (len <= 40) {
      setTitle(e.target.value);
      setErr({ ...err, title: "" });
    }
    !len && setErr({ ...err, title: "Title is require" });
  };

  const handleEditButtonClick = () => {
    if (titleRef.current) {
      const ipEle = titleRef.current as HTMLInputElement;
      ipEle.focus();
    }
  };

  const handleAddReadingSectionClick = () => {
    console.log("add reading test");
    navigate("/add-test");
  };

  const handleAddListeningSectionClick = () => {
    console.log("add listening test");
  };

  return (
    <div>
      <AppHeader />
      <div>
        <Row
          style={{ padding: "1.5rem 0 .5rem 1.5rem", backgroundColor: "white" }}
        >
          {/* left */}
          <Col span={16}>
            {/* title */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div>
                <UploadImage />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: "20px", paddingBottom: ".2rem" }}>
                  Title:
                </div>
                <Row style={{ gap: 5 }}>
                  <Col span={14}>
                    <input
                      type="text"
                      required
                      ref={titleRef}
                      style={{
                        fontSize: "24px",
                        lineHeight: ".8",
                        width: "100%",
                        ...(err.title && { borderBottom: "1px solid black" }),
                      }}
                      className={styles["ip-title"]}
                      value={title}
                      onChange={handleTitleChange}
                    />

                    {
                      <span
                        style={{
                          color: "red",
                          height: "1.5rem",
                        }}
                      >
                        {err.title}
                      </span>
                    }
                  </Col>
                  <Col span={9}>
                    <Image
                      src="edit.png"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        cursor: "pointer",
                      }}
                      onClick={handleEditButtonClick}
                      preview={false}
                    />
                  </Col>
                </Row>
              </div>
            </div>

            {/* buttons */}
            <Row style={{ padding: "4rem 2rem 0 2rem" }}>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src="read.png"
                    style={{ height: 68 }}
                    preview={false}
                  />
                  <Button
                    style={{
                      textTransform: "uppercase",
                      backgroundColor: "#45764B",
                      border: "none",
                      color: "white",
                      boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
                      marginTop: ".5rem",
                    }}
                    onClick={handleAddReadingSectionClick}
                  >
                    Add Reading Section
                  </Button>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Image
                    src="listen.png"
                    style={{ height: 68 }}
                    preview={false}
                  />
                  <Button
                    style={{
                      textTransform: "uppercase",
                      backgroundColor: "#5CB1C5",
                      border: "none",
                      color: "white",
                      boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
                      marginTop: ".5rem",
                    }}
                    onClick={handleAddListeningSectionClick}
                  >
                    Add Listening Section
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          {/* right */}
          <Col
            span={8}
            style={{
              backgroundColor: "#F2F2F2",
              padding: "1rem",
              borderRadius: "10px 0 0 10px",
            }}
          >
            <div
              style={{
                textTransform: "uppercase",
                color: "#81041F",
                fontSize: "20px",
                paddingBottom: ".5rem",
              }}
            >
              Recent Tests:
            </div>
            <div>
              {mockPreviewTestItems.map((item, i) => (
                <div style={{ paddingTop: ".5rem" }}>
                  <PreviewTestItem item={item} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
