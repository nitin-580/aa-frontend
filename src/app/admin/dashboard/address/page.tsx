"use client";

import React, { useEffect, useState } from "react";

interface Address {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
  createdAt: string;
}

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/admin/addresses");
      if (!res.ok) throw new Error("Failed to fetch addresses");
      const data = await res.json();
      setAddresses(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-black">Loading addresses...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 font-quicksand">All Addresses</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-black font-quicksand border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3 border-b">Address ID</th>
              <th className="text-left p-3 border-b">User</th>
              <th className="text-left p-3 border-b">Label</th>
              <th className="text-left p-3 border-b">Address</th>
              <th className="text-left p-3 border-b">Phone</th>
              <th className="text-left p-3 border-b">Default</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{a._id}</td>
                <td className="p-3 border-b">
                  {a.user?.name} <br />
                  <span className="text-gray-500 text-sm">{a.user?.email}</span>
                </td>
                <td className="p-3 border-b">{a.label}</td>
                <td className="p-3 border-b">
                  {a.street}, {a.city}, {a.state}, {a.postalCode}, {a.country}
                </td>
                <td className="p-3 border-b">{a.phoneNumber || "-"}</td>
                <td className="p-3 border-b">{a.isDefault ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressesPage;
