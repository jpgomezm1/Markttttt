import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { isAuthenticated: false, status: 'idle', error: null, user: null };

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/user/register/', userData);
      if (response.status === 200) {
        return response.data.user_info[0]; // Cambio aquí
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/user/login_user/', userData);
      if (response.status === 200) {
        return response.data.user_info[0]; // Cambio aquí
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.error = null;
      state.status = 'idle';
      state.user = null;
    },
  } 
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;







