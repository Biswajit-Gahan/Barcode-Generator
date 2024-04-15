import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
// Supports weights 100-900
import '@fontsource-variable/inter';
// Supports weights 300-700
import '@fontsource-variable/fira-code';
import "./global.css";

const rootElement = document.querySelector("#root-element");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);