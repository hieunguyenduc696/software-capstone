import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
