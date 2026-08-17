"use client";

import React, { useEffect, useState } from "react";

interface Address {
  label: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  addresses: Address[];
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const sendEmail = async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:5001/api/admin/users/${userId}/send-email`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to send email");
      alert("Email sent successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-black">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 font-quicksand">All Users</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-black font-quicksand border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3 border-b">Name</th>
              <th className="text-left p-3 border-b">Email</th>
              <th className="text-left p-3 border-b">Role</th>
              <th className="text-left p-3 border-b">Phone</th>
              <th className="text-left p-3 border-b">Verified</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 cursor-pointer">
                <td
                  className="p-3 border-b text-blue-600 hover:underline"
                  onClick={() => setSelectedUser(user)}
                >
                  {user.name}
                </td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.role}</td>
                <td className="p-3 border-b">{user.phoneNumber || "-"}</td>
                <td className="p-3 border-b">
                  {user.isEmailVerified ? "Email ✅" : "Email ❌"}, {user.isPhoneVerified ? "Phone ✅" : "Phone ❌"}
                </td>
                <td className="p-3 border-b flex flex-col gap-2">
                  <button
                    className="px-2 py-1 bg-red-900 text-white rounded hover:bg-red-700"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-2 py-1 bg-green-900 text-white rounded hover:bg-green-700"
                    onClick={() => sendEmail(user._id)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User details modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold"
              onClick={() => setSelectedUser(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedUser.name}</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phoneNumber || "-"}</p>
            <p><strong>Role:</strong> {selectedUser.role}</p>
            <h3 className="mt-4 font-semibold">Addresses:</h3>
            {selectedUser.addresses.length > 0 ? (
              selectedUser.addresses.map((a, idx) => (
                <div key={idx} className="border p-2 my-2 rounded">
                  <p>{a.label}</p>
                  <p>{a.street}, {a.city}, {a.state}, {a.postalCode}, {a.country}</p>
                  <p>{a.phoneNumber}</p>
                </div>
              ))
            ) : (
              <p>No addresses added</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
