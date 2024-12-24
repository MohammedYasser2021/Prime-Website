"use client";

import "./home.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import ImgInfo from "./ImgInfo";
import LandingSwiper from "./Uitily/Swiper";
import { SwiperSlide } from "swiper/react";
import img1 from "../images/1.avif";
import img2 from "../images/1.avif";
import img3 from "../images/1.avif";
import img4 from "../images/hero.png";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Slider({
  gallery,
  aspr = 18 / 9,
  info,
}: {
  gallery?: any;
  aspr?: any;
  info?: any;
}) {
  const { locale } = useParams();

  return (
    <div className="">
      {gallery?.length > 0 && (
        <LandingSwiper>
          {gallery?.map((slide: any, index: number) => (
            <SwiperSlide key={index} className="!relative">
              <div className="bg-gradient-to-b w-full h-full from-[rgb(0,0,0,0.7)] to-[rgb(0,0,0,0.5)] relative">
                <Image
                  style={{ aspectRatio: aspr }}
                  className="object-top object-cover h-full"
                  src={slide?.img}
                  alt=""
                  priority
                  width={40000}
                  height={40000}
                />
              </div>
              <div
                className={`absolute z-20 top-[50%] px-[5%] py-[6%] md:py-[9%] xl:py-[6%] translate-y-[-50%] bg-black bg-opacity-50 w-full h-full text-white flex flex-col justify-between`}
              >
                <div className="font-extrabold">
                  <h1
                    className={`mb-2 flex ${
                      locale == "ar"
                        ? "flex-row"
                        : "flex-row-reverse justify-end"
                    } gap-2 text-xl md:text-5xl xxl:text-5xl xxl:leading-[69px] `}
                  >
                    <span>{locale == "ar" ? "متجر" : "store"}</span>{" "}
                    <span className="text-primary">
                      {" "}
                      {locale == "ar" ? "موارد" : "Mawared"}
                    </span>
                  </h1>
                  <h3 className="text-base md:text-xl lg:text-3xl xxl:text-5xl xxl:leading-[69px] ">
                    {locale == "ar"
                      ? slide?.title[0]["value"]
                      : slide?.title[1]["value"]}
                  </h3>
                </div>
                <h3 className="text-sm md:text-base xl:text-xl leading-8 ">
                  {locale == "ar"
                    ? slide?.description[0]["value"]
                    : slide?.description[1]["value"]}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </LandingSwiper>
      )}
    </div>
  );
}
