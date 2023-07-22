import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      state.items[index].quantity = quantity;
    },
    updateSize: (state, action) => {
      const { index, size } = action.payload;
      state.items[index].size = size;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateSize,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;





