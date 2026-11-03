"use client";
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Camera, Play, Image as ImageIcon, ExternalLink, X, Heart, Eye, FolderUp, Mail, ShieldCheck, Volume2, VolumeX } from "lucide-react";

const GoogleDriveIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 87.3 78" fill="none">
    <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
    <path d="M43.65 25 29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5z" fill="#00ac47"/>
    <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15z" fill="#ea4335"/>
    <path d="M43.65 25 57.4 1.2C56.05.4 54.5 0 52.95 0H34.35c-1.55 0-3.1.4-4.45 1.2z" fill="#00832d"/>
    <path d="M59.8 53.1H87.3c0-1.55-.4-3.1-1.2-4.5l-20.7-35.85c-.8-1.4-1.95-2.5-3.3-3.3L48.35 33.25z" fill="#ffba00"/>
    <path d="M27.5 53.1h32.3L46.05 30.65l-2.4-4.15-16.15 26.6z" fill="#2684fc"/>
  </svg>
);

const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

interface MediaItem {
  id: string;
  title: string;
  category: "reunion" | "video";
  categoryLabel: string;
  imageUrl: string;
  date: string;
  location: string;
  description: string;
  isVideo?: boolean;
  videoUrl?: string;
}

const mediaItems: MediaItem[] = [
  {
    id: "m-1",
    title: "Jubilee Celebration Kit Delivery",
    category: "reunion",
    categoryLabel: "Jubilee Merch Delivery",
    imageUrl: "/aaphotos/successStories/323e978b-7d34-45e4-8141-2b7e07b5bbfe.JPG",
    date: "Global Alumni Convention",
    location: "SVNIT Campus Reunion",
    description: "Distributing official SVNIT custom merch kits, heritage memorabilia, and customized alumni badges to our jubilee reunion attendees."
  },
  {
    id: "m-2",
    title: "Batch Reunion Merchandise Fulfillments",
    category: "reunion",
    categoryLabel: "Jubilee Merch Delivery",
    imageUrl: "/aaphotos/successStories/35a42487-eb0e-469a-8a9e-448f35ef4b6c.JPG",
    date: "Global Alumni Convention",
    location: "Alumni Association Store",
    description: "Memorable moments as alumni receive their exclusive SVNIT legacy t-shirts and custom keepsakes during the convention meetups."
  }
];

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [isInstaMuted, setIsInstaMuted] = useState<boolean>(true);

  const filteredItems = selectedCategory === "all"
    ? mediaItems
    : mediaItems.filter((m) => m.category === selectedCategory);

  return (
    <div className="bg-[#F4F6F9] min-h-screen flex flex-col font-sans text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0F1E36] text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-900/40 text-red-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-red-800/40">
            <Camera className="h-4 w-4" />
            Alumni Moments & Deliveries
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Media & Photo Gallery
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Relive cherished memories from milestone jubilee reunions, convention fulfillments, and merchandise deliveries at SVNIT Surat.
          </p>

          {/* Social Quick Links */}
          <div className="pt-2 flex justify-center gap-4 flex-wrap">
            <a
              href="https://youtube.com/@alumniassociation-01?si=S6Lt57THqNENKMne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold rounded-xl transition duration-200 shadow-md"
            >
              <YoutubeIcon className="h-4 w-4" />
              <span>Official YouTube Channel</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>

            <a
              href="https://www.instagram.com/alumni_association_svnit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 text-white text-xs font-bold rounded-xl transition duration-200 shadow-md"
            >
              <InstagramIcon className="h-4 w-4" />
              <span>@alumni_association_svnit</span>
              <ExternalLink className="h-3 w-3 opacity-80" />
            </a>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl w-full mx-auto px-6 -mt-7 relative z-20">
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition duration-200 ${
              selectedCategory === "all"
                ? "bg-red-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Memories ({mediaItems.length})
          </button>
          <button
            onClick={() => setSelectedCategory("reunion")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition duration-200 ${
              selectedCategory === "reunion"
                ? "bg-red-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Jubilee Merch Delivery
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-grow space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Box */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo/logowithoutbg.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Eye className="h-3.5 w-3.5" /> Click to enlarge
                  </span>
                </div>
                <span className="absolute top-3 left-3 text-[11px] font-bold bg-[#0F1E36]/90 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Caption Content */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-[#0F1E36] line-clamp-2 group-hover:text-red-900 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5 line-clamp-2 font-quicksand">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-3">
                  <span>{item.location}</span>
                  <span className="font-medium text-gray-500">{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video & Social Hub Section */}
        <section className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-bold text-red-900 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-md">
                Streaming & Social
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0F1E36] mt-2">
                Watch Official Video Highlights
              </h2>
            </div>
            <div className="flex gap-3">
              <a
                href="https://youtube.com/@alumniassociation-01?si=S6Lt57THqNENKMne"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <YoutubeIcon className="h-4 w-4" /> Subscribe on YouTube
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* YouTube Shorts Spotlight Card */}
            <div className="bg-[#0F1E36] text-white p-6 sm:p-7 rounded-3xl space-y-5 flex flex-col justify-between shadow-xl border border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                    <Play className="h-4 w-4 fill-current" />
                    <span>YouTube Shorts · Looping Preview</span>
                  </div>
                  <span className="text-[10px] font-mono bg-red-600/30 text-red-300 border border-red-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Auto-Loop
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">SVNIT Alumni Association</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Preview official campus moments and reunion highlights. Visit our channel for full interviews, felicitation ceremonies, and event playlists.
                </p>
              </div>

              {/* YouTube Shorts Looping Video Embed */}
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black">
                <iframe
                  src="https://www.youtube.com/embed/rOIGz67MY4s?autoplay=1&mute=1&loop=1&playlist=rOIGz67MY4s&controls=1&modestbranding=1&rel=0&playsinline=1"
                  title="SVNIT Alumni Association YouTube Short Preview"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-400">@alumniassociation-01</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://youtube.com/shorts/rOIGz67MY4s?si=4Cx55kzJje-gZzKT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                  >
                    <YoutubeIcon className="h-3.5 w-3.5" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://youtube.com/@alumniassociation-01?si=S6Lt57THqNENKMne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/20"
                  >
                    <span>More Videos</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Reel Spotlight Card */}
            <div className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white p-6 sm:p-7 rounded-3xl space-y-5 flex flex-col justify-between shadow-xl border border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                    <InstagramIcon className="h-4 w-4" />
                    <span>Instagram Reel · Looping Preview</span>
                  </div>
                  <span className="text-[10px] font-mono bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Auto-Loop
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">@alumni_association_svnit</h3>
                <p className="text-xs text-white/95 leading-relaxed font-light">
                  Watch fresh reels from campus drives, merchandise deliveries, batch meetups, and throwbacks from SVNIT and SVRCET alumni.
                </p>
              </div>

              {/* Instagram Reel Looping Player */}
              <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-black group">
                <video
                  src="/videos/svnit_alumni_reel.mp4"
                  autoPlay
                  loop
                  muted={isInstaMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsInstaMuted(!isInstaMuted);
                  }}
                  aria-label={isInstaMuted ? "Unmute reel audio" : "Mute reel audio"}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md transition shadow-lg border border-white/20 z-20 cursor-pointer"
                >
                  {isInstaMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#F77737]" />}
                </button>

                {/* Top User Pill Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold border border-white/20 z-20 pointer-events-none">
                  <InstagramIcon className="h-3 w-3 text-[#F77737]" />
                  <span>@alumni_association_svnit</span>
                </div>

                {/* Bottom Overlay Link to Instagram */}
                <a
                  href="https://www.instagram.com/reel/DS2hkgaDCQY/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white flex items-end justify-between transition-opacity group-hover:from-black/95 z-20"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold leading-tight">Alumni 21st Reunion</p>
                    <p className="text-[10px] text-white/80">Tap to view full reel on Instagram</p>
                  </div>
                  <span className="p-1.5 rounded-lg bg-white/20 group-hover:bg-white/30 text-white text-xs transition">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-white/90 font-medium">Tag #SVNITAlumni</span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.instagram.com/reel/DS2hkgaDCQY/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-white text-[#FD1D1D] hover:bg-gray-100 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
                  >
                    <InstagramIcon className="h-3.5 w-3.5" />
                    <span>Watch on Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://www.instagram.com/alumni_association_svnit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 border border-white/25"
                  >
                    <span>Follow Page</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Media Submissions & Upload Section */}
        <section className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg space-y-8 relative overflow-hidden">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-[#0F1E36] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#C9A050]/40">
              <FolderUp className="h-4 w-4 text-[#C9A050]" />
              Community Media Submissions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1E36] tracking-tight">
              Have reunion or campus photos & videos to share?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              We welcome nostalgic vintage photos from your college days, department memories, hostel clicks, and recent jubilee batch reunion videos to feature in the official alumni archives.
            </p>
          </div>

          {/* 3 Upload & Share Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {/* Channel 1: Google Drive Direct Folder */}
            <div className="bg-[#F8FAFC] border-2 border-blue-100 hover:border-blue-400 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                    <GoogleDriveIcon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                    Direct Drive Folder
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-[#0F1E36]">Google Drive Upload</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Upload your full-resolution photos, batch albums, and reunion videos directly into our shared alumni drive folder.
                </p>
                <div className="text-[11px] text-amber-900 bg-amber-50/90 border border-amber-300/80 p-2.5 rounded-xl flex items-start gap-2 leading-relaxed">
                  <ShieldCheck className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Upload-Only Courtesy:</strong> Please upload your new files without modifying or deleting media shared by other alumni.
                  </span>
                </div>
              </div>

              <a
                href="https://drive.google.com/drive/folders/1p8fcWz2Gi06TCFoNNx2FVJjXnFdH7F7B?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:shadow"
              >
                <span>Upload to Drive Folder</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Channel 2: Email Submission */}
            <div className="bg-[#F8FAFC] border-2 border-gray-100 hover:border-red-300 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-700 shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full">
                    Email Delivery
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-[#0F1E36]">Email Submission</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Prefer sending via email? Attach photos or send Drive/Dropbox links directly to our editorial team with batch details.
                </p>
                <div className="text-[11px] text-gray-600 bg-gray-100 p-2.5 rounded-xl font-mono truncate border border-gray-200">
                  svnitalumniassociation01@gmail.com
                </div>
              </div>

              <a
                href="mailto:svnitalumniassociation01@gmail.com?subject=SVNIT%20Alumni%20Photo%20Submission"
                className="w-full py-2.5 px-4 bg-red-900 hover:bg-red-950 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:shadow"
              >
                <span>Send via Email</span>
                <Mail className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Channel 3: Social Media / Instagram DM */}
            <div className="bg-[#F8FAFC] border-2 border-gray-100 hover:border-pink-300 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-sm hover:shadow-md transition group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600 shadow-sm">
                    <InstagramIcon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-pink-800 px-2.5 py-0.5 rounded-full">
                    Instagram & Social
                  </span>
                </div>
                <h4 className="font-extrabold text-base text-[#0F1E36]">Instagram DM & Tags</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Tag us in your campus memories and jubilee stories, or send reels via Instagram Direct Message to be reposted officially.
                </p>
                <div className="text-[11px] text-pink-700 bg-pink-50 border border-pink-200 p-2.5 rounded-xl font-medium leading-relaxed">
                  Tag <strong>@alumni_association_svnit</strong> or use <strong>#SVNITAlumni</strong>
                </div>
              </div>

              <a
                href="https://www.instagram.com/alumni_association_svnit/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:shadow"
              >
                <span>DM on Instagram</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Photo Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white p-2 rounded-full transition z-10"
              aria-label="Close Preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded">
                {selectedImage.categoryLabel}
              </span>
              <h3 className="text-lg font-bold text-[#0F1E36]">{selectedImage.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-quicksand">
                {selectedImage.description}
              </p>
              <div className="flex items-center justify-between text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                <span>📍 {selectedImage.location}</span>
                <span>📅 {selectedImage.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
