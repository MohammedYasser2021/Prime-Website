import { createSlice } from "@reduxjs/toolkit";

type initialtype = {
  open: boolean;

  cart: any;
  isLioding: boolean;
};
const initialState: initialtype = {
  open: false,

  cart: [],
  isLioding: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    close: (state) => {
      state.open = false;
    },
    openCart: (state) => {
      state.open = true;
    },
  },
});
export default cartSlice.reducer;
export const { openCart, close } = cartSlice.actions;
