import { Button, Col, Divider, Image, Input, Row, Typography, message, Spin } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { AppHeader } from "components";
import { useNavigate } from "react-router";
import StyledTable from "components/TestsTable";
import { LoadingOutlined } from "@ant-design/icons";
import { getTestList } from "services/AdminService";
import type { ColumnsType } from "antd/es/table";
import Footer from "components/Footer";

// table config
interface DataType {
	image: string;
	title: string;
	reading: any;
	listening: any;
	publishDay: string;
}
const DEFAULT_SIZE = 5;

export function UserTests() {
	const navigate = useNavigate();
	const [testList, setTestList] = useState<any[]>();
	const [total, setTotal] = useState();
	const isFirstRenderRef = useRef(true);
	const [pageNumber, setPageNumber] = useState(1);
	const [searchText, setSearchText] = useState<string>();

	const [loading, setLoading] = useState(true);
	const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	const [messageApi, contextHolder] = message.useMessage();

	const navigateToTest = async (id: number) => {
		navigate(`/user-test/${id}/reading`);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: "",
			dataIndex: "image",
			key: "image",
			render: (item) => (
				<Image src={item || "default.png"} style={{ height: "50px" }} preview={false} />
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
			align: "center",
			render: (item) => (
				<Button
					style={{
						textTransform: "uppercase",
						backgroundColor: "#5CB1C5",
						border: "none",
						color: "white",
						boxShadow: "4px 4px 4px 0 rgba(0, 0, 0, .25)",
					}}
					onClick={() => navigateToTest(item)}
				>
					Take test
				</Button>
			),
		},
		{
			title: "Listening",
			dataIndex: "listening",
			key: "listening",
			align: "center",
			render: (item) => "-",
		},
		{
			title: "Publish Day",
			key: "publishDay",
			dataIndex: "publishDay",
			align: "center",
			render: (item) => item || "-",
		},
	];

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
					reading: test?.test_id,
					listening: 0,
					publishDay: "10/06/2023",
				};

				console.log(testData);
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
	};

	const handleSearch = () => {
		const filteredTests = testList?.filter((test) => {
			return test?.title.includes(searchText);
		});

		if (filteredTests?.length !== 0) {
			setTestList(filteredTests);
		} else {
			messageApi.open({
				type: "error",
				content: `${searchText} is not found`,
			});
		}
	};

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
									src="search.png"
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
				</div>
				<StyledTable
					columns={columns}
					dataSource={testList}
					style={{ marginTop: "1rem" }}
					loading={{ spinning: loading, indicator: <Spin indicator={antIcon} /> }}
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
