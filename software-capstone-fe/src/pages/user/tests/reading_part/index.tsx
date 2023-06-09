import React, { useState, useEffect, useMemo } from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Button } from "antd";
import { AppHeader } from "components";
import type { TabsProps } from "antd";
import { message } from "antd";

import {
	QuestionGroupInfo,
	generateReadingParagraphs,
	IReadingParagraph,
	IQuestionDetail,
} from "services/QuestionTypeService";
import ReadingTestContext from "context/ReadingTestContext";
import { getTestWithID } from "services/AdminService";
import { useParams } from "react-router";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { convertRawQuestion, extractTemplate } from "./helper";
import TestConfirmModal from "./components/TestConfirmDialog/TestConfirmDialog";
import QuestionSectionDetail from "./components/QuestionSectionDetail/QuestionSectionDetail";
import ReadingParagraphDetail from "./components/ReadingParagraphDetail";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ReadingPart = () => {
	const { id } = useParams();
	//countdown
	const TIME_TO_DO_TEST = 60;
	const duration = 60 * TIME_TO_DO_TEST;
	const [timeRemaining, setTimeRemaining] = useState(duration);

	// popup confirm
	const [openPopup, setOpenPopup] = useState(false);
	const handleNextClick = () => {
		if (questionSectionKey < 3) {
			setQuestionSectionKey(questionSectionKey + 1);
		}
	};

	const [messageApi, contextHolder] = message.useMessage();
	const handleSubmit = async () => {
		console.log(questionDetails);
		console.log(timeRemaining);
		setOpenPopup(true);
	};

	const [questionSectionKey, setQuestionSectionKey] = useState<number>(1);
	const [paragraphs, setParagraphs] = useState(generateReadingParagraphs);
	const [questionDetails, setQuestionDetails] = useState<IQuestionDetail[]>([]);

	// save question detail of each section
	const [firstQuestionGroup, setFirstQuestionGroup] = useState<QuestionGroupInfo[]>([]);
	const [secondQuestionGroup, setSecondQuestionGroup] = useState<QuestionGroupInfo[]>([]);
	const [thirdQuestionGroup, setThirdQuestionGroup] = useState<QuestionGroupInfo[]>([]);

	const [loading, setLoading] = useState(false);
	const [answersKey, setAnswerKey] = useState<String[]>([]);

	const onSectionChange = (key: string) => {
		setQuestionSectionKey(parseInt(key, 10));
	};

	const handlePreviousClick = () => {
		if (questionSectionKey > 1) {
			setQuestionSectionKey(questionSectionKey - 1);
		}
	};

	const handleReviewClick = () => {
		console.log("Review");
	};

	const fetchTestWithID = async (id: any) => {
		setLoading(true);
		const res = await getTestWithID({ ID: id });

		if (res?.code === 0) {
			messageApi.open({
				type: "success",
				content: res?.message,
			});
		}

		const data = res?.data;
		const sections = data?.sections;

		const paragraphs = [];
		// getParagraph
		for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
			const section = sections[sectionIndex];

			// extract paragraph
			const paragraph: IReadingParagraph = {
				order: sectionIndex + 1,
				title: section.paragraphs.title,
				content: section.paragraphs.content,
				previewImage: null,
			};

			const templates = section?.templates;
			// extract question group - inside template
			for (let index = 0; index < templates.length; index++) {
				const template = templates[index];
				// hard code ;-; to get type and index for IQuestionDetail
				const { type, typeIndex } = extractTemplate(template);

				const questions = template?.questions;

				// convert to IQuestionDetail to collect 40 questions
				for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
					const rawQuestion = questions[questionIndex];
					let question: IQuestionDetail = convertRawQuestion(rawQuestion, type);
					question.answer = "";
					setQuestionDetails((prev: IQuestionDetail[]) => {
						return [...prev, question];
					});
				}

				for (let questionIndex = 0; questionIndex < questions.length; questionIndex++) {
					const rawQuestion = questions[questionIndex];
					let question: IQuestionDetail = convertRawQuestion(rawQuestion, type);
					setAnswerKey((prev: String[]) => {
						return [...prev, question?.answer || ""];
					});
				}

				const questionGroupInfo: QuestionGroupInfo = {
					type: type,
					from: questions[0]?.question_index,
					to: questions[questions?.length - 1]?.question_index,
					index: typeIndex,
				};

				if (sectionIndex === 0) {
					// sectionOne
					setFirstQuestionGroup((prev: QuestionGroupInfo[]) => {
						return [...prev, questionGroupInfo];
					});
				} else if (sectionIndex === 1) {
					setSecondQuestionGroup((prev: QuestionGroupInfo[]) => {
						return [...prev, questionGroupInfo];
					});
				} else if (sectionIndex === 2) {
					setThirdQuestionGroup((prev: QuestionGroupInfo[]) => {
						return [...prev, questionGroupInfo];
					});
				}
			}

			paragraphs.push(paragraph);
		}

		setParagraphs(paragraphs);
		setLoading(false);
	};

	const userAnswers = useMemo(() => {
		return questionDetails.map((question) => question?.answer || "");
	}, [questionDetails]);

	useEffect(() => {
		fetchTestWithID(id);
	}, []);

	useEffect(() => {
		// Exit early if the countdown is complete
		if (timeRemaining <= 0) {
			return;
		}

		// Set up the interval
		const intervalId = setInterval(() => {
			setTimeRemaining((time: number) => time - 1);
		}, 1000);

		// Clean up the interval
		return () => {
			clearInterval(intervalId);
		};
	}, [timeRemaining]);

	// Format the time remaining as minutes and seconds
	const minutes = Math.floor(timeRemaining / 60);
	const seconds = timeRemaining % 60;

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: `Section 1`,
			children: (
				<ReadingParagraphDetail
					sectionKey={1}
					setReadingParagraphsCallback={setParagraphs}
					paragraphs={paragraphs}
				/>
			),
		},
		{
			key: "2",
			label: `Section 2`,
			children: (
				<ReadingParagraphDetail
					sectionKey={2}
					setReadingParagraphsCallback={setParagraphs}
					paragraphs={paragraphs}
				/>
			),
		},
		{
			key: "3",
			label: `Section 3`,
			children: (
				<ReadingParagraphDetail
					sectionKey={3}
					setReadingParagraphsCallback={setParagraphs}
					paragraphs={paragraphs}
				/>
			),
		},
	];
	return (
		<div style={{ background: "#FFF" }}>
			<AppHeader />
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

			{!loading && (
				<Row>
					<Col
						className={`${styles.column} ${styles.left}`}
						xs={{ span: 24 }}
						lg={{ span: 12 }}
						style={{
							height: "83vh",
							maxHeight: "83vh",
							overflowY: "auto",
						}}
					>
						<Row>
							<Col span={24}>
								<Tabs
									defaultActiveKey="1"
									items={items}
									onChange={onSectionChange}
									className={`${styles.tabs}`}
									activeKey={questionSectionKey.toString()}
								/>
							</Col>
						</Row>
					</Col>

					<Col
						className={`${styles.column} ${styles.right}`}
						xs={{ span: 24 }}
						lg={{ span: 12 }}
						style={{
							borderLeft: "2px solid #9F9F9F",
							height: "85vh",
							maxHeight: "85vh",
							overflowY: "auto",
						}}
					>
						{contextHolder}
						<ReadingTestContext.Provider
							value={{ questionDetails, setQuestionDetails }}
						>
							{/* for each section */}
							{questionSectionKey === 1 && (
								<QuestionSectionDetail
									sectionKey={1}
									questionGroup={firstQuestionGroup}
									setQuestionGroupCallback={setFirstQuestionGroup}
								/>
							)}
							{questionSectionKey === 2 && (
								<QuestionSectionDetail
									sectionKey={2}
									questionGroup={secondQuestionGroup}
									setQuestionGroupCallback={setSecondQuestionGroup}
								/>
							)}
							{questionSectionKey === 3 && (
								<QuestionSectionDetail
									sectionKey={3}
									questionGroup={thirdQuestionGroup}
									setQuestionGroupCallback={setThirdQuestionGroup}
								/>
							)}
						</ReadingTestContext.Provider>
					</Col>
				</Row>
			)}

			<div className={`${styles["footer"]}`}>
				<div className={`${styles["footer-children"]} ${styles["button-group"]}`}>
					<Button
						className={`${styles["button"]} ${styles["secondary"]}`}
						onClick={handlePreviousClick}
					>
						Previous
					</Button>

					<Button
						className={`${styles["button"]} ${styles["secondary"]}`}
						onClick={handleNextClick}
					>
						Next
					</Button>
				</div>

				<div className={`${styles["footer-children"]}`} style={{ marginLeft: "3.5rem" }}>
					<img src="./../alarm.png" alt="" />
					<div className={styles["countdown"]}>
						{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
					</div>
				</div>

				<div className={`${styles["footer-children"]} ${styles["button-group"]}`}>
					<Button
						className={`${styles["button"]} ${styles["cancel"]}`}
						onClick={handleReviewClick}
						icon={<img src="../../review.png" alt="" />}
					>
						Review
					</Button>

					<Button
						icon={<img src="../../save_icon.png" alt="" />}
						className={`${styles["button"]} ${styles["primary"]}`}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</div>
			</div>

			{/* confirm popup */}
			<TestConfirmModal
				open={openPopup}
				setOpen={setOpenPopup}
				answersKey={answersKey}
				time={duration - timeRemaining}
				userAnswers={userAnswers}
			/>
		</div>
	);
};

export default ReadingPart;
