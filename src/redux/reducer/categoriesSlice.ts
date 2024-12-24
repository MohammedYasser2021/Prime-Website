// import { api } from "@/lib/axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { createSlice } from "@reduxjs/toolkit";
// import { getCookie } from "cookies-next";
// import useDeleteData from "../useDeleteData";
// import { useInsertData } from "../useInsertData";
// import { useUpdateData } from "../useUpdateData";

// // start get data
// export const getAllcategory = createAsyncThunk(
//   "category/getAllcategory",
//   async () => {
//     const logged = getCookie("token");
//     try {
//       const res = await api.get("category", {
//         headers: { authorization: `Bearer ${logged}` },
//       });
//       console.log(res);

//       return res;
//     } catch (err) {
//       console.log(logged);
//       console.log(err);
//     }
//   }
// );

// export const searchByEmail = createAsyncThunk(
//   "users/searchByEmail",
//   async (usn: string) => {
//     const logged = getCookie("token");
//     try {
//       const res = await api.get(`user/searchByEmail?email=${usn}`, {
//         headers: { authorization: `Bearer ${logged}` },
//       });
//       console.log(res);

//       return res;
//     } catch (err) {
//       console.log(logged);
//       console.log(err);
//     }
//   }
// );
// export const getAllVendors = createAsyncThunk("Vendor/getAll", async () => {
//   const logged = getCookie("token");
//   try {
//     const res = await api.get("vendor", {
//       headers: { authorization: `Bearer ${logged}` },
//     });
//     console.log(res);

//     return res;
//   } catch (err) {
//     console.log(logged);
//     console.log(err);
//   }
// });
// // end of geting data
// // start with add data
// type dataUser = {
//   name: string;
//   phone: string;
//   email: string;
//   rEmail: string;
//   password: string;
//   passwordConfirm: string;
//   subscription?: any;
// };
// export const creatUser = createAsyncThunk(
//   "users/creatUser",
//   async (formData: dataUser, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       await useInsertData("user/addUser", formData);
//     } catch (err) {
//       console.log(err);

//       return rejectWithValue(err);
//     }
//   }
// );
// export const statuUser = createAsyncThunk(
//   "users/statuUser",
//   async (formData: any) => {
//     await useUpdateData(`user/${formData.id}/user/`, formData.data);
//   }
// );
// export const addDefaultPassword = createAsyncThunk(
//   "users/defaultPassword",
//   async (formData: any) => {
//     await useUpdateData(`user`, formData);
//   }
// );

// // end with adding data

// // start with delete data

// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   async (id: string, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       console.log(id);
//       const res = await useDeleteData(`user/${id}`);
//       return res;
//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   }
// );

// // end of deleting data

// // start with edit data
// type data = {
//   url: string;
//   formData: {
//     name?: string;
//     type?: string;
//     users?: any;
//     validDate?: string;
//     products?: any;
//     status?: boolean;
//   };
// };
// export const editUserSup = createAsyncThunk(
//   "users/UpdateUser",
//   async (data: data, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       const res = await useUpdateData(`subModule/${data.url}`, data.formData);
//       return res;
//     } catch (err) {
//       console.log(err);
//       return rejectWithValue(err);
//     }
//   }
// );

// // end with editing data

// type initialtype = {
//   category: any;
//   vendor: any;
//   isLioding: boolean;
//   dfp: boolean;
// };
// const initialState: initialtype = {
//   category: [],
//   vendor: [],
//   isLioding: false,
//   dfp: false,
// };
// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getAllcategory.fulfilled, (state, action) => {
//       state.category = action.payload?.data;
//       state.isLioding = false;
//       console.log(action.payload?.data);

//       console.log(state.category);
//     });
//     builder.addCase(getAllcategory.pending, (state) => {
//       state.isLioding = true;
//     });
//     // start with delete data
//     builder.addCase(deleteUser.pending, (state) => {
//       console.log(state);
//     });

//     builder.addCase(creatUser.rejected, (state) => {
//       state.dfp = true;
//       console.log(state.dfp);
//     });

//     builder.addCase(searchByEmail.fulfilled, (state, action) => {
//       state.category = action.payload;
//       state.isLioding = false;
//     });
//     builder.addCase(searchByEmail.pending, (state) => {
//       state.isLioding = true;
//     });

//     builder.addCase(getAllVendors.fulfilled, (state, action) => {
//       state.vendor = action.payload;
//       state.isLioding = false;
//     });

//     builder.addCase(creatUser.fulfilled, () => {
//       location.reload();
//     });
//     builder.addCase(deleteUser.fulfilled, () => {
//       location.reload();
//     });
//     builder.addCase(editUserSup.fulfilled, () => {
//       location.reload();
//     });
//   },
// });
// export default categorySlice.reducer;
