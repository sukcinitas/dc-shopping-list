import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store";
import axios from "axios";
import App from "./App";

const location = window.location.href.includes("http://localhost:4000/")
  ? "http://localhost:8000/"
  : "https://curved-maze-mole.glitch.me/";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = location;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
