"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // Importing the router
import { ChevronLeft, ChevronRight, X, Eye, Minus, Plus } from "lucide-react";
import { ShoppingCart as CartIcon } from "lucide-react";
import products from "../components/productsData/CartProducts";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Prod from "../components/types/index";
import { notFound } from "next/navigation";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

type SortOption = "sales" | "priceHigh" | "priceLow" | "discount" | "rating";

interface ProductFilterationPageProps {
  params: {
    locale: string;
  };
}

const ProductFilterationPage: React.FC<ProductFilterationPageProps> = ({
  params,
}) => {
  const { locale } = params;
  if (!["en", "ar"].includes(params.locale)) {
    notFound();
  }
  const router = useRouter(); // Use the useRouter hook
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("sales");
  const [selectedProduct, setSelectedProduct] = useState<Prod | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    { product: Prod; quantity: number }[]
  >([]);
  const linkAr = "/ar/productFilteration";
  const linkEn = "/en/productFilteration";

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...cats];
  }, []);

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "sales":
          return b.sales - a.sales;
        case "priceHigh":
          return b.price - a.price;
        case "priceLow":
          return a.price - b.price;
        case "discount":
          return b.discount - a.discount;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [selectedCategory, sortBy]);

  const navigateToProduct = (productId: number) => {
    // Navigate to the product detail page using the dynamic productId
    router.push(`/cartPage/${productId}`);
  };

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
  return (
    <>
      <Header params={params} linkAr={linkAr} linkEn={linkEn} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4 md:justify-start justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {locale === "en"
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : category === "all"
                  ? "الكل"
                  : products.find((p) => p.category === category)?.categoryAr}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center flex-wrap mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="sales">
                {locale === "en" ? "Best Selling" : "الأكثر مبيعاً"}
              </option>
              <option value="priceHigh">
                {locale === "en"
                  ? "Price: High to Low"
                  : "السعر: من الأعلى إلى الأقل"}
              </option>
              <option value="priceLow">
                {locale === "en"
                  ? "Price: Low to High"
                  : "السعر: من الأقل إلى الأعلى"}
              </option>
              <option value="discount">
                {locale === "en" ? "Biggest Discount" : "أكبر خصم"}
              </option>
              <option value="rating">
                {locale === "en" ? "Highest Rated" : "الأعلى تقييماً"}
              </option>
            </select>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <div
              key={product.id}
              className="sm:w-[300px] w-full bg-white rounded-[20px] overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Image */}
              <div className="relative">
                <Image
                  width={500}
                  height={300}
                  src={product.images[0]}
                  alt={locale === "en" ? product.title : product.titleAr}
                  className="w-full h-[200px] object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-4">
                {/* Title and View Button */}
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className={`text-lg font-semibold flex-1 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "en" ? product.title : product.titleAr}
                  </h3>
                  <button
                    className="rounded-full hover:bg-gray-100 transition-colors"
                    title={
                      locale == "en"
                        ? "View Product Details"
                        : "عرض تفاصيل المنتج"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToProduct(product.id);
                    }}
                  >
                    <Eye size={20} className="text-gray-600" />
                  </button>
                </div>

                {/* Description */}
                <p
                  className={`text-gray-600 mb-3 line-clamp-2 text-sm ${
                    locale === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {locale === "en"
                    ? product.description
                    : product.descriptionAr}
                </p>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-sm text-green-600 font-medium">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {product.rating}
                    </span>
                  </div>
                </div>

                {/* Sales Info */}
                <div className="flex items-center justify-between">
                  <div
                    className={`text-sm text-gray-500 ${
                      locale === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {locale === "en"
                      ? `${product.sales} sold`
                      : `${product.sales} مبيعات`}
                  </div>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                        const button = e.currentTarget;
                        const tooltip = document.createElement("div");
                        tooltip.className =
                          "absolute bottom-full left-[60px] transform -translate-x-1/2 mb-2 px-2 py-1 bg-col text-white text-sm rounded whitespace-nowrap z-50";
                        tooltip.textContent =
                          locale === "ar"
                            ? "تمت الإضافة للسلة"
                            : "Added to cart";
                        button.parentElement?.appendChild(tooltip);
                        setTimeout(() => tooltip.remove(), 2000);
                      }}
                      className="w-[25px] h-[25px]"
                      title={locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                    >
                      <Image src={CartAdd} alt="cart add" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(
                          (prev) =>
                            (prev - 1 + selectedProduct.images.length) %
                            selectedProduct.images.length
                        );
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % selectedProduct.images.length
                        );
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  <div className={`flex gap-2 mt-4`}>
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-20 h-20 rounded-md overflow-hidden ${
                          currentImageIndex === index
                            ? "ring-2 ring-purple-500"
                            : ""
                        }`}
                      >
                        <Image
                          width={500} // Add the desired width
                          height={300} // Add the desired height
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
                  <h2
                    className={`text-3xl font-bold mb-4 ${
                      locale == "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {locale == "en"
                      ? selectedProduct.title
                      : selectedProduct.titleAr}
                  </h2>
                  <p
                    className={`text-gray-600 mb-6 ${
                      locale == "en" ? "text-left" : "text-right"
                    }`}
                  >
                    {locale == "en"
                      ? selectedProduct.description
                      : selectedProduct.descriptionAr}
                  </p>
                  <div className="mb-6">
                    {selectedProduct.discount > 0 ? (
                      <div className={`flex items-center gap-2 `}>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setCurrentImageIndex(0);
                    }}
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {locale == "en" ? "Add to Cart" : "إضافة إلى العربة"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
      </div>
      <Footer params={params} />
    </>
  );
};

export default ProductFilterationPage;
