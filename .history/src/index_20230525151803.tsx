import { ConfigProvider } from "antd";
import "./App.css";
import "./index.css";
import AppointmentUpdates from "./pages/AppointmentUpdates";
import "./pages/MyForm.css";
import light from "./tokens/light.json";

<ConfigProvider theme={{ token: light }}>
  ReactDOM.render(
  <AppointmentUpdates />, document.getElementById("root"));
</ConfigProvider>;
