import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { useUpdateData } from "../useUpdateData";

export const getCart = createAsyncThunk("user/getCart", async () => {

  try {
    const res = await api.get("user/getCart");

    return res.data;
  } catch (err) {
    // console.log(logged);
    console.log(err);
  }
});

export const getProfile = createAsyncThunk("user/getProfile", async () => {
  try {
    const res = await api.get("/user");
    // console.log(res);

    return res.data;
  } catch (err) {
    // console.log(logged);
    console.log(err);
  }
});

export const getFavourites = createAsyncThunk(
  "getFavourites",
  async () => {
    try {
      const res = await api.get("user/getFavourites");
      // console.log(res);

      return res.data;
    } catch (err) {
      // console.log(logged);
      console.log(err);
    }
  }
);
// start with delete data

export const deleteFav = createAsyncThunk(
  "user/deleteFav",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      // console.log(id);
      const res = await useUpdateData(`user/${id}/removeFav`);
      dispatch(getFavourites());
      return res;
    } catch (err) {
      console.log(err, "error");

      return rejectWithValue(err);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "user/deleteCart",
  async (id: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      // console.log(id);
      const res = await useUpdateData(`user/${id}/removeFromCart`);
      dispatch(getCart());
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);



export const addFav = createAsyncThunk(
  `user/addFav`,
  async (id: string, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      // console.log(id);
      const res = await useUpdateData(`user/${id}/addFav`);
      dispatch(getFavourites());
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addToCart = createAsyncThunk(
  `user/addToCart`,
  async (formData: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      const res = await useUpdateData(
        `user/${formData.id}/addToCart`,
        formData.formData
      );
      dispatch(getCart());
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// export const register = createAsyncThunk(
//   `user/register`,
//   async (formData: any, thunkAPI) => {
//     const { rejectWithValue, dispatch } = thunkAPI;
//     try {
//       const res = await useInsertData(
//         `user/${formData.id}/addToCart`,
//         formData.formData
//       );
//       dispatch(getCart());
//       return res;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );
type initialtype = {
  user: any;
  fav: any;
  cart: any;
  isLoading: boolean;
};
const initialState: initialtype = {
  user: [],
  fav: [],
  cart: [],
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get data
    builder.addCase(getProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      // console.log(state.user);
    });

    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
      // console.log(state.cart);
    });

    builder.addCase(getFavourites.pending, (state) => {
      state.isLoading = true;
    });
    
    builder.addCase(getFavourites.fulfilled, (state, action) => {
      state.fav = action.payload;
      state.isLoading = false;
    });
    //add data

    builder.addCase(addFav.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFav.fulfilled, (state) => {
      state.isLoading = false;
    });

    // Add product to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.isLoading = false;
    });

    // delete data
    builder.addCase(deleteFav.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteFav.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCart.fulfilled, () => {});
  },
});
export default userSlice.reducer;
