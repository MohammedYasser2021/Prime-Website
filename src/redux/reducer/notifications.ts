import { createSlice } from "@reduxjs/toolkit";

type initialtype = {
  messsge: string;
};
const initialState: initialtype = {
  messsge: "",
};
const ToastifySlice = createSlice({
  name: "Toastify",
  initialState,
  reducers: {
    runToastify: (state, e) => {
      state.messsge = e?.payload;
    },
  },
});
export default ToastifySlice.reducer;
export const { runToastify } = ToastifySlice.actions;
