import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setTheme(isDarkMode ? dark : light);
  }, [isDarkMode]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme: Theme) => {
    const body = document.querySelector("body");
    if (body) {
      Object.entries(theme).forEach(([key, value]) => {
        body.style.setProperty(`--${key}`, value);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 20 }}
        >
          <span style={{ marginRight: 10 }}>Light</span>
          <Switch checked={isDarkMode} onChange={handleThemeChange} />
          <span style={{ marginLeft: 10 }}>Dark</span>
        </div>
        <AppointmentUpdates />
      </div>
    </ThemeProvider>
  );
};

export default ThemeApp;
