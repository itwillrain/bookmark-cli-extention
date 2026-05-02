import "./style.css";
import { App } from "./app";
import { createRoot } from "react-dom/client";

/**
 * React appをmountする要素selectorです。
 */
const rootElementSelector = "#root";

/**
 * React appをmountするDOM要素です。
 */
const rootElement = document.querySelector(rootElementSelector);

if (rootElement instanceof HTMLElement) {
  createRoot(rootElement).render(<App />);
}
