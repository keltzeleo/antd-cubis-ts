import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
// import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";
import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    document.body.style.backgroundColor = theme.colorBgBase;
  }, [theme]);

  const handleThemeChange = () => {
    theme === light ? setTheme(dark) : setTheme(light);
  };

  return (
    <ConfigProvider theme={{ theme }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      {/* <AppointmentUpdates theme={theme} /> */}
      <TariffChargesMaintenance theme={theme} />
      <TariffChargesMaintenanceCard theme={theme} />
      {/* <ThemeTest /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
