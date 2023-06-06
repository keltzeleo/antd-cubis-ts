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
    <ConfigProvider
      theme={
        {
          //algorithm: [darkAlgorithm, compactAlgorithm],
        }
      }
    >
      {/* <App /> */}
      {/* <AppointmentUpdates /> */}
      {/*  <ThemeTest />*/}
      <DragDropArea />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
