"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { SwiperNavButtons } from "./Buttons/SlideNavBtns";

// Import Swiper styles

export default function SwiperCont({
  children,
  slidesPerView,
  modules,
  centeredSlides,
  length,
  className,
  ...props
}: any) {
  const [swiperReff, setSwiperReff] = useState<any>(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);
  const swiper = useSwiper();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // const prepend = () => {
  //   prependNumber.current = prependNumber.current - 2;
  //   swiperReff.slideTo(swiperRef.activeIndex + 2, 0);
  // };

  // const slideTo = (index: any) => {
  //   swiperReff.slideTo(index - 1, 0);
  // };

  return (
    <div className="mx-auto md">
      <Swiper
        effect="fade"
        // onslide
        grabCursor={true}
        breakpoints={{
          0: {
            slidesPerView: slidesPerView.s,
          },

          // when window width is >= 768px
          768: {
            slidesPerView: slidesPerView.md,
          },
          1440: {
            slidesPerView: slidesPerView.xxl,
          },
        }}
        modules={modules}
        centeredSlides={centeredSlides}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        {...props}
        virtual
        className={`mySwiper ${className}`}
      >
        {children}
      </Swiper>
    </div>
  );
}
