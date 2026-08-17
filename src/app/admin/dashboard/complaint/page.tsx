"use client";

import React, { useEffect, useState } from "react";

interface Complaint {
  _id: string;
  user: {
    name: string;
    email: string;
  };
  order?: {
    _id: string;
  };
  message: string;
  status: string; // open, resolved, closed
  createdAt: string;
}

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5001/api/admin/complaints");
      if (!res.ok) throw new Error("Failed to fetch complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (complaintId: string, status: string) => {
    try {
      const res = await fetch(
        `http://localhost:5001/api/admin/complaints/${complaintId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error("Failed to update complaint status");
      fetchComplaints();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-black">Loading complaints...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 font-quicksand">All Complaints</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border text-black font-quicksand border-gray-200 shadow rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-3 border-b">Complaint ID</th>
              <th className="text-left p-3 border-b">User</th>
              <th className="text-left p-3 border-b">Order ID</th>
              <th className="text-left p-3 border-b">Message</th>
              <th className="text-left p-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{c._id}</td>
                <td className="p-3 border-b">
                  {c.user?.name} <br />
                  <span className="text-gray-500 text-sm">{c.user?.email}</span>
                </td>
                <td className="p-3 border-b">{c.order?._id || "-"}</td>
                <td className="p-3 border-b">{c.message}</td>
                <td className="p-3 border-b">
                  <select
                    className="border px-2 py-1 rounded"
                    value={c.status}
                    onChange={(e) => updateComplaintStatus(c._id, e.target.value)}
                  >
                    {["open", "resolved", "closed"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsPage;
