import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
// import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";
import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface ThemeConfig {
  [key: string]: string;
  // Add other properties according to your theme structure
}

interface ThemeAppProps {
  theme: ThemeConfig;
}

const ThemeApp: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(light);

  const handleThemeChange = (checked: boolean) => {
    setCurrentTheme(checked ? dark : light);
  };

  return (
    <ConfigProvider theme={currentTheme}>
      <Switch
        checked={currentTheme === dark}
        onChange={handleThemeChange}
        style={{ margin: 20 }}
      />
      {/* <AppointmentUpdates theme={theme} /> */}
      <TariffChargesMaintenance />
      <TariffChargesMaintenanceCard />
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
