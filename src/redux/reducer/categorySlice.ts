import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertDataWithImage } from "../useInsertData";
import { useUpdateDataWithImage } from "../useUpdateData";

export const getAllCategory = createAsyncThunk("category/getAll", async () => {
  try {
    const res = await api.get("category");

    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const getOneCategory = createAsyncThunk(
  "category/getOneCategory",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`category/${id}`, {
        headers: { authorization: `Bearer ${logged}` },
      });
      console.log(res);

      return res;
    } catch (err) {
      console.log(logged);
      console.log(err);
    }
  }
);

// start with delete data

type initialtype = {
  Category: any;
  defCategory: any;
  isLioding: boolean;
};
const initialState: initialtype = {
  Category: [],
  defCategory: [],
  isLioding: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.Category = action.payload?.data;
      state.isLioding = false;
    });

    builder.addCase(getAllCategory.pending, (state) => {
      state.isLioding = true;
    });

    builder.addCase(getOneCategory.fulfilled, (state, action) => {
      state.defCategory = action.payload?.data;
      console.log(state.Category);
    });
  },
});
export default categorySlice.reducer;
