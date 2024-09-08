import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/orther/error/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer />
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
