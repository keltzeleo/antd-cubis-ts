import { Button, ConfigProvider } from "antd";
import React, { useState } from "react";
import ThemeTest from "./ThemeTest";

import dark from "../../../src/tokens/dark.json";
import light from "../../../src/tokens/light.json";

interface ThemeToken {
  // Define the properties of your theme token object
  // based on the structure of your light.json and dark.json files
  // For example:
  color: string;
  background: string;
  // Add other properties here as needed
}

const ThemeApp: React.FC = () => {
  const [token, setToken] = useState<ThemeToken>(light);

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

export default ThemeApp;
