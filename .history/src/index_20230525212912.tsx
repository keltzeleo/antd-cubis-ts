import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import App from "./pages/App";
import "./pages/MyForm.css";
import light from "./tokens/light.json";

ReactDOM.render(
  <ConfigProvider theme={{ token: light }}>
    <div>
      <App />
    </div>
  </ConfigProvider>,
  document.getElementById("root")
);
