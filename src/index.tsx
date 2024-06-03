import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import axios from 'axios';
import App from './App';

const location = 'http://localhost:8000/';
// const location =
//   window.location.href === 'http://localhost:4000/'
//     ? 'http://localhost:8000/'
//     : 'https://curved-maze-mole.glitch.me/';
axios.defaults.baseURL = location;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById('root')
);
