import React from "react";
import styles from "./index.module.css";
import { Row, Col, Tabs, Typography } from "antd";

const { Paragraph } = Typography;

interface MultipleCjoiceInstructionProps {
    from: number;
    to: number;
    collapsed: boolean;
}

const MultipleChoiceInstruction: React.FC<MultipleCjoiceInstructionProps> = ({
    from,
    to,
    collapsed = false,
}: MultipleCjoiceInstructionProps) => {
    return (
        <Col
            span={24}
            className={styles.container}
            style={{ display: collapsed ? "none" : "block" }}
        >
            <Paragraph className={`${styles.paragraph}`}>
                Answer the questions below.
            </Paragraph>

            <Paragraph className={`${styles.paragraph}`} style={{ width: "100%" }}>
                Choose the correct letter <span style={{ fontWeight: 'bold' }}>A, B, C,...</span>
            </Paragraph>

            <Paragraph className={`${styles.paragraph}`}>
                Write your answers in{" "}
                <span className={`${styles.paragraph} ${styles.limit}`}>
                    boxes {from}-{to}
                </span>{" "}
                on your answer sheet.
            </Paragraph>
        </Col>
    );
};

export default MultipleChoiceInstruction;
