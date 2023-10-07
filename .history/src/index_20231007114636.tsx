import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./AppSwitcher.css"; // Import a CSS file for styling
import ThemeApp from "./pages/ThemeTest/ThemeApp";
import light from "./tokens/light.json";

interface Theme {
  [key: string]: string;
}

interface AppProps {
  theme: Theme;
}

function AppSwitcher() {
  const [selectedComponent, setSelectedComponent] = useState("theme"); // "theme" or "app"
  const [theme, setTheme] = useState(light); // Default theme, you can change it as needed

  const toggleComponent = () => {
    setSelectedComponent((prevComponent) =>
      prevComponent === "theme" ? "app" : "theme"
    );
  };

  return (
    <React.StrictMode>
      <div>
        {/* Toggle Switch */}
        <div
          className="toggle-container"
          style={{ marginLeft: 100, color: "grey" }}
        >
          <label>
            <input
              type="checkbox"
              checked={selectedComponent === "app"}
              onChange={toggleComponent}
            />
            Switch Component
          </label>
        </div>

        {/* Render the selected component with theme prop */}
        {selectedComponent === "theme" ? <ThemeApp /> : <App theme={theme} />}
      </div>
    </React.StrictMode>
  );
}

ReactDOM.render(<AppSwitcher />, document.getElementById("root"));
