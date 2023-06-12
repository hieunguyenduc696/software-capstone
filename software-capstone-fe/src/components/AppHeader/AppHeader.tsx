import { useState } from "react";
import classes from "./AppHeader.module.less";
import { Avatar, Button, Col, Image, Layout, Menu, Row } from "antd";
import { useAuth } from "hooks/useAuth";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

const StyledMenu = styled(Menu)`
  .ant-menu-title-content {
    &:hover {
      text-decoration: none !important;
      color: #fff;
    }
  }
`;

export const AppHeader = () => {
  const [langDropdownVisible, setLangDropdownVisibleVisible] =
    useState<boolean>(false);
  // const { userProfile } = useAuth();
  const userProfile = {
    firstName: "Nam Sơn",
    lastName: "Phạm",
    role: "ADMIN"
    // role: ""
  }

  const username = `${userProfile?.firstName || ""} ${userProfile?.lastName || ""
    }`;

  const navigate = useNavigate();

  const items: MenuProps["items"] = userProfile?.role === "ADMIN" ? [
    {
      label: "IELTS Test",
      key: "test",
      children: [
        {
          label: "New Test",
          key: "test:1",
          onClick: () => navigate("/post-test"),
        },
        {
          label: "IELTS Library",
          key: "test:2",
          onClick: () => console.log("test:2"),
        },
      ],
    },
    {
      label: "User Acounts",
      key: "user",
      children: [
        {
          label: "New Account",
          key: "account:1",
        },
        {
          label: "User Accounts",
          key: "account:2",
        },
      ],
    },
  ] : [
    {
      label: "IELTS Test",
      key: "test",
      children: [
        {
          label: "New Test",
          key: "test:1",
          onClick: () => navigate("/post-test"),
        },
        {
          label: "IELTS Library",
          key: "test:2",
          onClick: () => console.log("test:2"),
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
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 7, order: 1 }}>
            <div
              style={{
                display: "flex",
                gap: 5,
                marginRight: "3rem",
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
              <Image src="../sword.png" height={42} preview={false} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    color: "white",
                    fontSize: "32px",
                  }}
                >
                  Warrior
                </div>
                {userProfile?.role === "ADMIN" &&
                  (<div
                    style={{
                      color: "white",
                      fontSize: "15px",
                      lineHeight: 0.5,
                      textAlign: "right",
                    }}
                  >
                    Admin tools
                  </div>)
                }
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
          <Col xs={{ span: 11, order: 3 }} lg={{ span: 4, order: 3 }}>
            {userProfile?.role === "ADMIN" &&
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                  justifyContent: "flex-end",
                }}
              >
                <Avatar src={"../avatar.png"} size={50} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ color: "white", fontSize: "15px" }}>{username}</div>
                  <div style={{ color: "white", fontSize: "15px" }}>{userProfile?.role?.toLowerCase()}</div>
                </div>
              </div>
            }
            {!userProfile?.role && (
              <div>
                <Button ghost style={{ marginRight: '.5rem' }}>Register</Button>
                <Button>Login</Button>
              </div>
            )}
          </Col>
        </Row>
      </Layout.Header>
    </>
  );
};

const popupContainer = () =>
  document.getElementById("header-user") as HTMLElement;

export default AppHeader;
