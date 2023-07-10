import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

import dark from "../../tokens/kelDark.json";
import light from "../../tokens/kelLight.json";

interface Theme {
  [key: string]: string | number; // Update the interface to allow number values
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { ...light } : { ...dark }); // Spread the theme objects to create a new copy
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
