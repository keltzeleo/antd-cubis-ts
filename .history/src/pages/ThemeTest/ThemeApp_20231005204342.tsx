import { ConfigProvider, Switch } from "antd";
import React, { useEffect, useState } from "react";
import TariffChargesMaintenance2 from "../LibraryMaintanance/TariffChargesMaintenance2";
import MyForm from "../MyForm";
// import TariffChargesMaintenanceCard from "../LibraryMaintanance/TariffChargesMaintananceCard";
// import ThemeTest from "../ThemeTest/ThemeTest";
import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";
// import EditableTable from "../LibraryMaintanance/EditableTable";
// import App from "../../App";
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

  return (
    <ConfigProvider theme={{ token }}>
      <div style={{ height: 10 }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: 32,
          marginBottom: 20,
          marginTop: 4,
        }}
      >
        {/* <span style={{ marginRight: 10 }}>Light</span> */}
        <Switch
          checked={isDarkMode}
          onChange={handleThemeChange}
          unCheckedChildren={
            <span
              style={{
                color: "white",
                borderRadius: "50%",
                padding: 2,
                backgroundColor: "#ffffff",
                verticalAlign: "middle", // Adjust vertical alignment
                lineHeight: "0", // Set line height to 0 to remove any extra spacing
                fontSize: "18px",
                display: "inline-block", // Display as inline block to control icon's position
                marginTop: "-10px", // Add margin to control spacing
              }}
            >
              <img
                src="https://res.cloudinary.com/tyappreg/image/upload/v1696508807/icon_sun_i1awlx.png"
                alt="Moon"
                style={{ width: "29px", height: "29px" }}
              />
            </span>
          }
          checkedChildren={
            <span
              style={{
                color: "white",
                borderRadius: "50%",
                backgroundColor: "#141b1c",
                verticalAlign: "middle", // Adjust vertical alignment
                lineHeight: "0", // Set line height to 0 to remove any extra spacing
                fontSize: "24px",
                display: "inline-block", // Display as inline block to control icon's position
                marginTop: "-2px",
                padding: "4px", // Add margin to control spacing
              }}
            >
              <img
                src="https://res.cloudinary.com/tyappreg/image/upload/v1696508808/icon_moon_f4ambw.png"
                alt="Moon"
                style={{ width: "24px", height: "24px" }}
              />
            </span>
          }
        />
        {/* <span style={{ marginLeft: 10 }}>Dark</span> */}
      </div>
      {/* <AppointmentUpdates theme={isDarkMode ? dark : light} /> */}

      <p></p>
      {/* <MyFormDummy /> */}
      {/* <App /> */}
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
