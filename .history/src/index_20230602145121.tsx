import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
import App from "./App";
import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AppointmentUpdates />
  </React.StrictMode>,
  document.getElementById("root")
);
