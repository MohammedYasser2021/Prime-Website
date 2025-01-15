
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart as CartIcon } from "lucide-react";
import { notFound } from "next/navigation";
import {
  X,
  ChevronLeft,
  Minus,
  Plus,
  ChevronRight,
  Eye,
  Filter,
} from "lucide-react";
import Prod from "../components/types/index";
import cartproducts from "../components/productsData/CartProducts";
import ShopImg from "../../../../assets/homeImages/shop_bg.avif";
import CartAdd from "../../../../assets/homeImages/cartadd.png";
import { useRouter } from "next/navigation"; // Importing the router
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";

interface CartPageClientProps {
    params: {
      locale: string;
    };
  }

export function CartPageClient({ params }: CartPageClientProps) {
    const { locale } = params;
  if (!["en", "ar"].includes(params.locale)) {
    notFound();
  }
  const router = useRouter(); // Use the useRouter hook
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "creams" | "cosmetics" | "skincare" | "perfume"
  >("all");
  const [selectedCategoryAr, setSelectedCategoryAr] = useState<
    "الكل" | "كريمات" | "مستحضرات تجميل" | "عناية البشرة" | "عطور"
  >("الكل");
  const [selectedProduct, setSelectedProduct] = useState<Prod | null>(null);
  const [cartItems, setCartItems] = useState<
    { product: Prod; quantity: number }[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const linkAr = "/ar/cartPage";
  const linkEn = "/en/cartPage";

  const filteredProducts =
    selectedCategory === "all"
      ? cartproducts
      : cartproducts.filter((product) => product.category === selectedCategory);
  const filteredProductsAr =
    selectedCategoryAr === "الكل"
      ? cartproducts
      : cartproducts.filter(
          (product) => product.categoryAr === selectedCategoryAr
        );

  const addToCart = (product: Prod) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => {
    const price = item.product.price * (1 - item.product.discount / 100);
    return sum + price * item.quantity;
  }, 0);

  const navigateToProduct = (productId: number) => {
    // Navigate to the product detail page using the dynamic productId
    router.push(`/${locale}/cartPage/${productId}`);
  };

  const navigateToProductsFilteration = () => {
    router.push(`/${locale}/productFilteration`);
  };
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Header params={params} linkAr={linkAr} linkEn={linkEn} />

      <header className="bg-white shadow-sm">
        <div
          className={`container mx-auto px-4 py-4 flex items-center justify-between`}
        >
          <h1 className="text-2xl font-bold text-gray-900">
            {" "}
            {locale == "en" ? "PRIME Store" : "متجر برايم"}
          </h1>
          <div className="flex items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CartIcon size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={navigateToProductsFilteration}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <Filter size={24} />
            </button>
          </div>
        </div>
        <div
          className={`container mx-auto mb-2 px-4 py-2 flex gap-3 flex-wrap justify-center items-center overflow-x-auto`}
        >
          {locale == "en"
            ? (
                ["all", "creams", "cosmetics", "skincare", "perfume"] as const
              ).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors capitalize`}
                >
                  {category}
                </button>
              ))
            : (
                [
                  "الكل",
                  "كريمات",
                  "مستحضرات تجميل",
                  "عناية البشرة",
                  "عطور",
                ] as const
              ).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategoryAr(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategoryAr === category
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-colors capitalize`}
                >
                  {category}
                </button>
              ))}
        </div>
      </header>

      {/* Product Grid */}
      <main className="container mx-auto  px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(locale === "en" ? filteredProducts : filteredProductsAr).map(
            (product) => {
              const discountedPrice =
                product.price * (1 - product.discount / 100);
              return (
                <div
                key={product.id}
                className="sm:w-[300px] w-full min-h-[450px] relative z-50 bg-[#ffffff] rounded-[20px] p-4 transition-transform hover:scale-[1.02]"
                style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              >
                {/* Top Section with Stars and Actions */}
                <div
                  className={`stars flex gap-1 p-3 ${locale === "en" ? "sm:flex-row-reverse sm:justify-end justify-center" : "sm:flex-row sm:justify-end justify-center"}`}
                >
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`text-[20px] ${index < product.rating ? "text-col" : "text-secondary"}`}
                    />
                  ))}
                </div>
            
                {/* Discount Badge */}
         
                  <h1 className="text-col text-[30px] sm:pl-3 pl-5">
                    {product.discount} <span className="text-[40px] text-secondary">%</span>
                  </h1>
          
            
                {/* Product Image */}
                <div
                  className="relative h-[250px] mb-4 group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Image
                    src={product.images[0]}
                    alt={locale === "en" ? product.title : product.titleAr}
                    className="w-full h-full object-cover rounded-[15px]"
                    width={300}
                    height={250}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-[15px]" />
                </div>
            
                {/* Product Details */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      className="order-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      title={locale === "en" ? "View Product Details" : "عرض تفاصيل المنتج"}
                      onClick={() => navigateToProduct(product.id)}
                    >
                      <Eye size={20} className="text-gray-600" />
                    </button>
                    <h1
                      className={`text-[#000000] font-bold text-[18px] ${locale === "ar" ? "text-right" : "text-left"} line-clamp-1`}
                    >
                      {locale === "en" ? product.title : product.titleAr}
                    </h1>
                  </div>
            
                  <p
                    className={`text-[14px] ${locale === "ar" ? "text-right" : "text-left"} line-clamp-2`}
                  >
                    {locale === "en" ? product.description : product.descriptionAr}
                  </p>
            
             
            
                  {/* Price and Cart Section */}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="flex flex-col">
                     
                        <>
                        <span className="text-[15px] text-secondary line-through">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-col text-[25px] font-bold">
                            ${(product.price - (product.price * product.discount) / 100).toFixed(2)}{" "}
                            <span className="text-[15px] font-bold text-secondary">
                              {locale === "ar" ? " دك" : "Dr"}
                            </span>
                          </span>

                        </>
                 
                     
                    
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-[25px] h-[25px]"
                      title={locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                    >
                      <Image src={CartAdd} alt="cart add" />
                    </button>
                  </div>
            
                </div>
              </div>
              );
            }
          )}
        </div>
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setCurrentImageIndex(0);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="relative">
                <div className="relative h-96">
                  <Image
                    width={500} // Add the desired width
                    height={300} // Add the desired height
                    src={selectedProduct.images[currentImageIndex]}
                    alt={`${selectedProduct.title} - Image ${
                      currentImageIndex + 1
                    }`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) =>
                          (prev - 1 + selectedProduct.images.length) %
                          selectedProduct.images.length
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev + 1) % selectedProduct.images.length
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <div className={`flex gap-2 mt-4`}>
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-20 h-20 rounded-md overflow-hidden ${
                        currentImageIndex === index
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <Image
                        src={image}
                        width={500} // Add the desired width
                        height={300} // Add the desired height
                        alt={`${selectedProduct.title} - Thumbnail ${
                          index + 1
                        }`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2
                  className={`text-3xl font-bold mb-4 ${
                    locale == "en" ? "text-left" : "text-right"
                  }`}
                >
                  {locale == "en"
                    ? selectedProduct.title
                    : selectedProduct.titleAr}
                </h2>
                <p className={`text-gray-600 mb-6 `}>
                  {locale == "en"
                    ? selectedProduct.description
                    : selectedProduct.descriptionAr}
                </p>
                <div className="mb-6">
                  {selectedProduct.discount > 0 ? (
                    <div className={`flex items-center gap-2`}>
                      <span className="text-gray-400 line-through text-xl">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-3xl font-bold text-green-600">
                        $
                        {(
                          selectedProduct.price *
                          (1 - selectedProduct.discount / 100)
                        ).toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                        {selectedProduct.discount}%{" "}
                        {locale == "en" ? "OFF" : "خصم"}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setCurrentImageIndex(0);
                  }}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-secondary transition-colors"
                >
                  {locale == "en" ? "Add to Cart" : "إضافة إلى العربة"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div className="bg-white h-full w-full max-w-md shadow-xl">
            <div className={`p-4 border-b flex items-center justify-between`}>
              <h2 className="text-xl font-semibold">
                {locale == "en" ? "Shopping Cart" : "عربة التسوق"}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500">
                  {locale == "en" ? "Your cart is empty" : "عربتك فارغة"}
                </div>
              ) : (
                <>
                  {cartItems.map((item) => {
                    const discountedPrice =
                      item.product.price * (1 - item.product.discount / 100);
                    return (
                      <div
                        key={item.product.id}
                        className="flex items-center gap-4 py-4 border-b last:border-b-0"
                      >
                        <Image
                          width={500} // Add the desired width
                          height={300} // Add the desired height
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {locale == "en"
                              ? item.product.title
                              : item.product.titleAr}
                          </h3>
                          <div className="text-sm text-gray-500">
                            ${discountedPrice.toFixed(2)} x {item.quantity}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus
                                size={16}
                                className={
                                  item.quantity <= 1
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }
                              />
                            </button>
                            <span className="px-3 py-1 min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 text-right">
                    <div className="text-lg font-bold">
                      {locale == "en" ? "Total:" : "الإجمالي:"} $
                      {cartTotal.toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                width={500} // Add the desired width
                height={300} // Add the desired height
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
              <ul className={`space-y-4 `}>
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

      {/* Footer */}
      <Footer params={params} />
    </main>
  );
};

