"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Star,
  Heart,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ShoppingCart as CartIcon } from "lucide-react";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Prod from "../components/types/index";
import cartproducts from "../components/productsData/CartProducts";
import ShopImg from "../../../../assets/homeImages/shop_bg.avif";
import { useRouter } from "next/navigation"; // Importing the router

interface CartPageProps {
  params: {
    locale: string;
  };
}

const CartPage: React.FC<CartPageProps> = ({ params }) => {
  const { locale } = params;
  const router = useRouter(); // Use the useRouter hook
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "creams" | "cosmetics" | "skincare" | "perfume"
  >("all");
  const [selectedCategoryAr, setSelectedCategoryAr] = useState<
    "كل المنتجات" | "كريمات" | "مستحضرات تجميل" | "عناية البشرة" | "عطور"
  >("كل المنتجات");
  const [selectedProduct, setSelectedProduct] = useState<Prod | null>(null);
  const [cartItems, setCartItems] = useState<
    { product: Prod; quantity: number }[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProducts =
    selectedCategory === "all"
      ? cartproducts
      : cartproducts.filter((product) => product.category === selectedCategory);
  const filteredProductsAr =
    selectedCategoryAr === "كل المنتجات"
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
    router.push(`/cartPage/${productId}`);
  };
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {locale == "en"
              ? "Natural Beauty Essentials"
              : "أساسيات الجمال الطبيعي"}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {locale == "en"
              ? "Discover our collection of organic and natural cosmetics "
              : "اكتشف مجموعتنا من مستحضرات التجميل العضوية والطبيعية"}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {locale == "en" ? "Shop Now" : "تسوق الأن"}{" "}
            <ShoppingBag className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <header className="bg-white shadow-sm">
        <div
          className={`container mx-auto px-4 py-4 flex ${
            locale == "en" ? "flex-row" : "flex-row-reverse"
          } items-center justify-between`}
        >
          <h1 className="text-2xl font-bold text-gray-900">
            {" "}
            {locale == "en" ? "PRIME Store" : "متجر برايم"}
          </h1>
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
        </div>
        <div
          className={`container mx-auto px-4 py-2 flex gap-3 flex-wrap ${
            locale == "en" ? "flex-row" : "flex-row-reverse"
          } justify-center items-center overflow-x-auto`}
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
                  "كل المنتجات",
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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(locale === "en" ? filteredProducts : filteredProductsAr).map(
            (product) => {
              const discountedPrice =
                product.price * (1 - product.discount / 100);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div
                    className="relative h-64 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                        {product.discount}% {locale == "en" ? "OFF" : "خصم"}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className={`flex justify-between items-center mb-2 ${locale == "en" ? "flex-row" : "flex-row-reverse"}`}>
                    <h3 className={`text-lg font-semibold  `}>
                      {locale == "en" ? product.title : product.titleAr}
                    </h3>
                    <button className="navigateProduct  bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors" title={locale == "en" ? "View Product Details" : "عرض تفاصيل المنتج"} onClick={() => navigateToProduct(product.id)}><Eye size={20}/></button>
                    </div>
                    <p className={`text-gray-600 text-sm mb-3 line-clamp-2 ${locale == "en" ? "text-left" : "text-right"}`}>
                      {locale == "en" ? product.description : product.descriptionAr}
                    </p>
                    <div className={`flex items-center justify-between ${locale == "en" ? "flex-row" : "flex-row-reverse"}`}>
                      <div>
                        {product.discount > 0 ? (
                          <div>
                            <span className="text-gray-400 line-through text-sm">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="text-lg font-bold text-green-600 ml-2">
                              ${discountedPrice.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="bg-primary text-white p-2 rounded-full hover:bg-secondary transition-colors"
                      >
                        <CartIcon size={20} />
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
                  <img
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
                <div className={`flex gap-2 mt-4 ${locale == "en" ? "justify-start flex-row" : "flex-row-reverse text-right"}`}>
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
                      <img
                        src={image}
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
                <h2 className={`text-3xl font-bold mb-4 ${locale == "en" ? "text-left" : "text-right"}`}>
                  {locale =="en" ? selectedProduct.title : selectedProduct.titleAr}
                </h2>
                <p className={`text-gray-600 mb-6 ${locale == "en" ? "text-left" : "text-right"}`}>
                  {locale == "en" ?  selectedProduct.description : selectedProduct.descriptionAr}
                </p>
                <div className="mb-6">
                  {selectedProduct.discount > 0 ? (
                    <div className={`flex items-center gap-2 ${locale == "en" ? "justify-start" : "justify-end"}`}>
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
                        {selectedProduct.discount}%  {locale == "en" ? "OFF" : "خصم"}
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
            <div className={`p-4 border-b flex items-center justify-between ${locale == "en" ? "flex-row" : "flex-row-reverse"}`}>
              <h2 className="text-xl font-semibold"> {locale == "en" ? "Shopping Cart" : "عربة التسوق"}</h2>
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
                        className="flex items-center gap-4 py-4 border-b last:border-b-0 "
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {locale =="en" ? item.product.title : item.product.titleAr}
                          </h3>
                          <div className="text-sm text-gray-500">
                            ${discountedPrice.toFixed(2)} x {item.quantity}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartItemQuantity(
                                item.product.id,
                                Number(e.target.value)
                              )
                            }
                            className="p-1 border rounded"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
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
                      {locale == "en" ? "Total:" : "الإجمالي:"} ${cartTotal.toFixed(2)}
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
    </main>
  );
};

export default CartPage;
