import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertData } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllFilterProps = createAsyncThunk(
  "filterProperty/getAll",
  async (filter?: any) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");

    try {
            let queryParams: any = {};

      Object.keys(filter).forEach((key) => {
            queryParams[key] = Array.isArray(filter[key]) && filter[key].length>0 ? filter[key].map((item: any) => `${item.value || item.itemId|| item}`).join(",") : filter[key];
        });
      const res = await api.get(
        `prop/filter`,
        {
          params: {...queryParams},
          headers: { authorization: `Bearer ${logged}`, lang: lang },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getOneProp = createAsyncThunk(
  "property/getOneProp",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`property/${id}`, {
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

type initialtype = {
  defProp: any;
  filterProperty: any;
  isLoading: boolean;
};
const initialState: initialtype = {
  defProp: [],
  filterProperty: [],
  isLoading: false,
};
const propertyertiesSlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFilterProps.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllFilterProps.fulfilled, (state, action) => {
      state.filterProperty = action.payload?.data;
      state.isLoading = false;
    });

    builder.addCase(getOneProp.fulfilled, (state, action) => {
      state.defProp = action.payload?.data;
      state.isLoading = false;
      console.log(state.defProp);
    });

    builder.addCase(getOneProp.pending, (state) => {
      state.isLoading = true;
    });
  },
});
export default propertyertiesSlice.reducer;
