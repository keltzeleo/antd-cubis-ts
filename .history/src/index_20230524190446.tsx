import ReactDOM from "react-dom";
import "./index.css";
const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<ApppointmentUpdates />, rootElement);
}
