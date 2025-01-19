"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopImg from "../../../../../assets/homeImages/shop_bg.avif";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { notFound } from "next/navigation";

interface ProductData {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  sku: string;
  price: number;
  selling_price: number;
  quantity: number;
  image: string;
  supplier_id: null;
  details: {
    summaryDetails: null;
    detail: string;
  };
  stars: number;
  is_activated: number;
  product_images: string[];
  specificationValues: any[];
  seo: any[];
}

interface CartProductClientProps {
  params: {
    locale: string;
    productId: string;
  };
}

const CartProductClient: React.FC<CartProductClientProps> = ({ params }) => {
  const { productId, locale } = params;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isArabic = locale === "ar";
  const linkAr = `/ar/cartPage/${productId}`;
  const linkEn = `/en/cartPage/${productId}`;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://162.240.24.203/~primestore/api/website/getProduct?id=${productId}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!["en", "ar"].includes(locale)) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center pt-24">
        <h1 className="text-5xl font-bold text-red-600">
          {isArabic ? "المنتج غير موجود" : "Product Not Found"}
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          {isArabic
            ? `المنتج ذو الرقم ${productId} غير موجود.`
            : `The product with ID ${productId} does not exist.`}
        </p>
      </div>
    );
  }

  return (
    <>
      <Header params={params} linkAr={linkAr} linkEn={linkEn} />
      <div className={`pt-[50px] space-y-16`}>
        <div className={`container mx-auto md:px-10 px-4 grid lg:grid-cols-2 gap-12 ${
          isArabic ? "lg:grid-cols-2-reverse" : ""
        }`}>
          <div className="space-y-8">
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
              <Image
                width={5000}
                height={3000}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">
                  {isArabic ? "تفاصيل المنتج" : "Product Details"}
                </h3>
                <p className="text-lg text-gray-700">{product.details.detail}</p>
                {product.details.summaryDetails && (
                  <p className="text-lg text-gray-700 mt-2">{product.details.summaryDetails}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500">
                <div className={`flex gap-2 items-center`}>
                  <strong>{isArabic ? "التصنيف:" : "Category:"}</strong>
                  <span>{product.category_name}</span>
                </div>
                
                <div className={`flex gap-2 items-center`}>
                  <strong>{isArabic ? "المخزون:" : "Stock:"}</strong>
                  <span>{product.quantity}</span>
                </div>
                
                <div className={`flex gap-2 items-center`}>
                  <strong>{isArabic ? "الكود:" : "SKU:"}</strong>
                  <span>{product.sku}</span>
                </div>
                
                <div className={`flex gap-2 items-center`}>
                  <strong>{isArabic ? "التقييم:" : "Rating:"}</strong>
                  <span className="flex items-center">
                    {product.stars} <span className="text-yellow-400 ml-1">⭐</span>
                  </span>
                </div>

                <div className={`flex gap-2 items-center`}>
                  <strong>{isArabic ? "حالة المنتج:" : "Product Status:"}</strong>
                  <span>{product.is_activated === 1 ? (isArabic ? "متاح" : "Available") : (isArabic ? "غير متاح" : "Unavailable")}</span>
                </div>
              </div>

              <div className={`flex items-center gap-6 mt-6`}>
                <span className="text-4xl font-semibold text-green-600">
                  ${product.selling_price.toFixed(2)}
                </span>
                {product.price !== product.selling_price && (
                  <span className="text-xl font-medium text-red-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  width={5000}
                  height={3000}
                  src={ShopImg}
                  alt="About Us"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-6`}>
                  {locale == "en" ? "Our Story" : "قصتنا"}
                </h2>
                <p className={`text-lg text-muted-foreground mb-6`}>
                  {locale == "en"
                    ? "We believe in the power of nature to enhance your natural beauty. Our products are crafted with care using only the finest organic ingredients."
                    : "نؤمن بقوة الطبيعة في تعزيز جمالك الطبيعي. منتجاتنا مصنوعة بعناية باستخدام أفضل المكونات العضوية."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer params={params} />
    </>
  );
};

export default CartProductClient;
