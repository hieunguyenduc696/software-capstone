import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./QuestionSectionDetail.module.css";
import { Row, Col, Tabs, Collapse, Typography, message, Button } from "antd";
import QuestionItem from "components/QuestionItem/QuestionItem";
import {
	IQuestionItem,
	TYPE_OF_QUESTION,
	QuestionGroupInfo,
	IReadingSectionLimit,
	READING_SECTION_LIMIT,
	DEFAULT_NUMBER_OF_QUESTION,
	IQuestionDetail,
} from "services/QuestionTypeService";

import { MehOutlined } from "@ant-design/icons";
import TrueFalseNotGivenTemplate from "components/QuestionTemplate/TrueFalseNotGivenTemplate";
import ShortAnswerTemplate from "components/QuestionTemplate/ShortAnswerTemplate";
import MultipleChoiceTemplate from "components/QuestionTemplate/MultipleChoiceTemplate";
import MappingHeadingTemplate from "components/QuestionTemplate/MappingHeadingTemplate";
import ReadingTestContext from "context/ReadingTestContext";
import TrueFalseNotGivenTemplateDetail from "../QuestionTemplateDetail/TrueFalseNotGivenTemplateDetail";
import ShortAnswerTemplateDetail from "../QuestionTemplateDetail/ShortAnswerTemplateDetail";
import MultipleChoiceTemplateDetail from "../QuestionTemplateDetail/MultipleChoiceTemplateDetail";

interface QuestionSectionDetailProps {
	sectionKey: number;
	questionGroup: QuestionGroupInfo[];
	setQuestionGroupCallback: (prev: any) => any;
}

const QuestionSectionDetail: React.FC<QuestionSectionDetailProps> = ({
	sectionKey,
	questionGroup,
	setQuestionGroupCallback,
}: QuestionSectionDetailProps) => {
	const [questionTemplates, setQuestionTemplates] = useState<string[]>(
		questionGroup.map((item) => item.type)
	);
	const [messageApi, contextHolder] = message.useMessage();
	// check
	const [countQuestion, setCountQuestion] = useState<number>(0);

	const { end: endQuestion, start: startQuestion } = READING_SECTION_LIMIT[sectionKey - 1];
	const { questionDetails, setQuestionDetails } = useContext(ReadingTestContext);

	const duplicatedTypeOfQuestionError = () => {
		messageApi.open({
			type: "error",
			content: "This type of question has already existed in this section",
		});
	};

	const handleQuestionTemplatesUpdate = (typeOfQuestion: string) => {
		const duplicated = questionTemplates?.includes(typeOfQuestion);

		if (!duplicated) {
			setQuestionGroupCallback((prev: QuestionGroupInfo[]) => {
				if (prev?.length === 0) {
					const from = startQuestion;
					const to = startQuestion + DEFAULT_NUMBER_OF_QUESTION - 1;

					setQuestionDetails((prev: IQuestionDetail[]) => {
						return prev?.map((item: IQuestionDetail) => {
							if (item?.order <= to && item?.order >= from) {
								return {
									...item,
									type: typeOfQuestion,
								};
							}
							return item;
						});
					});

					return [
						{
							type: typeOfQuestion,
							from: from,
							to: to,
							index: 0,
						},
					];
				} else {
					const start = prev[prev.length - 1].to + 1;
					const end = start + DEFAULT_NUMBER_OF_QUESTION - 1;

					setQuestionDetails((prev: IQuestionDetail[]) => {
						return prev?.map((item: IQuestionDetail) => {
							if (item?.order <= end && item?.order >= start) {
								return {
									...item,
									type: typeOfQuestion,
								};
							}
							return item;
						});
					});

					return [
						...prev,
						{
							type: typeOfQuestion,
							from: start,
							to: end,
							index: prev.length,
						},
					];
				}
			});

			setQuestionTemplates((prev: string[]) => {
				return [...prev, typeOfQuestion];
			});

			const updated = countQuestion + DEFAULT_NUMBER_OF_QUESTION;
			setCountQuestion(updated);
		} else {
			duplicatedTypeOfQuestionError();
		}
	};

	useEffect(() => {
		console.log("HELLO");
	}, [questionGroup]);

	return (
		<>
			{contextHolder}
			<Row>
				{questionTemplates.length > 0 &&
					questionTemplates.map((item: string, index: number) => {
						if (item === TYPE_OF_QUESTION[0].type)
							return (
								<TrueFalseNotGivenTemplateDetail
									initialFrom={questionGroup[index].from}
									initialTo={questionGroup[index].to}
									updateQuestionGroupInfoCallback={setQuestionGroupCallback}
								/>
							);
						else if (item === TYPE_OF_QUESTION[1].type)
							return (
								<ShortAnswerTemplateDetail
									initialFrom={questionGroup[index].from}
									initialTo={questionGroup[index].to}
									updateQuestionGroupInfoCallback={setQuestionGroupCallback}
								/>
							);
						else if (item === TYPE_OF_QUESTION[2].type)
							return (
								<MultipleChoiceTemplateDetail
									initialFrom={questionGroup[index].from}
									initialTo={questionGroup[index].to}
									updateQuestionGroupInfoCallback={setQuestionGroupCallback}
								/>
							);
					})}
			</Row>
		</>
	);
};

export default QuestionSectionDetail;
