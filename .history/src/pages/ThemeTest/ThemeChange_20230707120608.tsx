import { ConfigProvider, Switch } from "antd";
import { useState } from "react";
import dark from "../../tokens/kelDark.json";
import light from "../../tokens/light.json";
import MainTable from "../AppointmentTable";

interface Theme {
  [key: string]: string;
}

const ThemeChange = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(light);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { light } : { dark });
  };

  return (
    <ConfigProvider theme={{ token }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <MainTable />
    </ConfigProvider>
  );
};

export default ThemeChange;
