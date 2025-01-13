"use client";
import React, { useState } from "react";
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from "next/image";
import {
  FaBars,
  FaInfoCircle,
  FaCog,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa"; // Import required icons
import Search from "../../../../assets/homeImages/search.png";
import Logo from "../../../../assets/homeImages/logo.png";
import Cart from "../../../../assets/homeImages/cart.png";
import Profile from "../../../../assets/homeImages/profile.png";
import HeaderImg from "../../../../assets/homeImages/header.jpg";
import CosmaticsImg from "../../../../assets/homeImages/cosmatics.png";
import BeautyImg from "../../../../assets/homeImages/makeup.png";
import CreamImg from "../../../../assets/homeImages/cream.png";

interface ProfilePageProps {
  params: {
    locale: string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ params }) => {
  const { locale } = params;
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle
  unstable_setRequestLocale(locale);
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // User data (can be modified as needed)
  const userData = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <div
      className={`flex min-h-[100vh] ${
        locale === "en" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-primary min-h-full text-white p-6 transition-all duration-300 ease-in-out `}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <a
            href={locale == "en" ? "/en" : "/ar"}
            className={`rounded-full flex items-center justify-center text-4xl text-white ${
              !sidebarOpen && "w-24"
            }`}
          >
            <Image
              src={Logo}
              alt="Logo"
              width={sidebarOpen ? 159 : 159}
              height={sidebarOpen ? 104 : 104}
              className={`${!sidebarOpen ? "max-w-[50px]" : "max-w-[100%]"} `}
            />
          </a>
        </div>

        {/* Sidebar Items */}
        {sidebarOpen ? (
          <ul>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-[#412065] rounded"
              >
                {locale === "en" ? "About Us" : "نبذة عننا"}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-[#412065] rounded"
              >
                {locale === "en" ? "Settings" : "الإعدادات"}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-[#412065] rounded"
              >
                {locale === "en" ? "Contact Us" : "تواصل معنا"}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-[#412065] rounded"
              >
                {locale === "en" ? "Logout" : "تسجيل الخروج"}
              </a>
            </li>
          </ul>
        ) : (
          // Show icons when sidebar is closed
          <div className="flex flex-col items-center gap-4">
            <button
              title={locale === "en" ? "About Us" : "نبذة عننا"}
              className="hvr-pop"
            >
              <FaInfoCircle size={24} />
            </button>
            <button
              title={locale === "en" ? "Settings" : "الإعدادات"}
              className="hvr-pop"
            >
              <FaCog size={24} />
            </button>
            <button
              title={locale === "en" ? "Contact Us" : "تواصل معنا"}
              className="hvr-pop"
            >
              <FaEnvelope size={24} />
            </button>
            <button
              title={locale === "en" ? "Logout" : "تسجيل الخروج"}
              className="hvr-pop"
            >
              <FaSignOutAlt size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className="flex-1 p-8 "
        style={{
          backgroundImage: `url(${HeaderImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <nav className="flex flex-wrap xl:flex-row-reverse flex-col items-center justify-between gap-4">
          {/* Bars (Hamburger) Icon */}
          <div
            className="block cursor-pointer"
            onClick={toggleSidebar} // Toggle the sidebar on click
          >
            <FaBars size={30} color="#fff" />
          </div>

          {/* Search Input */}
          <div className="relative w-full xl:w-auto flex justify-center">
            <input
              type="text"
              placeholder={
                locale === "en"
                  ? "You will find everything"
                  : "ستجد كل ما تريد لدينا"
              }
              className="w-[100%] xl:w-[638px] h-[44px] px-[22px] rounded-[15px] opacity-50"
            />
            <Image
              src={Search}
              alt="Search"
              width={30}
              height={30}
              className={`absolute ${
                locale === "en" ? "right-[20px]" : "left-[20px]"
              } top-[50%] transform -translate-y-[50%]`}
            />
          </div>

          {/* Navigation Items */}
          <div className="w-full xl:w-auto flex xl:justify-start justify-between items-center gap-4">
            {/* Left Navigation */}
            <div className="flex gap-3">
              <a
                href={`${locale == "en" ? "/en/cartPage" : "/ar/cartPage"}`}
                title={locale === "en" ? "Cart" : "سلة"}
                className="hvr-pop"
              >
                <Image src={Cart} alt="cart" width={36} height={36} />
              </a>
              <a
                href={`${
                  locale == "en" ? "/en/primeProfile" : "/ar/primeProfile"
                }`}
                title={locale === "en" ? "Profile" : "الملف الشخصي"}
                className="hvr-pop"
              >
                <Image src={Profile} alt="profile" width={36} height={36} />
              </a>
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
          </div>
        </nav>

        {/* Header */}
        <h1 className="text-3xl font-semibold text-white mb-6 mt-10 text-center">
          {locale === "en"
            ? `Welcome, ${userData.name}!`
            : `مرحبا ${userData.name}!`}
        </h1>

        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            {locale === "en" ? "Our Services" : "خدماتنا"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={CosmaticsImg}
                width={80}
                height={80}
                className="mx-auto mb-2"
                alt="cosmatics"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {locale === "en" ? "Cosmetics" : "مستحضرات التجميل"}
              </h3>
              <p className="text-gray-600 text-center">
                {locale === "en"
                  ? "Wide range of cosmetic products to enhance your beauty."
                  : "مجموعة واسعة من مستحضرات التجميل لتعزيز جمالك."}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={BeautyImg}
                width={80}
                height={80}
                className="mx-auto mb-2"
                alt="beauty"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {locale === "en" ? "Beauty" : "جمال"}
              </h3>
              <p className="text-gray-600 text-center">
                {locale === "en"
                  ? "Beauty products for glowing skin and radiant look."
                  : "منتجات التجميل لبشرة متوهجة ومظهر مشرق."}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Image
                src={CreamImg}
                width={80}
                height={80}
                className="mx-auto mb-2"
                alt="creams"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {locale === "en" ? "Creams" : "كريمات"}
              </h3>
              <p className="text-gray-600 text-center">
                {locale === "en"
                  ? "Effective creams to rejuvenate and nourish your skin."
                  : "كريمات فعالة لتجديد البشرة وترطيبها."}
              </p>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            {locale === "en" ? "About Us" : "من نحن"}
          </h2>
          <p className="text-[#eee]">
            {locale === "en"
              ? "We are a team of passionate developers, designers, and strategists who specialize in creating modern web and mobile applications. Our goal is to provide top-notch solutions to help businesses thrive in the digital age."
              : "نحن فريق من المطورين والمصممين والاستراتيجيين المتحمسين الذين يتخصصون في إنشاء تطبيقات الويب والموبايل الحديثة. هدفنا هو تقديم حلول عالية الجودة لمساعدة الشركات على النجاح في العصر الرقمي."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
