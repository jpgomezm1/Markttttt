import { createSlice } from "@reduxjs/toolkit";

const likedStoresSlice = createSlice({
  name: "likedStores",
  initialState: [],
  reducers: {
    addLikedStore: (state, action) => {
      state.push(action.payload);
    },
    removeLikedStore: (state, action) => {
      return state.filter(store => store.id !== action.payload.id);
    },
  }
});

export const { addLikedStore, removeLikedStore } = likedStoresSlice.actions;
export default likedStoresSlice.reducer;
