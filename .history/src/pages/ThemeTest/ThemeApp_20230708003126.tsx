import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

interface Theme {
  [key: string]: string;
}

const light: Theme = {
  colorPrimary: "#000000",
  colorSuccess: "#00FF00",
  colorWarning: "#FFA500",
  colorError: "#FF0000",
  colorInfo: "#0000FF",
  colorTextBase: "#333333",
  colorBgBase: "#FFFFFF",
  colorBgContainer: "#F0F0F0",
};

const dark: Theme = {
  colorPrimary: "#FFFFFF",
  colorSuccess: "#00FF00",
  colorWarning: "#FFA500",
  colorError: "#FF0000",
  colorInfo: "#0000FF",
  colorTextBase: "#CCCCCC",
  colorBgBase: "#111111",
  colorBgContainer: "#222222",
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
