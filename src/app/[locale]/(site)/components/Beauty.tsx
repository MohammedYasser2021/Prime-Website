"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Importing the router
import Image from "next/image";
import BeautyImage from "../../../../assets/homeImages/beauty.png";
import "hover.css";

interface BeautyProps {
  params: {
    locale: string;
  };
}

const Beauty: React.FC<BeautyProps> = ({ params }) => {
  const { locale } = params;
    const router = useRouter(); // Use the useRouter hook
    const navigateToProduct = () => {
      // Navigate to the product detail page using the dynamic productId
      router.push(`${locale}/cartPage/`);
    };
  return (
    <>
      <div className="bg-section h-[355px] relative">
        <div className="w-[90%] xl:h-[495px] h-[300px] mx-auto xl:top-[-70px] top-1/2 xl:-translate-y-0 -translate-y-1/2 relative shadow-md rounded-[30px]">
          <Image
            src={BeautyImage}
            alt="Beauty Image"
            className=" w-full h-full rounded-[30px]"
          />
          <button className="transition-transform duration-300 transform hover:scale-110 bg-secondary w-[180px] h-[67px] border border-[#ffffff] rounded-[20px] text-[#ffffff] text-[22px] font-bold absolute bottom-[30px] left-1/2 -translate-x-1/2 opacity-75">
            {locale == "en" ? "Order Now" : "اطلب الان"}
          </button>
        </div>
      </div>
      <div className="md:w-1/2 w-3/4  flex items-center p-[10px] lg:p-0 lg:flex-row flex-col lg:justify-between mx-auto my-[50px] relative  xl:bottom-[-50px] bg-[#f2d2fd] rounded-[15px]">
        <div className={`p-[20px] h-[44px] flex items-center text-[14px] font-bold text-col md:mb-0 mb-3 ${locale == "en" ? "lg:text-left" : "lg:text-right"} text-center`}>
          {locale == "en"
            ? "Enter your email or account code to receive the latest updates"
            : "ادخل بريدك او كود حسابك ليصلك كل جديد"}
        </div>
        <button className="w-[123px] h-[44px] rounded-[15px] text-[#fff] font-bold text-[14px] bg-[#ebbbfc]" onClick={navigateToProduct}>
          {locale == "en" ? "Subscribe Now" : "اشترك الان"}
        </button>
      </div>
    </>
  );
};

export default Beauty;
