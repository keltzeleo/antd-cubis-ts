import ReactDOM from "react-dom";
import "./index.css";
import MyForm from "./pages/MyForm";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<MyForm />, rootElement);
}
