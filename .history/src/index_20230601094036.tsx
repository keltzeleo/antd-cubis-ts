// src/index.tsx
import { Button, ConfigProvider } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import ThemeTest from "./pages/ThemeTest/ThemeTest";

import dark from "./tokens/dark.json";
import light from "./tokens/light.json";

const ThemedApp: React.FC = () => {
  const [token, setToken] = useState(light);

  const handleThemeChange = () => {
    setToken(token === light ? dark : light);
  };

  return (
    <ConfigProvider theme={{ token }}>
      <Button onClick={handleThemeChange} style={{ margin: 20 }}>
        Change theme
      </Button>
      <ThemeTest />
    </ConfigProvider>
  );
};

ReactDOM.render(<ThemedApp />, document.getElementById("root"));
