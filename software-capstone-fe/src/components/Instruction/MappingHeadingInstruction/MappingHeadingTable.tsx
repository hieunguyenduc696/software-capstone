import React from "react";
import { Table, Col, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import styles from './index.module.css';
import AlphabetType from "components/QuestionType/MultipleChoice/AlphabetType";

interface DataType {
  letter: string;
  statement: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "LETTER",
    dataIndex: "letter",
    key: "letter",
    render: (text) => <Typography.Text strong style={{ fontSize: "16px" }}>{text}</Typography.Text>
  },
  {
    title: "STATEMENT",
    dataIndex: "statement",
    key: "statement",
    render: (text) => <Typography.Text style={{ fontSize: "16px" }} className={`${styles.paragraph}`}>{text}</Typography.Text>
  },
];

const data: DataType[] = [
  {
    letter: "A",
    statement: "believes that the benefits of the sun are not scientifically provable",
  },
  {
    letter: "B",
    statement: "claims to have discovered the vitamin released in the skin by the sun",
  },
  {
    letter: "C",
    statement: "suggests that the sun is an excellent healer",
  },
  {
    letter: "D",
    statement: "invented the first sunscreen",
  },
  {
    letter: "E",
    statement: "suggests that the sun assists with common illnesses",
  },
  {
    letter: "F",
    statement: "thinks that initially, the sun is of benefit to the body",
  },
  {
    letter: "G",
    statement: "is unsure about the benefits of the sun",
  },
  {
    letter: "H",
    statement: "thinks the location is very important in maximizing the benefit from the sun",
  },
];

const InstructionTable: React.FC = () => {
  return (
    <Col span={24}>
      <Table showHeader={false} dataSource={data} columns={columns} pagination={false}/>
      {/* Editable table */}
    </Col>
  );
};

export default InstructionTable;