import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from './reducers/itemsSlice';
import listReducer from './reducers/listSlice';

export default configureStore({
  reducer: {
    items: itemsReducer,
    list: listReducer,
  }
})