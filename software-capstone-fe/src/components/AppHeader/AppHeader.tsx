import { useState } from "react";
import classes from "./AppHeader.module.less";
import { Avatar, Badge, Dropdown, Image, Layout } from "antd";
import { BellFilled } from "@ant-design/icons";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "hooks/useAuth";

export const AppHeader = () => {
  const [langDropdownVisible, setLangDropdownVisibleVisible] =
    useState<boolean>(false);
  const { userProfile } = useAuth();

  const username = `${userProfile?.firstName || ""} ${userProfile?.lastName || ""
    }`;

  return (
    <Layout.Header className={classes["top-header"]}
      style={{
        backgroundColor: 'var(--mainColor)',
        //borderRadius: '0 0 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '72px',
        borderBottom: '2px solid var(--mainGrayColor)'
      }}>
      <div style={{
        display: 'flex',
        gap: 5,
      }}>
        <span
          style={{
            color: 'white',
            fontSize: '32px'
          }}>
          ILETS
        </span>
        <Image src="sword.png" height={42} preview={false} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: 'white',
              fontSize: '32px',
            }}>
            Warrior
          </div>
          <div style={{
            color: 'white',
            fontSize: '15px',
            lineHeight: .5,
            textAlign: 'right'
          }}>
            Admin tools
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
        <Avatar src={"avatar.png"} size={50} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'white', fontSize: '15px' }}>Nam Pham</div>
          <div style={{ color: 'white', fontSize: '15px' }}>Admin</div>
        </div>
      </div>
      {/* <div className={classes.user} id="header-user">
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
      </div> */}
    </Layout.Header>
  );
};

const popupContainer = () =>
  document.getElementById("header-user") as HTMLElement;

export default AppHeader;
