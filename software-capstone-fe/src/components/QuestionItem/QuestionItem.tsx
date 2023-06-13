import React from "react";
import Icon from "@ant-design/icons";
import styles from "./index.module.css";

interface QuestionItemProps {
  icon: string;
  type: string;
  firstLine: string;
  secondLine: string;
  addTemplateCallback: (value: string) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  icon,
  firstLine,
  secondLine,
  type,
  addTemplateCallback,
}: QuestionItemProps) => {

  const handleClick = () => {
    addTemplateCallback(type);
  };

  return (
    <div className={`${styles["question-item"]}`} onClick={handleClick}>
      <Icon
        component={() => (
          <img style={{ width: "30px", height: "30px", marginRight: "3px" }} src={`/${icon}`} />
        )}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <span>{firstLine}</span>
        <span>{secondLine}</span>
      </div>
    </div>
  );
};

export default QuestionItem;
