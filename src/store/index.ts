import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsSlice';
import listReducer from './reducers/listSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    list: listReducer,
  }
})