"use client";

import React, { useEffect, useState } from "react";

interface LocalOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  batch: string;
  address: string;
  products: string;
  subtotal: number;
  shipping: number;
  total: number;
  utr: string;
  paymentStatus: string; // PENDING_VERIFICATION, VERIFIED, REJECTED
  orderStatus: string;   // PENDING_PAYMENT, CONFIRMED, PROCESSING, COMPLETED, SHIPPED, DELIVERED, CANCELLED
  date: string;
  courier?: string;
  awb?: string;
  rejectionReason?: string;
}

// Global helper to simulate sending email (will display in UI and write to console)
const triggerSimulatedEmail = (order: LocalOrder, stage: string) => {
  let stageText = "";
  let bodyText = "";

  if (stage === "ORDER_CONFIRMED") {
    stageText = "Order Confirmed & Payment Verified";
    bodyText = `Your payment for order ${order.id} has been verified successfully. Your order is now confirmed!`;
  } else if (stage === "IN_PRODUCTION") {
    stageText = "Product In Production";
    bodyText = `Your ordered item (${order.products}) has entered the production stage. Our artisans are crafting it now!`;
  } else if (stage === "COMPLETED") {
    stageText = "Article Production Completed";
    bodyText = `Great news! The production of your item (${order.products}) is complete and is ready for dispatch.`;
  } else if (stage === "SHIPPED") {
    stageText = "Order Shipped";
    bodyText = `Your order ${order.id} has been handed over to our courier partner.
Courier Partner: ${order.courier || "Standard Courier"}
AWB / Tracking Number: ${order.awb || "N/A"}
You can track your package using the AWB number listed above.`;
  }

  const emailContent = `
========================================
SIMULATED EMAIL SENT SUCCESSFULLY
========================================
To: ${order.email}
Phone: ${order.phone}
Subject: SVNIT Alumni Store - Update: ${stageText}

Dear ${order.name},

${bodyText}

Thank you for supporting the SVNIT Alumni Association!
========================================
  `;
  console.log(emailContent);

  // Dispatch a custom event to show a beautiful floating alert on the screen
  if (typeof window !== "undefined") {
    const event = new CustomEvent("simulated-email", {
      detail: {
        to: order.email,
        subject: `SVNIT Store: ${stageText}`,
        body: bodyText,
        awb: order.awb,
        courier: order.courier
      }
    });
    window.dispatchEvent(event);
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<LocalOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [role, setRole] = useState("contractor"); // "superadmin" or "contractor"
  const [loading, setLoading] = useState(true);
  const [vendorEmail, setVendorEmail] = useState("vendor@svnitalumni.com");
  
  // Shipping input state per order id
  const [shippingInputs, setShippingInputs] = useState<{[key: string]: {courier: string, awb: string}}>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("svn_admin_role");
      if (savedRole !== "superadmin" && savedRole !== "contractor") {
        window.location.href = "/#admin";
        return;
      }
      setRole(savedRole);
      const savedVendor = localStorage.getItem("svn_vendor_email") || "vendor@svnitalumni.com";
      setVendorEmail(savedVendor);
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err: any) {
      console.error("Error loading orders from Neon:", err);
      // Fallback to local storage
      const local = localStorage.getItem("svn_orders");
      if (local) setOrders(JSON.parse(local));
    } finally {
      setLoading(false);
    }
  };

  const updateOrderOnServer = async (orderId: string, payload: Partial<LocalOrder>) => {
    try {
      // Map frontend camelCase properties to backend format
      const serverPayload = {
        paymentStatus: payload.paymentStatus,
        orderStatus: payload.orderStatus,
        courier: payload.courier,
        awb: payload.awb,
        rejectionReason: payload.rejectionReason,
        vendorEmail: vendorEmail
      };

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverPayload)
      });
      if (!res.ok) throw new Error("Failed to update order on Neon database");
      fetchOrders();
    } catch (err: any) {
      alert(err.message);
      // Fallback to local state update if backend is unreachable
      const updated = orders.map((o) => {
        if (o.id === orderId) {
          return { ...o, ...payload };
        }
        return o;
      });
      setOrders(updated);
      localStorage.setItem("svn_orders", JSON.stringify(updated));
    }
  };

  const handleVerify = (orderId: string) => {
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can verify payments.");
      return;
    }
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    triggerSimulatedEmail({
      ...order,
      paymentStatus: "VERIFIED",
      orderStatus: "CONFIRMED"
    }, "ORDER_CONFIRMED");

    updateOrderOnServer(orderId, {
      paymentStatus: "VERIFIED",
      orderStatus: "CONFIRMED"
    });
  };

  const handleReject = (orderId: string) => {
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can reject payments.");
      return;
    }
    const reason = prompt("Please enter the reason for payment rejection:");
    if (reason === null) return; 
    
    updateOrderOnServer(orderId, {
      paymentStatus: "REJECTED",
      orderStatus: "CANCELLED",
      rejectionReason: reason || "Incorrect UTR reference"
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrder = {
      ...order,
      orderStatus: status
    };

    if (status === "CONFIRMED") {
      triggerSimulatedEmail(updatedOrder, "ORDER_CONFIRMED");
    } else if (status === "PROCESSING") {
      triggerSimulatedEmail(updatedOrder, "IN_PRODUCTION");
    } else if (status === "COMPLETED") {
      triggerSimulatedEmail(updatedOrder, "COMPLETED");
    } else if (status === "SHIPPED") {
      triggerSimulatedEmail(updatedOrder, "SHIPPED");
    }

    updateOrderOnServer(orderId, {
      orderStatus: status
    });
  };

  const handleSaveShipping = (orderId: string) => {
    const inputs = shippingInputs[orderId];
    if (!inputs || !inputs.courier || !inputs.awb) {
      alert("Please enter both Courier Partner and AWB / Tracking Number!");
      return;
    }

    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrder = {
      ...order,
      courier: inputs.courier,
      awb: inputs.awb,
      orderStatus: "SHIPPED"
    };
    triggerSimulatedEmail(updatedOrder, "SHIPPED");

    updateOrderOnServer(orderId, {
      courier: inputs.courier,
      awb: inputs.awb,
      orderStatus: "SHIPPED"
    });
    alert("Shipping details saved and dispatched successfully!");
  };

  const handleInputChange = (orderId: string, field: "courier" | "awb", value: string) => {
    setShippingInputs({
      ...shippingInputs,
      [orderId]: {
        ...(shippingInputs[orderId] || { courier: "", awb: "" }),
        [field]: value
      }
    });
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.utr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.batch.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === "All" || o.paymentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 text-[#0F1E36] bg-[#F4F6F9] min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-extrabold text-[#7f1d1d] font-sans">
          Admin Payment Verification Portal
        </h1>
        <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-sm text-[#7f1d1d] font-semibold uppercase">
          Role: {role}
        </div>
      </div>

      {/* Settings Panel */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#0F1E36]">Vendor & Fulfillment Settings</h2>
          <p className="text-xs text-gray-500">Configure email address for vendor notification upon payment verification.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto items-center">
          <label className="text-xs font-bold text-gray-650 shrink-0">Vendor Email:</label>
          <input
            type="email"
            value={vendorEmail}
            onChange={(e) => {
              setVendorEmail(e.target.value);
              localStorage.setItem("svn_vendor_email", e.target.value);
            }}
            placeholder="vendor@svnitalumni.com"
            className="border px-3 py-1.5 rounded-lg text-xs w-60 text-black bg-white focus:outline-none focus:ring-1 focus:ring-[#7f1d1d]"
          />
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex gap-2">
          {["All", "PENDING_VERIFICATION", "VERIFIED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                statusFilter === status
                  ? "bg-[#7f1d1d] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by Order ID, UTR, Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-80 border border-gray-300 px-4 py-2 rounded-lg text-sm text-black bg-white"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full text-[#0F1E36] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 font-semibold text-gray-650">
            <tr>
              <th className="text-left p-4">Order ID & Date</th>
              <th className="text-left p-4">Customer Info</th>
              <th className="text-left p-4">Products</th>
              <th className="text-left p-4">Total & Shipping</th>
              <th className="text-left p-4 text-[#7f1d1d]">UTR Reference</th>
              <th className="text-left p-4">Payment Status</th>
              <th className="text-left p-4">Order Status</th>
              <th className="text-left p-4">Actions & Shipping</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500 font-medium">
                  Loading orders from database...
                </td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <span className="font-bold font-mono block">{o.id}</span>
                    <span className="text-xs text-gray-400">{o.date}</span>
                  </td>
                  <td className="p-4 leading-normal">
                    <span className="font-bold block">{o.name}</span>
                    <span className="text-xs text-gray-500 block">{o.batch}</span>
                    <span className="text-xs text-gray-500 block">{o.phone} | {o.email}</span>
                    <span className="text-xs text-gray-600 block max-w-sm whitespace-pre-wrap mt-1">
                      {o.address}
                    </span>
                  </td>
                  <td className="p-4 font-quicksand text-xs font-semibold">
                    {o.products}
                  </td>
                  <td className="p-4">
                    <span className="font-bold block">₹{o.total}</span>
                    <span className="text-xs text-gray-400 block">Shipping: ₹{o.shipping}</span>
                  </td>
                  <td className="p-4 font-mono font-bold text-gray-700">
                    {o.utr}
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      o.paymentStatus === "VERIFIED" ? "bg-green-105 text-green-800" :
                      o.paymentStatus === "REJECTED" ? "bg-red-105 text-red-800" :
                      "bg-yellow-105 text-yellow-800"
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {o.paymentStatus === "VERIFIED" ? (
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="border border-gray-300 px-2 py-1 rounded text-xs text-black bg-white outline-none"
                      >
                        {["CONFIRMED", "PROCESSING", "COMPLETED", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                          <option key={s} value={s}>
                            {s === "PROCESSING" ? "IN PRODUCTION" : s === "COMPLETED" ? "COMPLETED ARTICLE" : s}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs font-semibold text-gray-400 uppercase">
                        {o.orderStatus}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {/* Payment Verification Buttons - Superadmin only */}
                    {o.paymentStatus === "PENDING_VERIFICATION" && (
                      <div>
                        {role === "superadmin" ? (
                          <div className="flex gap-2 mb-2">
                            <button
                              onClick={() => handleVerify(o.id)}
                              className="px-2.5 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold transition shadow-sm"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleReject(o.id)}
                              className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition shadow-sm"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-red-500 font-semibold italic block mb-2">
                            Superadmin Only Verification
                          </span>
                        )}
                      </div>
                    )}

                    {o.paymentStatus === "REJECTED" && (
                      <span className="text-xs text-red-500 block italic max-w-xs mb-2">
                        Rejected: {o.rejectionReason || "Payment Rejected"}
                      </span>
                    )}

                    {/* Shipping details update panel */}
                    {o.paymentStatus === "VERIFIED" && (
                      <div className="mt-2 p-2 border border-gray-150 rounded-lg bg-gray-50 max-w-xs">
                        <p className="text-xs font-bold text-gray-600 mb-1.5">Shipping Details:</p>
                        {o.courier && o.awb ? (
                          <div className="text-xs text-gray-700 space-y-0.5">
                            <p><strong>Courier:</strong> {o.courier}</p>
                            <p><strong>AWB:</strong> {o.awb}</p>
                            <span className="inline-block mt-1 text-[10px] bg-green-150 text-green-800 font-semibold px-2 py-0.5 rounded">
                              Dispatched
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Courier Partner (e.g. Fedex)"
                              value={shippingInputs[o.id]?.courier || ""}
                              onChange={(e) => handleInputChange(o.id, "courier", e.target.value)}
                              className="w-full border border-gray-350 rounded px-2 py-1 text-xs text-black bg-white outline-none"
                            />
                            <input
                              type="text"
                              placeholder="AWB / Tracking Number"
                              value={shippingInputs[o.id]?.awb || ""}
                              onChange={(e) => handleInputChange(o.id, "awb", e.target.value)}
                              className="w-full border border-gray-350 rounded px-2 py-1 text-xs text-black bg-white outline-none font-mono"
                            />
                            <button
                              onClick={() => handleSaveShipping(o.id)}
                              className="w-full bg-[#7f1d1d] hover:bg-red-800 text-white font-bold py-1 rounded text-[10px] uppercase transition"
                            >
                              Save & Ship via Courier
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
