"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import ProductImage from "../../../../assets/homeImages/product.jpg";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

interface RequestedProductProps {
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

const RequestedProduct: React.FC<RequestedProductProps> = ({
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
}) => {
  // Type the index parameter as number
  const getStarClass = (index: number) => {
    return index < rate ? "text-col" : "text-secondary";
  };

  return (
    <div
      className="w-[192px] min-h-[370px]  bg-[#ffffff] rounded-[20px]"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <div
        className={`stars flex gap-1 p-3 ${
          locale === "en" ? "flex-row-reverse justify-end" : "flex-row justify-end"
        }`}
      >
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className={`text-[20px] ${getStarClass(index)}`} />
        ))}
      </div>
      <h1 className={`text-col text-[30px] ${locale === "en" ? "pl-3" : "pr-3"}`}>
        {perc} <span className="text-[40px] text-secondary">%</span>
      </h1>
      <div className="w-[165px] h-[179px] mx-auto mb-3">
        <Image src={ProductImage} alt="product" />
        <h1 className="text-[#000000] font-bold text-[15px]">
          {locale === "en" ? name : nameAr}
        </h1>
        <p className="text-[12px] font-semibold mb-3">
          {locale === "en" ? descEN : desc}
        </p>
        <div className="flex justify-between items-center">
          <button className="w-[25px] h-[25px]">
            <Image src={CartAdd} alt="cart add" />
          </button>
          <div
            style={{
              fontSize: "24px",
              display: "inline-block",
              position: "relative",
            }}
          >
            <span className="text-col text-[25px] font-bold">
              {price}{" "}
              <span className="text-[15px] font-bold text-secondary">
                {locale === "ar" ? " دك" : "Dr"}
              </span>
            </span>
            <span
              className="absolute top-[-10px] left-0 text-[15px] text-secondary"
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
