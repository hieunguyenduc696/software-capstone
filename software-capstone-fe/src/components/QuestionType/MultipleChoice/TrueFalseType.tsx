import React, { useState, useRef, useContext } from "react";
import ReadingTestContext from "context/ReadingTestContext";
import { IQuestionDetail, TYPE_OF_QUESTION } from "services/QuestionTypeService";
import styles from "./index.module.css";
import { Select, Typography, Col, Tooltip, Input } from "antd";
import Icon from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { TextArea } = Input;

interface ISelect {
  onChange: (value: string) => void;
  defaultValue: string | null;
}

const TrueFalseSelect: React.FC<ISelect> = ({ onChange, defaultValue }: ISelect) => {
  const options = [
    { value: "T", label: "True" },
    { value: "F", label: "False" },
    { value: "NG", label: "Not Given" },
  ];

  return <Select className={`${styles.select}`} options={options} onChange={onChange} defaultValue={defaultValue}/>;
};

interface TrueFalseTypeProps {
  order: number;
}

const TYPE = TYPE_OF_QUESTION[0].type;

const TrueFalseType: React.FC<TrueFalseTypeProps> = ({
  order,
}: TrueFalseTypeProps) => {
  const { questionDetails, setQuestionDetails } = useContext(ReadingTestContext);
  const questionRef = useRef<HTMLInputElement>(null);
  const [question, setQuestion] = useState<string>(questionDetails?.[order - 1].question ? questionDetails[order - 1].question : "");
  const [answer, setAnswer] = useState<string>(questionDetails?.[order - 1].answer ? questionDetails[order - 1].answer : "");


  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (questionRef.current) {
      setQuestion(event.target.value);
      setQuestionDetails((prev: IQuestionDetail[]) => {
        return prev?.map((item: IQuestionDetail) => {
          if (item?.order === order) {
            return {
              ...item,
              type: TYPE,
              question: event.target.value
            }
          }
          return item;
        });
      })
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    setQuestionDetails((prev: IQuestionDetail[]) => {
      return prev?.map((item: IQuestionDetail) => {
        if (item?.order === order) {
          return {
            ...item,
            type: TYPE,
            answer: value
          }
        }
        return item;
      })
    })
  }

  return (
    <Col
      span={24}
      style={{ boxSizing: "border-box" }}
      className={styles.question}
    >
      <div className={styles.number}>{`${order}`}</div>
      <TrueFalseSelect onChange={handleAnswerChange} defaultValue={answer === "" ? null : answer}/>
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "75%",
        }}
      >
        <input
          type="text"
          required
          ref={questionRef}
          style={{
            backgroundColor: "transparent",
            marginRight: "0.5rem"
          }}
          className={`${styles["ip-title"]} ${styles.paragraph}`}
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter the question"
        />
        <Icon
          component={() => (
            <Tooltip title="Add explanation">
              <img style={{ width: "13px" }} src="quotation.png" />
            </Tooltip>
          )}
        />
      </div>
    </Col>
  );
};

export default TrueFalseType;
