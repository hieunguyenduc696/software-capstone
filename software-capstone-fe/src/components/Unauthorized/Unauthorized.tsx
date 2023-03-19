import { Button, Result, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RootPaths } from "constant";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Space>
          <Button type="default" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button type="primary">
            <Link to={RootPaths.DASHBOARD}>Back Home</Link>
          </Button>
        </Space>
      }
    />
  );
};

export default Unauthorized;
