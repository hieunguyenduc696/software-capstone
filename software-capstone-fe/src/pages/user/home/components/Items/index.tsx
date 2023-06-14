import React from "react";
import { Button, List, Typography } from "antd";
import styles from "./Items.module.css";
import { RightOutlined } from "@ant-design/icons";

const data = ["slide.png", "mock.png", "mock21.png", "mock22.jpg"];

const Items: React.FC = () => (
	<>
		<Typography.Title
			level={2}
			style={{
				margin: 0,
				textAlign: "center",
				textTransform: "uppercase",
			}}
		>
			Newest Ielts Tests
		</Typography.Title>
		<List
			style={{ marginTop: "1rem" }}
			grid={{
				gutter: 32,
				xs: 1,
				sm: 2,
				md: 2,
				lg: 4,
				xl: 4,
				xxl: 4,
			}}
			dataSource={data}
			renderItem={(item) => (
				<List.Item>
					<img
						className={styles["responsive-image"]}
						alt=""
						src={item}
						style={{ objectFit: "cover", borderRadius: ".5rem" }}
					/>
				</List.Item>
			)}
		/>
		<Button
			type="text"
			className={styles["btn-see-more"]}
			style={{
				textTransform: "uppercase",
				width: "100%",
				textAlign: "center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			See More <RightOutlined />
		</Button>
	</>
);

export default Items;
