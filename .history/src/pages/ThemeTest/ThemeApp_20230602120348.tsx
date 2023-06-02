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

  const applyTheme = (theme: Theme) => {
    const root = document.getElementsByTagName("html")[0];
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <ConfigProvider theme={theme}>
        <AppointmentUpdates />
      </ConfigProvider>
    </div>
  );
};

export default ThemeApp;
