import React, { useState } from "react";
import styles from "./index.module.css";
import { Select, Typography, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

interface AlphabetHeadingSelectProps {
	letterList: { value: string; label: string; }[]
}

const AlphabetHeadingSelect = ({letterList}: AlphabetHeadingSelectProps) => {
	return (
		<Select
			className={`${styles.select}`}
			defaultValue={letterList[0].value}
			options={letterList}
		/>
	);
};

interface AlphabetHeadingTypeProps {
	order: number;
    letterList: { value: string; label: string; }[]
}

const AlphabetHeadingType: React.FC<AlphabetHeadingTypeProps> = ({
	order, letterList
}: AlphabetHeadingTypeProps) => {

	const [question, setQuestion] = useState("Enter your question here....");

	return (
		<Col
			span={24}
			style={{ boxSizing: "border-box" }}
			className={styles.question}
		>
			<div className={styles.number}>{order}</div>
			<AlphabetHeadingSelect letterList={letterList}/>
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

export default AlphabetHeadingType;
