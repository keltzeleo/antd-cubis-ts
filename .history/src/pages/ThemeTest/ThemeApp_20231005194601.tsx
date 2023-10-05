import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import TariffChargesMaintenance2 from "../LibraryMaintanance/TariffChargesMaintenance2";
import MyForm from "../MyForm";
// import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";
import { FaMoon, FaSun } from "react-icons/fa";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

// import EditableTable from "../LibraryMaintanance/EditableTable";
import App from "../../App";
import "../../App.css";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";
import WaterBooksScheduler from "../Calendar/WaterBooksScheduler";
import LoginCUBIS from "../LoginCUBIS";
import NapsWizard2 from "../NapsWizard/NapsWizard2";
import WaterWorkOrderMeterChange from "../WaterWorkOrder/MeterChange/WaterWorkOrderMeterChange";
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
    setToken(isDarkMode ? { ...light } : { ...dark });

    setIsDarkMode(!isDarkMode);
  };

  function CustomSwitch({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Align the custom switch to the right
        }}
      >
        <Switch checked={checked} onChange={onChange} />
        {checked ? (
          <FaMoon style={{ marginLeft: 5 }} />
        ) : (
          <FaSun style={{ marginLeft: 5 }} />
        )}
      </div>
    );
  }

  return (
    <ConfigProvider theme={{ token }}>
      <div
        style={{
          display: "flex",
          marginLeft: 150,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span style={{ marginRight: 10 }}>Light</span>
        <CustomSwitch checked={isDarkMode} onChange={handleThemeChange} />
        <span style={{ marginLeft: 10 }}>Dark</span>
      </div>
      {/* <AppointmentUpdates theme={isDarkMode ? dark : light} /> */}

      <p></p>
      {/* <MyFormDummy /> */}
      <App />
      <div style={{ height: 100 }} />
      {/* <CancelWorkOrder theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} />
      <CompleteWorkOrder theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} /> */}
      {/* <IssueWorkOrder theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} /> */}
      {/* <InquireAccountPage theme={isDarkMode ? dark : light} /> */}
      {/* <div style={{ height: 100 }} /> */}
      <WaterWorkOrderMeterChange theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} />
      <LoginCUBIS />
      <div style={{ height: 100 }} />
      <MyForm />
      <div style={{ height: 100 }} />
      <p></p>
      <TariffChargesMaintenance2 theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} />
      {/* <EditableTable theme={isDarkMode ? dark : light} /> */}
      {/* <TariffChargesMaintenanceCard theme={isDarkMode ? dark : light} /> */}
      {/* <ThemeTest /> */}
      <WaterBooksScheduler theme={isDarkMode ? dark : light} />

      <div style={{ height: 200 }} />

      <NapsWizard2 theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} />
      <AppointmentUpdates theme={isDarkMode ? dark : light} />
      <div style={{ height: 100 }} />

      {/* <AppointmentUpdates theme={isDarkMode ? dark : light} /> */}
    </ConfigProvider>
  );
};

export default ThemeApp;
