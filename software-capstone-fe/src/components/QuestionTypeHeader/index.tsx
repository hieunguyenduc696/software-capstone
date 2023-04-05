import React from 'react';
import { UpOutlined } from '@ant-design/icons';
import { InputNumber } from "antd";
import styles from './index.module.css';

interface QuestionTypeHeaderProps {
    typeOfQuestion: string;
}

const QuestionTypeHeader: React.FC<QuestionTypeHeaderProps> = ({ typeOfQuestion }: QuestionTypeHeaderProps) => {

    const onNumberChange = (value: number | null) => {
        console.log(value);
    }

    return (
      <div
        className={styles.questionHeader}
        style={{ backgroundColor: "var(--mainColor)" }}
      >
        <div style={{width: "50%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
          <InputNumber
            defaultValue={3}
            onChange={onNumberChange}
            className={`${styles["number-input"]}`}
            style={{marginRight: "1rem"}}
          />
          <span>{typeOfQuestion}</span>
        </div>
        <UpOutlined />
      </div>);
};

export default QuestionTypeHeader;