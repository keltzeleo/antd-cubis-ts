import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
//import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
//import ThemeTest from "./pages/ThemeTest/ThemeTest";
import DragDropArea from "./pages/DragDropArea/DragDropArea";

const darkModeConfig = {
  "color-bg-base": "#141c1b",
  "color-text-base": "#f3f3f3",
  "color-primary": "#00a991",
  "color-error": "#ea7480",
  "color-success": "#7fb86d",
  "color-warning": "#ffaa64",
  "color-info": "#00a991",
  "border-radius-base": 8,
  "size-step": 4,
  "size-unit": 4,
};

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        dark: {
          ...darkModeConfig,
        },
      }}
    >
      {/* <App /> */}
      {/* <AppointmentUpdates /> */}
      {/*  <ThemeTest />*/}
      <DragDropArea />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
