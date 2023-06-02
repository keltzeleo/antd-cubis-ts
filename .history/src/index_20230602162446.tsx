import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
//import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
import ThemeTest from "./pages/ThemeTest/ThemeTest";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <AppointmentUpdates />*/}
    <ThemeTest />
  </React.StrictMode>,
  document.getElementById("root")
);
