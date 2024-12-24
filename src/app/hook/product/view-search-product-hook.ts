"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import {
   getAllProducts,
   getSearchProducts,
} from "@/redux/reducer/productsSlice";

export default function ViewSearchProductHook() {
   const dispatch = useAppDispach();

   let item = [];
   let limit: number = 8;
   let pageDate: number = 0;
   let itemLength: number = 0;
   let word: any = "",
      quertCat: any = "",
      quertbrand: any = "",
      priceFromWord: any = "",
      priceToWord: any = "";

   const getStorage = () => {
      let searchWord = null;
      let catCheckd = null;
      let brandCheckd = null;
      let priceFrom = null;

      if (typeof window !== "undefined") {
         searchWord = localStorage.getItem("searchWord");
         catCheckd = localStorage.getItem("catCheckd");
         brandCheckd = localStorage.getItem("brandCheckd");
         priceFrom = localStorage.getItem("priceFrom");
      }

      if (searchWord != null) {
         word = searchWord;
      }
      if (catCheckd != null) {
         quertCat = catCheckd;
      }
      if (brandCheckd != null) {
         quertbrand = brandCheckd;
      }
      // if (priceFrom === null || priceFrom === "" || (priceFrom as any) <= 0) {
      //   priceFromWord = "";
      // } else {
      //   priceFromWord = `&price[gt]=${priceFrom}`;
      // }
      // if (
      //   localStorage.getItem("priceTo") === null ||
      //   localStorage.getItem("priceTo") === "" ||
      //   (localStorage.getItem("priceTo") as any) <= 0
      // ) {
      //   priceToWord = "";
      // } else {
      //   priceToWord = `&price[lte]=${localStorage.getItem("priceTo")}`;
      // }
   };

   const allProductData = useAppSelector((state) => state.productsData.product);

   getStorage();

   const getProducts = async () => {
      sortData();
      await dispatch(getSearchProducts(`product?${quertCat}&${quertbrand}`));
   };

   useEffect(() => {
      getStorage();

      // getAllProducts();
   }, [dispatch]);

   try {
      if (allProductData?.results) {
         itemLength = allProductData?.results;
      } else {
         itemLength = 0;
      }
   } catch (e) {}

   try {
      if (allProductData?.data) {
         item = allProductData?.data;
      } else {
         item = [];
      }
   } catch (e) {}

   try {
      if (allProductData?.paginationResult) {
         pageDate = allProductData?.paginationResult?.numberOfPages;
      } else {
         pageDate = 0;
      }
   } catch (e) {}
   const onPress = (page: any) => {
      getStorage();
      console.log(quertCat);

      sortData();

      dispatch(getSearchProducts(`/api/v1/products?${quertCat}&${quertbrand}`));
   };

   // when user choose sort type
   let sortType: any = "",
      sort: any;
   const sortData = () => {
      if (localStorage.getItem("sortType") != null) {
         sortType = localStorage.getItem("sortType");
      } else {
         sortType = "";
      }

      if (sortType === "السعر من الاقل للاعلي") {
         sort = "+price";
      } else if (sortType === "السعر من الاعلي للاقل") {
         sort = "-price";
      } else if (sortType === "") {
         sort = "";
      }
      console.log(sort);
   };

   return [item, pageDate, onPress, getProducts, itemLength, getStorage];
}
