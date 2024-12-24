import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";

import Clock from "@/images/icons/Vector.svg";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import Phone from "@/images/icons/phone.svg";
import React from "react";
import { useTranslations } from "next-intl";

type Props = {};

const InfoBar = (props: Props) => {
  const t = useTranslations("InfoBar");
  const infobar = [
    {
      image: Phone,
      alt: "phone",
      title: t("phone.title"),
      subtitle: t("phone.subtitle"),
    },
    {
      image: Clock,
      alt: "clock",
      title: t("clock.title"),
      subtitle: t("clock.subtitle"),
    },
  ];

  const socials = [
    {
      icon: <FaLinkedin />,
      link: "",
    },
    {
      icon: <FaInstagram />,
      link: "",
    },
    {
      icon: <FaTwitter className="p-[1px]" />,
      link: "",
    },
    {
      icon: <FaFacebookF className="p-[1px]" />,
      link: "",
    },
  ];
  return (
    <div className="w-full flex flex-col se:flex-row se:items-center gap-3 se:gap-0 justify-between px-2 xl:px-14 py-3 bg-[#387B6E] text-white">
      <div className="flex gap-2 md:gap-5 items-center">
        {socials.map((social, index) => (
          <div
            key={index}
            className={`text-xs se:text-[10px] md:text-xl object-cover cursor-pointer hover:text-gray-300 transition-all duration-300 ease-in-out`}
          >
            {social.icon}
          </div>
        ))}
      </div>
      <div className="xxl:mr-20 flex flex-col se:flex-row se:items-center gap-3 md:gap-3 text-[9px] se:text-[8px] md:text-xs">
        {infobar.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 md:gap-3 md:justify-between"
          >
            <div className="md:mx-[7px]">
              <Image
                width={2000}
                height={2000}
                alt={item.alt}
                src={item.image}
                className="w-4 h-4 se:w-2.5 se:h-2.5 md:w-5 md:h-5"
              />
            </div>
            <h2>{item.title}</h2>
            <h2>{item.subtitle}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBar;
