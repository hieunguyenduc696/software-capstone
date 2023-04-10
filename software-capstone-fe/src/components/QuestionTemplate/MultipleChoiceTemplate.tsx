import React, { useState } from "react";
import QuestionTypeHeader from "components/QuestionTypeHeader";
import { Col } from "antd";
import { DEFAULT_NUMBER_OF_QUESTION, TYPE_OF_QUESTION, QuestionGroupInfo, updateQuestionGroupInfo } from "services/animeService/QuestionTypeService";
import TemplateProps from "./TemplateInterface";
import MultipleChoiceInstruction from "components/Instruction/MultipleChoiceInstruction/MultipleChoiceInstruction";
import MultipleChoiceType from "components/QuestionType/MultipleChoice/MultipleChoiceType";

const TYPE = TYPE_OF_QUESTION[2].type; // SHORT-ANSWER

const MultipleChoiceTemplate: React.FC<TemplateProps> = ({ initialFrom, initialTo, updateQuestionGroupInfoCallback }: TemplateProps) => {
    const [questionQuantity, setQuestionQuantity] = useState<number>(DEFAULT_NUMBER_OF_QUESTION);
    const [collapse, setCollapse] = useState<boolean>(false);

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

    return (
        <Col span={24}>
            <QuestionTypeHeader
                typeOfQuestion="Multiple Choice"
                onQuantityUpdateCallback={handleQuestionQuantityUpdate}
                collapsed={collapse}
                onCollapseStatusUpdate={handleCollapseStatusChange}
            />

            <MultipleChoiceInstruction
                from={initialFrom}
                to={initialTo}
                collapsed={collapse}
            />
            <div style={{ width: "inherit", display: collapse ? "none" : "block" }}>
                {Array(questionQuantity)
                    .fill(null)
                    .map((_, index) => {
                        return <Col span={24} style={{ marginBottom: '1rem', paddingLeft: '.5rem' }}>
                            <MultipleChoiceType order={index + initialFrom} />
                        </Col>
                    })}
            </div>
        </Col>
    );
};

export default MultipleChoiceTemplate;
