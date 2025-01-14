
import React, { useState } from "react";

import  CartProductClient  from './CartProductClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "en", productId: "1" },
    { locale: "ar", productId: "1" },
    { locale: "en", productId: "2" },
    { locale: "ar", productId: "2" },
    { locale: "en", productId: "3" },
    { locale: "ar", productId: "3" },
    { locale: "en", productId: "4" },
    { locale: "ar", productId: "4" },
    { locale: "en", productId: "5" },
    { locale: "ar", productId: "5" },
    { locale: "en", productId: "6" },
    { locale: "ar", productId: "6" },
    { locale: "en", productId: "7" },
    { locale: "ar", productId: "7" },
    { locale: "en", productId: "8" },
    { locale: "ar", productId: "8" },
    { locale: "en", productId: "9" },
    { locale: "ar", productId: "9" },
    { locale: "en", productId: "10" },
    { locale: "ar", productId: "10" },
    { locale: "en", productId: "11" },
    { locale: "ar", productId: "11" },
    { locale: "en", productId: "12" },
    { locale: "ar", productId: "12" },
  ];
}

interface ProductDetailProps {
  params: {
    locale: string;
    productId: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { productId, locale } = params;

  return <CartProductClient params={params} />;
};

export default ProductDetail;
