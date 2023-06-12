import { Button, Col, Image, Modal, Row, Space, Table, Typography } from "antd";
import { AppHeader, UploadImage } from "components";
import { useRef, useState } from "react";
import styles from "./PostTest.module.css";
import { useNavigate } from "react-router";

import { ColumnsType } from "antd/es/table";
import { BackNavigateBox } from "./helper";



interface DataType {
  part: string;
  questions: number;
  duration: number;
  actions: any[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Part",
    dataIndex: "part",
    key: "part",
    render: (item) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={item === "LISTENING" ? "listen_icon.png" : "read_icon.png"}
          style={{ height: "20px", marginRight: "3px" }}
          preview={false}
        />
        <Typography.Text>{item}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Questions",
    dataIndex: "questions",
    key: "questions",
    render: (item) => item,
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    render: (item) => (item ? `${item} minutes` : "-"),
  },
  {
    title: "",
    key: "action",
    render: (_, { actions }) => (
      <Space>
        {actions.map((act) => {
          return act;
        })}
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    part: "LISTENING",
    questions: 40,
    duration: 40,
    actions: [
      <Image
        src="edit_fill.png"
        alt=""
        preview={false}
        style={{ height: "16px", cursor: "pointer" }}
      />,
      <Image
        src="trash_fill.png"
        alt=""
        preview={false}
        style={{ height: "20px", cursor: "pointer" }}
      />,
    ],
  },
  {
    part: "READING",
    questions: 40,
    duration: 60,
    actions: [
      <Image
        src="edit_fill.png"
        alt=""
        preview={false}
        style={{ height: "16px", cursor: "pointer" }}
      />,
      <Image
        src="trash_fill.png"
        alt=""
        preview={false}
        style={{ height: "20px", cursor: "pointer" }}
      />,
    ],
  },
];

export const NewTest = () => {
  const titleRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [err, setErr] = useState<any>({});
  const [openDialog, setOpenDialog] = useState(false);
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
    navigate("/new-test/add-reading");
  };

  const handleSaveClick = () => {
    navigate("/tests");
  };

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleQuestionChange = (selected: string) => {
    setSelectedAnswer(selected);
  };


  return (
    <div>
      <AppHeader />

      <BackNavigateBox />

      <div
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingTop: "1rem",
          borderTopLeftRadius: "50px",
          borderTopRightRadius: "50px",
        }}
        className={styles["shadow"]}
      >
        <Row
          style={{
            width: "80%",
            margin: "auto",
          }}
        >
          <Col xs={{ span: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                width: "100%",
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
          </Col>

          <Col xs={{ span: 4 }} style={{ alignSelf: "flex-end" }}>
            <Button
              style={{
                textTransform: "uppercase",
                backgroundColor: "#5CB1C5",
                border: "none",
                color: "white",
                boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
                marginTop: ".5rem",
              }}
              onClick={() => setOpenDialog(true)}
            >
              Add test part
            </Button>
          </Col>
        </Row>

        <Row style={{ width: "80%", margin: "auto" }}>
          <Col xs={{ span: 24 }} style={{ marginTop: "1rem" }}>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
            />
          </Col>
        </Row>
      </div>

      {/* FOOTER */}
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
      <Modal
        open={openDialog}
        title="Add new part"
        footer={null}
        style={{ textAlign: "center", textTransform: "uppercase" }}
        onCancel={() => setOpenDialog(false)}
      >
        <div style={{ width: "75%", margin: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Image
              src="read_group_icon.png"
              preview={false}
              style={{ width: "162px", height: "172px", cursor: "pointer" }}
              onClick={handleAddReadingSectionClick}
            />
            <Image
              src="listen_group_icon.png"
              preview={false}
              style={{ width: "162px", height: "172px", cursor: "pointer" }}
              onClick={() => { }}
            />
          </div>
          <Button
            type="primary"
            block
            onClick={() => setOpenDialog(false)}
            style={{
              marginTop: "1rem",
              color: "white",
              backgroundColor: "#9A9494",
              textTransform: "uppercase",
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};
