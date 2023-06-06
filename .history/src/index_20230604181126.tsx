import ReactDOM from "react-dom";
import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
//import ThemeTest from "./pages/ThemeTest/ThemeTest";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<AppointmentUpdates />);
} else {
  console.error("Element with ID 'root' not found");
}
