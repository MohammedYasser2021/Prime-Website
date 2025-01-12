"use client";

import React, { useEffect } from "react";
import {
  getAllAds,
  getAllSlidersHeroSection,
} from "@/redux/reducer/slidesSlice";
import {
  getHomeProducts,
  getMostPurchasedProducts,
} from "@/redux/reducer/productsSlice";
import { useAppDispach, useAppSelector } from "@/redux/reduxHooks";

import AdsView from "@/app/[locale]/(site)/components/AdsView";
import FeedbackComp from "../HomePage/FeedbackComp";
import Loading from "@/components/Uitily/Loading";
import { ProductsCont } from "../HomePage/ProductsCont";
import Slider from "@/components/Slider";
import SliderOfBrand from "@/components/SliderOfBrand";
import { getCookie } from "cookies-next";
import { getFavourites } from "@/redux/reducer/userSlice";

type Props = {};

const HomeComp = (props: Props) => {
  const dispach = useAppDispach();
  const Logged = getCookie("token");
  const { product, homeProducts, mostPurchasedProducts } = useAppSelector(
    (state) => state.productsData
  );
  const { isLoading, assets, sliders } = useAppSelector(
    (state) => state.slidesData
  );

  const limit = 15;

  useEffect(() => {
    // dispach(getAllProducts());
    dispach(getAllAds());
    dispach(getAllSlidersHeroSection());
    dispach(getHomeProducts());
    dispach(getMostPurchasedProducts({ limit }));
  }, [dispach]);

  useEffect(() => {
    if (Logged) dispach(getFavourites());
  }, [Logged,dispach]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative">
      {" "}
      {sliders && <Slider gallery={sliders} aspr={28 / 7} />}
      <FeedbackComp />
      <AdsView isLoading={isLoading} gallery={assets} products={homeProducts} />
      {mostPurchasedProducts && mostPurchasedProducts.length > 0 && (
        <section className="my-10 w-full px-4 mx-auto lg:px-8 xxl:px-0">
          <ProductsCont
            title="mostPurchased"
            products={mostPurchasedProducts}
          />
        </section>
      )}
      <SliderOfBrand />
    </div>
  );
};

export default HomeComp;
