import { useState } from "react";
import classes from "./AppHeader.module.less";
import { Avatar, Badge, Dropdown, Layout } from "antd";
import { BellFilled } from "@ant-design/icons";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/useAuth";

export const AppHeader = () => {
  const [langDropdownVisible, setLangDropdownVisibleVisible] =
    useState<boolean>(false);
  const { userProfile } = useAuth();

  const username = `${userProfile?.firstName || ""} ${
    userProfile?.lastName || ""
  }`;

  return (
    <Layout.Header className={classes["top-header"]}>
      <div className={classes.user} id="header-user">
        <Badge count={5} size="small">
          <BellFilled className={classes["notification-icon"]} />
        </Badge>
        <Dropdown
          getPopupContainer={popupContainer}
          onOpenChange={(visible) => setLangDropdownVisibleVisible(visible)}
          open={langDropdownVisible}
          trigger={["click"]}
        >
          <div className={classes["top-header-setting"]}>
            <Avatar
              className={classes.avatar}
              size={40}
              icon={<UserOutlined />}
            />
            <div className={classes.name}>{username}</div>

            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

const popupContainer = () =>
  document.getElementById("header-user") as HTMLElement;

export default AppHeader;
