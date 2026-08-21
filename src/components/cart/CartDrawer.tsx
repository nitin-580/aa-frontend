"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import CheckoutModal from "../checkout/CheckoutModal";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, refreshCart, removeFromCart, updateQty, cartCount } = useCart();
  const [checkoutOpen, setCheckoutOpen] = React.useState(false);

  if (!isOpen) return null;

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    return acc + price * item.quantity;
  }, 0);

  // Calculate Shipping fee based on user rules:
  // - Up to 3 products: 150 Rs
  // - 4 to 6 products: 300 Rs
  // - 7 to 9 products: 450 Rs
  // - More than 9 products: Contact Council for bulk rates (or fallback to 0 / free)
  const getShippingFee = (qty: number) => {
    if (qty <= 0) return 0;
    if (qty <= 3) return 150;
    if (qty <= 6) return 300;
    if (qty <= 9) return 450;
    return 0; // Contact Council
  };

  const shipping = getShippingFee(cartCount);
  const total = subtotal + shipping;

  const handleDecrement = (item: any) => {
    updateQty(item.productId, 1, item.size, item.color, "decrement");
  };

  const handleIncrement = (item: any) => {
    updateQty(item.productId, 1, item.size, item.color, "increment");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col text-[#0F1E36]">
            
            {/* Header */}
            <div className="px-4 py-6 bg-red-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                <h2 className="text-lg font-bold">Shopping Cart ({cartCount})</h2>
              </div>
              <button onClick={onClose} className="text-white hover:text-red-200 transition">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mb-4 stroke-1" />
                  <p className="text-gray-500 font-semibold">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-4 px-6 py-2 bg-red-900 text-white rounded-lg text-sm font-bold hover:bg-red-950 transition"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg border bg-white"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/product1.png';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-[#0F1E36] truncate">{item.name}</h4>
                      
                      {/* Attributes */}
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-gray-500">
                        {item.size && <span>Size: <strong className="text-gray-700">{item.size}</strong></span>}
                        {item.color && (
                          <span className="flex items-center gap-1">
                            Color: 
                            <span 
                              className="w-3.5 h-3.5 rounded-full border inline-block" 
                              style={{ backgroundColor: item.color }}
                            />
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                          <button 
                            onClick={() => handleDecrement(item)}
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                          <button 
                            onClick={() => handleIncrement(item)}
                            className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-bold text-sm">₹{parseFloat(item.price) * item.quantity}</span>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="space-y-1.5 text-sm text-gray-650 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-black font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping charges:</span>
                    {cartCount > 9 ? (
                      <span className="text-red-900 font-semibold text-xs">Contact Council for Bulk rates</span>
                    ) : (
                      <span className="text-black font-semibold">₹{shipping}</span>
                    )}
                  </div>
                  {cartCount > 0 && cartCount < 9 && (cartCount % 3 !== 0) && (
                    <div className="bg-red-50 border border-red-100 text-red-900 rounded-lg p-2.5 text-[11px] font-medium leading-normal mt-1">
                      💡 You can add <strong>{3 - (cartCount % 3)} more product{3 - (cartCount % 3) > 1 ? "s" : ""}</strong> at the same shipping price of ₹{shipping}!
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-red-900 pt-2 border-t mt-2">
                    <span>Total:</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full py-3.5 bg-red-900 text-white hover:bg-red-950 rounded-lg font-bold text-sm transition duration-350 shadow-md text-center"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {checkoutOpen && (
        <CheckoutModal 
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          product={null} // null triggers checkout from cart items instead of a single product
        />
      )}
    </>
  );
}
