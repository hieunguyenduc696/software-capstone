import { useState } from "react";
import classes from "./AppHeader.module.less";
import { Avatar, Button, Col, Image, Layout, Menu, Row } from "antd";
import { useAuth } from "hooks/useAuth";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { useKeycloak } from "@react-keycloak/web";
import type { KeycloakTokenParsed } from "keycloak-js";
import ROLE from "constant/role";

const StyledMenu = styled(Menu)`
	.ant-menu-title-content {
		&:hover {
			text-decoration: none !important;
			color: #fff;
		}
	}
`;

type ParsedToken = KeycloakTokenParsed & {
	email?: string;

	preferred_username?: string;

	given_name?: string;

	family_name?: string;
};

export const AppHeader = () => {
	const [langDropdownVisible, setLangDropdownVisibleVisible] = useState<boolean>(false);
	const { userProfile } = useAuth();
	const { keycloak, initialized } = useKeycloak();
	const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed;

	const username = `${parsedToken?.given_name ?? ""} ${parsedToken?.family_name ?? ""}`;

	const role = parsedToken
		? parsedToken.realm_access?.roles?.includes("ADMINISTRATOR") === true
			? "ADMINISTRATOR"
			: "USER"
		: "";

	const navigate = useNavigate();

	console.log(parsedToken?.realm_access?.roles);

	const items: MenuProps["items"] =
		role === "ADMINISTRATOR"
			? [
					{
						label: "IELTS Test",
						key: "test",
						children: [
							{
								label: "New Test",
								key: "test:1",
								onClick: () => navigate("/new-test"),
							},
							{
								label: "IELTS Library",
								key: "test:2",
								onClick: () => navigate("/tests"),
							},
						],
					},
					{
						label: "User Accounts",
						key: "user",
						children: [
							{
								label: "Login",
								key: "login",
								onClick: () => {
									if (!keycloak.authenticated) {
										keycloak.login();
									}
								},
								disabled: keycloak.authenticated === true,
							},
							{
								label: "Logout",
								key: "logout",
								onClick: () => {
									if (!!keycloak.authenticated) {
										keycloak.logout();
									}
								},
								disabled: keycloak.authenticated !== true,
							},
						],
					},
			  ]
			: [
					{
						label: "IELTS Test",
						key: "test",
						children: [
							{
								label: "IELTS Reading",
								key: "test:2",
								onClick: () => navigate("/user-tests"),
							},
							{
								label: "IELTS Listening",
								key: "test:1",
								disabled: true,
							},
						],
					},
					{
						label: "User Accounts",
						key: "user",
						children: [
							{
								label: "Login",
								key: "login",
								onClick: () => {
									if (!keycloak.authenticated) {
										keycloak.login();
									}
								},
								disabled: keycloak.authenticated === true,
							},
							{
								label: "Logout",
								key: "logout",
								onClick: () => {
									if (!!keycloak.authenticated) {
										keycloak.logout();
									}
								},
								disabled: keycloak.authenticated !== true,
							},
						],
					},
			  ];

	const [current, setCurrent] = useState("mail");

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<>
			<Layout.Header
				className={classes["top-header"]}
				style={{
					backgroundColor: "var(--mainColor)",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					height: "72px",
					borderBottom: "2px solid var(--mainGrayColor)",
					position: "sticky",
					top: 0,
					left: 0,
					zIndex: 1000,
				}}
			>
				<Row style={{ width: "100%" }}>
					<Col xs={{ span: 12, order: 2 }} lg={{ span: 7, order: 1 }}>
						<div
							style={{
								display: "flex",
								gap: 5,
								marginRight: "3rem",
								cursor: "pointer",
							}}
							onClick={() => {
								navigate("/");
							}}
						>
							<span
								style={{
									color: "white",
									fontSize: "32px",
								}}
							>
								IELTS
							</span>
							<Image src="../../../sword.png" height={42} preview={false} />
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div
									style={{
										color: "white",
										fontSize: "32px",
									}}
								>
									Warrior
								</div>
								{role === "ADMINISTRATOR" && (
									<div
										style={{
											color: "white",
											fontSize: "15px",
											lineHeight: 0.5,
											textAlign: "right",
										}}
									>
										Admin tools
									</div>
								)}
							</div>
						</div>
					</Col>

					<Col xs={{ span: 0, order: 4 }} lg={{ span: 13, order: 2 }}>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
								height: "100%",
							}}
						>
							<StyledMenu
								onClick={onClick}
								selectedKeys={[current]}
								items={items}
								mode="horizontal"
								style={{
									backgroundColor: "transparent",
									color: "white",
									flexGrow: 1,
									borderBottom: "none",
								}}
							/>
						</div>
					</Col>
					<Col xs={{ span: 11, order: 3 }} lg={{ span: 4, order: 4 }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 5,
								cursor: "pointer",
								justifyContent: "flex-end",
							}}
						>
							{!keycloak.authenticated && (
								<div>
									<Button ghost style={{ marginRight: ".5rem" }}>
										Register
									</Button>
									<Button
										onClick={() => {
											if (!keycloak.authenticated) {
												keycloak.login();
											}
										}}
									>
										Login
									</Button>
								</div>
							)}
							{!!keycloak.authenticated && (
								<>
									<Avatar src={"/avatar.png"} size={50} />
									<div style={{ display: "flex", flexDirection: "column" }}>
										<div style={{ color: "white", fontSize: "15px" }}>
											{username}
										</div>
										<div style={{ color: "white", fontSize: "15px" }}>
											{role.toLowerCase()}
										</div>
									</div>
								</>
							)}
						</div>
					</Col>
				</Row>
			</Layout.Header>
		</>
	);
};

const popupContainer = () => document.getElementById("header-user") as HTMLElement;

export default AppHeader;
