import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Correctly importing default export

export const store = configureStore({
  reducer: {
    cart: cartReducer, // No need for `.reducer`
  },
});
