import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  Pagination,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { AppHeader } from "components";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router";
import StyledTable, { StyledPagination } from "components/TestsTable";
import { getTestList } from "services/AdminService";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { DataType, TestField } from "components/TestsTable";
import { logDOM } from "@testing-library/react";

const data: DataType[] = [
  {
    image: "",
    title: "IELTS Recent mock test 01",
    reading: 1,
    listening: 0,
    publishDay: "11/4/2023",
    actions: [
      <Image
        src="edit_fill.png"
        alt=""
        preview={false}
        style={{ height: "16px", cursor: "pointer" }}
      />,
    ],
  },
  {
    image: "",
    title: "IELTS Recent mock test 02",
    reading: 1,
    listening: 0,
    publishDay: "11/4/2023",
    actions: [
      <Image
        src="edit_fill.png"
        alt=""
        preview={false}
        style={{ height: "16px", cursor: "pointer" }}
      />,
    ],
  },
  {
    image: "",
    title: "IELTS Recent mock test 03",
    reading: 1,
    listening: 0,
    publishDay: "11/4/2023",
    actions: [
      <Image
        src="edit_fill.png"
        alt=""
        preview={false}
        style={{ height: "16px", cursor: "pointer" }}
      />,
    ],
  },
];

const DEFAULT_SIZE = 5;

export function Tests() {
  const navigate = useNavigate();
  const [testList, setTestList] = useState();
  const [total, setTotal] = useState();
  const isFirstRenderRef = useRef(true);
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, setLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const fetchTestList = async (pageNumber: number = 1) => {
    setLoading(true);
    const res = await getTestList({
      limit: DEFAULT_SIZE,
      page: pageNumber,
    });

    if (res?.code === 0) {
      const data = res?.data?.tests.map((test: any) => {
        const testData: DataType = {
          image: "",
          title: test?.title,
          reading: 1,
          listening: 0,
          publishDay: "10/06/2023",
          actions: [
            <Image
              src="edit_fill.png"
              alt=""
              preview={false}
              style={{ height: "16px", cursor: "pointer" }}
            />,
          ],
        };

        return testData;
      });

      console.log(data);

      setTestList(data);
    }

    if (isFirstRenderRef.current) {
      setTotal(res?.data?.total);
      isFirstRenderRef.current = false;
    }

    setLoading(false);
  };

  const handlePageNumberChange = (value: number) => {
    setPageNumber(value);
    fetchTestList(value);
  };

  useEffect(() => {
    fetchTestList();
  }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <AppHeader />
      <div style={{ width: "100%", backgroundColor: "#f5f5f5" }}>
        <Row style={{ width: "80%", margin: "auto", padding: "1rem 0" }}>
          <Col span={24}>
            <Input
              placeholder="Find IELTS test"
              suffix={
                <Image
                  src="search.png"
                  alt=""
                  preview={false}
                  style={{ width: "26px", height: "26px", cursor: "pointer" }}
                />
              }
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
      </div>
      <Divider style={{ margin: 0 }} />
      <div
        style={{
          width: "80%",
          margin: "auto",
          padding: "1rem 0",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            IELTS Test Library
          </Typography.Text>
          <Button
            icon={<PlusOutlined />}
            style={{ color: "white", backgroundColor: "#5CB1C5" }}
            onClick={() => navigate("/new-test")}
          >
            ADD IELTS TEST
          </Button>
        </div>

        {/* {!loading && (
         
        )} */}

        <StyledTable
          columns={TestField}
          dataSource={testList}
          style={{ marginTop: "1rem" }}
          loading={{ spinning: loading, indicator: <Spin indicator={antIcon} />}}
          pagination={{
            total: total,
            defaultPageSize: DEFAULT_SIZE,
            current: pageNumber,
            defaultCurrent: 1,
            onChange: handlePageNumberChange,
          }}
        />

        {/* {loading && (
          <div
            style={{
              width: "90%",
              height: "200px",
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Spin indicator={antIcon} />
          </div>
        )} */}
      </div>
    </div>
  );
}
