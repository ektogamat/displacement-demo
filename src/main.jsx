import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import Overlay from "./Overlay";
import MouseContextProvider from "./context/mouse-context";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <MouseContextProvider>
      <Overlay />
    </MouseContextProvider>
  </>
);
