import { Avatar, Col, InputNumber, Radio, RadioChangeEvent, Row, Space, Tooltip, Typography } from "antd";
import { useRef, useState } from "react";
import styles from "./index.module.css";
import Icon from "@ant-design/icons";

const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
    { value: "F", label: "F" },
];

interface ChoicesType {
    [key: string]: any
}

interface MultipleChoiceProps {
    order: number
}

const MultipleChoiceType: React.FC<MultipleChoiceProps> = ({ order }) => {
    const [correctChoice, setCorrectChoice] = useState("");
    const [qualityChoices, setQualityChoices] = useState(3);
    const [choices, setChoices] = useState<ChoicesType>({});
    const [question, setQuestion] = useState<string>();
    const questionRef = useRef<HTMLInputElement>(null);

    const onChange = (e: RadioChangeEvent) => {
        setCorrectChoice(e.target.value || "");
    };

    const handleChoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChoices(pre => ({
            ...pre,
            [e.target.name]: e.target.value
        }));
    };

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (questionRef.current) {
            setQuestion(event.target.value);
        }
    };

    return (
        <Space size={5} direction="vertical" style={{ width: '100%' }}>
            <div
                style={{
                    width: "50%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}
            >
                <Avatar size={30} style={{ backgroundColor: '#327846', marginRight: '1rem' }}>{order}</Avatar>
                <InputNumber
                    defaultValue={3}
                    onChange={(e) => setQualityChoices(e || 3)}
                    className={`${styles["number-input"]}`}
                    style={{ marginRight: "1rem" }}
                    min={3}
                    max={6}
                />
                <span>Choices</span>
            </div>
            <Row>
                <Col span={18}>
                    <input
                        type="text"
                        required
                        ref={questionRef}
                        style={{
                            fontSize: "16px",
                            width: "100%",
                            backgroundColor: "transparent",
                            marginBottom: "10px",
                        }}
                        className={styles["ip-title"]}
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Enter the question"
                    />
                </Col>
                <Col span={6}>
                    <Icon
                        component={() => (
                            <Tooltip title="Add explanation">
                                <img style={{ width: "13px" }} src="quotation.png" />
                            </Tooltip>
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Radio.Group onChange={onChange} value={correctChoice} style={{ display: 'block', width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {Array(qualityChoices).fill(1).map((choice, index) => {
                                const key = options[index].value as string;
                                return (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar size={24} style={{ backgroundColor: '#DDDDDD', color: 'black', marginRight: '.2rem' }}>{key}</Avatar>
                                        <Radio value={options[index].value} style={{ width: '80%', alignItems: 'center' }} className={styles["radio"]}>
                                            <input
                                                name={key}
                                                type="text"
                                                required
                                                style={{
                                                    fontSize: "16px",
                                                    width: "100%",
                                                    backgroundColor: "transparent",
                                                }}
                                                className={styles["ip-title"]}
                                                value={choices[key]}
                                                onChange={handleChoiceChange}
                                                placeholder="Enter the choice for this question"
                                            />
                                        </Radio>
                                    </div>
                                )
                            })}

                        </Space>
                    </Radio.Group>
                </Col>
            </Row>

        </Space>
    );
};

export default MultipleChoiceType
