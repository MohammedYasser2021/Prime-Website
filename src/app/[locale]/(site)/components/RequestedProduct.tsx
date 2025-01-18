"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import ProductImage from "../../../../assets/homeImages/product.jpg";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

interface BaseProduct {
  locale: string;
  id: number;
  name: string;
  nameAr: string;
  desc: string;
  descEN: string;
  price: number;
  rate: number;
  discount: number;
  perc: number;
}

interface ProductComponentProps extends BaseProduct {
  onAddToCart: () => void;
}

const RequestedProduct: React.FC<ProductComponentProps> = ({
  locale,
  id,
  name,
  nameAr,
  desc,
  descEN,
  price,
  rate,
  discount,
  perc,
  onAddToCart
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getStarClass = (index: number) => {
    return index < rate ? "text-col" : "text-secondary";
  };

  const handleAddToCart = () => {
    onAddToCart();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div
      className="sm:w-[192px] w-full min-h-[370px] relative z-50 bg-[#ffffff] rounded-[20px]"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <div
        className={`stars flex gap-1 p-3 ${
          locale === "en" ? "sm:flex-row-reverse sm:justify-end justify-center" : "sm:flex-row sm:justify-end justify-center"
        }`}
      >
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={`text-[20px] ${getStarClass(index)}`} />
        ))}
      </div>

      <h1 className={`text-col text-[30px] ${locale === "en" ? "sm:pl-3 pl-5" : "sm:pr-3 pr-5"}`}>
        {perc} <span className="text-[40px] text-secondary">%</span>
      </h1>

      <div className="w-[165px] h-[179px] mx-auto mb-3">
        <Image src={ProductImage} alt="product" />
        <h1 className={`text-[#000000] font-bold text-[15px] text-center ${locale == "ar" ? "sm:text-right" : "sm:text-left"}`}>
          {locale === "en" ? name : nameAr}
        </h1>
        <p className={`text-[12px] font-semibold mb-3 text-center ${locale == "ar" ? "sm:text-right" : "sm:text-left"}`}>
          {locale === "en" ? descEN : desc}
        </p>
        <div className="flex justify-between items-center">
          <div className="relative">
            <button className="w-[25px] h-[25px]" onClick={handleAddToCart}>
              <Image src={CartAdd} alt="cart add" />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-col text-white text-sm rounded whitespace-nowrap">
                {locale === "ar" ? "تمت الإضافة للسلة" : "Added to cart"}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "24px",
              display: "inline-block",
              position: "relative",
            }}
          >
            <span className="text-col text-[25px] font-bold relative">
              {price}{" "}
              <span className="text-[15px] font-bold text-secondary">
                {locale === "ar" ? " دك" : "Dr"}
              </span>
            </span>
            <span
              className="top-[-10px] left-0 text-[15px] text-secondary absolute right-[50px]"
              style={{
                textDecoration: "line-through",
              }}
            >
              {discount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedProduct;
