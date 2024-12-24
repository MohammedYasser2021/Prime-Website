import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertData } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllCurrency = createAsyncThunk("currency/getAll", async () => {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await api.get("currency", {
      headers: { authorization: `Bearer ${logged}` },
    });
    console.log(res);

    return res;
  } catch (err) {
    console.log(logged);
    console.log(err);
  }
});

export const getDefaultCurrency = createAsyncThunk(
  "currency/getDefaultCurrency",
  async () => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get("currency/default", {
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
export const getOneCurrency = createAsyncThunk(
  "currency/getOneCurrency",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`currency/${id}`, {
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
// start with update currency

export const patchCurrency = createAsyncThunk(
  "currency/patchCurrency",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await useUpdateData(`currency/${data.id}`, data.formData);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// set default currency
export const setDefaultCurrency = createAsyncThunk(
  "currency/setDefaultCurrency",
  async (data: any, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await useUpdateData(
        `currency/${data.id}/default`,
        data.formData
      );
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// start with delete data

export const deleteCurrency = createAsyncThunk(
  "currency/deleteCurrency",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log(id);
      const res = await useDeleteData(`currency/${id}`);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const creatCurrency = createAsyncThunk(
  `currency/creatCurrency`,
  async (formData: any) => {
    const res = await useInsertData(`currency`, formData);
    return res;
  }
);

type initialtype = {
  currency: any;
  oneCurrency: any;
  defCurrency: any;
  isLioding: boolean;
};
const initialState: initialtype = {
  currency: [],
  oneCurrency: [],
  defCurrency: [],
  isLioding: false,
};
const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCurrency.fulfilled, (state, action) => {
      state.currency = action.payload?.data;
      state.isLioding = false;
      console.log(state.currency);
    });

    builder.addCase(getAllCurrency.pending, (state, action) => {
      state.isLioding = true;
    });
    builder.addCase(getOneCurrency.fulfilled, (state, action) => {
      state.oneCurrency = action.payload?.data;
      state.isLioding = false;
      console.log(state.oneCurrency);
    });

    builder.addCase(getOneCurrency.pending, (state, action) => {
      state.isLioding = true;
    });
    builder.addCase(getDefaultCurrency.fulfilled, (state, action) => {
      state.defCurrency = action.payload?.data;
      state.isLioding = false;
      console.log(state.defCurrency);
    });

    builder.addCase(getDefaultCurrency.pending, (state, action) => {
      state.isLioding = true;
    });
    builder.addCase(creatCurrency.fulfilled, () => {
      location.reload();
    });
    builder.addCase(deleteCurrency.fulfilled, () => {
      location.reload();
    });
  },
});
export default currencySlice.reducer;
