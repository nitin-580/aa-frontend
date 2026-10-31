"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Bell,
  Calendar,
  Tag,
  FileText,
  ArrowUpRight,
  Search,
  Sparkles,
  ExternalLink,
  Download,
  Maximize2,
  X,
  Users,
  MapPin,
  Heart,
} from "lucide-react";
import Link from "next/link";

interface Announcement {
  id: string;
  refNo: string;
  title: string;
  category: "Convention" | "Elections";
  date: string;
  isNew?: boolean;
  summary: string;
  details: string[];
  contactEmail?: string;
  actionText?: string;
  actionHref?: string;
  externalAction?: boolean;
  posterImage?: string;
}

const announcementsData: Announcement[] = [
  {
    id: "ann-global-conv-2026",
    refNo: "SVNIT/AA/CONV/2026/02 · Public Trust Reg. No. F/2298/SURAT",
    title: "🎓 22nd Global Alumni Convention & Reunion 2026",
    category: "Convention",
    date: "26th December 2026",
    isNew: true,
    summary:
      "Dear Alumni, Remember the late-night chai, the hostel gossip, and the friends who felt like family? 💛 Why wait 20-25 years to meet them again? The SVNIT Alumni Association brings you the Global Convention, held every year so you can reconnect with your batchmates, old friends, and the wider alumni family. Come relive the memories and make some new ones. 🤝",
    details: [
      "📅 Date of Convention: Saturday, 26th December 2026",
      "📍 Venue: Sardar Vallabhbhai National Institute of Technology (SVNIT), Ichchanath, Surat 395007",
      "👥 Spouses & Partners: All alumni are warmly requested to bring their spouses and partners along to celebrate the convention!",
      "🤝 Reconnect: Relive your cherished campus memories and build lifelong connections across batches and continents.",
      "🏆 Concludes with the flagship ACE Alumnus Accolade (AAA) 2026 ceremony honoring distinguished alumni.",
      "📝 Official Registration: Please submit your details via the Google Form link below to confirm attendance.",
    ],
    contactEmail: "svnitalumniassociation01@gmail.com",
    actionText: "Register for Convention (Google Form)",
    actionHref: "https://forms.gle/CJ4suKBxiNgvbtpTA",
    externalAction: true,
    posterImage: "/images/announcements/22nd_global_alumni_convention_invitation.png",
  },
  {
    id: "ann-conv-2026",
    refNo: "SVNIT/AA/CONV/2026/01",
    title: "Annual Alumni Convention & ACE Alumnus Accolade (AAA) 2026 Nominations",
    category: "Convention",
    date: "25th November 2026",
    isNew: true,
    summary:
      "Nominations are officially invited for the prestigious ACE Alumnus Accolade 2026 to be announced and presented in person during the Global Annual Alumni Convention at the SVNIT Surat Campus.",
    details: [
      "Honouring alumni across 16 Accolade Categories in Groups A through E (Society, Alumni Association, SVNIT/SVRCET, Student Welfare, Entrepreneurship & Leadership).",
      "Nomination Dossier submission deadline: 25th November 2026.",
      "Each nomination must be proposed and seconded by two distinct SVNIT/SVRCET alumni.",
      "Conferred in person during the Global Annual Alumni Convention Day on 26th December 2026.",
    ],
    contactEmail: "mail@svnitalumni.com",
    actionText: "View Accolade Notice & Nominate",
    actionHref: "/ace-alumni-accolade",
    externalAction: false,
  },
  {
    id: "ann-elec-2026",
    refNo: "SVNIT/AA/ELEC/2026/01",
    title: "SVNIT Alumni Association Management Committee Election 2026 — Registration Drive",
    category: "Elections",
    date: "30th November 2026",
    isNew: true,
    summary:
      "Official election circular for all alumni of SVNIT / SVRCET Surat regarding voting rights and candidate nominations for the upcoming Management Committee elections.",
    details: [
      "Candidate Nominations: Alumni registering as candidates must complete portal registration on or before 15th November 2026.",
      "Alumnus Voting Rights: Register on or before 30th November 2026 to be included in the official electoral voter roll.",
      "The election will be conducted in ONLINE MODE. You can vote ONLY after verified portal registration.",
      "Download your digital Alumni Membership Card and access the 'My Alumni Network' mobile app.",
    ],
    contactEmail: "dean_arg@svnit.ac.in",
    actionText: "Register on Alumni Portal",
    actionHref: "/register",
    externalAction: false,
  },
];

