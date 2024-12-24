import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useInsertData } from "../useInsertData";
import { useUpdateData } from "../useUpdateData";

type OrderProps = {
  search?: string;
  date?: Date | null;
  page?: number;
  limit?: number;
};

// Get all orders
export const getAllOrder = createAsyncThunk("order/getAll", async (data:OrderProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    let params:OrderProps ={
      page: data?.page,
      limit: data?.limit,
    };

    if (data?.search) {
      params["search"] = data?.search;
    }

    if (data?.date) {
      params["date"] = data?.date;
    }

  try {
    const res = await api.get(`order`,{params});

    return res.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

// Get one order
export const getOneOrder = createAsyncThunk(
  "order/getOneOrder",
  async (id: string, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await api.get(`order/${id}`);
      console.log(res);

      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Create new order
export const createOrder = createAsyncThunk(
  `order/createOrder`,
  async (formData: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;

    try {
      const res = await useInsertData(`order`, formData);
      dispatch(getAllOrder({}));

      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Edit order
export const editOrder = createAsyncThunk(
  `order/editOrder`,
  async (formData: any, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    console.log(formData,"ds");
    try{
      const res = await useUpdateData(`order/${formData?.id}`, formData?.data);
      dispatch(getAllOrder({page: formData?.page, limit: formData?.limit}));

      return res;
    } catch(err){
      return rejectWithValue(err);
    }

  }
);




type initialtype = {
  orders: any;
  order: any;
  dataCount: number;
  isLoading: boolean;
  rejected: boolean;
};
const initialState: initialtype = {
  orders: [],
  order: [],
  dataCount: 0,
  isLoading: false,
  rejected: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrder.fulfilled, (state, action:any) => {
      state.orders = action.payload;
      state.dataCount = action.payload?.pages;
      state.isLoading = false;
      state.rejected = false;
    });
    builder.addCase(getAllOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllOrder.rejected, (state, action) => {
      state.rejected = true;
    });
    builder.addCase(getOneOrder.fulfilled, (state, action) => {
      state.order = action.payload?.data;
      state.isLoading = false;
      state.rejected = false;
    });
    builder.addCase(getOneOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getOneOrder.rejected, (state, action) => {
      state.rejected = true;
    });
    
    builder.addCase(createOrder.fulfilled, (state, action) => {
      
      state.orders = action.payload?.data;
      state.isLoading = false;
      state.rejected = false;
    });
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.rejected = true;
    });
    
    builder.addCase(editOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.rejected = false;
    });
    builder.addCase(editOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editOrder.rejected, (state, action) => {
      state.rejected = true;
    });

   
  },
});
export default orderSlice.reducer;
