import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

export default function LandingSwiper({ children }: any) {
  return (
    <div>
      <Swiper
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={5}
        centeredSlides={true}
        speed={1000}
        freeMode={true}
        slidesPerView={1}
        style={{
          // @ts-ignore
          "--swiper-pagination-color": "#e0e0e0",
        }}
        // zoom={true}

        // pagination={{ clickable: true }}
        // pagination={{
        //   dynamicBullets: true,
        // }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        // scrollbar={{ draggable: true }}
        className="mySwiper !relative !w-full h-[200px] md:h-[400px] xl:h-[450px] xxl:h-[500px]"
      >
        {children}
      </Swiper>
    </div>
  );
}
