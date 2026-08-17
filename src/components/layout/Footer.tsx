"use client";
import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // basic validation
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

  return (
    <footer className="bg-[#0F1E36] text-gray-300 py-12 border-t border-red-900/20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl font-bold text-red-500 mb-4">SVNIT Alumni Association</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            Fostering lifelong connections among the global SVNIT alumni community, supporting the growth of our alma mater, and empowering future generations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Ecosystem</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/merchandise" className="hover:text-red-500 transition">Merchandise</Link></li>
            <li><Link href="/jobs" className="hover:text-red-500 transition">Jobs Portal</Link></li>
            <li><Link href="/scholarships" className="hover:text-red-500 transition">Scholarships</Link></li>
            <li><Link href="/convention" className="hover:text-red-500 transition">Convention</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support & Info</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/ace-awards" className="hover:text-red-500 transition">ACE Awards</Link></li>
            <li><Link href="/association-projects" className="hover:text-red-500 transition">Projects</Link></li>
            <li><Link href="/chapters" className="hover:text-red-500 transition">Chapters</Link></li>
            <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-red-500 mb-4">Stay Connected</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get SVNIT newsletters, event updates, and offers.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-l-lg focus:outline-none text-black bg-white"
              />
              <button 
                type="submit"
                disabled={subscribing}
                className="bg-red-900 hover:bg-red-950 text-white font-semibold px-4 py-2 rounded-r-lg transition"
              >
                {subscribing ? "..." : "Subscribe"}
              </button>
            </div>
            {msg && <p className="text-xs text-red-400 font-semibold">{msg}</p>}
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SVNIT Alumni Association. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
