import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import kelLight from "../../tokens/kelLight.json";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

const kelLightTheme = {
  "primary-color": kelLight.token.colorPrimary,
  "success-color": kelLight.token.colorSuccess,
  "warning-color": kelLight.token.colorWarning,
  "error-color": kelLight.token.colorError,
  "info-color": kelLight.token.colorInfo,
  "text-color": kelLight.token.colorTextBase,
  "body-background": kelLight.token.colorBgBase,
  "component-background": kelLight.token.colorBgContainer,
};

const darkTheme = {
  // map dark theme colors to antd theme variables
};

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState(kelLightTheme);

  useEffect(() => {
    document.body.style.backgroundColor = theme["body-background"];
  }, [theme]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? kelLightTheme : darkTheme);
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
