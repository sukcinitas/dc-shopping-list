import { configureStore } from '@reduxjs/toolkit';

import itemsReducer from './reducers/itemsSlice';

export default configureStore({
  reducer: {
    items: itemsReducer
  }
})