import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BudgetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BudgetProvider>
  </React.StrictMode>
);
