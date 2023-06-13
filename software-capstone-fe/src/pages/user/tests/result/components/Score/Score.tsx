import { Typography } from "antd";
import React from "react";

function Score({ time, answersKey, userAnswers }: any) {
	const correctNumber = (() => {
		let count = 0;
		for (let i = 0; i < answersKey.length; i++) {
			if (userAnswers[i] === answersKey[i]) count++;
		}
		return count;
	})();

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	return (
		<div
			style={{
				borderTop: "1px solid #D9D9D9",
				borderRadius: "60px 60px 0 0",
				backgroundColor: "white",
				padding: "1rem",
			}}
		>
			<div>
				<img
					alt=""
					src="../avatar.png"
					style={{
						borderRadius: "50%",
						width: 64,
						height: 64,
						objectFit: "cover",
						margin: "auto",
						display: "block",
					}}
				/>
				<p style={{ color: "#9A9494", textAlign: "center" }}>Nam Pham Son</p>
				<Typography.Title
					level={2}
					style={{
						textAlign: "center",
						margin: ".5rem 0",
						backgroundColor: "white",
					}}
				>
					Your score is:
				</Typography.Title>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						width: "80%",
						margin: "auto",
					}}
				>
					<div
						style={{
							width: 155,
							height: 155,
							borderRadius: "50%",
							border: "5px solid #5196A5",
						}}
					>
						<div style={{ transform: "translateY(52%)" }}>
							<Typography.Title
								level={5}
								style={{ color: "#9A9494", textAlign: "center" }}
							>
								Correct Answers:
							</Typography.Title>
							<Typography.Title
								level={2}
								style={{ color: "#6ABFD2", textAlign: "center", margin: 0 }}
							>
								{`${correctNumber}/${answersKey.length}`}
							</Typography.Title>
						</div>
					</div>
					<div
						style={{
							width: 180,
							height: 180,
							borderRadius: "50%",
							border: "5px solid #5196A5",
							backgroundColor: "#6ABFD2",
						}}
					>
						<div style={{ transform: "translateY(70%)" }}>
							<Typography.Title
								level={1}
								style={{
									color: "white",
									textAlign: "center",
									margin: 0,
									fontSize: "3.5rem",
								}}
							>
								{`${(correctNumber / answersKey.length) * 9}`}
							</Typography.Title>
						</div>
					</div>
					<div
						style={{
							width: 155,
							height: 155,
							borderRadius: "50%",
							border: "5px solid #5196A5",
						}}
					>
						<div style={{ transform: "translateY(52%)" }}>
							<Typography.Title
								level={5}
								style={{ color: "#9A9494", textAlign: "center" }}
							>
								Time spent:
							</Typography.Title>
							<Typography.Title
								level={2}
								style={{ color: "#6ABFD2", textAlign: "center", margin: 0 }}
							>
								{minutes.toString().padStart(2, "0")}:
								{seconds.toString().padStart(2, "0")}
							</Typography.Title>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Score;
