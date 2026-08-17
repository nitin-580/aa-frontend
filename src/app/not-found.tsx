"use client";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen text-[#0F1E36] flex flex-col justify-between">
      <Navbar />

      <div className="max-w-xl mx-auto text-center px-6 py-20 flex-1 flex flex-col justify-center items-center">
        <div className="bg-white/80 p-5 rounded-full border border-red-900 shadow-sm mb-6">
          <img src="/logo/logowithoutbg.png" alt="SVNIT Emblem" className="h-24 w-24 object-contain" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Looks like you&apos;ve wandered off the SVNIT campus.
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-10 leading-relaxed font-quicksand">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s redirect you back to the main gates of the Alumni Association.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-red-900 text-white font-semibold text-sm rounded-lg hover:bg-red-950 transition duration-200 shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/merchandise"
            className="px-6 py-3 border border-red-900 text-red-900 font-semibold text-sm rounded-lg hover:bg-gray-100 transition duration-200"
          >
            Explore Merchandise
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}