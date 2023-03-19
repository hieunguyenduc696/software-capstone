import React, { useEffect } from "react";
import styles from "./SignIn.module.less";
import { Button, Form } from "antd";
import { loadAccount } from "utils";

const SignIn: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const account = loadAccount();
    if (account) {
      form.setFieldsValue({
        email: account.identifier,
        password: account.password,
      });
    }
  }, [form]);

  return (
    <div className={styles["auth-screen-container"]}>
      <Button type="primary" block onClick={() => {}}>
        Login
      </Button>
    </div>
  );
};

export default SignIn;
