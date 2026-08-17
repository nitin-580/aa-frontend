"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductModal from "@/components/product/ProductModal";
import { products as fallbackProducts, Product } from "@/components/product/products";

export default function MerchandiseCatalog() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Apparel", "Accessories", "Gifts"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setProductsList(data);
      } else {
        setProductsList(fallbackProducts);
      }
    } catch (err: any) {
      console.error(err);
      setProductsList(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = productsList.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen text-[#0F1E36]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">SVNIT Merchandise</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Official merchandise curated by the SVNIT Alumni Association. Wear your legacy with pride.
          </p>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          {/* Categories Tab */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm font-semibold rounded-lg transition duration-200 ${
                  selectedCategory === category
                    ? "bg-red-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900 text-black bg-white"
            />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <p className="text-center py-16 text-gray-500 font-medium">Loading catalog from database...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <ProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
      <Footer />
    </div>
  );
}
