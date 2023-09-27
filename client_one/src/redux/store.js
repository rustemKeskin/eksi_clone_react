// store.js
import { configureStore } from '@reduxjs/toolkit';
import sharedDataReducer from './slices/sharedDataSlice';

export const store = configureStore({
  reducer: {
    sharedData: sharedDataReducer,
  },
});



export default store;

