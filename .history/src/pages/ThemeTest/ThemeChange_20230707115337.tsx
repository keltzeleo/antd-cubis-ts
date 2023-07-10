import { ConfigProvider, Switch } from "antd";
import { useState } from "react";
import MainTable from "../AppointmentTable";

const ThemeChange = () => {
  const [currentTheme, setCurrentTheme] = useState("light"); // 'light' or 'dark'

  const handleThemeSwitch = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <div style={{ marginBottom: "16px" }}>
        <Switch
          checked={currentTheme === "dark"}
          onChange={handleThemeSwitch}
        />
      </div>
      <MainTable />
    </ConfigProvider>
  );
};

export default ThemeChange;
