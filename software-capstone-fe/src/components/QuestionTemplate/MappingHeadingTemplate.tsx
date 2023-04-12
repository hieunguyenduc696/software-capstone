import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import HeadingType from "components/QuestionType/MultipleChoice/HeadingType";
import MappingHeadingInstruction from "components/Instruction/MappingHeadingInstruction/MappingHeadingInstruction";
import { Col, InputNumber } from "antd";
import { DEFAULT_NUMBER_OF_QUESTION, TYPE_OF_QUESTION, QuestionGroupInfo, updateQuestionGroupInfo } from "services/QuestionTypeService";
import TemplateProps from "./TemplateInterface";
import AlphabetHeadingType from "components/QuestionType/MultipleChoice/AlphabetHeadingType";

const TYPE = TYPE_OF_QUESTION[3].type; // MAPPING-HEADING

const MappingHeadingTemplate: React.FC<TemplateProps> = ({ initialFrom, initialTo, updateQuestionGroupInfoCallback }: TemplateProps) => {
  const [questionQuantity, setQuestionQuantity] = useState<number>(initialTo - initialFrom + 1);
  const [collapse, setCollapse] = useState<boolean>(false);

  const [templateDetails, setTemplateDetails] = useState<any>([]);
  const [letters, setLetters] = useState(
    [
      { value: "A", label: "A" },
      { value: "B", label: "B" },
      { value: "C", label: "C" },
      { value: "D", label: "D" },
      { value: "E", label: "E" },
      { value: "F", label: "F" },
      { value: "G", label: "G" },
      { value: "H", label: "H" },
    ]
  );
  const [headingQuantity, setHeadingQuantity] = useState<number>(2);

  const handleCollapseStatusChange = () => {
    setCollapse((prev: boolean) => !prev);
  };

  const handleQuestionQuantityUpdate = (value: number | null) => {
    if (value) {
      setQuestionQuantity(value);
      updateQuestionGroupInfoCallback((prev: QuestionGroupInfo[]) => {

        const newQuestionGroupInfo = prev.map((item: QuestionGroupInfo) => {
          if (item.type === TYPE) {
            const updated = {
              ...item,
              to: initialFrom + value - 1,
            }
            return updated;
          }
          return item;
        })
        const updatedQuestionGroupInfo = updateQuestionGroupInfo(newQuestionGroupInfo);

        return updatedQuestionGroupInfo;
      })
    }
  };

  const handleHeadingQuantityChange = (e: any) => {
    setHeadingQuantity(e || 3);
    // setQuatityChoices(e || 3);
    // setQuestionDetails((prev: IQuestionDetail[]) => {
    //   return prev?.map((item: IQuestionDetail) => {
    //     if (item?.order === order) {
    //       return {
    //         ...item,
    //         type: TYPE,
    //         options: {
    //           ...options,
    //           quantity: e || 3,
    //         },
    //       };
    //     }
    //     return item;
    //   });
    // });
  };

  return (
    <Col span={24}>
      <QuestionTypeHeader
        typeOfQuestion="Mapping Heading"
        // count its own number of question
        questionQuantity={questionQuantity}
        onQuantityUpdateCallback={handleQuestionQuantityUpdate}
        collapsed={collapse}
        onCollapseStatusUpdate={handleCollapseStatusChange}
      />

      <MappingHeadingInstruction
        letterFrom="A"
        letterTo="H"
        questionFrom={initialFrom}
        questionTo={initialTo}
        collapsed={collapse}
      />

      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(questionQuantity)
          .fill(null)
          .map((_, index) => {
            return <AlphabetHeadingType order={index + initialFrom} letterList={letters} />;
          })}
      </div>

      <p style={{ margin: "10px", display: collapse ? "none" : "block" }}>List of Headings</p>
      <InputNumber
        defaultValue={3}
        style={{ margin: "0.5rem" }}
        min={2}
        max={26}
        onChange={handleHeadingQuantityChange}
      />

      <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
        {Array(headingQuantity)
          .fill(null)
          .map((_, index) => {
            return <HeadingType letter={(index + 10).toString(36).toUpperCase()} />;
          })}
      </div>
    </Col>
  );
};

export default MappingHeadingTemplate;