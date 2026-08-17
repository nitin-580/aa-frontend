"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Phone,
  Package,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface PaymentMethod {
  type: string;
  provider: string;
  last4Digits: string;
}

interface OrderProduct {
  product: {
    name: string;
    description?: string;
    price?: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  products: OrderProduct[];
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
}

interface Complaint {
  _id: string;
  message: string;
  status: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  savedPaymentMethods: PaymentMethod[];
  orders: Order[];
  complaints: Complaint[];
  wishlist: any[];
  addresses: {
    label: string;
    street?: string;
    city: string;
    state: string;
    pincode: string;
  }[];
  createdAt: string;
}

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/profile/profile", {
          method: "GET",
          credentials: "include", // <--- this is required for cookies
        });

        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose}></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#F8F4EE] shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } font-quicksand text-black`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
          <h2 className="text-lg font-semibold">Profile</h2>
          <X className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>

        {loading ? (
          <p className="p-4 text-center">Loading profile...</p>
        ) : error ? (
          <p className="p-4 text-center text-red-600">{error}</p>
        ) : user ? (
          <div className="overflow-y-auto h-full">
            {/* Basic Info */}
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-800">{user.email}</p>
              <p className="flex items-center gap-2 text-sm mt-2">
                <Phone className="w-4 h-4" /> {user.phoneNumber}
              </p>
              <p className="text-xs mt-1">
                {user.isPhoneVerified ? "Phone Verified ✅" : "Phone not verified ❌"}
              </p>
              <p className="text-xs">
                {user.isEmailVerified ? "Email Verified ✅" : "Email not verified ❌"}
              </p>
            </div>

            {/* Addresses */}
            <div className="p-4 border-b border-gray-300">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Saved Addresses
              </h4>
              {user.addresses.length === 0 ? (
                <p className="text-sm">No addresses saved</p>
              ) : (
                user.addresses.map((addr, i) => (
                  <div key={i} className="text-sm mb-2 border p-2 rounded-lg">
                    <p>{addr.label}</p>
                    {addr.street && <p>{addr.street}</p>}
                    <p>
                      {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Payment Methods */}
            <div className="p-4 border-b border-gray-300">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Saved Payment Methods
              </h4>
              {user.savedPaymentMethods.length === 0 ? (
                <p className="text-sm">No saved cards</p>
              ) : (
                user.savedPaymentMethods.map((card, i) => (
                  <p key={i} className="text-sm">
                    {card.provider} ****{card.last4Digits} ({card.type})
                  </p>
                ))
              )}
            </div>

            {/* Orders */}
            {/* Orders */}
{user.orders.length === 0 ? (
  <p className="text-sm">No orders yet</p>
) : (
  user.orders.map((order) => (
    <div key={order._id} className="mb-3 border border-gray-300 rounded-lg p-3">
      <p className="text-sm font-semibold">
        ₹{order.totalAmount} - {order.paymentMethod.toUpperCase()}
      </p>
      <p className="text-xs text-gray-800">Status: {order.status}</p>

      <div className="mt-2">
        <h5 className="text-sm font-semibold">ORDERS:</h5>
        {order.products.map((p, i) => (
          <div key={i} className="ml-2 text-xs">
            <p>
              {p.product.name} × {p.quantity}
            </p>
            {p.product.price && <p>₹{p.product.price.toFixed(2)}</p>}
            {p.product.description && <p className="text-gray-600">{p.product.description}</p>}
          </div>
        ))}
      </div>

      {order.address ? (
        <div className="mt-2 text-xs">
          <h5 className="font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Delivery Address:
          </h5>
          <p>
            {order.address.line1}, {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
        </div>
      ) : (
        <p className="mt-2 text-xs text-gray-600">Address not available</p>
      )}
    </div>
  ))
)}


            {/* Complaints */}
            <div className="p-4 border-b border-gray-300">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Complaints
              </h4>
              {user.complaints.length === 0 ? (
                <p className="text-sm">No complaints</p>
              ) : (
                user.complaints.map((comp) => (
                  <div key={comp._id} className="text-sm mb-2">
                    <p>{comp.message}</p>
                    <p className="text-xs text-gray-800">Status: {comp.status}</p>
                  </div>
                ))
              )}
            </div>

            {/* Meta Info */}
            <div className="p-4 text-xs text-gray-700 text-center">
              Account created on: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <p className="p-4 text-center text-gray-700">
            No profile data available.
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileDrawer;
