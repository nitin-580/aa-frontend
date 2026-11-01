"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  ExternalLink,
  Globe,
  ShieldCheck,
  Award,
  Users,
  Compass,
  ArrowRight,
  Maximize2,
  RefreshCw,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function AlumniPortalPage() {
  const portalUrl = "https://www.svnit.ac.in/web/alumni/";
  const registrationUrl = "https://alumniportal.svnit.ac.in/";

  const [isFullscreen, setIsFullscreen] = useState(false);

  const portalFeatures = [
    {
      title: "Distinguished Alumni Awards",
      desc: "Annual flagship recognitions by SVNIT honouring outstanding alumnus achievements across industry, research, and public service.",
      icon: Award,
    },
    {
      title: "Alumni Membership Registration",
      desc: "Online registration portal to obtain your official SVNIT Alumni Membership Card and secure voting rights in committee elections.",
      icon: ShieldCheck,
    },
    {
      title: "Alma Connect & Chapters",
      desc: "Connect with global alumni batches, regional chapters across continents, and stay connected with the institute.",
      icon: Users,
    },
    {
      title: "Institute Initiatives & Giving",
      desc: "Opportunities to contribute towards student scholarships, infrastructure endowment, mentorship, and guest lectures.",
      icon: Compass,
    },
  ];

  return (
    <div
      className="bg-[#F8F9FA] min-h-screen text-[#0F1E36] font-sans antialiased flex flex-col"
      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
    >
      <Navbar />

      {/* Hero Section */}
      <header className="relative isolate overflow-hidden bg-[#0F1E36] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/images/svnit_alumni_portal_preview.webp"
            alt="SVNIT Alumni Portal Preview Backdrop"
            className="h-full w-full object-cover opacity-15 filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E36]/90 via-[#0F1E36]/95 to-[#0F1E36]"></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-20 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#C9A050]/15 border border-[#C9A050]/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#C9A050]">
            <Globe className="h-3.5 w-3.5" />
            <span>Official Institute Gateway · SVNIT Surat</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            SVNIT Alumni Portal
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Welcome to the direct gateway for the official Sardar Vallabhbhai National Institute of Technology (SVNIT) Alumni Web Portal.
          </p>

          {/* Hyperlink Redirect & Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] font-bold text-xs uppercase tracking-wider rounded-lg shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Redirect to Official Portal</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <a
              href="#portal-preview"
              className="px-6 py-3.5 bg-white/10 border border-white/25 text-white hover:bg-white/20 font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <span>View Portal Preview Below</span>
              <ArrowRight className="h-4 w-4 text-[#C9A050]" />
            </a>
          </div>

          <p className="text-xs text-gray-400 font-mono pt-1">
            Official Portal URL:{" "}
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A050] underline hover:text-white"
            >
              {portalUrl}
            </a>
          </p>
        </div>
      </header>

      {/* Main Preview Container */}
      <main className="max-w-6xl w-full mx-auto px-6 py-14 flex-grow space-y-16">
        {/* Browser Mockup Section */}
        <section id="portal-preview" className="scroll-mt-24 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F1E36]">
                Live Portal Preview
              </h2>
              <p className="text-xs text-gray-500">
                Visual preview of the official SVNIT Alumni Web Portal at{" "}
                <span className="font-mono text-[#0F1E36]">{portalUrl}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="px-3 py-1.5 border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5 text-gray-500" />
                <span>{isFullscreen ? "Exit Fullscreen" : "Enlarge Preview"}</span>
              </button>

              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 bg-[#0F1E36] text-[#C9A050] rounded text-xs font-bold uppercase tracking-wider hover:bg-[#1a2e4d] flex items-center gap-1.5 shadow"
              >
                <span>Open Live Link</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Realistic Desktop Browser Frame */}
          <div
            className={`bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden transition-all duration-300 ${
              isFullscreen
                ? "fixed inset-4 z-50 flex flex-col max-h-[calc(100vh-2rem)]"
                : "relative w-full"
            }`}
          >
            {/* Browser Top Window Bar */}
            <div className="bg-[#1E293B] text-white px-4 py-2.5 flex items-center justify-between gap-3 select-none border-b border-slate-700 shrink-0">
              {/* Window Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="h-3 w-3 rounded-full bg-[#EF4444] inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-[#F59E0B] inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-[#10B981] inline-block"></span>
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-xl mx-auto bg-[#0F172A] border border-slate-600 rounded-md px-3 py-1 flex items-center justify-between text-xs font-mono text-gray-300 shadow-inner">
                <div className="flex items-center gap-2 truncate">
                  <Lock className="h-3 w-3 text-emerald-400 shrink-0" />
                  <span className="text-gray-400">https://</span>
                  <span className="text-white font-medium">www.svnit.ac.in</span>
                  <span className="text-gray-400">/web/alumni/</span>
                </div>
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new window"
                  className="text-gray-400 hover:text-white shrink-0 ml-2"
                >
                  <RefreshCw className="h-3 w-3" />
                </a>
              </div>

              {/* Top Bar Quick Action */}
              <div className="shrink-0 flex items-center gap-2">
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A050] hover:underline hidden sm:inline-flex items-center gap-1 font-semibold"
                >
                  <span>Launch Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Preview Image with Click-to-Redirect Overlay */}
            <div
              className={`relative bg-gray-900 group cursor-pointer ${
                isFullscreen ? "flex-1 overflow-auto" : "max-h-[680px] overflow-hidden"
              }`}
              onClick={() => window.open(portalUrl, "_blank")}
            >
              <img
                src="/images/svnit_alumni_portal_preview.webp"
                alt="SVNIT Alumni Portal Official Page Preview"
                className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-[#0F1E36]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
                <div className="p-3 bg-[#C9A050] text-[#0F1E36] rounded-full shadow-lg">
                  <ExternalLink className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">
                    Click to Open Official SVNIT Alumni Portal
                  </h3>
                  <p className="text-xs text-gray-200 font-mono">
                    {portalUrl}
                  </p>
                </div>
                <span className="px-5 py-2 bg-white text-[#0F1E36] text-xs font-bold rounded uppercase tracking-wider shadow">
                  Proceed to Portal ↗
                </span>
              </div>
            </div>

            {/* Bottom Bar Info Note */}
            <div className="bg-[#F8FAFC] border-t border-gray-200 p-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#C9A050]" />
                <span>
                  Official portal hosted and maintained by <strong>SVNIT, Surat</strong>.
                </span>
              </div>
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0F1E36] font-bold hover:text-[#C9A050] inline-flex items-center gap-1"
              >
                <span>Click here to redirect to {portalUrl}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Key Features Available on Official Portal */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F1E36]">
              Key Portal Highlights & Services
            </h2>
            <p className="text-xs text-gray-500">
              What you can access on the official SVNIT Alumni Web Portal
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {portalFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 rounded-xl hover:border-[#C9A050] hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-2.5 bg-amber-50 text-[#C9A050] w-fit rounded-lg border border-amber-100">
                    <feat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#0F1E36] leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <a
                    href={portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#0F1E36] hover:text-[#C9A050] inline-flex items-center gap-1"
                  >
                    <span>View on Portal</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Callout Banner */}
        <section className="bg-gradient-to-r from-[#0F1E36] via-[#1a2e4d] to-[#0F1E36] text-white p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C9A050] uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Mandatory Registration Drive</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white">
              Register on the SVNIT Alumni Portal
            </h3>
            <p className="text-xs md:text-sm text-gray-200 max-w-xl font-light">
              Obtain your official Alumni Membership Card, enable voting rights for the Alumni Association Management Committee elections, and access the My Alumni Network app.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-1.5 transition-colors"
            >
              <span>Register on Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>SVNIT Alumni Web</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#C9A050]" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
