"use client";
import React, { useState, useEffect, useMemo } from "react";
import { X, ShoppingCart, Camera, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeImage, setActiveImage] = useState<string>("");
  const [addedMessage, setAddedMessage] = useState(false);

  // Compute all available unique images for the product (color-specific if available)
  const allImages = useMemo(() => {
    if (!product) return [];

    // Check if currently selected color has a dedicated multi-angle image array
    const imagesByColor = (product as any)?.imagesByColor;
    if (selectedColor && imagesByColor && Array.isArray(imagesByColor[selectedColor]) && imagesByColor[selectedColor].length > 0) {
      return imagesByColor[selectedColor];
    }

    const list: string[] = [];
    if (product.image) list.push(product.image);
    
    // Additional images array
    if ((product as any).images && Array.isArray((product as any).images)) {
      (product as any).images.forEach((img: string) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }

    // Color mapped images
    const colorMap = (product as any)?.colorImages || (product as any)?.color_images;
    if (colorMap && typeof colorMap === "object") {
      Object.values(colorMap).forEach((img: any) => {
        if (img && typeof img === "string" && !list.includes(img)) list.push(img);
      });
    }

    return list.length > 0 ? list : [product.image];
  }, [product, selectedColor]);

  // Reset local states on product change
  useEffect(() => {
    if (product) {
      const defaultColor = product.colors?.[0] || "";
      setSelectedSize(product.sizes?.[0] || "");
      setSelectedColor(defaultColor);

      const imagesByColor = (product as any)?.imagesByColor;
      const colorMap = (product as any)?.colorImages || (product as any)?.color_images;
      const colorImg = imagesByColor?.[defaultColor]?.[0] || colorMap?.[defaultColor];
      setActiveImage(colorImg || product.image);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);

    // Change photo if color has a mapped multi-angle array or single image
    const imagesByColor = (product as any)?.imagesByColor;
    if (imagesByColor && Array.isArray(imagesByColor[color]) && imagesByColor[color][0]) {
      setActiveImage(imagesByColor[color][0]);
      return;
    }

    const colorMap = (product as any)?.colorImages || (product as any)?.color_images;
    if (colorMap && colorMap[color]) {
      setActiveImage(colorMap[color]);
    }
  };

  const handlePrevImage = () => {
    if (allImages.length <= 1) return;
    const currentIndex = allImages.indexOf(activeImage);
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setActiveImage(allImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (allImages.length <= 1) return;
    const currentIndex = allImages.indexOf(activeImage);
    const nextIndex = (currentIndex + 1) % allImages.length;
    setActiveImage(allImages[nextIndex]);
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product.id.toString(), 1, selectedSize, selectedColor, {
      name: product.name,
      price: product.price,
      image: activeImage || product.image,
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

          {/* Left: Product Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col items-center gap-3 self-start">
            <div className="relative w-full flex items-center justify-center bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[300px] md:min-h-[360px] group">
              
              {/* Main Active Image */}
              <img
                src={activeImage || product.image}
                alt={product.name}
                className="max-h-[320px] w-auto object-contain rounded-lg mix-blend-multiply transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/product1.png';
                }}
              />

              {/* Prev / Next Slide Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Photo Count Tag */}
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                <Camera className="h-3 w-3" />
                <span>{allImages.indexOf(activeImage) >= 0 ? allImages.indexOf(activeImage) + 1 : 1} / {allImages.length}</span>
              </div>
            </div>

            {/* Thumbnail Gallery Strip */}
            <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 px-1">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-16 h-16 shrink-0 rounded-lg bg-gray-50 border transition-all duration-200 overflow-hidden ${
                    activeImage === imgUrl
                      ? "border-red-900 ring-2 ring-red-900/30 scale-105"
                      : "border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/product1.png';
                    }}
                  />
                </button>
              ))}

              {/* Placeholder slot indicating more photos can be added */}
              <div className="w-16 h-16 shrink-0 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 flex flex-col items-center justify-center text-center p-1 cursor-default text-gray-400">
                <Camera className="h-4 w-4 mb-0.5" />
                <span className="text-[7px] leading-tight font-semibold">More photos coming</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="animate-fade-in">
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
                      Select Color (Changes Photo):
                    </span>
                    <div className="flex gap-2 flex-wrap items-center">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorSelect(color)}
                          className={`w-7 h-7 rounded-full border cursor-pointer transition-all ${
                            selectedColor === color
                              ? "border-red-900 scale-110 ring-2 ring-red-900/30"
                              : "border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                          title={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="mt-4 mb-4">
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
                    type="button"
                    onClick={handleAddToCart}
                    className="px-4 py-2.5 border-2 border-red-900 text-red-900 rounded-lg hover:bg-red-50 font-bold text-sm transition flex items-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="px-5 py-2.5 bg-red-900 text-white rounded-lg hover:bg-red-950 font-bold text-sm transition shadow-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
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
