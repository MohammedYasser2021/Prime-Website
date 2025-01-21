"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sale from "../../../../assets/homeImages/sale.png";
import Offer from "./Offer";
import CartAdd from "../../../../assets/homeImages/cartadd.png";
import { X, Plus, Minus } from "lucide-react";

interface APITodayOffer {
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

interface CartItem extends APITodayOffer {
  quantity: number;
}

interface OffersProps {
  params: {
    locale: string;
  };
}

const Offers: React.FC<OffersProps> = ({ params }) => {
  const { locale } = params;
  const [offers, setOffers] = useState<APITodayOffer[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website/home`, {
          headers: {
            'lang': locale, // Add language header based on current locale
            'Accept': 'application/json',
          }
        });
        const data = await response.json();
        setOffers(data.data.todayoffer);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  const addToCart = (offer: APITodayOffer) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === offer.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === offer.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prev, { ...offer, quantity: 1 }];
    });
  };

  const removeFromCart = (offerId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== offerId));
  };

  const updateQuantity = (offerId: number, quantity: number) => {
    if (quantity >= 1) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === offerId ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="bg-section min-h-[515px] relative overflow-hidden">
      <Image
        src={Sale}
        alt="sale"
        className="absolute left-[-74px] top-[-20px]"
        style={{ opacity: 0.15 }}
      />
      <div className="container px-[16px] sm:px-[32px] md:px-[64px] lg:px-[112px] py-[30px] mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h1 className={`text-title font-bold text-[24px] sm:text-[30px] md:text-[36px] mb-5 text-center ${locale == "en" ? "lg:text-left" : "lg:text-right"}`}>
            {locale === "en" ? "Today Offers" : "عروض اليوم"}
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

        <div className="flex flex-wrap justify-center gap-6 mx-auto">
          {offers.map((offer) => (
            <Offer
              key={offer.id}
              offer={offer}
              locale={locale}
              onAddToCart={() => addToCart(offer)}
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

export default Offers;
