import { createSlice } from '@reduxjs/toolkit';

const initialState = { isAuthenticated: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    register(state) { 
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, register } = authSlice.actions; 

export default authSlice.reducer;


