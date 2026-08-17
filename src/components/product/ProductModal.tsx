"use client";
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { products } from "./products";
import CheckoutModal from "../checkout/CheckoutModal" // make sure to import correctly

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: typeof products[0] | null; // allow null
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Auto-select first size/color if available
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : "");
    }
  }, [product]);

  if (!product) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-blur-40 bg-opacity-30 backdrop-blur-sm z-40"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-100 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative transition-transform transform scale-100">
              {/* Close Button */}
              <button
  onClick={onClose}
  className="fixed top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl z-50"
>
  ✕
</button>

              {/* Product Tags */}
              <div className="flex gap-2 mb-3">
                {product.features?.includes("Exclusive") && (
                  <span className="bg-yellow-300 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Exclusive
                  </span>
                )}
                {product.features?.includes("Bestseller") && (
                  <span className="bg-red-300 text-red-900 px-2 py-1 rounded-full text-xs font-semibold">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="w-full flex justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-md h-auto object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <h2 className="text-2xl font-quicksand text-gray-800 font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4 font-quicksand">{product.description}</p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-1.5">Select Size:</h3>
                  <div className="flex gap-2 text-gray-800 flex-wrap">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 border rounded-lg cursor-pointer transition ${
                          selectedSize === size
                            ? "border-red-900 bg-red-50 text-red-900 font-bold"
                            : "border-gray-300 hover:border-gray-900"
                        }`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-1.5">Select Color:</h3>
                  <div className="flex gap-2 flex-wrap items-center">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border cursor-pointer transition-all ${
                          selectedColor === color
                            ? "border-red-900 scale-110 ring-2 ring-red-900/30"
                            : "border-gray-300 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Price & Buy Button */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-3xl font-quicksand text-black font-bold">₹{product.price}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* More Details */}
              {product.features && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-800 mb-2">More Details:</h3>
                  <ul className="list-disc list-inside text-gray-700 font-quicksand">
                    {product.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Brand Section */}
              {product.brand && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-800 mb-1">Brand:</h3>
                  <p className="text-gray-700 font-quicksand">{product.brand}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
      />
    </>
  );
};

export default ProductModal;
