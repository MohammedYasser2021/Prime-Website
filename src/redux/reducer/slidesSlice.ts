import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertDataWithImage } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

export const getAllSlidersHeroSection = createAsyncThunk(
  "sliders/getAll",
  async () => {
    const logged = getCookie("token");
    try {
      const res = await api.get("slider", {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res.data;
    } catch (err) {
      console.log(logged);
      console.log(err);
    }
  }
);

export const getAllAds = createAsyncThunk("slides/getAll", async () => {
  const logged = getCookie("token");
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await api.get("slide", {
      headers: { authorization: `Bearer ${logged}` },
    });

    return res.data;
  } catch (err) {
    console.log(logged);
    console.log(err);
  }
});

export const getOneSlide = createAsyncThunk(
  "slides/getOneSlide",
  async (id: string) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`slide/${id}`, {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res;
    } catch (err) {
      console.log(logged);
      console.log(err);
    }
  }
);

// start with delete data

// export const deleteSlides = createAsyncThunk(
//   "slides/deleteSlides",
//   async (id: string, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       console.log(id);
//       const res = await useDeleteData(`slider/${id}`);
//       return res;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// export const creatSlides = createAsyncThunk(
//   `slides/creatSlides`,
//   async (formData: any) => {
//     const res = await useInsertDataWithImage(`slider`, formData);
//     return res;
//   }
// );

// export const editSlides = createAsyncThunk(
//   `slides/editSlides`,
//   async (formData: any) => {
//     console.log(formData);

//     const res = await useUpdateData(`slider/`, formData);
//     return res;
//   }
// );

type initialtype = {
  assets: any;
  defAssets: any;
  isLoading: boolean;
  sliders: any;
};
const initialState: initialtype = {
  assets: [],
  sliders: [],
  defAssets: [],
  isLoading: false,
};
const slidesSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSlidersHeroSection.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllSlidersHeroSection.fulfilled, (state, action) => {
      state.sliders = action.payload?.data;
      state.isLoading = false;
    });
    builder.addCase(getAllAds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAds.fulfilled, (state, action) => {
      state.assets = action.payload?.data;
      state.isLoading = false;
    });
    // builder.addCase(creatSlides.fulfilled, () => {
    //   location.reload();
    // });
    // builder.addCase(deleteSlides.fulfilled, () => {
    //   location.reload();
    // });
    // builder.addCase(editSlides.fulfilled, () => {
    //   location.reload();
    // });
  },
});
export default slidesSlice.reducer;
