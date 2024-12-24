import { BsRocketTakeoffFill } from "react-icons/bs";
import Conference from "@/images/icons/conference.png";
import { FaBriefcase } from "react-icons/fa";
import Handshake from "@/images/icons/handshake.png";
import Image from "next/image";
import { IoShieldCheckmark } from "react-icons/io5";
import Profit from "@/images/icons/profit.png";
import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { useTranslations } from "next-intl";

type Props = {};

const FeedbackComp = (props: Props) => {
  const t = useTranslations("HomePage.features");
  const features = [
    { title: t("QA"), icon: <IoShieldCheckmark /> },
    { title: t("client"), icon: <FaBriefcase /> },
    { title: t("delivery"), icon: <TbTruckDelivery /> },
    { title: t("service"), icon: <BsRocketTakeoffFill /> },
  ];
  return (
    <div className="container  md:max-w-2xl lg:max-w-4xl mx-auto xl:max-w-6xl tk:max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-3 py-8 md:py-16">
      {features?.length >= 1 &&
        features?.map((feature: any, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-5 items-center text-primary"
          >
            <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl tk:text-9xl">
              {feature?.icon}
            </div>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tk:text-3xl font-semibold">
              {feature?.title}
            </h1>
          </div>
        ))}
    </div>
  );
};

export default FeedbackComp;
