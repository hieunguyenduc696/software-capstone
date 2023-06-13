import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../../Result.module.css";

interface PropsType {
	order: number;
	correctAnswer: string;
	userAnswer: string;
}

const AnswerKeyItem: React.FC<PropsType> = ({ order, correctAnswer, userAnswer }: PropsType) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-start",
				marginBottom: ".5rem",
			}}
		>
			<div className={styles.number}>{order}</div>
			<Typography.Title
				level={5}
				style={{
					margin: 0,
					textTransform: "uppercase",
					color: "#45764B",
					marginRight: ".2rem",
				}}
			>
				{correctAnswer}
				{": "}
			</Typography.Title>
			<Typography.Title
				level={5}
				style={{ margin: "0 .2rem 0 0", textTransform: "uppercase" }}
			>
				{userAnswer}
			</Typography.Title>
			<img
				alt=""
				src={correctAnswer === userAnswer ? "../done.png" : "../close.png"}
				height={15}
			/>
		</div>
	);
};

function AnswersKeys({ setAnswersKey, setUserAnswers, setTime, answersKey, userAnswers }: any) {
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const t = Number.parseInt(localStorage.getItem("time") || "");
		const aKeys = JSON.parse(localStorage.getItem("answersKey") || "");
		const uKeys = JSON.parse(localStorage.getItem("userAnswers") || "");

		setTime(t);
		setAnswersKey(aKeys);
		setUserAnswers(uKeys);
		setTotal(aKeys.length);
	}, []);

	const renderItemGroup = (from: number, to: number) => {
		const rElements = [];
		for (let i = from; i < to; i++) {
			rElements.push(
				<AnswerKeyItem
					order={i + 1}
					correctAnswer={answersKey[i]}
					userAnswer={userAnswers[i]}
				/>
			);
		}

		return rElements;
	};

	return (
		<div>
			<Typography.Title
				level={4}
				style={{ textTransform: "uppercase", textAlign: "center", marginTop: "1rem" }}
			>
				Answers Keys:
			</Typography.Title>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<div>{renderItemGroup(0, Math.ceil(total / 2))}</div>
				<div style={{ marginLeft: "6rem" }}>
					{renderItemGroup(Math.ceil(total / 2), total)}
				</div>
			</div>
		</div>
	);
}

export default AnswersKeys;
