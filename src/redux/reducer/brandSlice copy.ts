import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertDataWithImage } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllBrand = createAsyncThunk("brand/getAll", async () => {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");

  try {
    const res = await api.get("brand", {
      headers: { authorization: `Bearer ${logged}`, lang: lang },
    });
    console.log(res);

    return res;
  } catch (err) {
    console.log(logged);
    console.log(err);
  }
});

// start with delete data

export const deleteBrand = createAsyncThunk(
  "brand/deleteCurrency",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(id);
      const res = await useDeleteData(`brand/${id}`);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const creatBrand = createAsyncThunk(
  `brand/creatBrand`,
  async (formData: any) => {
    const res = await useInsertDataWithImage(`brand`, formData);
    return res;
  }
);

export const getOnebrand = createAsyncThunk(
  "brand/getOnebrand",
  async (id: string) => {
    const logged = getCookie("token");
    try {
      const res = await api.get(`brand/${id}`, {
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

export const editbrand = createAsyncThunk(
  `brand/editbrand`,
  async (data: any) => {
    const res = await useUpdateData(`brand/${data.id}`, data.formData);
    console.log(res);

    return res;
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
      console.log(state.brand);
    });

    builder.addCase(getAllBrand.pending, (state) => {
      state.isLioding = true;
      console.log("Lioding");
    });

    builder.addCase(creatBrand.fulfilled, () => {
      location.reload();
    });
    builder.addCase(deleteBrand.fulfilled, () => {
      location.reload();
    });
    builder.addCase(editbrand.fulfilled, () => {
      location.reload();
    });
    builder.addCase(getOnebrand.fulfilled, (state, action) => {
      state.defBrand = action.payload?.data;
      state.isLioding = false;
      console.log(state.defBrand);
    });

    builder.addCase(getOnebrand.pending, (state) => {
      state.isLioding = true;
    });
  },
});
export default brandSlice.reducer;
