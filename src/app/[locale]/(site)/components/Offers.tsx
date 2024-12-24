import React from "react";
import Image from "next/image";
import Offer1 from "../../../../assets/homeImages/offer1.png";
import Offer2 from "../../../../assets/homeImages/offer2.png";
import Offer3 from "../../../../assets/homeImages/offer3.png";

interface OffersProps {
  params: {
    locale: string;
  };
}

const Offers: React.FC<OffersProps> = ({ params }) => {
  const { locale } = params;
  return (
    <div className="bg-section min-h-[773px] relative">
      <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
        <h1
          className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${
            locale == "en" ? "lg:text-left" : "lg:text-right"
          } `}
        >
          {locale === "en" ? "Today Offers" : "عروض اليوم"}
        </h1>
        <div className="flex flex-wrap justify-center gap-6 mx-auto">
          <div className="classification_item w-[335px] h-[500px] relative">
            <Image
              src={Offer3}
              alt="Offer1"
              className="w-full h-full rounded-[20px]"
            />
            <button className="transition-transform duration-300 transform hover:scale-110 bg-secondary w-[150px] h-[67px] border border-[#ffffff] rounded-[20px] text-[#ffffff] text-[22px] font-bold absolute bottom-[50px] left-1/2 -translate-x-1/2 opacity-75">
              {locale == "en" ? "Order Now" : "اطلب الان"}
            </button>
          </div>
          <div className="classification_item w-[335px] h-[500px] relative xl:bottom-[-100px]">
            <Image
              src={Offer1}
              alt="Offer2"
              className="w-full h-full rounded-[20px]"
            />
            <button className="transition-transform duration-300 transform hover:scale-110 bg-secondary w-[150px] h-[67px] border border-[#ffffff] rounded-[20px] text-[#ffffff] text-[22px] font-bold absolute bottom-[50px] left-1/2 -translate-x-1/2 opacity-75">
              {locale == "en" ? "Order Now" : "اطلب الان"}
            </button>
          </div>
          <div className="classification_item w-[335px] h-[500px] relative">
            <Image
              src={Offer2}
              alt="Offer3"
              className="w-full h-full rounded-[20px]"
            />
            <button className="transition-transform duration-300 transform hover:scale-110 bg-secondary w-[150px] h-[67px] border border-[#ffffff] rounded-[20px] text-[#ffffff] text-[22px] font-bold absolute bottom-[50px] left-1/2 -translate-x-1/2 opacity-75">
              {locale == "en" ? "Order Now" : "اطلب الان"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
