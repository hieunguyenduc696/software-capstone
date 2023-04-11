import {
  Avatar,
  Col,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useRef, useState, useContext } from "react";
import styles from "./index.module.css";
import Icon from "@ant-design/icons";

import ReadingTestContext from "context/ReadingTestContext";
import { IQuestionDetail } from "services/QuestionTypeService";

const options = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
  { value: "F", label: "F" },
];

interface ChoicesType {
  [key: string]: any;
}

interface MultipleChoiceProps {
  order: number;
}

const MultipleChoiceType: React.FC<MultipleChoiceProps> = ({ order }) => {
  const { questionDetails, setQuestionDetails } =
    useContext(ReadingTestContext);

  const [correctChoice, setCorrectChoice] = useState(
    questionDetails?.[order - 1].answer ? questionDetails[order - 1].answer : ""
  );
  const [quatityChoices, setQuatityChoices] = useState(
    questionDetails?.[order - 1]?.options?.quantity
      ? questionDetails[order - 1]?.options?.quantity
      : 3
  );
  const [choices, setChoices] = useState<ChoicesType>(
    questionDetails?.[order - 1]?.options?.choices
      ? questionDetails[order - 1]?.options?.choices
      : {}
  );
  const [question, setQuestion] = useState<string>(
    questionDetails?.[order - 1].question
      ? questionDetails[order - 1].question
      : ""
  );
  const questionRef = useRef<HTMLInputElement>(null);

  const onChange = (e: RadioChangeEvent) => {
    setCorrectChoice(e.target.value || "");
    setQuestionDetails((prev: IQuestionDetail[]) => {
      return prev?.map((item: IQuestionDetail) => {
        if (item?.order === order) {
          return {
            ...item,
            answer: e.target.value || "",
          };
        }
        return item;
      });
    });
  };

  const handleChoiceQuantityChange = (e: any) => {
    setQuatityChoices(e || 3);
    setQuestionDetails((prev: IQuestionDetail[]) => {
      return prev?.map((item: IQuestionDetail) => {
        if (item?.order === order) {
          return {
            ...item,
            options: {
              ...options,
              quantity: e || 3,
            },
          };
        }
        return item;
      });
    });
  };

  const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoices((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
    setQuestionDetails((prev: IQuestionDetail[]) => {
      return prev?.map((item: IQuestionDetail) => {
        if (item?.order === order) {
          return {
            ...item,
            options: {
              ...options,
              choices: {
                ...choices,
                [e.target.name]: e.target.value,
              },
            },
          };
        }
        return item;
      });
    });
  };

  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (questionRef.current) {
      setQuestion(event.target.value);
      setQuestionDetails((prev: IQuestionDetail[]) => {
        return prev?.map((item: IQuestionDetail) => {
          if (item?.order === order) {
            return {
              ...item,
              question: event.target.value,
            };
          }
          return item;
        });
      });
    }
  };

  return (
    <Space size={5} direction="vertical" style={{ width: "100%" }}>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Avatar size={30} className={`${styles.number}`}>
          {order}
        </Avatar>
        <InputNumber
          defaultValue={3}
          //onChange={(e) => setQuatityChoices(e || 3)}
          onChange={handleChoiceQuantityChange}
          className={`${styles["number-input"]}`}
          style={{ marginRight: "1rem" }}
          min={3}
          max={6}
        />
        <span>choices</span>
      </div>
      <Row>
        <Col span={18}>
          <input
            type="text"
            required
            ref={questionRef}
            style={{
              fontSize: "16px",
              width: "100%",
              backgroundColor: "transparent",
              marginBottom: "10px",
            }}
            className={styles["ip-title"]}
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter the question"
          />
        </Col>
        <Col span={6}>
          <Icon
            component={() => (
              <Tooltip title="Add explanation">
                <img style={{ width: "13px" }} src="quotation.png" />
              </Tooltip>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Radio.Group
            onChange={onChange}
            value={correctChoice}
            style={{ display: "block", width: "100%" }}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {Array(quatityChoices)
                .fill(1)
                .map((choice, index) => {
                  const key = options[index].value as string;
                  return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        size={24}
                        className={`${styles.number}`}
                        style={{ fontSize: "15px" }}
                      >
                        {key}
                      </Avatar>
                      <Radio
                        value={options[index].value}
                        style={{ width: "80%", alignItems: "center" }}
                        className={styles["radio"]}
                      >
                        <input
                          name={key}
                          type="text"
                          required
                          style={{
                            fontSize: "16px",
                            width: "100%",
                            backgroundColor: "transparent",
                          }}
                          className={styles["ip-title"]}
                          value={choices[key]}
                          onChange={handleChoiceChange}
                          placeholder="Enter the description for this choice"
                        />
                      </Radio>
                    </div>
                  );
                })}
            </Space>
          </Radio.Group>
        </Col>
      </Row>
    </Space>
  );
};

export default MultipleChoiceType;
