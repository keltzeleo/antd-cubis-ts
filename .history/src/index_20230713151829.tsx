// import { theme } from "antd";
import React from "react";
import ReactDOM from "react-dom";
// import light from "./tokens/light.json"
// import dark from "./tokens/kelDark.json"

//import "./index.css";
import light from "../../tokens/light.json";
import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
//import ThemeTest from "./pages/ThemeTest/ThemeTest";
//import "./customDarkTheme.css";
//import DragDropArea from "./pages/DragDropArea/DragDropArea";
// import DragDropArea2 from "./pages/DragDropArea/DragDropArea2";
// import IWillFollowYou from "../src/customComponents/IWillFollowYou/IWillFollowYou";
// import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
// import CustomerInfo from "./pages/Forms/CustomerInfo";
// import MyForm from "./pages/MyForm";

// const { useToken } = theme;

ReactDOM.render(
  <React.StrictMode>
    {/* <div style={{ background: "rgba(18,29,29,0.90" }}> */}
    {/* <ConfigProvider
      theme={{
        token: {
          //colorBgBase: "#141c1b",
          //colorTextBase: "#f3f3f3",
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
    > */}
    {/* <App /> */}
    {/* <AppointmentUpdates /> */}
    {/*  <ThemeTest />*/}
    {/* <DragDropArea2 /> */}
    <ThemeApp theme={light} />
    {/* <IWillFollowYou errorMessage="I Will Follow You Message Sample!" /> */}
    {/* </div> */}
    {/* <CustomerInfo /> */}
    {/* <MyForm /> */}
    {/* </ConfigProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
