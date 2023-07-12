import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";
import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [token, setToken] = useState<Theme>(light);

  useEffect(() => {
    document.body.style.backgroundColor = token.colorBgBase;
  }, [token]);

  const handleThemeChange = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    setToken(newIsDarkMode ? { ...dark } : { ...light });
  };

  return (
    <ConfigProvider>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      <AppointmentUpdates theme={token} />
      <TariffChargesMaintenance theme={token} />
      <TariffChargesMaintenanceCard theme={token} />
    </ConfigProvider>
  );
};

export default ThemeApp;
