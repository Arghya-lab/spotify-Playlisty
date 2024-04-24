import React from "react";
import ReactDOM from "react-dom/client";
import { StatesProvider } from "./context/StatesContext.jsx";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StatesProvider>
      <App />
    </StatesProvider>
  </React.StrictMode>
);