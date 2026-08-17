"use client";
import React, { useState, useEffect } from "react";
import { products as fallbackProducts } from "@/components/product/products";
import ProductModal from "@/components/product/ProductModal";

const ProductGrid: React.FC = () => {
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductList(data);
        } else {
          setProductList(fallbackProducts);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProductList(fallbackProducts);
      });
  }, []);

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F4F6F9] py-16 text-[#0F1E36]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3 font-sans">
            Carry the SVNIT Legacy
          </h2>
          <p className="text-lg text-gray-500 font-dancing">
            Wear it. Gift it. Keep the memories alive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100"
            >
              <div 
                className="overflow-hidden bg-gray-50 relative cursor-pointer aspect-square"
                onClick={() => openModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/product1.png';
                  }}
                />
                <span className="absolute top-3 left-3 bg-red-900 text-white px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow">
                  {product.category}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    className="text-lg font-bold text-[#0F1E36] line-clamp-1 cursor-pointer hover:text-red-900 transition"
                    onClick={() => openModal(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-baseline gap-x-2">
                    <span className="text-2xl font-bold text-[#0F1E36]">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-sm font-semibold text-green-600 ml-auto bg-green-50 px-2 py-0.5 rounded">
                      {product.discount}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <button
                      onClick={() => openModal(product)}
                      className="w-full px-4 py-2.5 text-xs font-semibold border border-red-900 text-red-900 rounded-lg hover:bg-red-900 hover:text-white transition duration-300"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => openModal(product)}
                      className="w-full px-4 py-2.5 text-xs font-semibold bg-red-900 text-white rounded-lg hover:bg-red-950 transition duration-300 shadow-sm"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductGrid;