export default function AnnouncementsPage() {
  const categories = ["All", "Convention", "Elections"];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
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
            Stay updated with official notifications, convention schedules, voting drives, and alumni association circulars.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-6xl w-full mx-auto px-6 -mt-7 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs: All, Convention, Elections */}
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0F1E36] text-[#C9A050] shadow-md border border-[#C9A050]/40"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat === "Convention" ? "Convention" : cat}
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
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E36] text-black bg-white"
            />
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-grow space-y-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
            <Bell className="h-10 w-10 text-red-900 mx-auto" />
            <h3 className="text-lg font-bold text-[#0F1E36]">
              No Announcements Found
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              No matching circulars found for your search query. Please select another category or clear your search.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 hover:border-[#C9A050]/40 transition-all duration-300 space-y-6"
            >
              {/* Header: Ref No, Category, Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
                    {item.refNo}
                  </span>
                  <span className="text-xs font-bold text-[#0F1E36] bg-amber-50 border border-[#C9A050]/30 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase animate-pulse">
                      <Sparkles className="h-3 w-3 text-amber-700" /> New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-gray-400" />
                  {item.date}
                </div>
              </div>

              {/* Poster & Main Content Grid (if poster exists) */}
              <div
                className={`grid gap-6 ${
                  item.posterImage
                    ? "lg:grid-cols-12 items-start"
                    : "grid-cols-1"
                }`}
              >
                {/* Poster Thumbnail (4 cols if present) */}
                {item.posterImage && (
                  <div className="lg:col-span-4 bg-[#0F1E36] p-2.5 rounded-xl border border-gray-200 group relative overflow-hidden shadow-sm">
                    <img
                      src={item.posterImage}
                      alt={item.title}
                      className="w-full h-auto object-contain rounded-lg max-h-[420px] mx-auto bg-white"
                    />
                    <div className="absolute inset-0 bg-[#0F1E36]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedPoster(item.posterImage || null)}
                        className="px-4 py-2 bg-[#C9A050] text-[#0F1E36] font-bold text-xs uppercase tracking-wider rounded shadow flex items-center gap-1.5 cursor-pointer hover:bg-[#b88e3e]"
                      >
                        <Maximize2 className="h-3.5 w-3.5" />
                        <span>View Invitation Poster</span>
                      </button>
                      <a
                        href={item.posterImage}
                        download="22nd_Global_Alumni_Convention_Invitation.png"
                        className="px-4 py-2 bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded border border-white/30 flex items-center gap-1.5 hover:bg-white/30"
                      >
                        <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                        <span>Download Poster</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Content Details (8 cols if poster exists, else full width) */}
                <div
                  className={`space-y-4 ${
                    item.posterImage ? "lg:col-span-8" : "w-full"
                  }`}
                >
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F1E36] mb-3 leading-snug font-display">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line bg-amber-50/60 p-4 rounded-xl border border-amber-100 italic">
                      &ldquo;{item.summary}&rdquo;
                    </p>
                  </div>

                  {/* Bullet points */}
                  {item.details && item.details.length > 0 && (
                    <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/60 space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Notice Details & Highlights:
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {item.details.map((point, idx) => (
                          <li key={idx} className="leading-relaxed flex items-start gap-2">
                            <span className="text-[#0F1E36] font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Call to action & Links */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs text-gray-500">
                      {item.contactEmail && (
                        <span>
                          For queries:{" "}
                          <a
                            href={`mailto:${item.contactEmail}`}
                            className="text-[#0F1E36] font-semibold underline"
                          >
                            {item.contactEmail}
                          </a>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {item.posterImage && (
                        <button
                          type="button"
                          onClick={() => setSelectedPoster(item.posterImage || null)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-100 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span>View Poster</span>
                        </button>
                      )}

                      {item.actionText && item.actionHref && (
                        item.externalAction ? (
                          <a
                            href={item.actionHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] rounded-lg text-xs font-bold transition duration-200 shadow-md uppercase tracking-wider"
                          >
                            <span>{item.actionText}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={item.actionHref}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#0F1E36] hover:bg-[#1a2e4d] text-[#C9A050] rounded-lg text-xs font-bold transition duration-200 shadow-md uppercase tracking-wider"
                          >
                            <span>{item.actionText}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}

        {/* Newsletter / Notifications Subscription CTA */}
        <section className="bg-gradient-to-r from-[#0F1E36] via-[#1a2e4d] to-[#0F1E36] text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#C9A050]">
              Have an official circular or reunion announcement?
            </h3>
            <p className="text-xs md:text-sm text-gray-200 max-w-xl font-light">
              Batch committees, chapter convenors, and alumni organizers can submit official event notices for circulation across our global alumni network.
            </p>
          </div>
          <a
            href="mailto:svnitalumniassociation01@gmail.com?subject=Official%20Circular%20Submission"
            className="px-6 py-3 bg-[#C9A050] text-[#0F1E36] font-bold rounded-xl hover:bg-[#b88e3e] transition duration-200 shadow text-xs whitespace-nowrap uppercase tracking-wider"
          >
            Email Circular Draft
          </a>
        </section>
      </main>

      {/* Poster Enlarge Modal */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#0F1E36] text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm text-[#C9A050]">
                22nd Global Alumni Convention & Reunion 2026 — Official Invitation
              </span>
              <button
                type="button"
                onClick={() => setSelectedPoster(null)}
                className="text-gray-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-100 flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={selectedPoster}
                alt="22nd Global Alumni Convention & Reunion 2026 Poster"
                className="max-h-[75vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <a
                href={selectedPoster}
                download="22nd_Global_Alumni_Convention_Invitation.png"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                <span>Download Poster Image</span>
              </a>
              <a
                href="https://forms.gle/CJ4suKBxiNgvbtpTA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] text-xs font-bold rounded-lg uppercase tracking-wider shadow"
              >
                Register on Google Form →
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
