"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart as CartIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { X, ChevronLeft, Minus, Plus, ChevronRight, Eye, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa";
import ShopImg from "../../../../assets/homeImages/shop_bg.avif";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface APIResponse {
  success: boolean;
  data: {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    items: Product[];
  };
  message: string;
}

interface Product {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
  discount: number;
  price: number;
  selling_price: number;
  image: string;
  stars: number;
  details: {
    summaryDetails: any;
  }
}

interface CartPageClientProps {
  params: {
    locale: string;
  };
}

export function CartPageClient({ params }: CartPageClientProps) {
  const { locale } = params;
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
    perPage: 25,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null
  });
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const linkAr = "/ar/cartPage";
  const linkEn = "/en/cartPage";

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [pagination.currentPage, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://162.240.24.203/~primestore/api/website/getCategories');
      const data = await response.json();
      
        setCategories(data.data);
      
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = `http://162.240.24.203/~primestore/api/website/getProducts?page=${pagination.currentPage}`;
      if (selectedCategory) {
        url += `&category_id=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data: APIResponse = await response.json();
      if (data.success) {
        setProducts(data.data.items);
        setPagination({
          currentPage: data.data.current_page,
          lastPage: data.data.last_page,
          total: data.data.total,
          perPage: data.data.per_page,
          nextPageUrl: data.data.next_page_url,
          prevPageUrl: data.data.prev_page_url
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 5) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.product.selling_price * item.quantity), 0);

  const navigateToProduct = (productId: number) => {
    router.push(`/${locale}/cartPage/${productId}`);
  };

  return (
    <main className="min-h-screen">
      <Header params={params} linkAr={linkAr} linkEn={linkEn} />

      <header className="bg-white shadow-sm">
        <div className={`container mx-auto px-4 py-4 flex items-center justify-between`}>
          <h1 className="text-2xl font-bold text-gray-900">
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="flex overflow-x-auto gap-4 items-center mb-8 pb-2 justify-center flex-wrap">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === null 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {locale === "ar" ? "جميع المنتجات" : "All Products"}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Image 
                src={category.image} 
                alt={category.name} 
                width={24} 
                height={24} 
                className="rounded-full"
              />
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
  {loading ? (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  ) : (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-semibold text-gray-600">
            {locale === "ar" 
              ? "لا توجد منتجات متاحة في هذا التصنيف" 
              : "No products available in this category"}
          </h2>
          <p className="mt-2 text-gray-500">
            {locale === "ar"
              ? "يرجى اختيار تصنيف آخر"
              : "Please select another category"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
                <div
                  key={product.id}
                  className="sm:w-[300px] w-full min-h-[450px] relative z-50 bg-[#ffffff] rounded-[20px] p-4 transition-transform hover:scale-[1.02]"
                  style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
                >
                  <div className="stars flex gap-1 p-3">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`text-[20px] ${index < product.stars ? "text-col" : "text-secondary"}`}
                      />
                    ))}
                  </div>

                  <div className="relative h-[250px] mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={250}
                      className="w-full h-full object-cover rounded-[15px]"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <button
                        className="order-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => navigateToProduct(product.id)}
                      >
                        <Eye size={20} className="text-gray-600" />
                      </button>
                      <h1 className={`text-[#000000] font-bold text-[18px] ${locale === "ar" ? "text-right" : "text-left"} line-clamp-1`}>
                        {product.name}
                      </h1>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="flex flex-col">
                        <span className="text-[15px] text-secondary line-through">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-col text-[25px] font-bold">
                          ${product.selling_price.toFixed(2)}
                          <span className="text-[15px] font-bold text-secondary">
                            {locale === "ar" ? " دك" : "Dr"}
                          </span>
                        </span>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-[25px] h-[25px]"
                          title={locale === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                        >
                          <Image src={CartAdd} alt="cart add" width={25} height={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      )}


    </>
  )}
</div>
      

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
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 py-4 border-b last:border-b-0"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <div className="text-sm text-gray-500">
                          ${item.product.selling_price.toFixed(2)} x {item.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateCartItemQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      
                            className="p-1 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                          </button>
                          <span className="px-3 py-1 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartItemQuantity(item.product.id, Math.min(5, item.quantity + 1))}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            disabled={item.quantity >= 5}
                          >
                            <Plus size={16} className={item.quantity >= 5 ? "text-gray-300" : "text-gray-600"} />
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
                  ))}
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

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={ShopImg}
                alt="About Us"
                width={500}
                height={300}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${locale == "ar" ? "text-right" : "text-left"}`}>
                {locale == "en" ? "Our Story " : "قصتنا"}
              </h2>
              <p className={`text-lg text-muted-foreground mb-6 ${locale == "ar" ? "text-right" : "text-left"}`}>
                {locale == "en"
                  ? "We believe in the power of nature to enhance your natural beauty. Our products are crafted with care using only the finest organic ingredients."
                  : "نؤمن بقوة الطبيعة في تعزيز جمالك الطبيعي. منتجاتنا مصنوعة بعناية باستخدام أفضل المكونات العضوية."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer params={params} />
    </main>
  );
}

export default CartPageClient;
