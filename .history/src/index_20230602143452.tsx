import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
import MyForm from "./pages/MyFormDummy";

ReactDOM.render(
  <React.StrictMode>
    <MyForm />
    <AppointmentUpdates />
  </React.StrictMode>,
  document.getElementById("root")
);
