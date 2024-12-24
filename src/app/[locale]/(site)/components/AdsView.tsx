import React, { useEffect, useRef, useState } from "react";

import Banner from "@/components/pageComponents/HomePage/Banner";
import Link from "next/link";
import ProductCard from "@/components/Uitily/ProductCard";
import { ProductsCont } from "@/components/pageComponents/HomePage/ProductsCont";
import { useAppSelector } from "@/redux/reduxHooks";
import { useTranslations } from "next-intl";

type Props = {
  gallery: any;
  isLoading: boolean;
  products: any;
};

const AdsView = ({ gallery, isLoading, products }: Props) => {
  const t = useTranslations("HomePage.adsViews");
  // Function to get image by id from assets array
  const getImageById = (id: number) => {
    const asset = gallery?.find((_item: any, index: number) => index === id);
    return asset ?? null;
  };

  // To get the entire width screen
  let width = 0;
  let height = 0;

  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  const widthSwiper = () => {
    switch (width) {
      case width >= 768 && width < 1440 ? width : "":
        return "60vh";
      case width >= 1440 ? width : "":
        return "100vh";
      default:
        return "100%";
    }
  };

  return (
    <div className="">
      {/* First Section */}
      <div className="grid gap-1 grid-rows-2 md:grid-cols-[1fr,1.5fr] md:grid-rows-1">
        <div className="flex gap-1 flex-col">
          {/* First Image */}
          <Banner image={isLoading ? null : getImageById(0)} />
          <div className="flex gap-1">
            {/* Second Image */}
            <Banner image={isLoading ? null : getImageById(1)} />
            {/* Third Image */}
            <Banner image={isLoading ? null : getImageById(2)} />
          </div>
        </div>
        {/* Fourth Image */}
        <Banner
          className="h-full w-full object-center object-fill"
          image={isLoading ? null : getImageById(3)}
        />
      </div>

      {/* Second Section */}
      <div className="flex flex-col md:flex-row gap-3 mt-5">
        <div className="flex flex-row md:flex-col gap-1 w-full h-auto md:max-w-[150px] lg:max-w-[220px] xl:max-w-[260px] xxxl:max-w-[280px]">
          {/* Fifth Image */}
          <Banner className="" image={isLoading ? null : getImageById(4)} />
          {/* Sixth Image */}
          <Banner className="" image={isLoading ? null : getImageById(5)} />
        </div>
        <div className="flex flex-col gap-1 flex-1 md:w-[70vh] xl:w-[100vh] h-full">
          {/* Seventh Image */}
          <Banner
            className="!max-h-[80px] md:!max-h-[115px] lg:!max-h-[165px] xxxl:!max-h-[200px] h-full w-full"
            image={isLoading ? null : getImageById(6)}
          />

          <div className={`px-2 s:px-2.5 se:px-3 pt-3`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[30px] font-bold">{t("newArrivals")}</h2>
              <Link href={"/shop"}>
                <h2 className="underline cursor-pointer text-lg">
                  {t("viewMore")}
                </h2>
              </Link>
            </div>
            {products?.new_arrival && (
              <ProductsCont products={products?.new_arrival} className="" />
            )}
          </div>
        </div>
      </div>

      {/* Third Section */}
      <div className="mt-5 flex flex-col w-full h-full gap-9">
        {/* Eighth Image */}
        <Banner
          className="!max-h-[100px] md:!max-h-[115px] lg:!max-h-[165px] xxxl:!max-h-[200px] h-full w-full md:mt-5 xl:mt-8"
          image={isLoading ? null : getImageById(7)}
        />
        <div className={`mx-2 s:mx-2.5 se:mx-3 xl:ltr:ml-3 xl:rtl:mr-3`}>
          <h2 className="text-[30px] font-bold">{t("topItems")}</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-[80%,19%] gap-3 mt-5 `}
          >
            {products?.top_items && (
              <ProductsCont
                products={products?.top_items}
                className="w-full !h-full"
              />
            )}

            {/* Nineth Image */}

            <Banner className="" image={isLoading ? null : getImageById(8)} />
          </div>
        </div>
        {/* Tenth Image */}
        <Banner
          className="!max-h-[100px] md:!max-h-[115px] lg:!max-h-[165px] xxxl:!max-h-[200px] h-full w-full md:mt-5 xl:mt-8 md:mb-8"
          image={isLoading ? null : getImageById(9)}
        />
      </div>
    </div>
  );
};

export default AdsView;
