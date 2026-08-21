"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Users, GraduationCap, Gift, ShieldAlert, Award, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0F1E36] text-white py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-red-500 uppercase">
            Sardar Vallabhbhai National Institute of Technology
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            SVNIT Alumni Association Store
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Connecting generations of SVNIT graduates, celebrating our collective legacy, and giving back to our alma mater.
          </p>
          <div className="pt-4 flex justify-center gap-2 text-xs md:text-sm font-bold text-red-400 tracking-widest uppercase">
            <span>CONNECT</span>
            <span>•</span>
            <span>COMMUNICATE</span>
            <span>•</span>
            <span>COLLABORATE</span>
          </div>
        </div>
      </section>

      {/* Main Content Info */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-16 flex-grow">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-[#0F1E36] tracking-tight">
              Our Legacy, Your Pride
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              The SVNIT Alumni Association Store is the official portal for authentic, premium-grade merchandise representing the Sardar Vallabhbhai National Institute of Technology, Surat. Designed to be a bridge between campus memories and your professional journey, every product carries the official SVNIT crest with pride.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm">
              Whether you are attending a batch reunion, visiting campus, or representing SVNIT at international forums, our collection of executive diaries, apparel, keychains, and heritage boxes is curated to meet the highest standards of quality.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 gap-6">
            <div className="space-y-2 text-center p-4 bg-[#F4F6F9] rounded-xl">
              <span className="text-3xl font-extrabold text-red-900">25K+</span>
              <p className="text-xs font-bold text-gray-500 uppercase">Global Alumni</p>
            </div>
            <div className="space-y-2 text-center p-4 bg-[#F4F6F9] rounded-xl">
              <span className="text-3xl font-extrabold text-[#0F1E36]">100%</span>
              <p className="text-xs font-bold text-gray-500 uppercase">Official Souvenirs</p>
            </div>
            <div className="space-y-2 text-center p-4 bg-[#F4F6F9] rounded-xl">
              <span className="text-3xl font-extrabold text-[#0F1E36]">1961</span>
              <p className="text-xs font-bold text-gray-500 uppercase">Est. Year</p>
            </div>
            <div className="space-y-2 text-center p-4 bg-[#F4F6F9] rounded-xl">
              <span className="text-3xl font-extrabold text-red-900">100%</span>
              <p className="text-xs font-bold text-gray-500 uppercase">Non-Profit</p>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F1E36] tracking-tight">
              Why We Stand Apart
            </h3>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              How the official alumni store translates legacy into community support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 hover:scale-[1.02] transition duration-300 space-y-4">
              <div className="p-3 bg-red-900/10 text-red-900 rounded-xl inline-block">
                <Users className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Community Connection</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                We craft merchandise that fosters identification and strong networking ties among our global alumni spanning multiple decades, batches, and regions.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 hover:scale-[1.02] transition duration-300 space-y-4">
              <div className="p-3 bg-red-900/10 text-red-900 rounded-xl inline-block">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Supporting Alma Mater</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                As a fully non-profit initiative, 100% of our net proceeds are directly contributed back to SVNIT student scholarships, infrastructure renovations, and startup incubation grants.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 hover:scale-[1.02] transition duration-300 space-y-4">
              <div className="p-3 bg-red-900/10 text-red-900 rounded-xl inline-block">
                <Gift className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-[#0F1E36]">Bulk Order Fulfillments</h4>
              <p className="text-gray-650 text-xs leading-relaxed">
                We specialize in customized bulk orders for batch silver/golden jubilees, conventions, and branch-specific student events. Contact us directly to submit your designs.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory / Contact CTA */}
        <div className="bg-[#0F1E36] text-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold">Have a custom requirement?</h3>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Are you planning a batch jubilee or need custom accessories for a campus event? Our design team can print bespoke batches of merchandise matching your batch logo.
            </p>
          </div>
          <a
            href="/contact"
            className="px-8 py-4 bg-red-900 text-white font-bold rounded-xl hover:bg-red-950 transition duration-350 shadow-md shrink-0 text-center w-full md:w-auto"
          >
            Contact Alumni Office
          </a>
        </div>

      </section>

      <Footer />
    </div>
  );
}