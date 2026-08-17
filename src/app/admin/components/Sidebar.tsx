"use client";
import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  IndianRupee,
  Notebook,
  Cross,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin" },
    { name: "Products", icon: <Package size={20} />, href: "/admin/dashboard/products" },
    { name: "Orders", icon: <ShoppingCart size={20} />, href: "/admin/dashboard/orders" },
    { name: "Jobs", icon: <Briefcase size={20} />, href: "/admin/dashboard/jobs" },
    { name: "Users", icon: <Users size={20} />, href: "/admin/dashboard/users" },
    { name: "Payments", icon: <IndianRupee size={20} />, href: "/admin/dashboard/payments" },
    { name: "Address", icon: <Notebook size={20} />, href: "/admin/dashboard/address" },
    { name: "Complaint", icon: <Cross size={20} />, href: "/admin/dashboard/complaint" },
    { name: "Settings", icon: <Settings size={20} />, href: "/dashboard/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-red-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-red-800">
        Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              onClick={() => setActive(item.name.toLowerCase())}
              className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition 
              ${
                active === item.name.toLowerCase()
                  ? "bg-red-700 text-white"
                  : "hover:bg-red-800 text-gray-200"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-red-800">
        <button className="flex items-center gap-2 px-4 py-2 rounded-md w-full bg-red-800 hover:bg-red-700 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
