import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

import dark from "../../tokens/kelDark.json";
import light from "../../tokens/kelLight.json";

interface Theme {
  [key: string]: string;
}

interface LightTheme extends Theme {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorTextBase: string;
  colorBgBase: string;
  colorBgContainer: string;
  borderRadius: string;
}

interface DarkTheme extends Theme {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorTextBase: string;
  colorBgBase: string;
  colorBgContainer: string;
  borderRadius: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<LightTheme | DarkTheme>(light.token);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { ...light.token } : { ...dark.token });
  };

  return (
    <ConfigProvider theme={{ ...token }}>
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
