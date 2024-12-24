"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Prime from "../../../../assets/homeImages/prime.png";
import Product from "./Product";
import productsData from "./Products.json"; // Path to your JSON file

interface ProductsProps {
  params: {
    locale: string;
  };
}

interface ProductProps {
  id: number;
  name: string;
  nameAr: string;
  desc: string;
  descEN: string;
  price: number;
  rate: number;
  discount: number;
  perc: number;
  locale: string;
}

const Products: React.FC<ProductsProps> = ({ params }) => {
  const { locale } = params;
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const productsWithLocale = productsData.products.map((product) => ({
      ...product,
      locale: locale, // Adding locale property to each product
    }));
    setProducts(productsWithLocale);
  }, [locale]);

  return (
    <div className="bg-section h-auto relative">
      <div>
        <Image
          src={Prime}
          alt="prime"
          className={`w-[100%] max-w-[596px] h-[auto] opacity-[5%] absolute top-[-30px] ${
            locale === "ar" ? "left-0" : "right-0"
          }`}
        />
      </div>
      <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
        <h1 className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${locale == "en" ? "lg:text-left" : "lg:text-right"}`}>
          {locale === "en" ? "Choose For Us" : "اخترنا لك"}
        </h1>
        <div className="product-list flex flex-wrap justify-center gap-6 mx-auto">
          {products.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
