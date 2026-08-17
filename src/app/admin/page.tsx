import React from "react";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="mt-4 text-gray-600">
        Welcome to your Admin Panel. Manage products, orders, users, and more.
      </p>

      {/* Example grid stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="mt-2 text-2xl font-bold text-red-900">₹ 2,45,000</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="mt-2 text-2xl font-bold text-red-900">345</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="mt-2 text-2xl font-bold text-red-900">1,230</p>
        </div>
      </div>
    </>
  );
}
