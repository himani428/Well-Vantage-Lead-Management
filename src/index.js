import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

// basename must be a path like "/Well-Vantage-Lead-Management"
// PUBLIC_URL is a full URL in production, so extract just the pathname.
const getBasename = () => {
  const pub = process.env.PUBLIC_URL;
  if (!pub) return "/"; // dev: no basename
  try {
    const { pathname } = new URL(pub);
    // Ensure it ends without trailing slash (BrowserRouter handles it either way)
    return pathname.replace(/\/+$/, "") || "/";
  } catch {
    // If PUBLIC_URL is already a path for some reason
    return pub.startsWith("http") ? "/" : pub || "/";
  }
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
