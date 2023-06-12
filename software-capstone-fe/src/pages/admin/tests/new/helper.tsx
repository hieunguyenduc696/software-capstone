import { LeftOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from "react-router";



export const BackNavigateBox = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/tests");
      };
  return (
    <div
      style={{
        padding: "1.5rem 0.5rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

        cursor: "pointer",
      }}
    >
      <LeftOutlined
        style={{ color: "var(--tertiaryColor)", marginRight: "10px" }}
        onClick={handleBackClick}
      />
      <Typography style={{ fontSize: "30px", fontWeight: "500" }}>
        IELTS Test Library
      </Typography>
    </div>
  );
};

