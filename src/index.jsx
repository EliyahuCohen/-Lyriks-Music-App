import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import { GlobalSongsProvider } from "./context/SongsProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalSongsProvider>
      <Router>
        <App />
      </Router>
    </GlobalSongsProvider>
  </React.StrictMode>
);
