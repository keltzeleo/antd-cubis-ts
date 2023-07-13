import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
// import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";
import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface Theme {
  [key: string]: string;
  // Add other properties according to your theme structure
}


}

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState(light);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? dark : light);
  };

  return (
    <ConfigProvider theme={theme}>
      <Switch
        checked={theme === dark}
        onChange={handleThemeChange}
        style={{ margin: 20 }}
      />
      {/* <AppointmentUpdates theme={theme} /> */}
      <TariffChargesMaintenance theme={currentTheme} />
      <TariffChargesMaintenanceCard theme={currentTheme} />
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
