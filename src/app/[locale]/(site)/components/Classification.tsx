import React from "react";
import Image from "next/image";
import Cosmatics from "../../../../assets/homeImages/cosmatics.png";
import Honey from "../../../../assets/homeImages/honey.png";
import Akbar from "../../../../assets/homeImages/akbar.png";
interface ClassificationProps {
  params: {
    locale: string;
  };
}

const Classification: React.FC<ClassificationProps> = ({ params }) => {
  const { locale } = params;
  return (
    <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
      <h1
        className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${
          locale == "en" ? "lg:text-left" : "lg:text-right"
        } `}
      >
        {locale === "en" ? "Choose Classification" : "اختر التصنيف "}
      </h1>
      <div className="flex flex-wrap justify-center gap-x-[87px] mx-auto">
        <div className="classification_item text-center">
          <Image
            src={Cosmatics}
            alt="Cosmatics"
            className="w-[120px] h-[120px] mb-2 shadow-md rounded-full mx-auto"
          />
          <h1 className="text-[18px] font-bold ">
            {locale === "en" ? "Cosmatics" : "مستحضرات التجميل"}
          </h1>
        </div>
        <div className="classification_item text-center">
          <Image
            src={Akbar}
            alt="Akbar"
            className="w-[120px] h-[120px] mb-2 shadow-md rounded-full mx-auto"
          />
          <h1 className="text-[18px] font-bold ">
            {locale === "en" ? "Natural Akbar" : "العكبر الطبيعي"}
          </h1>
        </div>
        <div className="classification_item text-center">
          <Image
            src={Honey}
            alt="Honey"
            className="w-[120px] h-[120px] mb-2 shadow-md rounded-full mx-auto"
          />
          <h1 className="text-[18px] font-bold ">
            {locale === "en" ? "Honey" : "العسل الطبيعي"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Classification;
