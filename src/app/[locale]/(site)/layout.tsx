import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "react-datepicker/dist/react-datepicker.css";

import Footer from "@/layouts/Footer";
import InfoBar from "@/layouts/InfoBar";
import NavBar from "@/layouts/NavBar";
import React from "react";
import Transition from "@/components/Transition";

interface propsType {
  children: React.ReactNode;
}

const SiteLayout: React.FC<propsType> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-full w-full relative">
     

      <Transition className="flex-grow-[1]">{children}</Transition>
   
    </div>
  );
};

export default SiteLayout;

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
