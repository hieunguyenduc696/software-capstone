import React, { useState } from "react";
import styles from "./index.module.css";
import { Select, Typography, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const MappingHeadingSelect = () => {
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

interface MappingHeadingTypeProps {
	letter: string;
}

const MappingHeadingType: React.FC<MappingHeadingTypeProps> = ({
	letter,
}: MappingHeadingTypeProps) => {

	const [question, setQuestion] = useState("Enter your question here....");

	return (
		<Col
			span={24}
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

export default MappingHeadingType;