import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import "./App.css";
import "./index.css";
import ExpandableTable from "./pages/ExpandableTable";
import "./pages/MyForm.css";
import light from "./tokens/light.json";

ReactDOM.render(
  <ConfigProvider theme={{ token: light }}>
    <div>
      <ExpandableTable />
    </div>
  </ConfigProvider>,
  document.getElementById("root")
);
