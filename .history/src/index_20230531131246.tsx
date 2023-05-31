import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";

import dark from "./tokens/dark.json";

import "./pages/MyForm.css";

ReactDOM.render(
  <ConfigProvider theme={{ token: dark }}>
    <div>
      <AppointmentUpdates />
    </div>
  </ConfigProvider>,
  document.getElementById("root")
);
