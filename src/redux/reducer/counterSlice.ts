import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counters: {
      id: null,
      count: 1,
    },
  },
  reducers: {
    increment: (state: any, action) => {
      const { id } = action.payload;

      if (state.counters.id == id) {
        //   if (state.counters.count < max) state.counters.count += 1;
        state.counters.count += 1;
      } else {
        state.counters.id = id;
        state.counters.count += 1;
      }
    },
    decrement: (state: any, action) => {
      const { id } = action.payload;
      if (state.counters.id && state.counters.count > 1) {
        state.counters.count -= 1;
      }
    },
    reset: (state: any, action) => {
      const { id } = action.payload;
      if (state.counters.id) {
        state.counters.count = 1;
      }
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
