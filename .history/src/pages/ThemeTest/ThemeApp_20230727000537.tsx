import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import TariffChargesMaintenance2 from "../LibraryMaintanance/TariffChargesMaintenance2";
// import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";
// import EditableTable from "../LibraryMaintanance/EditableTable";
import NapsWizard from "../NapsWizard/NapsWizard";
interface Theme {
  [key: string]: string;
}

const ThemeApp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<Theme>(light);

  useEffect(() => {
    document.body.style.backgroundColor = theme.colorBgBase;
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(isDarkMode ? { ...light } : { ...dark });
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider theme={isDarkMode ? dark : light}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <span style={{ marginRight: 10 }}>Light</span>
        <Switch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      {/* <AppointmentUpdates theme={isDarkMode ? dark : light} /> */}
      <TariffChargesMaintenance2 theme={isDarkMode ? dark : light} />
      {/* <EditableTable theme={isDarkMode ? dark : light} /> */}
      {/* <TariffChargesMaintenanceCard theme={isDarkMode ? dark : light} /> */}
      {/* <ThemeTest /> */}
      <NapsWizard theme={isDarkMode ? dark : light} />
    </ConfigProvider>
  );
};

export default ThemeApp;
