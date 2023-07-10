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
    setToken(isDarkMode ? { light } : { dark }));
  };

  return (
    <ConfigProvider theme={token}>
      <div style={{ marginBottom: "16px" }}>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
      </div>
      <MainTable />
    </ConfigProvider>
  );
};

export default ThemeChange;
