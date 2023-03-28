import { Button, Image, Result, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RootPaths } from "constant";

interface TestItemType {
  image: string | null
  title: string

}

const PreviewTestItem = () => {

  return (
    <div>
      <Image />
    </div>
  );
};

export default PreviewTestItem;
