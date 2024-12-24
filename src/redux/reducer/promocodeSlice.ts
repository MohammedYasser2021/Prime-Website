import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertDataWithImage } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllPromocode = createAsyncThunk(
  "promocode/getAll",
  async () => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get("promocode", {
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

export const getOnePromocode = createAsyncThunk(
  "promocode/getOnePromocode",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`promocode/${id}`, {
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
export const checkPromocode = createAsyncThunk(
  "promocode/getOnePromocode",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`promocode/check`, {
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

export const deletePromocode = createAsyncThunk(
  "promocode/deletePromocode",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(id);
      const res = await useDeleteData(`promocode/${id}`);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const creatPromocode = createAsyncThunk(
  `promocode/creatPromocode`,
  async (formData: any) => {
    const res = await useInsertDataWithImage(`promocode`, formData);
    return res;
  }
);

export const editPromocode = createAsyncThunk(
  `promocode/editPromocode`,
  async (formData: any) => {
    console.log(formData);

    const res = await useUpdateData(`promocode/`, formData);
    return res;
  }
);
export const editNumberPromocode = createAsyncThunk(
  `promocode/editPromocode`,
  async (formData: any) => {
    console.log(formData);

    const res = await useUpdateData(
      `promocode/${formData.id}/editNumber`,
      formData
    );
    return res;
  }
);

type initialtype = {
  promocode: any;
  deforder: any;
  isLioding: boolean;
};
const initialState: initialtype = {
  promocode: [],
  deforder: [],
  isLioding: false,
};
const orderSlice = createSlice({
  name: "promocode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPromocode.fulfilled, (state, action) => {
      state.promocode = action.payload?.data;
      state.isLioding = false;
      console.log(state.promocode);
    });
    builder.addCase(creatPromocode.fulfilled, () => {
      location.reload();
    });
    builder.addCase(deletePromocode.fulfilled, () => {
      location.reload();
    });
    builder.addCase(editPromocode.fulfilled, () => {
      location.reload();
    });

    builder.addCase(getAllPromocode.pending, (state) => {
      state.isLioding = true;
      console.log("Lioding");
    });
  },
});
export default orderSlice.reducer;
