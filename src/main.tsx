import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { StatesProvider } from "./context/StatesContext.tsx";
import App from "./App.tsx";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StatesProvider>
        <App />
      </StatesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
