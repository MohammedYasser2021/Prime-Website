"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import Cart from "../../../../assets/homeImages/cart.png";
import Profile from "../../../../assets/homeImages/profile.png";
import Search from "../../../../assets/homeImages/search.png";
import Logo from "../../../../assets/homeImages/logo.png";
import Content from "../../../../assets/homeImages/panner.png";
import Tec1 from "../../../../assets/homeImages/tec1.png";
import Tec2 from "../../../../assets/homeImages/tec2.png";
import HeaderImg from "../../../../assets/homeImages/header.jpg";
import "../../../globals.css";

interface HeaderProps {
  params: {
    locale: string;
  };
}

const Header: React.FC<HeaderProps> = ({ params }) => {
  const { locale } = params;

  return (
    <div
      className="h-[708px] relative overflow-hidden"
      style={{
        backgroundImage: `url(${HeaderImg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container p-[20px]">
        <nav className="flex items-center justify-between flex-wrap">
          {/* Left Navigation */}
          <div className="flex gap-3">
            <button
              title={locale === "en" ? "Cart" : "سلة"}
              className="hvr-pop"
            >
              <Image src={Cart} alt="cart" width={36} height={36} />
            </button>
            <button
              title={locale === "en" ? "Profile" : "الملف الشخصي"}
              className="hvr-pop"
            >
              <Image src={Profile} alt="profile" width={36} height={36} />
            </button>
          </div>

          {/* Center Navigation */}
          <div className="flex gap-3">
            <a href="/" className="font-bold text-[14px] text-[#ffffff]">
              {locale === "en" ? "We Are" : "من نحن"}
            </a>
            <a href="/" className="font-bold text-[14px] text-[#ffffff]">
              {locale === "en" ? "Contact Us" : "الاتصال بنا"}
            </a>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder={
                locale === "en"
                  ? "You will find everything you need with us"
                  : "ستجد كل ما تريد لدينا"
              }
              className="w-[638px] h-[44px] px-[22px] rounded-[15px] opacity-50"
            />
            <Image
              src={Search}
              alt="Search"
              width={40}
              height={37}
              className={`absolute ${
                locale === "en" ? "right-[22px]" : "left-[22px]"
              } top-[50%] transform -translate-y-[50%]`}
            />
          </div>

          {/* Logo */}
          <div>
            <Image src={Logo} alt="Logo" width={159} height={104} />
          </div>
        </nav>

        {/* Language Buttons */}
        <div
          className={`flex justify-end relative top-10 ${
            locale === "en" ? "right-[65px]" : "left-[65px]"
          } header_translate`}
        >
          <div className="relative flex items-center">
            <Link
              href="/ar"
              className={`w-[48px] h-[26px] z-10 rounded-[10px] ${locale == "en" ? "bg-secondary pl-2" : "bg-primary pr-2"} text-[#ffffff] text-[14px]`}
            >
              عربي
            </Link>
            <Link
              href="/en"
              className={`w-[86px] h-[26px] rounded-[10px] leading-[21px] text-[#ffffff] text-[14px] absolute ${
                locale === "en"
                  ? "right-0 pr-[56px] bg-primary"
                  : "left-0 pl-[56px] bg-secondary"
              } flex items-center justify-end`}
            >
              EN
            </Link>
          </div>
        </div>

        {/* Header Content */}
        <div className="header_content flex items-center gap-5">
          <div className="w-[574px] h-[561px]">
            <Image src={Content} alt="banner" width={574} height={561} />
          </div>
          <div className="header_desc">
            <h1 className="font-bold text-[40px] text-[#ffffff]">
              {locale === "en" ? "SHAAN CREAM" : "كريم شان"}
            </h1>
            <p className="font-bold text-[25px] text-[#ffffff] max-w-[481px]">
              {locale === "en"
                ? "Today's special offer from shaan cream with a 30% discount on the German sunscreen"
                : "العرض المميز اليوم من كريم شان بخصم 30% \n الواقي الشمسي الالماني"}
            </p>
            <button className="text-[#ffffff] text-[22px] font-bold mt-20 bg-third border border-[#ffffff] w-[180px] h-[67px] rounded-[20px] hvr-pop">
              {locale === "en" ? "Order Now" : "اطلب الان"}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Images */}
      <div
        className={`absolute ${
          locale === "en" ? "top-[450px]" : "top-[325px]"
        } left-[-20px]`}
      >
        <Image src={Tec1} alt="tec" width={100} height={100} />
      </div>
      <div
        className={`absolute ${
          locale === "en" ? "top-[325px]" : "top-[450px]"
        } right-[-12px]`}
      >
        <Image
          src={Tec2}
          alt="tec"
          width={100}
          height={100}
          className="transform scale-x-[-1]"
        />
      </div>
      <div
        className="absolute border-l-[29.5px] border-r-[29.5px] border-b-[92px] border-transparent border-b-[#E4A4FB] opacity-50"
        style={{
          width: 0,
          height: 0,
          top: "253px",
          [locale === "en" ? "right" : "left"]: "260.88px",
          transform: `${locale === "ar" ? "scaleX(-1) rotate(-72.8deg)" : "rotate(-72.8deg)"}`,
        }}
      ></div>
    </div>
  );
};

export default Header;
