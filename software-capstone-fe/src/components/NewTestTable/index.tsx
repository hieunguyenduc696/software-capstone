import { Button, Image } from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { Typography, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { createTest, getTestWithID, test } from "services/AdminService";
import { HTTP_METHOD } from "config/common";

const { Text } = Typography;

const props: UploadProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info: any) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const NewTestTable = () => {
  return (
    <>
      {" "}
      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          border: "1px solid #d9d9d9",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "transparent",
            boxSizing: "border-box",
            padding: "0.5rem",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Part</Text>
          <Text style={{ fontWeight: "bold" }}>Question(s)</Text>
          <Text style={{ fontWeight: "bold" }}>Duration</Text>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#FFF",
          border: "1px solid #d9d9d9",

          display: "flex",
          flexDirection: "row",

          marginTop: "0.75rem",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "0.5rem",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            <Image
              src="read_icon.png"
              alt=""
              preview={false}
              style={{ height: "16px", cursor: "pointer" }}
            />
            {"  READING"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>40</Text>
          <Text style={{ fontWeight: "bold", marginLeft: "30px" }}>60 min</Text>
        </div>
        <div
          style={{
            width: "30%",
            boxSizing: "border-box",
            padding: "0.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#FFF",
          border: "1px solid #d9d9d9",

          display: "flex",
          flexDirection: "row",
          marginTop: "0.75rem",
        }}
      >
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "0.5rem",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            <Image
              src="listen_icon.png"
              alt=""
              preview={false}
              style={{ height: "16px", cursor: "pointer" }}
            />
            {"LISTENING"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>40</Text>
          <Text style={{ fontWeight: "bold", marginLeft: "30px" }}>60 min</Text>
        </div>
        <div
          style={{
            width: "30%",
            boxSizing: "border-box",
            padding: "0.5rem",
            display: "flex",
            justifyContent: "center",
          }}
        >

        </div>
      </div>
    </>
  );
};

export default NewTestTable;
