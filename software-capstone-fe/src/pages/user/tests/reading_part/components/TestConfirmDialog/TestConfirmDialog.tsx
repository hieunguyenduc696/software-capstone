import React, { useState } from "react";
import { Button, Image, Modal, Typography } from "antd";
import { useNavigate } from "react-router";

interface PropsType {
	open: boolean;
	setOpen: any;
	answersKey: String[];
	time: number;
	userAnswers: String[];
}

const TestConfirmModal: React.FC<PropsType> = ({
	open,
	setOpen,
	answersKey,
	time,
	userAnswers,
}: PropsType) => {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			localStorage.setItem("answersKey", JSON.stringify(answersKey));
			localStorage.setItem("time", time + "");
			localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
			navigate(`/result/8`);
			setConfirmLoading(false);
		}, 500);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<Modal
			open={open}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			width={300}
			footer={null}
		>
			<div style={{ display: "flex", justifyContent: "center", marginBottom: ".5rem" }}>
				<Image src="./../../reading_icon.png" />
			</div>
			<Typography.Title level={5} style={{ textAlign: "center" }}>
				Confirm submit your test?
			</Typography.Title>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Button
					type="primary"
					onClick={() => setOpen(false)}
					style={{
						color: "white",
						backgroundColor: "#9A9494",
						textTransform: "uppercase",
						padding: "0 2rem",
					}}
				>
					Cancel
				</Button>
				<Button
					type="primary"
					onClick={handleSubmit}
					style={{
						color: "white",
						backgroundColor: "#5196A5",
						textTransform: "uppercase",
						padding: "0 2rem",
					}}
				>
					Submit
				</Button>
			</div>
		</Modal>
	);
};

export default TestConfirmModal;
