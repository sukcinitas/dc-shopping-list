import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import { fetchUser } from "./store/reducers/userSlice";
import axios from "axios";
import App from "./App";
import PageLoader from "./components/PageLoader";

const location = window.location.href.includes("http://localhost:4000/")
  ? "http://localhost:8000/"
  : "https://curved-maze-mole.glitch.me/";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = location;

const renderApp = async () => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <PageLoader />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
  await store.dispatch(fetchUser());
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
};

(async () => renderApp())();
