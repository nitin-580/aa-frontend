"use client";
import React, { useState } from "react";
import { X } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart }) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "alumni10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-40 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-[#F0E5D8] shadow-lg transform z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black">
          <h2 className="text-lg font-quicksand text-black">Your Cart</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Items */}
        <div className="p-4 overflow-y-auto h-[65%]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-quicksand text-black text-lg">🛒 Your cart is empty</p>
              <p className="text-sm text-gray-600 mt-1">Start shopping to add items</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 px-3">
                  <h3 className="font-quicksand text-black">{item.name}</h3>
                  <p className="text-sm text-black">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-black font-quicksand">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-black">
            {/* Coupon Code */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg font-quicksand text-black"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Apply
              </button>
            </div>

            {/* Subtotal & Discount */}
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-black">Subtotal:</span>
              <span className="font-quicksand text-black">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-1 text-green-700">
                <span className="font-semibold">Discount:</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between mb-4">
              <span className="font-bold text-black">Total:</span>
              <span className="font-bold font-quicksand text-black">₹{total}</span>
            </div>

            {/* Checkout */}
            <button className="w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-700 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
