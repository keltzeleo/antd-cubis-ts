import { Button, ConfigProvider } from "antd";
import React, { useState } from "react";
import App from "./App";

import dark from "./tokens/dark.json";
import light from "./tokens/light.json";

const ThemedApp: React.FC = () => {
  const [token, setToken] = useState(light);

  const toggleTheme = () => {
    if (token === light) {
      setToken(dark);
    } else {
      setToken(light);
    }
  };

  return (
    <ConfigProvider theme={{ token }}>
      <Button onClick={toggleTheme} style={{ margin: 20 }}>
        Change theme
      </Button>
      <App />
    </ConfigProvider>
  );
};

export default ThemedApp;
