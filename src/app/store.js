import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/cryptoSlice';
import layoutReducer from '../features/layoutSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    layout: layoutReducer,
  },
});

