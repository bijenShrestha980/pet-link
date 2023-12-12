import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { registerSW } from "virtual:pwa-register";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { store } from "./features/store";

import App from "./App";
import "./index.css";
// add this to prompt for a refresh
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
  // </React.StrictMode>
);
