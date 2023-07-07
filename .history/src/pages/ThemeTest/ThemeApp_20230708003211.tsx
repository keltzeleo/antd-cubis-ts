import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

interface Theme {
  [key: string]: string;
}

const light: Theme = {
  colorPrimary: "#00a991",
  colorSuccess: "#7fb86d",
  colorWarning: "#ffaa64",
  colorError: "#ea7480",
  colorInfo: "#00a991",
  colorTextBase: "#141b1c",
  colorBgBase: "#f6faf9",
  colorBgContainer: "#fff",
};

const dark: Theme = {
  colorPrimary: "#00a991",
  colorSuccess: "#7fb86d",
  colorWarning: "#ffaa64",
  colorError: "#ea7480",
  colorInfo: "#00a991",
  colorTextBase: "#f3f3f3",
  colorBgBase: "#121c1b",
  colorBgContainer: "#141c1b",
};

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? { ...light } : { ...dark });
  };

  return (
    <ConfigProvider theme={theme}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <AppointmentUpdates />
    </ConfigProvider>
  );
};

export default ThemeApp;
