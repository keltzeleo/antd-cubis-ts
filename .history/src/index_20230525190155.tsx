import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import AppointmentUpdates from "./pages/AppointmentUpdates";
import "./pages/MyForm.css";
import light from "./tokens/light.json";

ReactDOM.render(
  <ConfigProvider theme={{ token: light }}>
    <div style={{text-decoration: "none" }}>
      <AppointmentUpdates />
    </div>
  </ConfigProvider>,
  document.getElementById("root")
);
