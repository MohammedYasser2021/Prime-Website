import { useInsertData, useInsertDataWithImage } from "../useInsertData";

import { api } from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import useDeleteData from "../useDeleteData";
import { useUpdateDataWithImage } from "../useUpdateData";

type MostPurchasedProps = {
  limit?: number;
};

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (filter?: any) => {
    try {
      let queryParams: any = {};
      const props: any = [];
      // if (filter) {
      //   // test=kjgsafkjgaskjd&test2=ksjdfkjsdf&props=66087ee7cd44aa6d9ccfa86a_50_60,66087ef0cd44aa6d9ccfa86f_66087ef0cd44aa6d9ccfa871
      //   // 1. Loop through each key in the filter object
      //   // 2. check if the key has a number in it with regex and set it in 'props' query
      //   // 3. sepearte the props query by comma

      Object.keys(filter).forEach((key) => {
        //contains number in string

        if (/^(0x|0h)?[0-9A-F]+$/i.test(key) && key.length == 24) {
          // props=66087ee7cd44aa6d9ccfa86a_50_60,66087ef0cd44aa6d9ccfa86f_66087ef0cd44aa6d9ccfa871
          if (filter[key].value && filter[key].value.length > 0) {
            props.push(
              `${key + "_"}${
                Number(filter[key].value[0]) +
                "_" +
                Number(filter[key].value[1])
              }`
            );
          } else if (filter[key].length > 0) {
            props.push(
              `${key + "_"}${filter[key]?.map((item: any) => item.itemId)}`
            );
          }
        } else {
          queryParams[key] =
            Array.isArray(filter[key]) && filter[key].length > 0
              ? filter[key]
                  .map((item: any) => `${item.value || item.itemId || item}`)
                  .join(",")
              : filter[key];
          // return `${key}=${filter[key]
          //   .map((item: any) => `${item.value || item.itemId|| item}`)
          //   .join(",")}`;
        }
      });

      // Make API call with the whole query parameters
      const res = await api.get("/product", {
        params: {
          ...queryParams,
          ...(props.length > 0 && { props: props.join(",") }),
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getAllSimilarProducts = createAsyncThunk(
  "product/getAllSimilarProducts",
  async (filter?: any) => {
    try {
      let queryParams: any = {};
      const props: any = [];

      console.log(filter, "filter");

      Object.keys(filter).forEach((key) => {
        queryParams[key] =
          Array.isArray(filter[key]) && filter[key].length > 0
            ? filter[key]
                .map((item: any) => `${item.value || item.itemId || item}`)
                .join(",")
            : filter[key];
      });

      // Make API call with the whole query parameters
      const res = await api.get("/product", {
        params: {
          ...queryParams,
          ...(props.length > 0 && { props: props.join(",") }),
        },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getSearchProducts = createAsyncThunk(
  "product/get",
  async (url: any) => {
    try {
      const res = await api.get(url);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const getVendorProducts = createAsyncThunk(
  "product/getVendorProducts",
  async () => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get("/product/vendor", {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getOneProducts = createAsyncThunk(
  "product/getOneProducts",
  async (id?: any) => {
    const logged = getCookie("token");
    const lang = localStorage.getItem("i18nextLng");
    try {
      const res = await api.get(`product/${id}`, {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addRating = createAsyncThunk(
  `product/addRating`,
  async (formData: any, { dispatch }) => {
    const res = await useInsertData(`product/${formData?.productId}/rating`, {
      rating_price: formData?.rating?.Price,
      rating_quality: formData?.rating?.Quality,
      rating_value: formData?.rating?.Value,
      review: {
        comment: formData?.comment,
        first_name: formData?.firstName,
        last_name: formData?.lastName,
      },
    });

    dispatch(getOneProducts(formData?.productId));
    return res;
  }
);

export const getHomeProducts = createAsyncThunk(
  "homeProducts/getAll",
  async () => {
    const logged = getCookie("token");
    try {
      const res = await api.get("/homeProduct", {
        headers: { authorization: `Bearer ${logged}` },
      });

      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getMostPurchasedProducts = createAsyncThunk(
  "product/mostPurchased",
  async ({ limit }: MostPurchasedProps) => {
    try {
      const res = await api.get(`product/mostPurchased?limit=${limit}`);

      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
);

type initialtype = {
  product: any;
  defproduct: any;
  VendorProducts: any;
  homeProducts: any;
  similarProducts: any;
  mostPurchasedProducts: any;
  isLoading: boolean;
  ratingLoading: boolean;
};
const initialState: initialtype = {
  product: [],
  defproduct: [],
  VendorProducts: [],
  homeProducts: [],
  similarProducts: [],
  mostPurchasedProducts: [],
  isLoading: false,
  ratingLoading: false,
};
const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getAllSimilarProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllSimilarProducts.fulfilled, (state, action) => {
      state.similarProducts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getHomeProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getHomeProducts.fulfilled, (state, action) => {
      state.homeProducts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getMostPurchasedProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMostPurchasedProducts.fulfilled, (state, action) => {
      state.mostPurchasedProducts = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchProducts.fulfilled, (state, action) => {
      state.product = action.payload?.data;
      state.isLoading = false;
    });
    builder.addCase(getOneProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOneProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.defproduct = action.payload;
    });
    builder.addCase(getVendorProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVendorProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.VendorProducts = action.payload?.data;
    });

    // Add Rating for product
    builder.addCase(addRating.pending, (state) => {
      state.ratingLoading = true;
    });
    builder.addCase(addRating.fulfilled, (state) => {
      state.ratingLoading = false;
    });
  },
});
export default productsSlice.reducer;
