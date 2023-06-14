import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import { Col, Typography } from "antd";
import { TYPE_OF_QUESTION } from "services/QuestionTypeService";
import TemplateProps from "components/QuestionTemplate/TemplateInterface";
import MultipleChoiceInstruction from "components/Instruction/MultipleChoiceInstruction/MultipleChoiceInstruction";
import MultipleChoiceType from "components/QuestionType/MultipleChoice/MultipleChoiceType";
import MultipleChoiceTypeDetail from "../QuestionTypeDetail/MutipleChoiceTypeDetail";

const TYPE = TYPE_OF_QUESTION[2].type; // SHORT-ANSWER

const MultipleChoiceTemplateDetail: React.FC<TemplateProps> = ({
	initialFrom,
	initialTo,
	updateQuestionGroupInfoCallback,
}: TemplateProps) => {
	const [questionQuantity, setQuestionQuantity] = useState<number>(initialTo - initialFrom + 1);
	const [collapse, setCollapse] = useState<boolean>(false);

	return (
		<Col span={24}>
			<Typography.Title level={3} style={{ marginLeft: ".5rem", marginBottom: 0 }}>
				Question {initialFrom} - {initialTo}
			</Typography.Title>

			<MultipleChoiceInstruction from={initialFrom} to={initialTo} collapsed={collapse} />
			<div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
				{Array(questionQuantity)
					.fill(null)
					.map((_, index) => {
						return (
							<Col span={24} style={{ marginBottom: "1rem", paddingLeft: ".5rem" }}>
								<MultipleChoiceTypeDetail order={index + initialFrom} />
							</Col>
						);
					})}
			</div>
		</Col>
	);
};

export default MultipleChoiceTemplateDetail;
