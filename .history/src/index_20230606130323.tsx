import { ConfigProvider, theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";

//import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
//import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
//import ThemeTest from "./pages/ThemeTest/ThemeTest";
//import "./customDarkTheme.css";
import DragDropArea from "./pages/DragDropArea/DragDropArea";

const { darkAlgorithm, compactAlgorithm } = theme;

ReactDOM.render(
  <React.StrictMode>
    <div style={{ background: "rgba(18,29,29,0.90" }}>
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: "#141c1b",
            colorTextBase: "#f3f3f3",
            colorPrimary: "#00a991",
            colorError: "#ea7480",
            colorSuccess: "#7fb86d",
            colorWarning: "#ffaa64",
            colorInfo: "#00a991",
            borderRadius: 8,
            sizeStep: 4,
            sizeUnit: 4,
          },
          algorithm: [darkAlgorithm, compactAlgorithm],
        }}
      >
        {/* <App /> */}
        {/* <AppointmentUpdates /> */}
        {/*  <ThemeTest />*/}
        <DragDropArea />
      </ConfigProvider>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
