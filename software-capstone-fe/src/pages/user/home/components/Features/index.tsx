import { List, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";

function Features() {
	const data = ["slide.png", "mock21.png", "mock22.jpg"];
	const navigate = useNavigate();

	return (
		<>
			<Typography.Title
				level={2}
				style={{
					margin: 0,
					textAlign: "center",
					textTransform: "uppercase",
				}}
			>
				Our Ielts Futures
			</Typography.Title>
			<List
				style={{ marginTop: "1rem", paddingInline: "2rem" }}
				grid={{
					gutter: 42,
					xs: 1,
					sm: 2,
					md: 2,
					lg: 3,
					xl: 3,
					xxl: 3,
				}}
				dataSource={data}
				renderItem={(item, index) => (
					<List.Item
						key={index}
						style={{ cursor: "pointer" }}
						onClick={() => navigate("user-tests")}
					>
						<div>
							<img
								alt=""
								width={"100%"}
								height={320}
								src={`${item}`}
								style={{ objectFit: "cover" }}
							/>
							<Typography.Title level={3} style={{ textAlign: "center", margin: 0 }}>
								Reading Tests
							</Typography.Title>
							<Typography.Text style={{ textAlign: "center" }}>
								Lorem Ipsum is simply dummy text of the printing and typesetting
								industry. Lorem Ipsum has been the industry's standard dummy text
								ever since the 15
							</Typography.Text>
						</div>
					</List.Item>
				)}
			/>
		</>
	);
}

export default Features;
