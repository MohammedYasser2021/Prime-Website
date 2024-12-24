"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/components/Uitily/ProductCard";
import { useTranslations } from "next-intl";

// Install Swiper modules

type Props = {
  products: any;
  title?: string;
  className?: string;
  breakpoints?: any;
};
export const ProductsCont = ({
  products,
  title,
  className,
  breakpoints,
}: Props) => {
  const t = useTranslations("Tiltle");

  return (
    <>
      {title && (
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold my-3 md:my-5 xl:my-7">
          {t(title)}
        </h1>
      )}

      <Swiper
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#212121",
          "--swiper-navigation-color": "#212121",
          "--swiper-navigation-size": `50px`,
        }}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className={`${className} mySwiper !pb-7 sm:!pb-10`}
        slidesPerView={1}
        spaceBetween={10}
        speed={1000}
        breakpoints={
          breakpoints ?? {
            640: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            1670: {
              slidesPerView: 4,
            },
          }
        }
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        rewind
      >
        {products?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="!h-auto">
            <ProductCard
              data={item?.product ?? item}
              preview={"grid"}
              index={index}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
