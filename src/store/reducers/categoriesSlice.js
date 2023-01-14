import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const categoriesSlice = createSlice({
  name: "categoriesData",
  initialState,
  reducers: {
    store_data: (state, action) => {
      return (state = [...state, ...action?.payload]);
    },
    delete_data: (state) => {
      return (state = []);
    },
  },
});

export const { store_data, delete_data } = categoriesSlice.actions;
export default categoriesSlice.reducer;
