import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        isOpen: false,
      };
    }
    const parsedCart = JSON.parse(serializedCart);
    return {
      items: parsedCart.items || [],
      totalQuantity: parsedCart.totalQuantity || 0,
      totalAmount: parsedCart.totalAmount || 0,
      isOpen: false, 
    };
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return {
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
      isOpen: false,
    };
  }
};

const saveCartToStorage = (state) => {
  try {
    const cartToSave = {
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalAmount: state.totalAmount,
      // Don't save isOpen state
    };
    const serializedCart = JSON.stringify(cartToSave);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.instrumentId === newItem.instrumentId);

      if (existingItem) {
 
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.finalPrice;
      } else {
        // Add new item to cart
        state.items.push({
          instrumentId: newItem.instrumentId,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity,
          image: newItem.image,
          discount: newItem.discount || 0,
          tax: newItem.tax || 0,
          deliveryFee: newItem.deliveryFee || 0,
          finalPrice: newItem.finalPrice,
          totalPrice: newItem.quantity * newItem.finalPrice,
          addedAt: new Date().toISOString(),
        });
      }

      // Recalculate totals and save to localStorage
      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const instrumentId = action.payload;
      state.items = state.items.filter(item => item.instrumentId !== instrumentId);
      cartSlice.caseReducers.calculateTotals(state);
      saveCartToStorage(state);
    },

    updateQuantity: (state, action) => {
      const { instrumentId, quantity } = action.payload;
      const existingItem = state.items.find(item => item.instrumentId === instrumentId);

      if (existingItem) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(item => item.instrumentId !== instrumentId);
        } else {
          existingItem.quantity = quantity;
          existingItem.totalPrice = existingItem.quantity * existingItem.finalPrice;
        }
        cartSlice.caseReducers.calculateTotals(state);
        saveCartToStorage(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToStorage(state);
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    calculateTotals: (state) => {
      let totalQuantity = 0;
      let totalAmount = 0;

      state.items.forEach(item => {
        totalQuantity += item.quantity;
        totalAmount += item.totalPrice;
      });

      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  calculateTotals,
} = cartSlice.actions;

// Helper function to clear cart from localStorage (useful for logout)
export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem('cart');
  } catch (err) {
    console.error('Error clearing cart from localStorage:', err);
  }
};

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartItemCount = (state) => state.cart.items.length;
export const selectCartItemById = (state, instrumentId) => 
  state.cart.items.find(item => item.instrumentId === instrumentId);
