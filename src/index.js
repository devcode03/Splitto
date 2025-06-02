import React from "react";
import ReactDOM from "react-dom/client";
import { GroupProvider } from "./Contexts/GroupContext";
import "./styles/index.css";
import App from "./App";
import { CurrencyProvider } from "./Contexts/CurrencyContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GroupProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </GroupProvider>
  </React.StrictMode>
);
