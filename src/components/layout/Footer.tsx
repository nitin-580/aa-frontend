"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }

    setSubscribing(true);
    setMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Thank you for subscribing!");
        setEmail("");
      } else {
        setMsg(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setMsg("Failed to subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#EDEDED] text-[#2C2C2C] border-t border-[#DFDFDF] font-sans pt-12 pb-6 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs leading-relaxed">
        
        {/* CONTACT US */}
        <div>
          <h3 className="font-bold text-sm tracking-wider uppercase text-black mb-4">CONTACT US</h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-bold w-16 shrink-0 text-black">Address:</span>
              <span className="text-[#555555]">
                The SVNIT Store,<br />
                Near Admin Block, SVNIT Campus,<br />
                Ichchhanath, Surat, Gujarat<br />
                Pin - 395007
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-16 shrink-0 text-black">Phone:</span>
              <span className="text-[#555555] font-semibold">+91 635 331 2523</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-16 shrink-0 text-black">Email:</span>
              <span className="text-[#7f1d1d] font-semibold break-all">communicationsatanant@gmail.com</span>
            </div>
          </div>
        </div>

        {/* MY ACCOUNT */}
        <div>
          <h3 className="font-bold text-sm tracking-wider uppercase text-black mb-4">MY ACCOUNT</h3>
          <ul className="space-y-2 text-[#7f1d1d]">
            <li><Link href="#profile" className="hover:underline flex items-center gap-1.5">• My Profile</Link></li>
            <li><Link href="#orders" className="hover:underline flex items-center gap-1.5">• My Orders</Link></li>
            <li><Link href="#support" className="hover:underline flex items-center gap-1.5">• Support</Link></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-bold text-sm tracking-wider uppercase text-black mb-4">COMPANY</h3>
          <ul className="space-y-2 text-[#7f1d1d]">
            <li><Link href="#brand" className="hover:underline flex items-center gap-1.5">• SVNIT Brand Mark</Link></li>
            <li><Link href="#contact" className="hover:underline flex items-center gap-1.5">• Contact us today!</Link></li>
            <li><Link href="#about" className="hover:underline flex items-center gap-1.5">• About SVNIT</Link></li>
            <li><Link href="#bulk" className="hover:underline flex items-center gap-1.5">• Bulk Order</Link></li>
            <li><Link href="#business" className="hover:underline flex items-center gap-1.5">• Business Enquiry</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold text-sm tracking-wider uppercase text-black mb-4">SUPPORT</h3>
          <ul className="space-y-2 text-[#7f1d1d]">
            <li><Link href="/policies/return" className="hover:underline flex items-center gap-1.5">• Return Policy</Link></li>
            <li><Link href="/policies/shipping" className="hover:underline flex items-center gap-1.5">• Shipping</Link></li>
            <li><Link href="/policies/discount" className="hover:underline flex items-center gap-1.5">• Discount Policy</Link></li>
            <li><Link href="/policies/privacy" className="hover:underline flex items-center gap-1.5">• Privacy And Policy</Link></li>
            <li><Link href="/policies/website" className="hover:underline flex items-center gap-1.5">• Website Policy</Link></li>
            <li><Link href="/policies/copyright" className="hover:underline flex items-center gap-1.5">• Copyright Policy</Link></li>
            <li><Link href="/contact" className="hover:underline flex items-center gap-1.5">• Contact Us</Link></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div id="newsletter" className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm tracking-wider uppercase text-black mb-4">NEWSLETTER</h3>
            <form onSubmit={handleSubscribe} className="flex gap-0 mb-4 max-w-[280px]">
              <input
                type="email"
                placeholder="Your Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-[#CCCCCC] border-r-0 focus:outline-none text-black bg-white text-xs"
                required
              />
              <button
                type="submit"
                disabled={subscribing}
                className="bg-[#A44A3F] hover:bg-[#8B3A30] text-white font-bold px-4 py-2 text-xs transition duration-200"
              >
                {subscribing ? "..." : "OK"}
              </button>
            </form>
            {msg && <p className="text-[11px] text-[#A44A3F] font-semibold mb-3">{msg}</p>}
          </div>

          <div>
            <h3 className="font-bold text-[11px] tracking-wider uppercase text-black mb-3">LET&apos;S SOCIALIZE</h3>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#FF4500] hover:opacity-90 rounded text-white font-bold transition">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-4 h-4 invert" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#3B5998] hover:opacity-90 rounded text-white font-bold transition">
                <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-4 h-4 invert" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#00ACEE] hover:opacity-90 rounded text-white font-bold transition">
                <img src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png" alt="Twitter" className="w-4 h-4 invert" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-[#0077B5] hover:opacity-90 rounded text-white font-bold transition">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-4 h-4 invert" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* BESTSELLERS */}
      <div className="max-w-7xl mx-auto border-t border-[#DFDFDF] mt-10 pt-6 text-[11px] text-[#555555]">
        <span className="font-bold text-black uppercase mr-2">BESTSELLERS:</span>
        <span className="font-medium">
          Classic Polo Navy | Premium Polo White | Mask SVNIT Grey | Coffee Mug Blue With Lid | Cap SVNIT Red | Tie Silk Grey Jacquard
        </span>
      </div>

      {/* Footer copyright & Scroll to top */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between border-t border-[#DFDFDF] mt-6 pt-6 text-[11px] text-[#555555] gap-4">
        <div>
          Copyright © The SVNIT Store. All Rights Reserved. Designed by NWDCo
        </div>

        {/* Scroll To Top Button */}
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#A44A3F] hover:bg-[#8B3A30] text-white flex items-center justify-center transition duration-300 shadow-md focus:outline-none shrink-0"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
