"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

interface ProductProps {
  product: {
    id: number;
    name: string;
    discount: number;
    price: number;
    selling_price: number;
    image: string;
    stars: number;
  };
  locale: string;
  onAddToCart: () => void;
}

const Product: React.FC<ProductProps> = ({ product, locale, onAddToCart }) => {
  if (!product) return null;
  
  const [showTooltip, setShowTooltip] = useState(false);

  const getStarClass = (index: number) => {
    return index < (product?.stars || 0) ? "text-col" : "text-secondary";
  };

  const handleAddToCart = () => {
    onAddToCart();
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  const discountPercentage = product.selling_price ? 
    ((product.selling_price - product.price) / product.selling_price * 100).toFixed(0) : 0;

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

      {product.discount > 0 && (
        <h1 className={`text-col text-[30px] ${locale === "en" ? "sm:pl-3 pl-5" : "sm:pr-3 pr-5"}`}>
          {discountPercentage} <span className="text-[40px] text-secondary">%</span>
        </h1>
      )}

      <div className="w-[165px] h-[179px] mx-auto mb-3">
        <Image 
          src={product.image} 
          alt={product.name}
          width={165}
          height={179}
          className="w-full h-full object-cover"
        />
        <h1 className={`text-[#000000] font-bold text-[15px] text-center ${locale == "ar" ? "sm:text-right" : "sm:text-left"}`}>
          {product.name}
        </h1>

        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <button className="w-[25px] h-[25px]" onClick={handleAddToCart}>
              <Image src={CartAdd} alt="cart add" width={25} height={25} />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-col text-white text-sm rounded whitespace-nowrap">
                {locale === "ar" ? "تمت الإضافة للسلة" : "Added to cart"}
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-col text-[25px] font-bold">
              {product.price}{" "}
              <span className="text-[15px] font-bold text-secondary">
                {locale === "ar" ? " دك" : "Dr"}
              </span>
            </span>
            {product.selling_price > product.price && (
              <span className="block text-[15px] text-secondary line-through">
                {product.selling_price}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
