import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? { ...light } : { ...dark });
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
