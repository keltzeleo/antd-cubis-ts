import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}
