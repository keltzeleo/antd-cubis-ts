import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";

interface ThemeConfig {
  [key: string]: string;
  // Add other properties according to your theme structure
}

type Theme = "light" | "dark";

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const getTheme = (): ThemeConfig => {
    return theme === "dark" ? dark : light;
  };

  return (
    <ConfigProvider theme={getTheme()}>
      <Switch
        checked={theme === "dark"}
        onChange={handleThemeChange}
        style={{ margin: 20 }}
      />
      <TariffChargesMaintenance theme={getTheme()} />
    </ConfigProvider>
  );
};

export default ThemeApp;
