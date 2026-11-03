"use client";
import React, { useState, useEffect } from "react";
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
  Vote,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
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
  pdfUrl?: string;
  pdfDownloadName?: string;
}

interface ActivePosterModal {
  image: string;
  title: string;
  downloadName: string;
  actionText?: string;
  actionHref?: string;
  pdfUrl?: string;
  pdfDownloadName?: string;
}

// Announcements list ordered so the LATEST notice appears first on Page 1
const announcementsData: Announcement[] = [
  {
    id: "ann-elec-2026",
    refNo: "SVNIT/AA/ELEC/2026/01 · Management Committee Notice",
    title: "🗳️ Alumni Portal Registration Drive — Management Committee Election 2026",
    category: "Elections",
    date: "30th November 2026 (Voting Rights Deadline)",
    isNew: true,
    summary:
      "Sardar Vallabhbhai National Institute of Technology, Surat — Alumni Portal Registration Drive (Mandatory for Voting in the upcoming SVNIT Alumni Association Management Committee Election).\n\nCALL TO ACTION: SVNIT ALUMNI Register on our SVNIT ALUMNI PORTAL at the earliest to enable you to vote in the upcoming SVNIT Alumni Association Management Committee Election.",
    details: [
      "📢 CALL TO ACTION: SVNIT ALUMNI Register on our SVNIT ALUMNI PORTAL at the earliest to enable you to vote in the upcoming SVNIT Alumni Association Management Committee Election.",
      "💻 KEY MANDATE: The election will be ONLINE MODE. You can vote ONLY after registration. Registration is also mandatory for filing nomination. Decided in Management Committee Meeting: 23rd October 2026.",
      "⭐ BENEFITS: Create your profile, gain approval, and download your Alumni Membership Card! Also access the 'My Alumni Network' mobile app.",
      "⏳ CANDIDATES (Nomination Rights Deadline): Register on or before 15th November, 2026.",
      "🗳️ ALUMNUS (Voting Rights Deadline): Register on or before 30th November, 2026.",
      "🌐 Portal Link: https://alumniportal.svnit.ac.in/",
      "📨 Kindly forward above message to your authentic SVNIT connections and groups...",
      "🏛️ Issued By: Prof. Upena Dalal (Dean – A&RG, dean_arg@svnit.ac.in) & Er. Ranjit Sinha (President – SVNIT AA, ranjetsinha@gmail.com)",
    ],
    contactEmail: "dean_arg@svnit.ac.in",
    actionText: "Register on Alumni Portal Now",
    actionHref: "https://alumniportal.svnit.ac.in/",
    externalAction: true,
    posterImage: "/images/announcements/alumni_portal_registration_drive_election.png",
    pdfUrl: "/downloads/SVNIT_Alumni_Portal_Registration_Drive_Notice.pdf",
    pdfDownloadName: "SVNIT_Alumni_Portal_Registration_Drive_Notice.pdf",
  },
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
];

