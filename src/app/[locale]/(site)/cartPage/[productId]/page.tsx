"use client";
import React, { useState } from "react";
import cartproducts from "../../components/productsData/CartProducts";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import ShopImg from "../../../../../assets/homeImages/shop_bg.avif";
import { Button } from "@/components/ui/button";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface ProductDetailProps {
  params: {
    locale: string;
    productId: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { productId, locale } = params;
  const isArabic = locale === "ar";
  const linkAr = `/ar/cartPage/${productId}`;
  const linkEn = `/en/cartPage/${productId}`;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = cartproducts.find((prod) => prod.id.toString() === productId);

  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

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

  const title = isArabic ? product.titleAr : product.title;
  const description = isArabic ? product.descriptionAr : product.description;
  const category = isArabic ? product.categoryAr : product.category;
  const brand = isArabic ? product.brandAr : product.brand;
  const tags = isArabic ? product.tagsAr : product.tags;
  const ingredients = isArabic ? product.ingredientsAr : product.ingredients;
  const usageInstructions = isArabic
    ? product.usageInstructionsAr
    : product.usageInstructions;

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Header params={params} linkAr={linkAr} linkEn={linkEn} />
      <div className={` pt-[50px] space-y-16`}>
        {/* Product Header */}
        <div
          className={`container mx-auto md:px-10 px-4 grid lg:grid-cols-2 gap-12  ${
            isArabic ? "lg:grid-cols-2-reverse" : ""
          }`}
        >
          {/* Product Images */}
          <div className="space-y-8">
            <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (currentImageIndex - 1 + product.images.length) %
                    product.images.length;
                  setCurrentImageIndex(newIndex);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              >
                <ChevronLeft size={24} />
              </button>

              <Image
                src={product.images[currentImageIndex]}
                alt={locale === "en" ? product.title : product.titleAr}
                className="w-full h-full object-cover"
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex =
                    (currentImageIndex + 1) % product.images.length;
                  setCurrentImageIndex(newIndex);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div
              className={`flex gap-3 overflow-x-auto py-4 sm:justify-start justify-center`}
            >
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-24 h-24 relative overflow-hidden rounded-lg cursor-pointer mr-1 ${locale == "en" ? "ml-1" : "mr-1"} ${
                    currentImageIndex === index ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${
                      locale === "en" ? product.title : product.titleAr
                    } - ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 "
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product Information */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-lg text-gray-700">{description}</p>
            <div className="space-y-3 text-sm text-gray-500">
              <p className={`flex gap-1`}>
                <strong className="block">
                  {isArabic ? "التصنيف" : "Category"}
                </strong>{" "}
                {category}
              </p>
              <p className={`flex gap-1`}>
                <strong className="block">
                  {isArabic ? "العلامة التجارية" : "Brand"}
                </strong>{" "}
                {brand}
              </p>
              <p className={`flex gap-1`}>
                <strong className="block">
                  {isArabic ? "الأبعاد" : "Dimensions"}
                </strong>
                <span>{product.dimensions} </span>
              </p>
              <p className={`flex gap-1`}>
                <strong className="block">
                  {isArabic ? "الوزن" : "Weight"}
                </strong>{" "}
                {product.weight}
              </p>
            </div>
            <div className={`flex items-center gap-6`}>
              <span className="text-4xl font-semibold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-xl font-medium text-red-500">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="container mx-auto md:px-10 px-4 ">
          <h2 className="text-3xl font-bold text-gray-800">
            {isArabic ? "المواصفات" : "Specifications"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 text-gray-600">
            <p>
              <strong>{isArabic ? "التقييم:" : "Rating:"}</strong>{" "}
              {product.rating} ⭐
            </p>
            <p>
              <strong>{isArabic ? "المراجعات:" : "Reviews:"}</strong>{" "}
              {product.reviews}
            </p>
            <p>
              <strong>
                {isArabic ? "المخزون المتاح:" : "Available Stock:"}
              </strong>{" "}
              {product.stock}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="container mx-auto md:px-10 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mt-12">
            {isArabic ? "العلامات" : "Tags"}
          </h2>
          <div className={`flex flex-wrap gap-3  mt-6`}>
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm shadow-md transition-colors duration-300 hover:bg-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className="container mx-auto md:px-10 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mt-12">
            {isArabic ? "المكونات" : "Ingredients"}
          </h2>
          <ul
            className="list-disc list-inside text-gray-600 mt-6"
            dir={isArabic ? "rtl" : "ltr"} /* تحديد التوجيه بناءً على اللغة */
            style={{
              textAlign: isArabic ? "right" : "left",
            }} /* ضبط النص على اليمين أو اليسار حسب اللغة */
          >
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Usage Instructions */}
        <div className="container mx-auto md:px-10 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mt-12">
            {isArabic ? "تعليمات الاستخدام" : "Usage Instructions"}
          </h2>
          <p className="text-gray-600 mt-4">{usageInstructions}</p>
        </div>
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src={ShopImg}
                  alt="About Us"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <h2 className={`text-3xl font-bold mb-6 `}>
                  {locale == "en" ? "Our Story " : "قصتنا"}
                </h2>
                <p className={`text-lg text-muted-foreground mb-6 `}>
                  {locale == "en"
                    ? "We believe in the power of nature to enhance your natural beauty. Our products are crafted with care using only the finest organic ingredients, ensuring that your skin receives the nourishment it deserves. "
                    : "نؤمن بقوة الطبيعة في تعزيز جمالك الطبيعي. منتجاتنا مصنوعة بعناية باستخدام أفضل المكونات العضوية فقط، لضمان حصول بشرتك على التغذية التي تستحقها."}
                </p>
                <ul
                  className={`space-y-4 ${locale === "ar" ? "text-right" : ""}`}
                >
                  {[
                    locale == "en"
                      ? "100% Natural Ingredients"
                      : "100% مكونات طبيعية",
                    locale == "en"
                      ? "Cruelty-Free Products"
                      : "منتجات خالية من القسوة",
                    locale == "en"
                      ? "Environmentally Conscious"
                      : "مراعية للبيئة",
                    locale == "en" ? "Dermatologically Tested" : "مختبرة طبياً",
                  ].map((item, index) => (
                    <li key={index} className={`flex items-center `}>
                      <div
                        className={`h-2 w-2 bg-primary rounded-full mr-3 ${
                          locale === "ar" ? "ml-3" : ""
                        }`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer params={params} />
    </>
  );
};

export default ProductDetail;
