import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      return state.filter((item) => item.productid !== action.payload.productid);
    },
    markAsPurchased: (state, action) => {
      return state.map((item) => {
        if (item.productid === action.payload.productid) {
          return { ...item, isPurchased: true };
        }
        return item;
      });
    },
  },
});

export const { addToWishlist, removeFromWishlist, markAsPurchased } = wishlistSlice.actions;

export default wishlistSlice.reducer;


