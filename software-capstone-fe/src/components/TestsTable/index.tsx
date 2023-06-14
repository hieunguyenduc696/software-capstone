import { Pagination, Table } from "antd";
import { styled } from "styled-components";

import { Image, Space } from "antd";
import type { ColumnsType } from "antd/es/table";

const StyledTable = styled(Table)`
  .ant-pagination .ant-pagination-item {
    font-weight: 600;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-pagination .ant-pagination-item-active {
    font-weight: 600;
    background-color: #ffffff;
    border-color: #1677ff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledPagination = styled(Pagination)`

  .ant-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .ant-pagination-item .ant-pagination-item-active" {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
  }

  .ant-pagination .ant-pagination-item {
    font-weight: 600;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-pagination .ant-pagination-item-active {
    font-weight: 600;
    background-color: #ffffff;
    border-color: #1677ff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export interface DataType {
  image: string;
  title: string;
  reading: number;
  listening: number;
  publishDay: string;
  actions: any[];
}

export const TestField: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "image",
    key: "image",
    render: (item) => (
      <Image
        src={item || "default.png"}
        style={{ height: "50px" }}
        preview={false}
      />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (item) => item,
  },
  {
    title: "Reading",
    dataIndex: "reading",
    key: "reading",
    render: (item) => (item ? `${item} test` : "-"),
  },
  {
    title: "Listening",
    dataIndex: "listening",
    key: "listening",
    render: (item) => (item ? `${item} test` : "-"),
  },
  {
    title: "Publish Day",
    key: "publishDay",
    dataIndex: "publishDay",
    render: (item) => item || "-",
  },
  {
    title: "",
    key: "action",
    render: (_, { actions }) => (
      <Space>
        {actions.map((act) => {
          return act;
        })}
      </Space>
    ),
  },
];

export default StyledTable;
