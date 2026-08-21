"use client";
import React, { useState, useEffect } from "react";
import { X, ShoppingCart } from "lucide-react";
import { products } from "./products";
import CheckoutModal from "../checkout/CheckoutModal";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: typeof products[0] | null; // allow null
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const { addToCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [addedMessage, setAddedMessage] = useState(false);

  // Reset local states on product change
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    const success = await addToCart(product.id.toString(), 1, selectedSize, selectedColor, {
      name: product.name,
      price: product.price,
      image: product.image,
      originalPrice: product.originalPrice
    });
    if (success) {
      setAddedMessage(true);
      setTimeout(() => setAddedMessage(false), 3000);
    } else {
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Modal Layout */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-6 md:p-8 flex flex-col md:flex-row gap-8 border border-red-900/10 text-gray-900 font-sans">
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-900 transition-colors z-10 text-2xl"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Left: Product Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[350px] w-auto object-contain rounded-lg mix-blend-multiply"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/product1.png';
              }}
            />
          </div>

          {/* Right: Product Details Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded">
                Official Merchandise
              </span>
              <h2 className="text-2xl font-bold mt-3 mb-2 leading-snug">{product.name}</h2>
              <p className="text-gray-650 text-sm leading-relaxed mb-6 font-quicksand">
                {product.description}
              </p>

              {/* Size Select */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-5">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Select Size:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          selectedSize === size
                            ? "border-red-900 bg-red-900 text-white shadow-sm"
                            : "border-gray-300 hover:border-red-900 hover:bg-red-50 text-gray-700"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Select */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Select Color:
                  </span>
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
            </div>

            {/* Price & Action Buttons */}
            <div>
              {addedMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-lg p-2.5 mb-3 text-center animate-fade-in">
                  ✓ Product successfully added to your shopping cart!
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-black font-mono">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">M.R.P: ₹{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 border-2 border-red-900 text-red-900 rounded-lg hover:bg-red-50 font-bold text-sm transition flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    className="px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-950 font-bold text-sm transition shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features & Care:</h3>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 font-quicksand">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {checkoutOpen && (
        <CheckoutModal
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />
      )}
    </>
  );
};

export default ProductModal;
