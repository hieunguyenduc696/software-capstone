import React from "react";
import classes from "./Loading.module.less";
import { Spin } from "antd";

export const Loading: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className={classes["overlay-loading"]}>
      <Spin className="loading" size="large" tip={message} />
    </div>
  );
};
