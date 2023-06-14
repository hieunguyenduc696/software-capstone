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

	return (
		<Select
			className={`${styles.select}`}
			options={options}
			onChange={onChange}
			defaultValue={defaultValue}
		/>
	);
};

interface TrueFalseTypeProps {
	order: number;
}

const TYPE = TYPE_OF_QUESTION[0].type;

const TrueFalseTypeDetail: React.FC<TrueFalseTypeProps> = ({ order }: TrueFalseTypeProps) => {
	const { questionDetails, setQuestionDetails } = useContext(ReadingTestContext);
	const questionRef = useRef<HTMLInputElement>(null);
	const [question, setQuestion] = useState<string>(
		questionDetails?.[order - 1].question ? questionDetails[order - 1].question : ""
	);
	const [answer, setAnswer] = useState<string>(
		questionDetails?.[order - 1].answer ? questionDetails[order - 1].answer : ""
	);

	const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (questionRef.current) {
			setQuestion(event.target.value);
			setQuestionDetails((prev: IQuestionDetail[]) => {
				return prev?.map((item: IQuestionDetail) => {
					if (item?.order === order) {
						return {
							...item,
							type: TYPE,
							question: event.target.value,
						};
					}
					return item;
				});
			});
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
						answer: value,
					};
				}
				return item;
			});
		});
	};

	return (
		<Col span={24} style={{ boxSizing: "border-box" }} className={styles.question}>
			<div className={styles.number}>{`${order}`}</div>
			<TrueFalseSelect
				onChange={handleAnswerChange}
				defaultValue={answer === "" ? null : answer}
			/>
			<p
				style={{
					backgroundColor: "transparent",
					marginRight: "0.5rem",
					display: "inline",
					width: "100%",
				}}
				className={`${styles["ip-title"]} ${styles.paragraph}`}
			>
				{question}
			</p>
		</Col>
	);
};

export default TrueFalseTypeDetail;
