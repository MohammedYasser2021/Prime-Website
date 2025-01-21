"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Prime from "../../../../assets/homeImages/prime.png";
import Product from "./Product";
import { X, Plus, Minus } from "lucide-react";
import CartAdd from "../../../../assets/homeImages/cartadd.png";

interface APIProduct {
  id: number;
  name: string;
  discount: number;
  price: number;
  selling_price: number;
  image: string;
  stars: number;
  details: {
    summaryDetails: null;
  };
}

interface CartItem extends APIProduct {
  quantity: number;
}

interface ProductsProps {
  params: {
    locale: string;
  };
}

const Products: React.FC<ProductsProps> = ({ params }) => {
  const { locale } = params;
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website/home`, {
          headers: {
            'lang': locale, // Add language header based on current locale
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        setProducts(data.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [locale]); // Add locale to dependency array
  

  const addToCart = (product: APIProduct) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity >= 1) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="bg-section h-auto relative pb-[40px]">
      <div>
        <Image
          src={Prime}
          alt="prime"
          className={`w-[100%] max-w-[598px] h-[696px] opacity-[5%] absolute top-[-30px] ${
            locale === "ar" ? "left-0" : "left-0"
          }`}
        />
      </div>

      <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${locale == "en" ? "lg:text-left" : "lg:text-right"}`}>
            {locale === "en" ? "Choose For Us" : "اخترنا لك"}
          </h1>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Image src={CartAdd} alt="cart" width={25} height={25} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-col text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        <div className="product-list flex flex-wrap justify-center gap-6 mx-auto">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              locale={locale}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>

        {isCartOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
            <div className="bg-white h-full w-full max-w-md shadow-xl">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {locale === "en" ? "Shopping Cart" : "عربة التسوق"}
                </h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
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
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} x {item.quantity}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 text-right">
                      <div className="text-lg font-bold">
                        {locale === "en" ? "Total:" : "الإجمالي:"} ${cartTotal.toFixed(2)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
