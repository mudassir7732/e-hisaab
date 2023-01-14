import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

export const cartSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    add_item: (state, action) => {
      return (state = [...state, action.payload]);
    },
    increase_count: (state, action) => {
      let i = 0;
      while (state[i] != null) {
        if (i === action?.payload) {
          state[i].count++;
        }
        i++;
      }
    },
    decrease_count: (state, action) => {
      let i = 0;
      while (state[i] != null) {
        if (i === action?.payload) {
          state[i].count--;
        }
        i++;
      }
    },
    remove_item: (state, action) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { add_item, remove_item, increase_count, decrease_count } =
  cartSlice.actions;
export default cartSlice.reducer;
