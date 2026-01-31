import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./store";
import axios from "axios";
import App from "./App";

declare const __PRODUCTION__: boolean;
axios.defaults.baseURL = "http://localhost:8000/";
if (__PRODUCTION__) {
  axios.defaults.baseURL = "https://dc-shopping-list-api.onrender.com";
}
axios.defaults.withCredentials = true;

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
