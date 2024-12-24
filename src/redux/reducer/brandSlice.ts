import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertDataWithImage } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllBrand = createAsyncThunk("brand/getAll", async () => {
  try {
    const res = await api.get("brand");

    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const getOnebrand = createAsyncThunk(
  "brand/getOnebrand",
  async (id: string) => {
    const logged = getCookie("token");
    try {
      const res = await api.get(`brand/${id}`, {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

type initialtype = {
  brand: any;
  defBrand: any;
  isLioding: boolean;
};
const initialState: initialtype = {
  brand: [],
  defBrand: [],
  isLioding: false,
};
const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBrand.fulfilled, (state, action) => {
      state.brand = action.payload?.data;
      state.isLioding = false;
    });

    builder.addCase(getAllBrand.pending, (state) => {
      state.isLioding = true;
    });

    builder.addCase(getOnebrand.fulfilled, (state, action) => {
      state.defBrand = action.payload?.data;
      state.isLioding = false;
    });

    builder.addCase(getOnebrand.pending, (state) => {
      state.isLioding = true;
    });
    
  },
});
export default brandSlice.reducer;
