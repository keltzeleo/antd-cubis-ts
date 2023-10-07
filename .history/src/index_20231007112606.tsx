import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeApp from "./pages/ThemeTest/ThemeApp";

function AppSwitcher() {
  const [selectedComponent, setSelectedComponent] = useState("themeApp"); // "theme" or "app"

  const toggleComponent = () => {
    setSelectedComponent((prevComponent) =>
      prevComponent === "themeApp" ? "app" : "themeApp"
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

        {/* Render the selected component */}
        {selectedComponent === "themeApp" ? <ThemeApp /> : <App />}
      </div>
    </React.StrictMode>
  );
}

ReactDOM.render(<AppSwitcher />, document.getElementById("root"));
