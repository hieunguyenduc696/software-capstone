import React from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import styles from "./index.module.css";

interface QuestionTypeHeaderProps {
  typeOfQuestion: string;
  onQuantityUpdateCallback: (value: number | null) => void;
  onCollapseStatusUpdate: () => void;
  collapsed: boolean;
}

const QuestionTypeHeader: React.FC<QuestionTypeHeaderProps> = ({
  typeOfQuestion,
  onQuantityUpdateCallback,
  onCollapseStatusUpdate,
  collapsed = false
}: QuestionTypeHeaderProps) => {
  return (
    <div
      className={styles.questionHeader}
      style={{ backgroundColor: "var(--mainColor)" }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <InputNumber
          defaultValue={3}
          onChange={onQuantityUpdateCallback}
          className={`${styles["number-input"]}`}
          style={{ marginRight: "1rem" }}
          min={2}
        />
        <span>{typeOfQuestion}</span>
      </div>
      { collapsed ? <DownOutlined onClick={onCollapseStatusUpdate}/> : <UpOutlined onClick={onCollapseStatusUpdate} />}
      
    </div>
  );
};

export default QuestionTypeHeader;
