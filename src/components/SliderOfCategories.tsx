"use client";

import "./SliderOfCategories.css";

import { Navigation, Pagination, Virtual } from "swiper/modules";

import SubTiltle from "./SubTiltle";
import SwiperCont from "./SwiperCont";
import { SwiperSlide } from "swiper/react";
import { getAllCategory } from "@/redux/reducer/categorySlice";
import { useAppDispach } from "@/redux/reduxHooks";
import { useAppSelector } from "./../redux/reduxHooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SliderOfCategories() {
  const dispach = useAppDispach();
  const categoriesData = useAppSelector((state) => state.categoryData.Category);
  const router = useRouter();

  useEffect(() => {
    dispach(getAllCategory());
  }, [dispach]);

  return (
    <div className="mx-auto px-4 py-8 sm:px-6 sm:py-6  lg:px-8">
      <SubTiltle title="categories"></SubTiltle>
      <div className="landing1 s:my-3 md:my-8 xl:my-11">
        <SwiperCont
          // centeredSlides={true}
          slidesPerView={{
            s: 1,
            md: 2,
            lg: 3,
          }}
          modules={[Virtual, Navigation, Pagination]}
          length={categoriesData?.data?.length}
        >
          {categoriesData?.data?.length >= 1
            ? categoriesData.data?.map((slid: any, key: number) => (
                <SwiperSlide
                  // style={{ aspectRatio: 1 / 1 }}
                  key={key}
                  className="lg:!max-w-[306px] lg:!w-full s:my-4 xl:my-10 px-3"
                >
                  {/* <ProductCard data={slid} /> */}

                  {/* <div
                    style={{ aspectRatio: 1 / 1 }}
                    key={slid.id}
                    className="group relative mx-2 md:mx-5 h-full "
                  >
                    <div
                      onClick={() => {
                        localStorage.setItem("catHome", `${slid.id}`);
                        router.push("/shop", { scroll: false });
                      }}
                      style={{ aspectRatio: 1 / 1 }}
                      className=" w-full overflow-hidden rounded-full bg-gray-200 lg:aspect-none group-hover:opacity-75 flex items-center justify-center rou "
                    >
                      {slid.img ? (
                        <Image
                          src={slid.img}
                          alt={slid.name}
                          className=" w-full object-cover object-center  lg:w-full"
                          width={200}
                          height={200}
                        />
                      ) : null}
                    </div>
                    <div className="mt-4 flex justify-center">{slid.name}</div>
                  </div> */}
                </SwiperSlide>
              ))
            : null}
        </SwiperCont>
      </div>
    </div>
  );
}
