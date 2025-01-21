"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductsData from "../components/productsData/CartProducts";
import Cart from "../../../../assets/homeImages/cart.png";
import Profile from "../../../../assets/homeImages/profile.png";
import Search from "../../../../assets/homeImages/search.png";
import Logo from "../../../../assets/homeImages/logo.png";
import Content from "../../../../assets/homeImages/panner.png";
import Tec1 from "../../../../assets/homeImages/tec1.png";
import Tec2 from "../../../../assets/homeImages/tec2.png";
import { useRouter } from "next/navigation";
import "../../../globals.css";

interface HeaderProps {
  params: {
    locale: string;
  };
  linkAr: string;
  linkEn: string;
}

interface Slider {
  id: number;
  name: string;
  image: string;
  link: string;
  detail: string;
}
interface Product {
  id: number;
  name: string;  // تأكد من أن خاصية name موجودة
  price: number;
  discount: number;
  image: string;
}

const Header: React.FC<HeaderProps> = ({ params, linkAr, linkEn }) => {
  const { locale } = params;
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const navigateToProduct = (productId: number) => {
    router.push(`/${locale}/cartPage/${productId}`);
  };

  const handleSearchIconClick = () => {
      router.push(`/${locale}/productFilteration/`)

  };
  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/website/home`,
          {
            headers: {
              lang: locale,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        setSliders(data.data.sliders);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      }
    };

    fetchSliders();
  }, [locale]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [sliders.length]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/website/getProducts?search=${searchQuery}`,
          {
            headers: {
              lang: locale,
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        const products = data.data.items || [];
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const navigateToSlide = (slider: Slider) => {
    if (slider?.link) {
      router.push(slider.link);
    }
  };

  return (
    <div className="min-h-[708px] relative overflow-hidden">
      {sliders.map((slider, index) => (
        <div
          key={slider.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${slider.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: activeSlide === index ? 1 : 0,
          }}
        />
      ))}

      <div className="absolute bottom-8 lg:left-[35px] left-[30px] flex gap-2 z-50">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSlide === index
                ? "bg-[#e4a4fb]"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto p-[20px] relative z-10">
        <nav className="flex flex-wrap xl:flex-row-reverse flex-col items-center justify-between gap-4">
          <div className="w-full xl:w-auto flex xl:justify-start justify-center mb-4 xl:mb-0">
            <a href={locale == "en" ? "/en" : "/ar"}>
              <Image src={Logo} alt="Logo" width={159} height={104} />
            </a>
          </div>

          <div className="relative w-full xl:w-auto flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder={
                locale === "en" ? "Search products..." : "ابحث عن المنتجات..."
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
  } top-[50%] transform -translate-y-[50%] cursor-pointer`}
  onClick={handleSearchIconClick}  // <-- Add this line
/>

            {isSearchFocused &&
              searchQuery.length > 0 &&
              !isLoading &&
              filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl max-h-[400px] overflow-y-auto z-[9999]">
                  {filteredProducts.map((product) => (
                    <button
                      onClick={() => navigateToProduct(product.id)}
                      key={product.id}
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0 w-full"
                    >
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={locale === "en" ? product.name : product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div
                        className={`${
                          locale == "en" ? "ml-4" : "mr-4"
                        } flex-grow`}
                      >
                        <h3 className="font-medium text-gray-900">
                          {locale === "en" ? product.name : product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {locale === "en" ? product.name : product.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${product.price}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-sm text-green-600">
                            -{product.discount}%
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
          </div>

          <div className="w-full xl:w-auto flex xl:justify-start justify-between items-center gap-4">
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

        <div
          className={`flex xl:justify-end justify-center relative top-10 ${
            locale === "en" ? "xl:right-[65px]" : "xl:left-[65px]"
          } header_translate`}
        >
          <div className="relative flex items-center">
            <Link
              href={`${linkAr}`}
              className={`w-[48px] h-[26px] z-10 rounded-[10px] ${
                locale == "en" ? "bg-secondary pl-2" : "bg-primary pr-2"
              } text-[#ffffff] text-[14px]`}
            >
              عربي
            </Link>
            <Link
              href={`${linkEn}`}
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

        <div className="header_content flex items-center gap-5 flex-wrap justify-center mt-8 xl:mt-0">
          <div className="xl:w-[574px] xl:h-[561px] relative z-50">
            {sliders[activeSlide] ? (
              <Image
                src={sliders[activeSlide].image}
                alt="slider banner"
                className="w-full h-full"
                width={574}
                height={561}
              />
            ) : (
              <Image src={Content} alt="banner" className="w-full h-full" />
            )}
          </div>

          <div className="header_desc">
            <h1
              className={`font-bold text-[40px] text-[#ffffff] mb-4 ${
                locale == "en" ? "xl:text-left" : "xl:text-right"
              } text-center`}
            >
              {sliders[activeSlide]?.name}
            </h1>
            <p
              className={`font-bold xl:text-[25px] text-[20px] text-[#ffffff] max-w-[481px] ${
                locale == "en" ? "xl:text-left" : "xl:text-right"
              } text-center`}
            >
              {sliders[activeSlide]?.detail}
            </p>
            <div className="flex xl:justify-start justify-center relative z-[999]">
              <button
                className="text-[#ffffff] text-[22px] font-bold xl:mt-20 mt-10 bg-third border border-[#ffffff] w-[180px] h-[67px] rounded-[20px] hvr-pop"
                onClick={() => navigateToSlide(sliders[activeSlide])}
              >
                {locale === "en" ? "Order Now" : "اطلب الان"}
              </button>
            </div>
          </div>
        </div>
      </div>

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
        className={`absolute border-l-[29.5px] ${
          locale == "en"
            ? "md:right-[260.88px] right-[55px]"
            : "md:left-[260.88px] left-[55px]"
        } border-r-[29.5px] border-b-[92px] border-transparent border-b-[#E4A4FB] opacity-50`}
        style={{
          width: 0,
          height: 0,
          top: "253px",
          transform: `${
            locale === "ar" ? "scaleX(-1) rotate(-72.8deg)" : "rotate(-72.8deg)"
          }`,
        }}
      />
    </div>
  );
};

export default Header;
