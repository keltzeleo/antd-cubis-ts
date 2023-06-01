import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import "./App.css";
//import "./index.css";
import ThemeTest from "./pages/ThemeTest/ThemeTest";

//import dark from "./tokens/dark.json";

//import "./pages/MyForm.css";

ReactDOM.render(
  <ConfigProvider theme={{ token: theme }}>
    <div>
      <ThemeTest />
    </div>
  </ConfigProvider>,
  document.getElementById("root")
);
