import React from "react";
import { Table, Col, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import styles from './index.module.css';

interface DataType {
  type: string;
  condition: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "TYPE",
    dataIndex: "type",
    key: "type",
    render: (text) => <Typography.Text strong style={{fontSize: "16px"}}>{text}</Typography.Text>
  },
  {
    title: "CONDITION",
    dataIndex: "condition",
    key: "condition",
    render: (text) => <Typography.Text style={{fontSize: "16px"}} className={`${styles.paragraph}`}>{text}</Typography.Text>
  },
];

const data: DataType[] = [
  {
    type: "TRUE",
    condition: "if the statement agrees with the information",
  },
  {
    type: "FALSE",
    condition: "if the statement contradicts with the information",
  },
  {
    type: "NOT GIVEN",
    condition: "if there is no information on this",
  },
];

const InstructionTable: React.FC = () => {
  return (
    <Col span={24}>
      <Table showHeader={false} dataSource={data} columns={columns} pagination={false}/>
    </Col>
  );
};

export default InstructionTable;
