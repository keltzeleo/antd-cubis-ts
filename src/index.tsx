import ReactDOM from "react-dom";
import MyForm from "../src/pages/MyForm";
import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<MyForm />, rootElement);
}
