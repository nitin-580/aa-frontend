"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";

export default function ChaptersPage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen text-[#0F1E36]">
      <HeroBanner />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-3">The SVNIT Network is Everywhere</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-quicksand">
            Explore international and domestic chapters connecting SVNIT alumni globally.
          </p>
        </div>

        {/* Coming soon experience */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7f1d1d] to-[#0F1E36]"></div>
          
          <div className="max-w-xl mx-auto">
            <span className="text-[#7f1d1d] text-xs font-bold uppercase tracking-widest bg-[#E6F0FA] px-3.5 py-1.5 rounded-full inline-block mb-4">
              Coming Soon
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The SVNIT network is everywhere.</h2>
            <p className="text-gray-500 leading-relaxed font-quicksand">
              We&apos;re mapping the community, one chapter at a time. Chapter coordinates, event updates, and local group listings will appear here soon.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0F1E36] animate-bounce [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 rounded-full bg-[#0F1E36] animate-bounce [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 rounded-full bg-[#0F1E36] animate-bounce"></span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
