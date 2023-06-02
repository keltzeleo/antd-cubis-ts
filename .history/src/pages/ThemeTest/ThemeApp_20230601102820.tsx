// src/pages/ThemeTest/ThemeApp.tsx
import { Button, ConfigProvider } from "antd";
import React, { useState } from "react";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

import ThemeTest from "./ThemeTest";

const ThemeApp: React.FC = () => {
  const [token, setToken] = useState(light);

  return (
    <ConfigProvider theme={{ token }}>
      <Button
        onClick={() => (token === light ? setToken(dark) : setToken(light))}
        style={{ margin: 20 }}
      >
        {" "}
        Change theme
      </Button>
      <ThemeTest />
    </ConfigProvider>
  );
};

export default ThemeApp;
