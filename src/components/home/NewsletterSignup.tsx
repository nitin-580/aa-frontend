"use client";
import React, { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    console.log("Subscribed with:", email);
    // 🔗 here you can call your backend API or a service like Mailchimp
    setEmail("");
  };

  return (
    <div className="bg-[#F0E5D8] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl text-gray-900 sm:text-3xl font-quicksand">
          Subscribe to our Newsletter
        </h2>
        <p className="mt-2 text-gray-600 font-quicksand">
          Stay updated with the latest products, offers, and alumni news.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-80 px-4 py-3 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-red-900 focus:border-red-900 outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-900 text-white rounded-md font-semibold hover:bg-red-700 transition"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-sm text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
