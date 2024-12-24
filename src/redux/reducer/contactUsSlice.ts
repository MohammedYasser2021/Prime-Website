import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type ContactUsProps = {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  type: string;
};

// Send new message
export const sendMessage = createAsyncThunk(
  `contactUs/sendMessage`,
  async (formData: ContactUsProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await api.post(`contactUs`, formData);
      console.log(res, "contactUs");
      
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);



type initialtype = {
  isLoading: boolean;
  rejected: boolean;
};
const initialState: initialtype = {

  isLoading: false,
  rejected: false,
};
const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(sendMessage.rejected, (state, action) => {
        state.rejected = true;
      });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
    //   state.orders = action.payload?.data;
      state.isLoading = false;
      state.rejected = false;
    });
  },
});
export default contactUsSlice.reducer;
