import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsSlice';
import listReducer from './reducers/listSlice';
import historyReducer from './reducers/historySlice';
import historyItemReducer from './reducers/historyItemSlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    list: listReducer,
    history: historyReducer,
    historyItem: historyItemReducer,
  }
})