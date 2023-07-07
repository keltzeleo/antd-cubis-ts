import { ConfigProvider, Switch } from "antd";
import { useState } from "react";
import darkTheme from "../../tokens/kelDark.json";
import lightTheme from "../../tokens/light.json";
import MainTable from "../AppointmentTable";

interface light {
  [key: string]: string;
}

const ThemeChange = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(lightTheme);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { lightTheme } : { darkTheme });
  };

  return (
    <ConfigProvider light={isDarkMode ? darkTheme : lightTheme}>
      <div style={{ marginBottom: "16px" }}>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
      </div>
      <MainTable />
    </ConfigProvider>
  );
};

export default ThemeChange;
