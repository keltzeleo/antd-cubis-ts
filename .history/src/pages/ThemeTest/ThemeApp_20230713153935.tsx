import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import TariffChargesMaintenance from "../LibraryMaintanance/TariffChargesMaintanance";

const ThemeApp: React.FC = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const getTheme = () => {
    return theme === "dark" ? darkTheme : lightTheme;
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
