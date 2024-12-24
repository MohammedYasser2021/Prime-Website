"use client";

import "./SliderOfCategories.css";

import { Autoplay, Navigation, Pagination, Virtual } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import CategoriesCont from "./pageComponents/HomePage/categoriesCont";
import Image from "next/image";
import ImgInfo from "./ImgInfo";
import SubTiltle from "./SubTiltle";
import SwiperCont from "./SwiperCont";
import { SwiperSlide } from "swiper/react";
import { getAllBrand } from "@/redux/reducer/brandSlice";
import { getAllCategory } from "@/redux/reducer/categorySlice";
import { getAllProducts } from "@/redux/reducer/productsSlice";
import img1 from "../images/1.avif";
import img2 from "../images/1.avif";
import img3 from "../images/1.avif";
import img4 from "../images/1.avif";
import { useAppDispach } from "@/redux/reduxHooks";
import { useAppSelector } from "./../redux/reduxHooks";
import { useRouter } from "next/navigation";

export default function SliderOfBrand() {
  const dispach = useAppDispach();
  const { brand } = useAppSelector((state) => state.brandData);
  const router = useRouter();

  useEffect(() => {
    dispach(getAllBrand());
  }, [dispach]);

  return (
    <>
      {brand?.length > 0 && (
        <div className="w-full px-4 container mx-auto lg:px-8 xxl:px-0">
          <SubTiltle title="brands"></SubTiltle>
          <div className="mb-8">
            <SwiperCont
              centeredSlides={true}
              slidesPerView={{ s: 1, md: 4, xxl: 5 }}
              modules={[Virtual, Navigation, Pagination, Autoplay]}
              navigation={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              className="!py-7 sm:!py-9 sm:!pt-2 !w-full"
              spaceBetween={30}
              speed={1000}
              freeMode={true}
              style={{
                // @ts-ignore
                "--swiper-pagination-color": "#212121",
                "--swiper-navigation-color": "#212121",
                "--swiper-navigation-size": `50px`,
              }}
            >
              {brand?.map((slid: any, key: number) => (
                <SwiperSlide
                  // style={{ aspectRatio: 1 / 1 }}
                  key={key}
                  className="!mx-auto xl:!my-10"
                >
                  <div
                    // style={{ aspectRatio: 1 / 1 }}
                    onClick={() => {
                      router.push(`/shop?brand=${slid?._id}`, {
                        scroll: false,
                      });
                    }}
                    key={slid?.id}
                    className="mx-1 md:mx-3 xl:mx-0 cursor-pointer"
                  >
                    {slid?.img && (
                      <Image
                        src={slid?.img}
                        alt={slid?.name}
                        className="h-[200px] object-contain"
                        width={4000}
                        height={4000}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </SwiperCont>
          </div>
        </div>
      )}{" "}
    </>
  );
}
