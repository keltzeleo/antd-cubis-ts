import { ConfigProvider, Switch } from "antd";
import React, { useState } from "react";
import AppointmentUpdates from "../AppointmentUpdates/AppointmentUpdates";

import dark from "../../tokens/dark.json";
import light from "../../tokens/light.json";

const ThemeApp: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const token = isDarkTheme ? dark : light;

  return (
    <ConfigProvider theme={{ token }}>
      <Switch
        checked={isDarkTheme}
        onChange={toggleTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style={{ margin: 20 }}
      />
      <AppointmentUpdates />
    </ConfigProvider>
  );
};

export default ThemeApp;
