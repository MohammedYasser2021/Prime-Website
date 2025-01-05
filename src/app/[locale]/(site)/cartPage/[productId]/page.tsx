"use client";
import React, { useState } from "react";
import cartproducts from "../../components/productsData/CartProducts";
import Image from "next/image";
import {
  ShoppingBag,
  Star,
  Heart,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import ShopImg from "../../../../../assets/homeImages/shop_bg.avif";
import { Button } from "@/components/ui/button";

interface ProductDetailProps {
  params: {
    locale: string;
    productId: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { productId, locale } = params;
  const isArabic = locale === "ar";

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
    <div
      className={`container mx-auto px-6 lg:px-12 pt-[120px] space-y-16 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {/* Product Header */}
      <div
        className={`grid lg:grid-cols-2 gap-12 ${
          isArabic ? "lg:grid-cols-2-reverse" : ""
        }`}
      >
        {/* Product Images */}
        <div className="space-y-8">
          <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
            <img
              src={selectedImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className={`flex gap-4 overflow-x-auto py-4 ${isArabic ? "flex-row-reverse" : "flex-row"}`}>
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="w-32 h-32 relative overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => handleImageClick(image)} // Change the large image on click
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
            <p
              className={`flex gap-1 ${
                isArabic ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <strong className="block">
                {isArabic ? "التصنيف" : "Category"}
              </strong>{" "}
              {category}
            </p>
            <p
              className={`flex gap-1 ${
                isArabic ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <strong className="block">
                {isArabic ? "العلامة التجارية" : "Brand"}
              </strong>{" "}
              {brand}
            </p>
            <p
              className={`flex gap-1 ${
                isArabic ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <strong className="block">
                {isArabic ? "الأبعاد" : "Dimensions"}
              </strong>
              <span>{product.dimensions} </span>
            </p>
            <p
              className={`flex gap-1 ${
                isArabic ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <strong className="block">{isArabic ? "الوزن" : "Weight"}</strong>{" "}
              {product.weight}
            </p>
          </div>
          <div
            className={`flex items-center gap-6 ${
              isArabic ? "flex-row-reverse" : "flex-row"
            }`}
          >
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
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {isArabic ? "المواصفات" : "Specifications"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 text-gray-600">
          <p>
            <strong>{isArabic ? "التقييم:" : "Rating:"}</strong> ⭐{" "}
            {product.rating}
          </p>
          <p>
            <strong>{isArabic ? "المراجعات:" : "Reviews:"}</strong>{" "}
            {product.reviews}
          </p>
          <p>
            <strong>{isArabic ? "المخزون المتاح:" : "Available Stock:"}</strong>{" "}
            {product.stock}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mt-12">
          {isArabic ? "العلامات" : "Tags"}
        </h2>
        <div
          className={`flex flex-wrap gap-3 ${
            isArabic ? "flex-row-reverse" : "flex-row"
          } mt-6`}
        >
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
      <div>
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
      <div>
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
              <h2
                className={`text-3xl font-bold mb-6 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {locale == "en" ? "Our Story " : "قصتنا"}
              </h2>
              <p
                className={`text-lg text-muted-foreground mb-6 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
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
                  <li
                    key={index}
                    className={`flex items-center ${
                      locale === "ar" ? "flex-row-reverse" : ""
                    }`}
                  >
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

      {/* Footer */}
      <footer className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "About Us" : "بنذة عننا"}
              </h3>
              <p
                className={`text-muted-foreground ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {locale == "en"
                  ? "Natural beauty products for everyone. Made with love and care for your skin."
                  : "منتجات الجمال الطبيعي للجميع. مصنوعة بحب وعناية لبشرتك."}
              </p>
            </div>
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "Quick Links" : "روابط سريعة"}
              </h3>
              <ul
                className={`space-y-2 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {[
                  locale == "en" ? "Shop" : "تسوق",
                  locale == "en" ? "About" : "عننا",
                  locale == "en" ? "Contact" : "الأسئلة الشائعة",
                  locale == "en" ? "FAQ" : "تواصل معنا",
                ].map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "Contact" : "تواصل معنا"}
              </h3>
              <ul
                className={`space-y-2 text-muted-foreground ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                <li>
                  {" "}
                  {locale == "en"
                    ? "Email: hello@naturals.com"
                    : " hello@naturals.com :البريد الإلكتروني"}
                </li>
                <li>
                  {" "}
                  {locale == "en"
                    ? "Phone: (555) 123-4567"
                    : "الهاتف: (555) 123-4567"}
                </li>
                <li>
                  {" "}
                  {locale == "en"
                    ? "Address: 123 Beauty Street"
                    : "العنوان: 123 شارع الجمال"}
                </li>
              </ul>
            </div>
            <div>
              <h3
                className={`font-bold text-lg mb-4 ${
                  locale == "ar" ? "text-right" : "text-left"
                }`}
              >
                {" "}
                {locale == "en" ? "Follow Us" : "تابعنا"}
              </h3>
              <div
                className={`flex space-x-4 ${
                  locale == "ar" ? "justify-end" : "justify-start"
                }`}
              >
                {[
                  {
                    icon: Instagram,
                    label: locale == "en" ? "Instagram" : "انستجرام",
                  },
                  {
                    icon: Facebook,
                    label: locale == "en" ? "Facebook" : "فيسبوك",
                  },
                  {
                    icon: Twitter,
                    label: locale == "en" ? "Twitter" : "تويتر",
                  },
                ].map((social, index) => (
                  <Button
                    key={index}
                    size="icon"
                    className="rounded-lg text-white hvr-pop"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy;{" "}
              {locale == "en"
                ? "2024 PRIME. All rights reserved."
                : "2024 PRIME. جميع الحقوق محفوظة."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
