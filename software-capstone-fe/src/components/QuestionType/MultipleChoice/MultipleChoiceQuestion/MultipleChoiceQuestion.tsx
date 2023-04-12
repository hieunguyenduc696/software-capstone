import { Avatar, Radio, RadioChangeEvent, Space, Typography } from "antd";
import { useState } from "react";

const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
];

interface Question {
    text: string;
    choices: string[];
}

interface MultipleChoiceQuestionProps {
    order: number
    question: Question;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ order, question }) => {
    const [value, setValue] = useState("");

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };
    return (
        <Space size={5} direction="vertical">
            <Avatar size={30} style={{ backgroundColor: '#327846' }}>{order}</Avatar>
            <Typography.Text >{question.text}</Typography.Text>
            <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                    {question.choices.map((choice, index) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar size={24} style={{ backgroundColor: '#DDDDDD', color: 'black', marginRight: '.2rem' }}>{options[index].value}</Avatar>
                            <Radio value={options[index].value}>
                                <Typography.Text>{choice}</Typography.Text>
                            </Radio>
                        </div>
                    ))}
                </Space>
            </Radio.Group>
            {/* <Typography.Text>Selected: {value}</Typography.Text> */}
        </Space>
    );
};

export default MultipleChoiceQuestion
