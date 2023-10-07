import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeApp from "./pages/ThemeTest/ThemeApp";

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
        <label>
          <input
            type="checkbox"
            checked={selectedComponent === "app"}
            onChange={toggleComponent}
          />
          Switch Component
        </label>

        {/* Render the selected component with theme prop */}
        {selectedComponent === "theme" ? (
          <ThemeApp theme={theme} />
        ) : (
          <App theme={theme} />
        )}
      </div>
    </React.StrictMode>
  );
}

ReactDOM.render(<AppSwitcher />, document.getElementById("root"));
