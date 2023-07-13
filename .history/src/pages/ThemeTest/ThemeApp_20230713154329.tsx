import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";

type Theme = "light" | "dark";

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const getTheme = () => {
    return theme === "dark" ? dark : light;
  };

  return (
    <ConfigProvider theme={getTheme()}>
      <Switch
        checked={theme === "dark"}
        onChange={handleThemeChange}
        style={{ margin: 20 }}
      />
      {/* <AppointmentUpdates theme={theme} /> */}
      <TariffChargesMaintenance theme={theme} />
      {/* <TariffChargesMaintenanceCard theme={theme} /> */}
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
