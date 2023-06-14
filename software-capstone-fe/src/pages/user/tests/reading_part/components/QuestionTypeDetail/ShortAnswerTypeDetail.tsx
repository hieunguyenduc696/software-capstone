import React, { useState, useRef, useContext } from "react";
import styles from "./index.module.css";
import { Row, Col, Tooltip } from "antd";
import Icon from "@ant-design/icons";
import ReadingTestContext from "context/ReadingTestContext";
import { IQuestionDetail, TYPE_OF_QUESTION } from "services/QuestionTypeService";

interface ShortAnswerProps {
	order: number;
}

const TYPE = TYPE_OF_QUESTION[1].type;

const ShortAnswerTypeDetail = ({ order }: ShortAnswerProps) => {
	const { questionDetails, setQuestionDetails } = useContext(ReadingTestContext);

	const [answer, setAnswer] = useState<string>(
		questionDetails?.[order - 1].answer ? questionDetails[order - 1].answer : ""
	);
	const [question, setQuestion] = useState<string>(
		questionDetails?.[order - 1].question ? questionDetails[order - 1].question : ""
	);
	const answerRef = useRef<HTMLInputElement>(null);

	const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (answerRef.current) {
			setAnswer(event.target.value);
			setQuestionDetails((prev: IQuestionDetail[]) => {
				return prev?.map((item: IQuestionDetail) => {
					if (item?.order === order) {
						return {
							...item,
							type: TYPE,
							answer: event.target.value,
						};
					}
					return item;
				});
			});
		}
	};

	return (
		<Col span={24} style={{ boxSizing: "border-box" }} className={`${styles.shortAnswer}`}>
			<Row>
				<Col span={24}>
					<p
						style={{
							fontSize: "16px",
							width: "100%",
							backgroundColor: "transparent",
							marginBottom: "10px",
						}}
						className={styles["ip-title"]}
					>
						{question}
					</p>
				</Col>
			</Row>

			<Row>
				<Col
					span={16}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						alignItems: "center",
					}}
				>
					<div className={`${styles.number}`}>{`${order}`}</div>
					<input
						type="text"
						required
						ref={answerRef}
						style={{
							fontSize: "16px",
							width: "100%",
							backgroundColor: "transparent",
						}}
						className={styles["ip-title"]}
						value={answer}
						onChange={handleAnswerChange}
						placeholder="Enter the answer for this question"
					/>
				</Col>
			</Row>
		</Col>
	);
};

export default ShortAnswerTypeDetail;
