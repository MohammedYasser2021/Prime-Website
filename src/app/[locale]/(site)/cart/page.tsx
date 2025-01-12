"use client";
import React, { useState } from "react";
import { ShoppingCart as CartIcon } from "lucide-react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Prod from "../components/types/index";
import cartproducts from "../components/productsData/CartProducts";
import Image from "next/image";

interface CartProps {
  params: {
    locale: string;
  };
}

const Cart: React.FC<CartProps> = ({ params }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "creams" | "cosmetics" | "skincare" | "perfume"
  >("all");
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Beauty Store</h1>
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
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-4 overflow-x-auto">
          {(["all", "creams", "cosmetics", "skincare", 'perfume'] as const).map(
            (category) => (
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
            )
          )}
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
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
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
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
          })}
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
                <div className="flex gap-2 mt-4">
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
                <h2 className="text-3xl font-bold mb-4">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {selectedProduct.description}
                </p>
                <div className="mb-6">
                  {selectedProduct.discount > 0 ? (
                    <div className="flex items-center gap-2">
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
                        {selectedProduct.discount}% OFF
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
                  className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
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
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
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
                  Your cart is empty
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
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {item.product.title}
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
                      Total: ${cartTotal.toFixed(2)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
