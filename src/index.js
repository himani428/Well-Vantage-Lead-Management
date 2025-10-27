import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

/**
 * IMPORTANT for GitHub Pages:
 * - CRA injects process.env.PUBLIC_URL from your "homepage" in package.json.
 * - We pass it as the basename so routes become:
 *   /Well-Vantage-Lead-Management/leads, etc.
 */
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
