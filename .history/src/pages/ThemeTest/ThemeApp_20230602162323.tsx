import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
//import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { ...light } : { ...dark });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#141c1b",
          colorTextBase: "#f3f3f3",
          colorPrimary: "#00a991",
          colorError: "#ea7480",
          colorSuccess: "#7fb86d",
          colorWarning: "#ffaa64",
          colorInfo: "#00a991",
          borderRadius: 8,
        },
      }}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <ThemeTest />
    </ConfigProvider>
  );
};

export default ThemeApp;
