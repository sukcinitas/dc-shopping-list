import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './reducers/productsSlice';
import listReducer from './reducers/listSlice';
import historyReducer from './reducers/historySlice';
import historyListReducer from './reducers/historyListSlice';
import monthlySlice from './reducers/monthlySlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    list: listReducer,
    history: historyReducer,
    historyList: historyListReducer,
    monthly: monthlySlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;