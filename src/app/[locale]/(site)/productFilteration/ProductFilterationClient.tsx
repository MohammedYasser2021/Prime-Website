"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, X, Eye, Minus, Plus, ShoppingCart as CartIcon, ShoppingBag, Search } from 'lucide-react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { notFound } from 'next/navigation';
import { FaStar } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  discount: number;
  price: number;
  selling_price: number;
  image: string;
  stars: number;
  details: {
    summaryDetails: string | null;
  };
  sku?: string;
}

interface Category {
  id: number;
  name: string;
  image: string;
}

interface ProductResponse {
  success: boolean;
  data: {
    items: Product[];
    current_page: number;
    total: number;
  };
}

interface CategoryResponse {
  success: boolean;
  data: Category[];
}

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
  
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | number>("all");
  const [sortBy, setSortBy] = useState<SortOption>("sales");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const linkAr = "/ar/productFilteration";
  const linkEn = "/en/productFilteration";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website/getCategories?id&name`, {
          headers: {
            'lang': locale, // Add language header based on current locale
            'Accept': 'application/json',
          }
        });
        const data: CategoryResponse = await response.json();
        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${process.env.NEXT_PUBLIC_API_URL}/website/getProducts?id&name`;
        
        // Add category filter if selected
        if (selectedCategory !== "all") {
          url += `&category_id=${selectedCategory}`;
        }
        
        // Add search query if present
        if (searchQuery) {
          url += `&name=${encodeURIComponent(searchQuery)}&sku=${encodeURIComponent(searchQuery)}`;
        }

        const response = await fetch(url, {
          headers: {
            'lang': locale, // Add language header based on current locale
            'Accept': 'application/json',
          }
        });
        const data: ProductResponse = await response.json();
        if (data.success) {
          let sortedProducts = [...data.data.items];
          switch (sortBy) {
            case "priceHigh":
              sortedProducts.sort((a, b) => b.price - a.price);
              break;
            case "priceLow":
              sortedProducts.sort((a, b) => a.price - b.price);
              break;
            case "discount":
              sortedProducts.sort((a, b) => b.discount - a.discount);
              break;
            case "rating":
              sortedProducts.sort((a, b) => b.stars - a.stars);
              break;
            default:
              break;
          }
          setProducts(sortedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Add debounce for search
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, sortBy, searchQuery]);

  const navigateToProduct = (productId: number) => {
    router.push(`/${locale}/cartPage/${productId}`);
  };

  const addToCart = (product: Product) => {
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
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {locale === "en" ? "All" : "الكل"}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === "en" ? "Search by name or SKU..." : "البحث بالاسم أو الرمز..."}
                className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                dir={locale === "ar" ? "rtl" : "ltr"}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="sm:w-[200px] w-full min-h-[420px] relative z-50 bg-[#ffffff] rounded-[20px]"
              style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
            >
              <div
                className={`stars flex gap-1 p-3 ${
                  locale === "en"
                    ? "sm:flex-row-reverse sm:justify-end justify-center"
                    : "sm:flex-row sm:justify-end justify-center"
                }`}
              >
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`text-[20px] ${
                      index < product.stars ? "text-col" : "text-secondary"
                    }`}
                  />
                ))}
              </div>

              {product.discount > 0 && (
                <h1
                  className={`text-col text-[30px] ${
                    locale === "en" ? "sm:pl-3 pl-5" : "sm:pr-3 pr-5"
                  }`}
                >
                  {product.discount}{" "}
                  <span className="text-[40px] text-secondary">%</span>
                </h1>
              )}

              <div className="w-[165px] h-[179px] mx-auto mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => navigateToProduct(product.id)}
                />
                <h1
                  className={`text-[#000000] font-bold text-[15px] text-center ${
                    locale === "ar" ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {product.name}
                </h1>
                <p
                  className={`text-[12px] font-semibold mb-3 text-center ${
                    locale === "ar" ? "sm:text-right" : "sm:text-left"
                  }`}
                >
                  {product.details.summaryDetails || ''}
                </p>

                <div className="flex justify-between items-center">
                  <button 
                    className="w-[25px] h-[25px] text-purple-600 hover:text-purple-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingBag size={25} />
                  </button>
                  <div
                    style={{
                      fontSize: "24px",
                      display: "inline-block",
                      position: "relative",
                    }}
                  >
                    <span className="text-col text-[25px] font-bold relative">
                      {product.price.toFixed(2)}{" "}
                      <span className="text-[15px] font-bold text-secondary">
                        {locale === "ar" ? " دك" : "Dr"}
                      </span>
                    </span>
                    {product.selling_price !== product.price && (
                      <span
                        className="top-[-10px] left-0 text-[15px] text-secondary absolute right-[50px]"
                        style={{ textDecoration: "line-through" }}
                      >
                        {product.selling_price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white h-full w-full max-w-md shadow-xl">
              <div className={`p-4 border-b flex items-center justify-between`}>
                <h2 className="text-xl font-semibold">
                  {locale === "en" ? "Shopping Cart" : "عربة التسوق"}
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
                    {locale === "en" ? "Your cart is empty" : "عربتك فارغة"}
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
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {item.product.name}
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
                        {locale === "en" ? "Total:" : "الإجمالي:"} $
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