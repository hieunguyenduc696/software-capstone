import { AppHeader } from "components";
import React, { useState } from "react";
import Title from "./components/Title/Title";
import Score from "./components/Score/Score";
import AnswersKeys from "./components/AnswersKeys/AnswersKeys";

function TestResult() {
	const [time, setTime] = useState(0);
	const [answersKey, setAnswersKey] = useState([]);
	const [userAnswers, setUserAnswers] = useState([]);
	return (
		<div>
			<AppHeader />
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
		</div>
	);
}

export default TestResult;