export default function AnnouncementsPage() {
  const categories = ["All", "Convention", "Elections"];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<ActivePosterModal | null>(null);

  // Page-Turn State
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev" | null>(null);
  const [viewMode, setViewMode] = useState<"paginated" | "all">("paginated");
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const filteredAnnouncements = announcementsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.refNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset to first page (latest notice) when search or filter category changes
  useEffect(() => {
    setCurrentPage(0);
    setTurnDirection(null);
  }, [selectedCategory, searchQuery]);

  const goToPage = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= filteredAnnouncements.length || newIndex === currentPage) return;
    setTurnDirection(newIndex > currentPage ? "next" : "prev");
    setCurrentPage(newIndex);
  };

  // Keyboard navigation for turning pages (Left / Right arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== "paginated") return;
      if (e.key === "ArrowRight") {
        if (currentPage < filteredAnnouncements.length - 1) {
          goToPage(currentPage + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (currentPage > 0) {
          goToPage(currentPage - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, filteredAnnouncements.length, viewMode]);

  // Touch Swipe navigation for mobile page turning
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50 && currentPage < filteredAnnouncements.length - 1) {
      goToPage(currentPage + 1);
    } else if (diff < -50 && currentPage > 0) {
      goToPage(currentPage - 1);
    }
    setTouchStart(null);
  };

  const renderNoticeArticle = (item: Announcement, isPaginated: boolean = false) => {
    const animationClass =
      isPaginated && turnDirection === "next"
        ? "page-turn-next"
        : isPaginated && turnDirection === "prev"
        ? "page-turn-prev"
        : "";

    return (
      <article
        key={isPaginated ? `${item.id}-${currentPage}` : item.id}
        onTouchStart={isPaginated ? handleTouchStart : undefined}
        onTouchEnd={isPaginated ? handleTouchEnd : undefined}
        className={`bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 card-glow-interactive space-y-6 relative overflow-hidden ${animationClass}`}
      >
        {/* Decorative Folded Corner Page-Turn Buttons (Dog-Ear effect) */}
        {isPaginated && currentPage < filteredAnnouncements.length - 1 && (
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            title="Turn to next notice page"
            className="absolute top-0 right-0 w-12 h-12 cursor-pointer group z-20"
          >
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[44px] border-t-[#C9A050] border-l-[44px] border-l-transparent group-hover:border-t-[#b88e3e] transition-all drop-shadow-sm"></div>
            <ChevronRight className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-[#0F1E36] font-bold" />
          </button>
        )}
        {isPaginated && currentPage > 0 && (
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            title="Turn back to previous notice page"
            className="absolute top-0 left-0 w-12 h-12 cursor-pointer group z-20"
          >
            <div className="absolute top-0 left-0 w-0 h-0 border-t-[44px] border-t-gray-300 border-r-[44px] border-r-transparent group-hover:border-t-gray-400 transition-all drop-shadow-sm"></div>
            <ChevronLeft className="absolute top-1.5 left-1.5 h-3.5 w-3.5 text-gray-800 font-bold" />
          </button>
        )}

        {/* Header: Ref No, Category, Date, and Page Folio Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {isPaginated && (
              <span className="font-mono text-[11px] font-extrabold text-[#0F1E36] bg-[#C9A050]/20 border border-[#C9A050]/40 px-2.5 py-1 rounded">
                PAGE {currentPage + 1} OF {filteredAnnouncements.length}
              </span>
            )}
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
                className="w-full h-auto object-contain rounded-lg max-h-[460px] mx-auto bg-white"
              />
              <div className="absolute inset-0 bg-[#0F1E36]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setActiveModal({
                      image: item.posterImage || "",
                      title: item.title,
                      downloadName:
                        item.id === "ann-elec-2026"
                          ? "SVNIT_Alumni_Portal_Registration_Drive_Notice.png"
                          : "22nd_Global_Alumni_Convention_Invitation.png",
                      actionText: item.actionText,
                      actionHref: item.actionHref,
                      pdfUrl: item.pdfUrl,
                      pdfDownloadName: item.pdfDownloadName,
                    })
                  }
                  className="px-4 py-2 bg-[#C9A050] text-[#0F1E36] font-bold text-xs uppercase tracking-wider rounded shadow flex items-center gap-1.5 cursor-pointer hover:bg-[#b88e3e]"
                >
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span>View Full Circular</span>
                </button>

                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    download={item.pdfDownloadName || "Notice.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded shadow flex items-center gap-1.5 transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}

                <a
                  href={item.posterImage}
                  download={
                    item.id === "ann-elec-2026"
                      ? "SVNIT_Alumni_Portal_Registration_Drive_Notice.png"
                      : "22nd_Global_Alumni_Convention_Invitation.png"
                  }
                  className="px-4 py-2 bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded border border-white/30 flex items-center gap-1.5 hover:bg-white/30"
                >
                  <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                  <span>Download Flyer</span>
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
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#0F1E36] mb-3 leading-snug">
                {item.title}
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed font-light whitespace-pre-line bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                {item.summary}
              </p>
            </div>

            {/* Bullet points */}
            {item.details && item.details.length > 0 && (
              <div className="bg-[#F8FAFC] p-4.5 rounded-xl border border-slate-200/60 space-y-2">
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
                    onClick={() =>
                      setActiveModal({
                        image: item.posterImage || "",
                        title: item.title,
                        downloadName:
                          item.id === "ann-elec-2026"
                            ? "SVNIT_Alumni_Portal_Registration_Drive_Notice.png"
                            : "22nd_Global_Alumni_Convention_Invitation.png",
                        actionText: item.actionText,
                        actionHref: item.actionHref,
                        pdfUrl: item.pdfUrl,
                        pdfDownloadName: item.pdfDownloadName,
                      })
                    }
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-100 transition duration-200 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>View Notice Flyer</span>
                  </button>
                )}

                {item.pdfUrl && (
                  <a
                    href={item.pdfUrl}
                    download={item.pdfDownloadName || "Notice.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-900 border border-red-200 rounded-lg text-xs font-bold transition duration-200 shadow-sm"
                  >
                    <FileText className="h-3.5 w-3.5 text-red-700" />
                    <span>Download Notice (PDF)</span>
                  </a>
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
    );
  };

  const activeNotice = filteredAnnouncements[currentPage] || filteredAnnouncements[0];

  return (
    <div
      className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans text-black"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      {/* 3D Page Flip Keyframe Animations */}
      <style jsx global>{`
        @keyframes pageTurnNext {
          0% {
            opacity: 0.25;
            transform: perspective(1400px) rotateY(-12deg) translateX(30px) scale(0.985);
            box-shadow: -20px 20px 30px rgba(0, 0, 0, 0.15);
          }
          100% {
            opacity: 1;
            transform: perspective(1400px) rotateY(0deg) translateX(0) scale(1);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          }
        }
        @keyframes pageTurnPrev {
          0% {
            opacity: 0.25;
            transform: perspective(1400px) rotateY(12deg) translateX(-30px) scale(0.985);
            box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.15);
          }
          100% {
            opacity: 1;
            transform: perspective(1400px) rotateY(0deg) translateX(0) scale(1);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
          }
        }
        .page-turn-next {
          animation: pageTurnNext 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: left center;
        }
        .page-turn-prev {
          animation: pageTurnPrev 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: right center;
        }
      `}</style>

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
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F1E36] text-black bg-white"
            />
          </div>
        </div>
      </section>

      {/* Announcements Interactive Folio (Page-Turn View) */}
      <main className="max-w-6xl w-full mx-auto px-6 py-10 flex-grow space-y-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
            <Bell className="h-10 w-10 text-red-900 mx-auto" />
            <h3 className="text-lg font-extrabold tracking-tight text-[#0F1E36]">
              No Announcements Found
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              No matching circulars found for your search query. Please select another category or clear your search.
            </p>
          </div>
        ) : (
          <>
            {/* Top Folio Header Bar with Page Navigator */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0F1E36] flex items-center justify-center text-[#C9A050]">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F1E36]">
                      Notice Folio
                    </span>
                    {viewMode === "paginated" && (
                      <span className="bg-[#0F1E36] text-[#C9A050] px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        Page {currentPage + 1} of {filteredAnnouncements.length}
                      </span>
                    )}
                    {viewMode === "paginated" && currentPage === 0 && (
                      <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-pulse">
                        Latest Notice
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500">
                    {viewMode === "paginated"
                      ? "Turn pages to read circulars in booklet view"
                      : "Viewing all notices in stacked list"}
                  </p>
                </div>
              </div>

              {/* Page Number Quick Tabs (Paginated Mode) */}
              {viewMode === "paginated" && filteredAnnouncements.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {filteredAnnouncements.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => goToPage(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        currentPage === idx
                          ? "bg-[#0F1E36] text-white shadow-md border border-[#C9A050]/40"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      title={item.title}
                    >
                      <span>Page {idx + 1}</span>
                      {idx === 0 && (
                        <span className="text-[10px] text-[#C9A050] font-extrabold">
                          ★ Latest
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* View Mode Toggle: Page Turn vs All Stacked */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode("paginated")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "paginated"
                      ? "bg-white text-[#0F1E36] shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#C9A050]" />
                  <span>Page Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    viewMode === "all"
                      ? "bg-white text-[#0F1E36] shadow-sm"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 text-gray-500" />
                  <span>View All</span>
                </button>
              </div>
            </div>

            {/* Content Display: Paginated Page vs All List */}
            {viewMode === "paginated" ? (
              <>
                {/* Current Turned Page */}
                {renderNoticeArticle(activeNotice, true)}

                {/* Bottom Page-Turn Navigation Bar */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transition shadow-sm"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>
                      Previous Page{" "}
                      {currentPage > 0
                        ? `(${filteredAnnouncements[currentPage - 1].category})`
                        : ""}
                    </span>
                  </button>

                  {/* Folio Dots and Page Hint */}
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div className="flex items-center gap-2">
                      {filteredAnnouncements.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToPage(i)}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            currentPage === i
                              ? "w-8 h-2.5 bg-[#0F1E36]"
                              : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                          }`}
                          title={`Turn to Page ${i + 1}`}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Page {currentPage + 1} of {filteredAnnouncements.length} · Use ◄ ► arrow keys on keyboard or swipe to turn
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === filteredAnnouncements.length - 1}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#C9A050] text-[#0F1E36] text-xs font-bold hover:bg-[#b88e3e] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer transition shadow-md"
                  >
                    <span>
                      Next Page{" "}
                      {currentPage < filteredAnnouncements.length - 1
                        ? `(${filteredAnnouncements[currentPage + 1].category})`
                        : ""}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                {filteredAnnouncements.map((item) => renderNoticeArticle(item, false))}
              </div>
            )}
          </>
        )}

        {/* Newsletter / Notifications Subscription CTA */}
        <section className="bg-gradient-to-r from-[#0F1E36] via-[#1a2e4d] to-[#0F1E36] text-white p-8 md:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#C9A050]">
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

      {/* Dynamic Enlarge Poster / Circular Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#0F1E36] text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm text-[#C9A050] line-clamp-1">
                {activeModal.title}
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-gray-300 hover:text-white p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 bg-gray-100 flex items-center justify-center max-h-[75vh] overflow-auto">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="bg-white p-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {activeModal.pdfUrl && (
                  <a
                    href={activeModal.pdfUrl}
                    download={activeModal.pdfDownloadName || "Notice.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow transition-colors"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Download Official PDF</span>
                  </a>
                )}
                <a
                  href={activeModal.image}
                  download={activeModal.downloadName}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                  <span>Download Flyer</span>
                </a>
              </div>
              {activeModal.actionHref && activeModal.actionText && (
                <a
                  href={activeModal.actionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] text-xs font-bold rounded-lg uppercase tracking-wider shadow flex items-center gap-1.5"
                >
                  <span>{activeModal.actionText}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
