import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
// import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import kelLight from "../../tokens/kelLight.json";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(kelLight);

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgBase;
  }, [token]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { ...kelLight } : { ...dark });
  };

  return (
    <ConfigProvider theme={{ token }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <AppointmentUpdates />
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
