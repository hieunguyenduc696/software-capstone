import React, { useState } from "react";
import { Typography, Col } from "antd";
import styles from './index.module.css';
import InstructionTable from "./InstructionTable";

const { Paragraph, Text } = Typography;

interface TrueFalseInstructionProps {
  from: number;
  to: number;
}

const TrueFalseInstruction: React.FC<TrueFalseInstructionProps> = ({
  from,
  to,
}: TrueFalseInstructionProps) => {
  return (
    <Col span={24} className={`${styles.container}`}>
      <Paragraph className={`${styles.paragraph}`}>
        Do the following statements agree with the information given in Reading
        Passage 1?
      </Paragraph>
      <Paragraph className={`${styles.paragraph}`}>
        In <Text className={`${styles.paragraph} ${styles.text}`}>
            boxes {from}-{to}
        </Text> on your answer sheet, write
      </Paragraph>

      <InstructionTable/>
    </Col>
  );
};

export default TrueFalseInstruction;
