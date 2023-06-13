import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Image,
  Input,
  Row,
  Spin,
  Typography,
  message
} from "antd";
import { AppHeader } from "components";
import StyledTable, { DataType, TestField } from "components/TestsTable";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getTestList, getTestWithID } from "services/AdminService";

const DEFAULT_SIZE = 5;

export function Tests() {
  const navigate = useNavigate();
  const [testList, setTestList] = useState<any[]>();
  const [total, setTotal] = useState();
  const isFirstRenderRef = useRef(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState<string>();

  const [loading, setLoading] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [messageApi, contextHolder] = message.useMessage();

  const navigateToTestDetail = async (id: number) => {

    // const res = await getTestWithID({ ID: id });
    // console.log('TEST DETAIL: ',res);

    navigate(`/tests/detail/${id}/reading`);
  }

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
              onClick={() => navigateToTestDetail(test?.test_id)}
            />,
          ],
        };

        return testData;
      });

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

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);

    if (e.target.value.length === 0) {
      fetchTestList();
    }
  }

  const handleSearch = () => {
    const filteredTests = testList?.filter((test) => {
      return test?.title.includes(searchText);
    })

    if (filteredTests?.length !== 0) {
      setTestList(filteredTests);
    } else {
      messageApi.open({
        type: 'error',
        content: `${searchText} is not found`
      })
    }
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <AppHeader />
      {contextHolder}
      <div style={{ width: "100%", backgroundColor: "#f5f5f5" }}>
        <Row style={{ width: "80%", margin: "auto", padding: "1rem 0" }}>
          <Col span={24}>
            <Input
              placeholder="Find IELTS test"
              suffix={
                <Image
                  src="/search.png"
                  alt=""
                  preview={false}
                  style={{ width: "26px", height: "26px", cursor: "pointer" }}
                  onClick={handleSearch}
                />
              }
              style={{ width: "100%" }}
              value={searchText}
              onChange={handleSearchChange}
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
      </div>
    </div>
  );
}
