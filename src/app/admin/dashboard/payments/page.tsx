"use client";

import React, { useEffect, useState } from "react";

interface Payment {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  order?: {
    _id: string;
    totalAmount: number;
  };
  razorpayOrderId: string;
  paymentId?: string;
  amount: number;
  currency: string;
  status: string; // pending, paid, failed, completed
  method?: string;
  createdAt: string;
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/admin/payments");
      if (!res.ok) throw new Error("Failed to fetch payments");
      const data = await res.json();
      setPayments(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/payments/${paymentId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error("Failed to update payment status");
      fetchPayments();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resendPaymentLink = async (paymentId: string) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/payments/${paymentId}/resend`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("Failed to resend payment link");
      alert("Payment link sent successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-black">Loading payments...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 font-quicksand">All Payments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-black font-quicksand border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3 border-b">Payment ID</th>
              <th className="text-left p-3 border-b">User</th>
              <th className="text-left p-3 border-b">Order ID</th>
              <th className="text-left p-3 border-b">Amount</th>
              <th className="text-left p-3 border-b">Method</th>
              <th className="text-left p-3 border-b">Status</th>
              <th className="text-left p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{p._id}</td>
                <td className="p-3 border-b">
                  {p.user?.name} <br />
                  <span className="text-gray-500 text-sm">{p.user?.email}</span>
                </td>
                <td className="p-3 border-b">{p.order?._id || "-"}</td>
                <td className="p-3 border-b">₹{p.amount} {p.currency}</td>
                <td className="p-3 border-b">{p.method || "-"}</td>
                <td className="p-3 border-b">
                  <select
                    className="border px-2 py-1 rounded"
                    value={p.status}
                    onChange={(e) => updatePaymentStatus(p._id, e.target.value)}
                  >
                    {["pending", "paid", "failed", "completed"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 border-b flex flex-col gap-2">
                  <button
                    className="px-2 py-1 bg-green-900 text-white rounded hover:bg-green-700"
                    onClick={() => resendPaymentLink(p._id)}
                  >
                    Resend Payment Link
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsPage;
