"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    batch: "",
    purpose: "bulk_order",
    subject: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          batch: "",
          purpose: "bulk_order",
          subject: "",
          description: "",
        });
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to the server. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-8 bg-[#0F1E36] text-white p-8 md:p-10 rounded-2xl shadow-xl border border-white/10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">Get in Touch</h1>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Have questions about your order or want to initiate a bulk order for a batch jubilee? Drop us a message, and our alumni support team will get back to you shortly.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-900/30 text-red-400 rounded-xl border border-red-900/40">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Address</p>
                <p className="text-sm font-semibold mt-1">
                  The SVNIT Store, Near Admin Block,<br />
                  SVNIT Campus, Ichchhanath,<br />
                  Surat, Gujarat - 395007
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-900/30 text-red-400 rounded-xl border border-red-900/40">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call Us</p>
                <p className="text-sm font-semibold mt-1 hover:text-red-400 transition cursor-pointer">
                  +91 95943 96048
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-900/30 text-red-400 rounded-xl border border-red-900/40">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Support</p>
                <p className="text-sm font-semibold mt-1 hover:text-red-400 transition cursor-pointer break-all">
                  mail@svnitalumni.com
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-gray-400 leading-relaxed font-light">
            <p className="font-semibold text-gray-300 mb-1">Domestic Shipping Notice:</p>
            We strictly fulfill domestic orders within India. International shipments are currently not supported.
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="inline-flex p-4 bg-green-50 text-green-500 rounded-full border border-green-150 mb-2">
                <CheckCircle2 className="h-12 w-12 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F1E36]">Thank you!</h2>
              <p className="text-sm text-gray-650 max-w-md mx-auto leading-relaxed">
                Your message has been successfully saved. Our team will review your request and reach out to you via email or phone.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 px-6 py-2.5 bg-[#0F1E36] hover:bg-[#0F1E36]/90 text-white rounded-lg text-sm font-semibold transition"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#0F1E36]">Send a Message</h2>
                <p className="text-gray-500 text-xs mt-1">Please fill in your details below.</p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. rahul@example.com"
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="e.g. +91 9876543210"
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">SVNIT Batch (Year)</label>
                  <input
                    type="text"
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    placeholder="e.g. 2018 (or Student)"
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Purpose of Contact *</label>
                  <select
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  >
                    <option value="bulk_order">Bulk Order Inquiry (Jubilee/Batch)</option>
                    <option value="order_issue">Issue with Current Order</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Batch of 2012 Silver Jubilee T-shirts"
                    className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Requirements / Message *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your bulk requirement (quantity, product type) or order issue (specify Order ID)..."
                  className="w-full border border-gray-200 focus:border-[#0F1E36] px-4 py-3 rounded-lg text-sm text-black outline-none focus:ring-1 focus:ring-[#0F1E36] bg-gray-50 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-red-900 text-white hover:bg-red-950 disabled:bg-gray-400 rounded-lg font-bold text-sm transition duration-300 shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Sending Inquiry..."
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>

      <Footer />
    </div>
  );
}
