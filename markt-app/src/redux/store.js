import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import likedStoresReducer from './likedStoresSlice';
import cartReducer from './cartSlice'; 
import wishlistReducer from './wishlistSlice'; 

export default configureStore({
  reducer: {
    auth: authReducer,
    likedStores: likedStoresReducer,
    cart: cartReducer,
    wishlist: wishlistReducer, 
  },
});



