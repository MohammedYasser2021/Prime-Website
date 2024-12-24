import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSwiper, useSwiperSlide } from "swiper/react";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns">
      <button onClick={() => swiper.slidePrev()}>
        <MdKeyboardArrowLeft />
      </button>
      <button onClick={() => swiper.slideNext()}>
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};
