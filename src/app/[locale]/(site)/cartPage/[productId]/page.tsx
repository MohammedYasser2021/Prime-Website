"use client";
import React from "react";
import cartproducts from "../../components/productsData/CartProducts";

interface ProductDetailProps {
  params: {
    locale: string;
    productId: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const { productId } = params; // Extract parameters from props

  // Find the product with the matching productId
  const product = cartproducts.find((prod) => prod.id.toString() === productId);

  if (!product) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600">The product with ID {productId} does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-[100px]">
      {/* Product Images */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex justify-center items-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-sm text-gray-500">
            <strong>Category:</strong> {product.category}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            {product.discount > 0 && (
              <span className="text-xl font-medium text-red-500">
                -{product.discount}%
              </span>
            )}
          </div>
          <div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
            <button className="px-6 py-3 ml-4 bg-gray-300 rounded-lg hover:bg-gray-400">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      {/* Additional Images */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {product.images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.title} - ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
