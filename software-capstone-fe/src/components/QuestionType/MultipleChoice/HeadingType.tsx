import React, { useState } from "react";
import styles from "./index.module.css";
import { Select, Typography, Col, Table, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { TYPE_OF_QUESTION } from "services/QuestionTypeService";

const { Paragraph } = Typography;
const { TextArea } = Input;

interface ISelect {
	onChange: (value: string) => void;
	defaultValue: string | null;
}

const MappingHeadingSelect: React.FC<ISelect> = ({ onChange, defaultValue }: ISelect) => {
	const options = [];

	for (let i = 65; i <= 90; i++) {
		const letter = String.fromCharCode(i);
		options.push({ value: letter, label: letter });
	}

	return (
		<Select
			className={`${styles.select}`}
			defaultValue={options[0].value}
			options={options}
		/>
	);
};

interface HeadingTypeProps {
	letter: string;
}

const TYPE = TYPE_OF_QUESTION[3].type;

const HeadingType: React.FC<HeadingTypeProps> = ({
	letter,
}: HeadingTypeProps) => {

	const [question, setQuestion] = useState("Enter your statement here....");

	return (
		<Col
			style={{ boxSizing: "border-box" }}
			className={styles.question}
		>
			<div className={styles.number}>{letter}</div>
			<Paragraph
				editable={{
					icon: <EditOutlined />,
					tooltip: "click to edit text",
					onChange: setQuestion,
					enterIcon: null,
				}}
				className={`${styles.paragraph}`}
			>
				{question}
			</Paragraph>
		</Col>
	);
};

export default HeadingType;