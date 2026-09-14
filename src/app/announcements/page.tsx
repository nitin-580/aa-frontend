"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Bell, Calendar, Tag, FileText, ArrowUpRight, Search, Sparkles, Filter } from "lucide-react";
import Link from "next/link";

interface Announcement {
  id: string;
  refNo: string;
  title: string;
  category: "Reunions" | "Welfare" | "Elections" | "Store" | "General";
  date: string;
  isNew?: boolean;
  summary: string;
  details: string[];
  contactEmail?: string;
  actionText?: string;
  actionHref?: string;
}

const announcementsData: Announcement[] = [];

export default function AnnouncementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Reunions", "Welfare", "Store", "Elections", "General"];

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0F1E36] text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-900/40 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-red-800/40">
            <Bell className="h-4 w-4" />
            Official Bulletin Board
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Announcements & Circulars
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Stay updated with official notifications, jubilee reunion schedules, scholarship calls, and association circulars.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-6xl w-full mx-auto px-6 -mt-7 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-200 ${
                  selectedCategory === cat
                    ? "bg-red-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search circulars, ref no, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-900 text-black bg-white"
            />
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-grow space-y-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
            <Bell className="h-10 w-10 text-red-900 mx-auto" />
            <h3 className="text-lg font-bold text-[#0F1E36]">Live Announcements Broadcasted on Top Bar</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Official circulars and urgent store announcements are broadcast live on the top announcement banner across all pages.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 hover:border-red-900/30 transition-all duration-300 space-y-5"
            >
              {/* Header: Ref No, Category, Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                    {item.refNo}
                  </span>
                  <span className="text-xs font-bold text-red-900 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full uppercase animate-pulse">
                      <Sparkles className="h-3 w-3" /> New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  {item.date}
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#0F1E36] mb-2 leading-snug">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed font-quicksand">
                  {item.summary}
                </p>
              </div>

              {/* Key Highlights / Bullet points */}
              {item.details && item.details.length > 0 && (
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/60 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Details:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-gray-700 list-disc pl-5">
                    {item.details.map((point, idx) => (
                      <li key={idx} className="leading-relaxed">{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-gray-500">
                  {item.contactEmail && (
                    <span>
                      For queries: <strong className="text-red-900">{item.contactEmail}</strong>
                    </span>
                  )}
                </div>

                {item.actionText && item.actionHref && (
                  <Link
                    href={item.actionHref}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F1E36] hover:bg-red-900 text-white rounded-lg text-xs font-bold transition duration-200 shadow-sm"
                  >
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))
        )}

        {/* Newsletter / Notifications Subscription CTA */}
        <section className="bg-gradient-to-r from-red-900 to-[#0F1E36] text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold">Have an official circular to publish?</h3>
            <p className="text-xs md:text-sm text-gray-200 max-w-xl font-light">
              Reunion batch committees, chapter heads, and student activity councils can submit notices for circulation across our global alumni network.
            </p>
          </div>
          <a
            href="mailto:svnitalumniassociation01@gmail.com"
            className="px-6 py-3 bg-white text-red-900 font-bold rounded-xl hover:bg-gray-100 transition duration-200 shadow text-xs whitespace-nowrap"
          >
            Email Circular Draft
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
