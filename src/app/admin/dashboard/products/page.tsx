"use client";

import React, { useEffect, useState } from "react";
import { products as initialProducts, Product } from "@/components/product/products";

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [role, setRole] = useState("contractor");

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Apparel");
  const [description, setDescription] = useState("");
  const [imageSelect, setImageSelect] = useState("/images/diary.png");
  const [customImage, setCustomImage] = useState("");
  const [features, setFeatures] = useState("");
  
  // New size and color states
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");

  const availableImages = [
    { label: "Diary", value: "/images/diary.png" },
    { label: "Tshirt Navy", value: "/images/Tshirt.png" },
    { label: "Keychain", value: "/images/keychain.png" },
    { label: "Bottle", value: "/images/bottleAA.png" },
    { label: "Stanley Mug", value: "/images/stanley.png" },
    { label: "Tshirt White", value: "/images/Tshirt2.png" },
    { label: "Product Placeholder", value: "/images/product1.png" }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("svn_admin_role");
      if (savedRole !== "superadmin" && savedRole !== "contractor") {
        window.location.href = "/#admin";
        return;
      }
      setRole(savedRole);
    }
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
        setProductsList(initialProducts);
      }
    } catch (err: any) {
      console.error(err);
      setProductsList(initialProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory("Apparel");
    setDescription("");
    setImageSelect("/images/diary.png");
    setCustomImage("");
    setFeatures("");
    setSizes("");
    setColors("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice);
    setCategory(product.category);
    setDescription(product.description);
    
    const isPredefined = availableImages.some(img => img.value === product.image);
    if (isPredefined) {
      setImageSelect(product.image);
      setCustomImage("");
    } else {
      setImageSelect("custom");
      setCustomImage(product.image);
    }
    
    setFeatures(product.features ? product.features.join(", ") : "");
    setSizes(product.sizes ? product.sizes.join(", ") : "");
    setColors(product.colors ? product.colors.join(", ") : "");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can modify product details.");
      return;
    }
    if (!name || !price || !originalPrice) {
      alert("Please fill in the Name, Price, and Original Price fields.");
      return;
    }

    const finalImage = imageSelect === "custom" ? (customImage || "/images/product1.png") : imageSelect;
    const finalFeatures = features.split(",").map(f => f.trim()).filter(Boolean);
    const finalSizes = sizes.split(",").map(s => s.trim()).filter(Boolean);
    const finalColors = colors.split(",").map(c => c.trim()).filter(Boolean);

    const productPayload = {
      id: editingProduct ? editingProduct.id : String(Date.now()),
      name,
      brand: "SVNIT Alumni Association",
      price,
      original_price: originalPrice,
      image: finalImage,
      description,
      category,
      features: finalFeatures,
      sizes: finalSizes,
      colors: finalColors,
      discount: `${Math.round(((parseInt(originalPrice) - parseInt(price)) / parseInt(originalPrice)) * 100)}% Off`
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload)
      });
      if (!res.ok) throw new Error("Failed to save product details to Neon");
      alert("Product saved successfully to database!");
      setIsModalOpen(false);
      fetchProducts();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteProduct = async (id: number | string) => {
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can delete products.");
      return;
    }
    if (confirm("Are you sure you want to delete this merchandise item?")) {
      try {
        const res = await fetch(`/api/products?id=${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete product");
        alert("Product deleted successfully!");
        fetchProducts();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-6 text-gray-900 bg-[#F4F6F9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0F1E36]">Manage Merchandise Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, change details or upload photos for SVNIT collectibles.</p>
        </div>
        {role === "superadmin" ? (
          <button 
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-955 transition shadow-md"
          >
            + Add Collectible
          </button>
        ) : (
          <span className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg text-xs">
            Read-Only (Contractor)
          </span>
        )}
      </div>

      {/* Products list grid table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-600">Loading products catalog...</p>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500 tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Collectible Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price (INR)</th>
                <th className="px-6 py-4">Promo Price</th>
                <th className="px-6 py-4">Sizes & Colors</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {productsList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No items in catalog. Click &ldquo;+ Add Collectible&rdquo; to create one.
                  </td>
                </tr>
              ) : (
                productsList.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/product1.png';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#0F1E36]">
                      {product.name}
                      <p className="text-xs text-gray-400 font-normal line-clamp-1 mt-0.5">{product.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-[#0F1E36]">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">₹ {product.price}</td>
                    <td className="px-6 py-4 text-gray-400 line-through">₹ {product.originalPrice}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 max-w-xs">
                      <div>Sizes: {product.sizes && product.sizes.length > 0 ? product.sizes.join(", ") : "None"}</div>
                      <div className="mt-1">Colors: {product.colors && product.colors.length > 0 ? product.colors.join(", ") : "None"}</div>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      {role === "superadmin" ? (
                        <>
                          <button 
                            onClick={() => handleOpenEdit(product)}
                            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded font-medium transition"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No actions available</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-[#0F1E36] mb-4 border-b pb-2">
              {editingProduct ? "Edit Collectible Details" : "Add New Alumni Collectible"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Collectible Name *</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eg: SVNIT Limited Edition Flask"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Selling Price (INR) *</label>
                  <input 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Eg: 599"
                    className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Promo/Original Price *</label>
                  <input 
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="Eg: 999"
                    className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm text-black bg-white outline-none focus:border-[#0F1E36]"
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Gifts">Gifts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Photo Selection</label>
                  <select 
                    value={imageSelect}
                    onChange={(e) => setImageSelect(e.target.value)}
                    className="w-full border px-3 py-2 rounded text-sm text-black bg-white outline-none focus:border-[#0F1E36]"
                  >
                    {availableImages.map(img => (
                      <option key={img.value} value={img.value}>{img.label}</option>
                    ))}
                    <option value="custom">Custom Image Link / Path</option>
                  </select>
                </div>
              </div>

              {imageSelect === "custom" && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Custom Photo Path / URL</label>
                  <input 
                    type="text"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    placeholder="Eg: /images/custom-flask.png or URL"
                    className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                  />
                </div>
              )}

              {/* Add Sizes field */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Available Sizes (comma-separated)</label>
                <input 
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="Eg: S, M, L, XL, XXL (leave empty if not applicable)"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              {/* Add Colors field */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Available Colors (comma-separated hex/names)</label>
                <input 
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="Eg: #0F1E36, #7f1d1d, #FFFFFF (leave empty if not applicable)"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Key Features (comma-separated)</label>
                <input 
                  type="text"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Eg: 100% Cotton, Gold Crest, Double Walled"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Item Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell alumni about the legacy of this product..."
                  rows={3}
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36] resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 bg-red-900 hover:bg-red-955 text-white rounded font-bold text-sm transition"
                >
                  Save Collectible
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
