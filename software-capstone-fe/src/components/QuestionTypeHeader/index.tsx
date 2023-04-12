import React from "react";
import { UpOutlined, DownOutlined, DeleteFilled } from "@ant-design/icons";
import { InputNumber } from "antd";
import styles from "./index.module.css";

interface QuestionTypeHeaderProps {
  typeOfQuestion: string;
  onQuantityUpdateCallback: (value: number | null) => void;
  onCollapseStatusUpdate: () => void;
  collapsed: boolean;
  questionQuantity: number;
}

const QuestionTypeHeader: React.FC<QuestionTypeHeaderProps> = ({
  typeOfQuestion,
  onQuantityUpdateCallback,
  onCollapseStatusUpdate,
  collapsed = false,
  questionQuantity
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
          defaultValue={questionQuantity}
          onChange={onQuantityUpdateCallback}
          className={`${styles["number-input"]}`}
          style={{ marginRight: "1rem" }}
          min={2}
        />
        <span>{typeOfQuestion}</span>
      </div>

      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <DeleteFilled />
        {collapsed ? (
          <DownOutlined onClick={onCollapseStatusUpdate} />
        ) : (
          <UpOutlined onClick={onCollapseStatusUpdate} />
        )}
      </div>
    </div>
  );
};

export default QuestionTypeHeader;
