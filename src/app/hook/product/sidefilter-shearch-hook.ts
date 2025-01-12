"use client";
import { useEffect } from "react";

import ViewSearchProductHook from "./view-search-product-hook";
import { useState } from "react";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";
import { getAllCategory } from "@/redux/reducer/categorySlice";
import { getAllBrand } from "@/redux/reducer/brandSlice";

export default function SidefilterShearchHook() {
  const [item, pageDate, onPress, getProducts, itemLength, getStorage] =
    ViewSearchProductHook();

  const dispatch = useAppDispach();

  let allBrandData = [];
  let allCategoryData = [];
  const CategoryData = useAppSelector((state) => state.categoryData.Category);
  const BrandData = useAppSelector((state) => state.brandData.brand);
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllBrand());
  }, [dispatch]);

  try {
    if (CategoryData) {
      allCategoryData = CategoryData;
    } else {
      allCategoryData = [];
    }
  } catch (e) {}
  try {
    if (BrandData) {
      allBrandData = BrandData;
    } else {
      allBrandData = [];
    }
  } catch (e) {}
  // checke box Category

  var quertCat = "";

  const [catData, setCatData] = useState<any>([]);
  const clickCategory = (e: any) => {
    let value = e.target?.value;

    if (e.target.checked === true) {
      setCatData([...catData, value]);
      console.log(catData);
    } else if (e.target?.checked === false) {
      setCatData(
        catData.filter((i: any) => {
          return i !== value;
        })
      );
      console.log(catData);
    } else if (e.target?.checked === "0") {
      setCatData([]);
    }
  };
  useEffect(() => {
    const catHome: string | null = localStorage.getItem("catHome");

    catHome ? setCatData([catHome]) : null;

    const brandHome: string | null = localStorage.getItem("brandHome");

    brandHome ? setbrandData([brandHome]) : null;
    localStorage.removeItem("catHome");
    localStorage.removeItem("brandHome");
  }, []);
  useEffect(() => {
    localStorage.setItem("catCheckd", `category=${catData}`);
    setTimeout(() => {
      getStorage();
      setTimeout(() => {
        getProducts();
      }, 500);
    }, 500);
  }, [catData, getStorage, getProducts]); 
  // checke box brand

  var quertbrand = "";

  const [brandData, setbrandData] = useState<any>([]);
  const clickBrand = (e: any) => {
    let value = e.target?.value;

    if (e.target.checked === true) {
      console.log(value);

      setbrandData([...brandData, value]);
      console.log(brandData);
    } else if (e.target?.checked === false) {
      setbrandData(
        brandData.filter((i: any) => {
          return i !== value;
        })
      );
      console.log(brandData);
    } else if (e.target?.checked === "0") {
      setbrandData([]);
    }
  };
  useEffect(() => {
    localStorage.setItem("brandCheckd", `brand=${brandData}`);
    setTimeout(() => {
      getStorage();
      setTimeout(() => {
        getProducts();
      }, 500);
    }, 500);
  }, [brandData, getStorage, getProducts]);

  const [From, setFrom] = useState(0);
  const [To, setTo] = useState(0);

  const priceFrom = (e: any) => {
    localStorage.setItem("priceFrom", e.target?.value);
    setFrom(e.target.value);
  };

  const priceTo = (e: any) => {
    localStorage.setItem("priceTo", e.target?.value);
    setTo(e.target.value);
  };
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 2000);
  }, [From, To, getProducts]);

  return [
    allCategoryData,
    allBrandData,
    clickCategory,
    clickBrand,
    priceTo,
    priceFrom,
  ];
}
