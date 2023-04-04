import React from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Typography } from "antd";

const { Paragraph } = Typography;

interface ShortAnswerInstructionProps {
    from: number;
    to: number;
}

const ShortAnswerInstruction: React.FC<ShortAnswerInstructionProps> = ({ from, to }: ShortAnswerInstructionProps) => {

    return (
        <Col span={24} className={styles.container}>
              <Paragraph className={`${styles.paragraph}`} >
                Answer the questions below.
              </Paragraph>

              <Paragraph className={`${styles.paragraph}`} style={{width: '100%'}}>
                Choose <span className={`${styles.paragraph} ${styles.important}`}>NO MORE THAN THREE WORDS</span> from the passage for each answer:
              </Paragraph>

              <Paragraph className={`${styles.paragraph}`}>
                Write your answers in <span className={`${styles.paragraph} ${styles.limit}`}>boxes {from}-{to}</span> on your answer sheet.
              </Paragraph>
            </Col>
    );
}

export default ShortAnswerInstruction;