import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "components";

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
