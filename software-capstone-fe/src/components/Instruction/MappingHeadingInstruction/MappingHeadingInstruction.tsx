import React, { useState } from "react";
import { Typography, Col } from "antd";
import styles from './index.module.css';

const { Paragraph, Text } = Typography;

interface MappingHeadingInstructionProps {
    letterFrom: string;
    letterTo: string;
    questionFrom: number;
    questionTo: number;
}
const MappingHeadingInstruction: React.FC<MappingHeadingInstructionProps> = ({
    letterFrom,
    letterTo,
    questionFrom,
    questionTo
}: MappingHeadingInstructionProps) => {
    return (
        <Col span={24} className={`${styles.container}`}>
            <Paragraph className={`${styles.paragraph}`}>
                Look at the following people (Questions 27-33) and the list of statements below.
            </Paragraph>
            <Paragraph className={`${styles.paragraph}`}>
                Match each person with the correct statement.
            </Paragraph>
            <Paragraph className={`${styles.paragraph}`}>
                Write the correct letter
                <Text className={`${styles.paragraph} ${styles.text}`}> {letterFrom}-{letterTo} </Text>
                in boxes
                <Text className={`${styles.paragraph} ${styles.text}`}> {questionFrom}-{questionTo} </Text>
                on your answer sheet.
            </Paragraph>
        </Col>
    );
};
export default MappingHeadingInstruction;