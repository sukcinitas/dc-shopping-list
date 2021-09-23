import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import store from './store';
import axios from 'axios';

import App from './App';

// const location = window.location.href === 'http://localhost:4000/' ? 'http://localhost:4000/' : 'https://desolate-depths.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:4000/';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);