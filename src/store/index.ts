import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsSlice';
import listReducer from './reducers/listSlice';
import historyReducer from './reducers/historySlice';
import historyListReducer from './reducers/historyListSlice';
import monthlySlice from './reducers/monthlySlice';

export default configureStore({
  reducer: {
    products: productsReducer,
    list: listReducer,
    history: historyReducer,
    historyList: historyListReducer,
    monthly: monthlySlice
  }
})