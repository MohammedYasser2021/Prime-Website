import ToastifySlice from "./../reducer/notifications";
import brandSlice from "../reducer/brandSlice";
import cartSlice from "../reducer/cartSlice";
import categorySlice from "../reducer/categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import contactUsSlice from "../reducer/contactUsSlice";
import counterSlice from "../reducer/counterSlice";
import currencySlice from "../reducer/currenciesSlice";
import orderSlice from "../reducer/orderSlice";
import productsSlice from "../reducer/productsSlice";
import propertiesSlice from "../reducer/PropertiesSlice";
import slidesSlice from "../reducer/slidesSlice";
import userSlice from "../reducer/userSlice";

// import categoriesSlice from "../reducer/categoriesSlice";

export const storeCounter = configureStore({
  reducer: {
    ToastifyDate: ToastifySlice,
    orderData: orderSlice,
    userData: userSlice,
    cartData: cartSlice,
    productsData: productsSlice,
    categoryData: categorySlice,
    propsData: propertiesSlice,
    currencyData: currencySlice,
    brandData: brandSlice,
    slidesData: slidesSlice,
    counter: counterSlice,
    contactUsData: contactUsSlice,
  },
  //  middleware: (getDefaultMiddleware) =>

  //     getDefaultMiddleware({
  //         serializableCheck: {

  //         },
  //     }),
});
export type RootState = ReturnType<typeof storeCounter.getState>;
export type AppDispatch = typeof storeCounter.dispatch;
export default storeCounter;
