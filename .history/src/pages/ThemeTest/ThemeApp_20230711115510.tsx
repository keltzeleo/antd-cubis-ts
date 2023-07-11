import { ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
// import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import TariffChargesMaintenance from "../LibraryMaintanence/TariffChargesMaintanence";
// import ThemeTest from "../ThemeTest/ThemeTest";

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
    setIsDarkMode(!isDarkMode);
    setToken(isDarkMode ? { ...light } : { ...dark });
  };

  return (
    <ConfigProvider theme={isDarkMode ? dark : light}>
      <div className="app">
        {/* Other components */}
        <TariffChargesMaintenance theme={isDarkMode ? dark : light} />
        {/* Other components */}
      </div>
    </ConfigProvider>
  );
};

export default ThemeApp;
