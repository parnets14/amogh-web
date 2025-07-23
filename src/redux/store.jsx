// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Middleware to save cart state to localStorage
const cartPersistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Save cart state to localStorage after cart actions
  if (action.type?.startsWith('cart/')) {
    const state = store.getState();
    try {
      const cartToSave = {
        items: state.cart.items,
        totalQuantity: state.cart.totalQuantity,
        totalAmount: state.cart.totalAmount,
      };
      localStorage.setItem('cart', JSON.stringify(cartToSave));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }

  return result;
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(cartPersistenceMiddleware),
});

export default store;
