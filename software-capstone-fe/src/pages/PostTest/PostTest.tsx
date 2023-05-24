import { Button, Col, Image, Row, Space } from "antd";
import { AppHeader, UploadImage } from "components";
import { PreviewTestItem } from "components/PreviewTestItem";
import { useRef, useState } from "react";
import styles from "./PostTest.module.css";
import { useNavigate } from "react-router";
import MultipleChoiceQuestion from "components/QuestionType/MultipleChoice/MultipleChoiceQuestion/MultipleChoiceQuestion";

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
  const [title, setTitle] = useState<string>("");
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

  const handleSaveClick = () => {
    navigate("/test");
  }

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleQuestionChange = (selected: string) => {
    setSelectedAnswer(selected);
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
          <Col xs={{ span: 24 }}>
            {/* title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                width: "90%",
                margin: "auto",
              }}
            >
              <div>
                <UploadImage />
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontSize: "20px", paddingBottom: ".2rem" }}>
                  Title:
                </div>
                <Row style={{ gap: 5 }}>
                  <Col span={18}>
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
                      placeholder={"IELTS Test title here..."}
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
                  <Col span={5}>
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
            <Row style={{ padding: "3rem 2rem 1rem 2rem" }}>
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                style={{ paddingTop: "1rem" }}
              >
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
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                style={{ paddingTop: "1rem" }}
              >
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

        </Row>
      </div>
      <div className={`${styles["footer"]}`}>
        <div className={`${styles["footer-children"]}`}>
          <Button
            icon={<img src="white-trash.png" style={{ width: "20px" }} />}
            className={`${styles["button"]} ${styles["primary"]}`}
            style={{ backgroundColor: "#000" }}
          >
            Delete
          </Button>
        </div>

        <div
          className={`${styles["footer-children"]} ${styles["button-group"]}`}
        >
          <Button
            className={`${styles["button"]} ${styles["primary"]}`}
            style={{ backgroundColor: "var(--secondaryGrayColor)" }}
          >
            Cancel
          </Button>
          <Button
            icon={<img src="save_icon.png" />}
            className={`${styles["button"]} ${styles["primary"]}`}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
