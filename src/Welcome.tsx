import React from "react";
import { Typography } from "antd";
import "./App.css";

const { Title } = Typography;

const Welcome: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <Title level={2} className="font-play">
        Welcome to Ant Design
      </Title>
      <Title level={4} className="font-mulish">
        Simple Welcome Page
      </Title>
    </div>
  );
};

export default Welcome;
