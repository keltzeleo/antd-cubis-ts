import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
// import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";
import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

// interface Theme {
//   [key: string]: string;
// }

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState(light);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? dark : light);
  };

  return (
    <ConfigProvider>
      <Switch
        checked={theme === light}
        onChange={handleThemeChange}
        style={{ margin: 20 }}
      />
      {/* <AppointmentUpdates theme={theme} /> */}
      <TariffChargesMaintenance theme={theme} />
      <TariffChargesMaintenanceCard theme={theme} />
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
