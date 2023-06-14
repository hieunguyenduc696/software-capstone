import { AppHeader } from "components";
import React, { useEffect, useState } from "react";
import Title from "./components/Title/Title";
import Score from "./components/Score/Score";
import AnswersKeys from "./components/AnswersKeys/AnswersKeys";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function TestResult() {
	const [time, setTime] = useState(0);
	const [answersKey, setAnswersKey] = useState([]);
	const [userAnswers, setUserAnswers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1500);
	}, []);

	return (
		<div>
			<AppHeader />
			{!loading && (
				<>
					<div style={{ width: "90%", margin: "auto", padding: ".5rem 0 3rem 0" }}>
						<Title />
					</div>
					<div>
						<Score time={time} answersKey={answersKey} userAnswers={userAnswers} />
					</div>
					<div
						style={{
							width: "80%",
							margin: "auto",
							backgroundColor: "#EAFBFF",
							padding: "1rem 0",
						}}
					>
						<AnswersKeys
							answersKey={answersKey}
							userAnswers={userAnswers}
							setTime={setTime}
							setAnswersKey={setAnswersKey}
							setUserAnswers={setUserAnswers}
						/>
					</div>
				</>
			)}
			{loading && (
				<div
					style={{
						height: "83vh",
						maxHeight: "83vh",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Spin indicator={antIcon} />
				</div>
			)}
		</div>
	);
}

export default TestResult;
