import { useState } from "react";
import classes from "./AppHeader.module.less";
import { Avatar, Badge, Image, Layout, Menu } from "antd";
import { useAuth } from "hooks/useAuth";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useNavigate } from "react-router";
import {
  PlusCircleFilled,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";



export const AppHeader = () => {
  const [langDropdownVisible, setLangDropdownVisibleVisible] =
    useState<boolean>(false);
  const { userProfile } = useAuth();

  const username = `${userProfile?.firstName || ""} ${
    userProfile?.lastName || ""
  }`;

  const navigate = useNavigate();

  const handleAddNewTestClick = () => {
    console.log("add reading test");
    navigate("/post-test");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          style={{
            fontSize: "15px",
            lineHeight: 0.5,
            padding: "0.5rem",
          }}
        >
          IELTS Listening Tests
        </div>
      ),
      disabled: true,
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "15px",
            lineHeight: 0.5,
            padding: "0.5rem",
          }}
        >
          IELTS Reading Tests
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{
            fontSize: "15px",
            lineHeight: 0.5,
            padding: "0.5rem",
  
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <PlusCircleFilled style={{ fontSize: "15px", marginRight: "0.5rem" }} />
          Add New Test
        </div>
      ),
      onClick:() => {
        handleAddNewTestClick();
      }
  
    },
  ];

  return (
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "50%",
        }}
      >
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
            ILETS
          </span>
          <Image src="sword.png" height={42} preview={false} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "white",
                fontSize: "32px",
              }}
            >
              Warrior
            </div>
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
          </div>
        </div>

        <Dropdown menu={{ items }}>
          <div
            style={{
              color: "white",
              fontSize: "15px",
              lineHeight: 0.5,
              textAlign: "right",
            }}
          >
            IELTS Tests Library
          </div>
        </Dropdown>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
        }}
      >
        <Avatar src={"avatar.png"} size={50} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "white", fontSize: "15px" }}>Nam Pham</div>
          <div style={{ color: "white", fontSize: "15px" }}>Admin</div>
        </div>
      </div>
    </Layout.Header>
  );
};

const popupContainer = () =>
  document.getElementById("header-user") as HTMLElement;

export default AppHeader;
