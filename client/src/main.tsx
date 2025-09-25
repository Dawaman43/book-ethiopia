import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/layout/header.tsx";

function AppWrapper() {
  const location = useLocation();

  // Don't show header on the "/" route
  const showHeader = location.pathname !== "/";

  return (
    <>
      {showHeader && <Header />}
      <App />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>
);
