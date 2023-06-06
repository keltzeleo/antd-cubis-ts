import { createRoot } from "react-dom/client";
import "./index.css";
//import ThemeApp from "./pages/ThemeTest/ThemeApp";
// import App from "./App";
import AppointmentUpdates from "./pages/AppointmentUpdates/AppointmentUpdates";
//import ThemeTest from "./pages/ThemeTest/ThemeTest";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<AppointmentUpdates />);
