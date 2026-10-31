"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Calendar,
  ShieldCheck,
  Users,
  FileText,
  Award,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Mail,
  MapPin,
  Download,
  Share2,
  Clock,
  Sparkles,
  ExternalLink,
  Maximize2,
  X,
  FileCheck,
} from "lucide-react";
import {
  ACCOLADE_DETAILED_GROUPS,
  ALL_ANNEXURES,
  ELIGIBILITY_RULES,
  SELECTION_CRITERIA,
  COMMITTEE_OFFICERS,
  OFFICIAL_EMAILS,
  POSTAL_ADDRESS,
  REGISTRATION_DRIVE_CIRCULAR,
} from "@/data/aceAwardsData";

export default function AceAwardsPage() {
  const [previewMode, setPreviewMode] = useState<"drive" | "image">("drive");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#0F1E36] font-sans antialiased">
      <Navbar />

      {/* Hero Header Section */}
      <header className="relative isolate overflow-hidden bg-[#0F1E36]">
        {/* Background Image & Ambient Overlays */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/images/hero-award.jpg"
            alt="SVNIT Convocation Hall and Award Dais"
            className="h-full w-full object-cover opacity-30 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E36]/90 via-[#0F1E36]/85 to-[#0F1E36]"></div>
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 mb-4 bg-[#C9A050]/15 border border-[#C9A050]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C9A050]">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A050]" />
            <span>SVNIT ALUMNI ASSOCIATION · SURAT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            ACE Alumnus Accolade 2026
          </h1>

          <p className="mt-3 text-sm sm:text-base font-semibold tracking-wide text-[#C9A050] uppercase">
            Notice Inviting Nominations for ACE Alumnus Accolade – 2026
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-sm sm:text-base leading-relaxed text-gray-200 font-light">
            Recognizing and honouring the distinguished achievements and enduring contributions of alumni of SVNIT and SVRCET towards society, the Alumni Association, and the Institute.
          </p>

          {/* 3 Prominent Notice Badges (Matching Official Notice Flyer) */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            {/* Badge 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 relative overflow-hidden group hover:bg-white/15 transition-all">
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C9A050] uppercase">
                Last Date for Nomination
              </div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                25 Nov 2026
              </div>
              <div className="text-xs text-gray-300 mt-1 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#C9A050]" />
                <span>Last date of receipt</span>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-[#C9A050]/50 p-4 sm:p-5 relative overflow-hidden group hover:bg-white/15 transition-all shadow-lg">
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C9A050] uppercase">
                Global Alumni Convention
              </div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                26 Dec 2026
              </div>
              <div className="text-xs text-gray-300 mt-1 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#C9A050]" />
                <span>Announced & presented</span>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 sm:p-5 relative overflow-hidden group hover:bg-white/15 transition-all">
              <div className="text-[10px] sm:text-xs font-bold tracking-widest text-[#C9A050] uppercase">
                Receiving Accolade
              </div>
              <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-1">
                In Person
              </div>
              <div className="text-xs text-gray-300 mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A050]" />
                <span>Recipient must be present</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ace-alumni-accolade/nominate"
              className="px-8 py-3.5 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>File a nomination online</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href="#official-circular"
              className="px-6 py-3.5 bg-white/10 border border-[#C9A050]/50 text-[#C9A050] font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            >
              <FileCheck className="h-4 w-4 text-[#C9A050]" />
              <span>View Official Circular Preview</span>
            </a>

            <a
              href="/downloads/ACE_Alumnus_Accolade_2026_Notice_and_Nomination_Form.docx"
              download
              className="px-6 py-3.5 bg-white/10 border border-white/30 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
            >
              <Download className="h-4 w-4 text-[#C9A050]" />
              <span>Download Form (DOCX)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="space-y-20 py-16">
        {/* Section 1: Preamble & Purpose */}
        <section id="guidelines" className="mx-auto max-w-5xl px-6 scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="rule-gold text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
                  Preamble & Purpose
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  Official notification from SVNIT Alumni Association
                </p>
              </div>

              <div className="space-y-4 text-[15px] leading-relaxed text-gray-700">
                <p>
                  <strong>SVNIT Alumni Association</strong> has officially announced the{" "}
                  <strong className="text-[#0F1E36]">ACE Alumnus Accolade 2026</strong>, aimed at recognizing the contributions and achievements of distinguished alumni from <strong>SVNIT</strong> and <strong>SVRCET</strong>.
                </p>
                <p>
                  The ACE Alumnus Accolade, established in <strong>2019</strong>, recognizes the notable achievements and contributions of SVNIT/SVRCET alumni annually, and the 2026 edition will continue this esteemed legacy at the{" "}
                  <strong className="text-[#0F1E36]">Global Annual Alumni Convention on December 26, 2026</strong>.
                </p>
                <div className="border-l-4 border-[#C9A050] pl-4 py-2 bg-amber-50/50 text-gray-800 italic">
                  &ldquo;The Accolade is intended to honour alumni who have made significant contributions and achieved notable successes in their professional and social spheres. It serves as a platform to celebrate alumni excellence across multiple categories and foster a sense of pride and connection among the SVNIT and SVRCET community.&rdquo;
                </div>
              </div>
            </div>

            {/* Quick Notice Summary Card */}
            <div className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C9A050]"></div>
              <div className="flex items-center gap-3 text-[#0F1E36] mb-5">
                <Award className="h-6 w-6 text-[#C9A050]" />
                <h3 className="text-xl font-bold tracking-tight text-[#0F1E36]">Key Notice Details</h3>
              </div>

              <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
                <div className="border-b border-gray-100 pb-3">
                  <span className="font-bold text-[#0F1E36] block">Established:</span>
                  <span>Year 2019 (Annual Flagship Alumni Honour)</span>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <span className="font-bold text-[#0F1E36] block">Last Date of Receipt:</span>
                  <span className="text-red-700 font-semibold">25th November 2026</span>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <span className="font-bold text-[#0F1E36] block">Announcement & Presentation:</span>
                  <span className="text-[#0F1E36] font-semibold">26th December 2026 (Global Annual Alumni Convention)</span>
                </div>
                <div>
                  <span className="font-bold text-[#0F1E36] block">Mode of Conferment:</span>
                  <span className="text-amber-800 font-medium">In Person — Recipient must be physically present on Convention Day</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col gap-2.5">
                <Link
                  href="/ace-alumni-accolade/nominate"
                  className="w-full text-center py-2.5 bg-[#0F1E36] text-[#C9A050] font-bold text-xs uppercase tracking-wider hover:bg-[#1a2e50] transition-colors"
                >
                  File Online Form →
                </Link>
                <a
                  href="/downloads/ACE_Alumnus_Accolade_2026_Notice_and_Nomination_Form.docx"
                  download
                  className="w-full text-center py-2.5 bg-gray-100 text-gray-700 font-medium text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Prescribed Form (DOCX)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Official Circular & Registration Drive (with Live Google Drive Preview & Link) */}
        <section id="official-circular" className="mx-auto max-w-5xl px-6 scroll-mt-24">
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-[#0F1E36] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A050] uppercase tracking-wider">
                  <FileCheck className="h-4 w-4" />
                  <span>Official Notice & Circular</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {REGISTRATION_DRIVE_CIRCULAR.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                  {REGISTRATION_DRIVE_CIRCULAR.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href={REGISTRATION_DRIVE_CIRCULAR.driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#C9A050] text-[#0F1E36] font-bold text-xs uppercase tracking-wider hover:bg-[#b88e3e] transition-colors flex items-center gap-1.5 shadow"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open in Google Drive</span>
                </a>

                <a
                  href={REGISTRATION_DRIVE_CIRCULAR.pdfDownloadUrl}
                  download
                  className="px-4 py-2 bg-white/10 border border-white/25 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid gap-8 lg:grid-cols-12 items-start">
              {/* Document Preview Box (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Preview:</span>
                    <div className="inline-flex rounded border border-gray-200 bg-gray-50 p-0.5">
                      <button
                        type="button"
                        onClick={() => setPreviewMode("drive")}
                        className={`px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                          previewMode === "drive"
                            ? "bg-[#0F1E36] text-white shadow-sm"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        Google Drive Viewer
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode("image")}
                        className={`px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                          previewMode === "image"
                            ? "bg-[#0F1E36] text-white shadow-sm"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        HD Document View
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0F1E36] hover:text-[#C9A050] cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Fullscreen</span>
                  </button>
                </div>

                <div className="relative w-full h-[560px] bg-gray-100 border border-gray-300 rounded overflow-hidden shadow-inner">
                  {previewMode === "drive" ? (
                    <iframe
                      src={REGISTRATION_DRIVE_CIRCULAR.drivePreviewUrl}
                      className="w-full h-full border-0"
                      title="SVNIT Alumni Registration Drive Circular Preview"
                      allow="autoplay"
                    />
                  ) : (
                    <div className="w-full h-full overflow-auto flex justify-center bg-gray-900/95 p-3">
                      <img
                        src={REGISTRATION_DRIVE_CIRCULAR.imageUrl}
                        alt="SVNIT Alumni Registration Drive Notice"
                        className="max-w-full h-auto object-contain shadow-2xl"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <span>Scroll within preview to view entire circular</span>
                  <a
                    href={REGISTRATION_DRIVE_CIRCULAR.driveViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-[#0F1E36] hover:text-[#C9A050] inline-flex items-center gap-1"
                  >
                    <span>View original on Google Drive</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Circular Key Details & Direct Action (5 cols) */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0F1E36]">
                    Key Mandates & Deadlines
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    Decided in Management Committee Meeting on <strong>{REGISTRATION_DRIVE_CIRCULAR.decisionDate}</strong>:
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="border-l-4 border-red-600 bg-red-50 p-3.5 text-gray-800">
                    <span className="font-bold text-red-900 block text-[11px] uppercase tracking-wider mb-1">
                      Candidates (Nomination Rights)
                    </span>
                    Register on or before <strong className="text-red-950 font-bold">{REGISTRATION_DRIVE_CIRCULAR.candidateDeadline}</strong>
                  </div>

                  <div className="border-l-4 border-[#C9A050] bg-amber-50 p-3.5 text-gray-800">
                    <span className="font-bold text-[#0F1E36] block text-[11px] uppercase tracking-wider mb-1">
                      Alumnus (Voting Rights)
                    </span>
                    Register on or before <strong className="text-[#0F1E36] font-bold">{REGISTRATION_DRIVE_CIRCULAR.voterDeadline}</strong>
                  </div>

                  <div className="border border-gray-200 bg-[#F8F9FA] p-3.5 space-y-2">
                    <span className="font-bold text-[#0F1E36] block">
                      Mandatory Requirements:
                    </span>
                    <ul className="space-y-1.5 text-gray-600 list-disc list-inside">
                      <li>The election will be conducted in <strong>ONLINE MODE</strong>.</li>
                      <li>You can vote <strong>ONLY after registration</strong>.</li>
                      <li>Registration is mandatory for filing nominations.</li>
                      <li>Download your official <strong>Alumni Membership Card</strong> and access the mobile app.</li>
                    </ul>
                  </div>
                </div>

                {/* Signatories */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Issued & Signed By:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {REGISTRATION_DRIVE_CIRCULAR.signatories.map((sig, idx) => (
                      <div key={idx} className="bg-gray-50 p-2.5 border border-gray-200">
                        <strong className="text-[#0F1E36] block">{sig.name}</strong>
                        <span className="text-[11px] text-gray-600 block">{sig.designation}</span>
                        <a href={`mailto:${sig.email}`} className="text-[10px] text-blue-700 hover:underline block break-all">
                          {sig.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Registration Call to Action */}
                <div className="pt-2">
                  <a
                    href={REGISTRATION_DRIVE_CIRCULAR.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center py-3 bg-[#0F1E36] text-[#C9A050] font-bold text-xs uppercase tracking-wider hover:bg-[#1a2e50] shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Register on Alumni Portal Now</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: How to Submit (Postal, Email, Online) */}
        <section className="bg-white border-y border-gray-200 py-16">
          <div className="mx-auto max-w-5xl px-6 space-y-10">
            <div>
              <h2 className="rule-gold text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
                How to Submit Nominations
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
                Nominations may be submitted through any of the three official options listed below before the closing date: <strong>25th November 2026</strong>.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Option 1: By Post / In Person */}
              <div className="bg-[#F8F9FA] border border-gray-200 p-6 flex flex-col justify-between relative group hover:border-[#C9A050] transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C9A050] uppercase tracking-wider">
                    <MapPin className="h-4 w-4" />
                    <span>Option 1 — By Post / In Person</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0F1E36]">
                    Physical Submission
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Duly filled in and signed nominations shall be received before <strong>25th November 2026</strong> at:
                  </p>
                  <div className="bg-white border border-gray-200 p-3.5 text-xs text-gray-700 leading-relaxed font-mono">
                    <p className="font-bold text-[#0F1E36]">{POSTAL_ADDRESS.recipient}</p>
                    <p>{POSTAL_ADDRESS.organization}</p>
                    <p>{POSTAL_ADDRESS.institute}</p>
                    <p>{POSTAL_ADDRESS.locality}, {POSTAL_ADDRESS.city} {POSTAL_ADDRESS.pincode}</p>
                    <p className="text-gray-500">{POSTAL_ADDRESS.state}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <a
                    href="/downloads/ACE_Alumnus_Accolade_2026_Notice_and_Nomination_Form.docx"
                    download
                    className="text-xs font-bold text-[#0F1E36] hover:text-[#C9A050] inline-flex items-center gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5 text-[#C9A050]" />
                    <span>Download form for printing</span>
                  </a>
                </div>
              </div>

              {/* Option 2: By Email */}
              <div className="bg-[#F8F9FA] border border-gray-200 p-6 flex flex-col justify-between relative group hover:border-[#C9A050] transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C9A050] uppercase tracking-wider">
                    <Mail className="h-4 w-4" />
                    <span>Option 2 — By Email</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0F1E36]">
                    Scanned Soft Copy
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A scanned soft copy of the duly signed nomination and annexures shall be received before <strong>25th November 2026</strong> at:
                  </p>
                  <ul className="space-y-2 bg-white border border-gray-200 p-3.5 text-xs">
                    {OFFICIAL_EMAILS.map((email) => (
                      <li key={email}>
                        <a
                          href={`mailto:${email}?subject=AAA%20Nomination%20-%20Name%20of%20the%20Alumnus`}
                          className="font-mono text-gray-800 hover:text-[#C9A050] transition-colors block break-all"
                        >
                          • {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-gray-500 italic">
                    Subject Line: “AAA Nomination - Name of the Alumnus”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Attach signed form + annexures in PDF
                </div>
              </div>

              {/* Option 3: Online Nomination Portal */}
              <div className="bg-[#0F1E36] text-white p-6 flex flex-col justify-between relative shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#C9A050] uppercase tracking-wider">
                    <Sparkles className="h-4 w-4" />
                    <span>Option 3 — Online Portal</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Direct Digital Filing
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Fill out the complete nomination online in under 5 minutes with photo preview, automatic Cloudinary upload, and digital annexures.
                  </p>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A050]" />
                      <span>Instant submission receipt & ID</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A050]" />
                      <span>Automatic passport photo hosting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A050]" />
                      <span>Direct sync to committee records</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-white/15">
                  <Link
                    href="/ace-alumni-accolade/nominate"
                    className="w-full text-center py-2.5 bg-[#C9A050] text-[#0F1E36] font-bold text-xs uppercase tracking-wider hover:bg-[#b88e3e] transition-colors block"
                  >
                    Open Online Nomination Form →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Selection Process & Selection Committee */}
        <section className="mx-auto max-w-5xl px-6 space-y-10">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Selection Process */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="rule-gold text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
                  Selection Process
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  Timeline and Evaluation Protocol
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white border border-gray-200 p-4">
                  <div className="h-7 w-7 rounded-full bg-[#C9A050]/20 text-[#C9A050] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong className="text-[#0F1E36]">Notification & Wide Outreach:</strong> The Coordinator of the Ace Alumnus Accolade, appointed by the Managing Committee of SVNITAA, notifies on the website of SVNITAA/SVNIT and social media (WhatsApp, Facebook, Twitter, etc.) to extend reach to the majority of alumni.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-gray-200 p-4">
                  <div className="h-7 w-7 rounded-full bg-[#C9A050]/20 text-[#C9A050] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong className="text-[#0F1E36]">Circulation to Committee:</strong> The Coordinator circulates all nominations received before the due date to every member of the Selection Committee within <strong className="text-[#0F1E36]">03 days</strong> from the last date of receipt of nominations.
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white border border-gray-200 p-4">
                  <div className="h-7 w-7 rounded-full bg-[#C9A050]/20 text-[#C9A050] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong className="text-[#0F1E36]">Convention Announcement:</strong> The name of the recipient of the AAA shall be announced during the Annual Alumni Convention scheduled on <strong className="text-[#0F1E36]">26th December 2026</strong>.
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-300 p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <strong>Mandatory In-Person Presence:</strong> The Accolade will be given in person on the Global Convention Day. Alumni must be present physically to receive the Accolade.
                  </div>
                </div>
              </div>
            </div>

            {/* Selection Committee */}
            <div className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-2.5 text-[#0F1E36] mb-5">
                <Users className="h-5 w-5 text-[#C9A050]" />
                <h3 className="font-display text-xl font-bold">Selection Committee</h3>
              </div>
              <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                The selection committee for the Ace Alumnus Accolade comprises the following designated officials:
              </p>

              <div className="space-y-4">
                {COMMITTEE_OFFICERS.map((officer, idx) => (
                  <div
                    key={idx}
                    className="border-l-3 border-[#C9A050] pl-3.5 py-1 bg-[#F8F9FA]"
                  >
                    <div className="text-sm font-bold text-[#0F1E36]">
                      {officer.name}
                    </div>
                    <div className="text-xs font-semibold text-[#C9A050]">
                      {officer.role}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {officer.designation}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-gray-100 text-[11px] text-gray-500 italic">
                Evaluations are conducted independently based on verified supporting documentation and merit.
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Eligibility & Selection Criteria */}
        <section className="bg-white border-y border-gray-200 py-16">
          <div className="mx-auto max-w-5xl px-6 grid gap-10 md:grid-cols-2">
            {/* Who may nominate */}
            <div className="space-y-5">
              <div>
                <h2 className="rule-gold text-2xl font-extrabold tracking-tight text-[#0F1E36]">
                  Who May Nominate
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  Eligibility & Conditions
                </p>
              </div>

              <ul className="space-y-3.5 pt-2">
                {ELIGIBILITY_RULES.map((rule, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-gray-700"
                  >
                    <ShieldCheck className="h-5 w-5 text-[#C9A050] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection Criteria */}
            <div className="space-y-5">
              <div>
                <h2 className="rule-gold text-2xl font-extrabold tracking-tight text-[#0F1E36]">
                  Selection Criteria
                </h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                  Core Evaluation Pillars
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed pt-2">
                The selection criteria shall focus on, but are not limited to, the following five core pillars of alumni excellence:
              </p>

              <ul className="space-y-3.5">
                {SELECTION_CRITERIA.map((crit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-gray-700 bg-[#F8F9FA] p-3 border border-gray-100"
                  >
                    <span className="h-5 w-5 rounded-full bg-[#C9A050]/20 text-[#C9A050] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: All 16 Accolade Categories (Groups A to E) */}
        <section className="mx-auto max-w-5xl px-6 space-y-8">
          <div>
            <h2 className="rule-gold text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
              Accolade Categories (16 Categories)
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-3xl leading-relaxed">
              Nominations may be made in <strong>any one of the following 16 categories</strong> across Groups A through E. Please select the appropriate category number and title when submitting the nomination.
            </p>
          </div>

          <div className="space-y-6">
            {ACCOLADE_DETAILED_GROUPS.map((group) => (
              <div
                key={group.groupCode}
                className="bg-white border border-gray-200 overflow-hidden shadow-sm"
              >
                {/* Group Header */}
                <div className="bg-[#0F1E36] px-6 py-3.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded bg-[#C9A050] text-[#0F1E36] font-bold text-xs flex items-center justify-center">
                      {group.groupCode}
                    </span>
                    <h3 className="font-display text-base font-bold text-[#C9A050]">
                      {group.groupTitle}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-300 hidden sm:inline">
                    {group.categories.length} Categories
                  </span>
                </div>

                {/* Categories Grid */}
                <div className="p-6 grid gap-4 sm:grid-cols-2">
                  {group.categories.map((cat) => (
                    <div
                      key={cat.number}
                      className="bg-[#F8F9FA] border border-gray-200 p-4 space-y-1.5 hover:border-[#C9A050]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0F1E36]">
                        <span className="h-5 w-5 rounded-full bg-[#0F1E36] text-[#C9A050] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {cat.number}
                        </span>
                        <h4 className="font-semibold text-sm text-[#0F1E36]">
                          {cat.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed pl-7">
                        {cat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Annexures to be Attached (Annexure 1 to 8) */}
        <section className="bg-white border-y border-gray-200 py-16">
          <div className="mx-auto max-w-5xl px-6 space-y-8">
            <div>
              <h2 className="rule-gold text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
                Annexures to be Attached (as Applicable)
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-3xl leading-relaxed">
                The nomination dossier should include the following annexures to substantiate the nominee’s achievements. In the online form, you may upload them directly or send them via email.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {ALL_ANNEXURES.map((ann) => (
                <div
                  key={ann.key}
                  className="bg-[#F8F9FA] border border-gray-200 p-4.5 flex items-start gap-3.5 hover:border-gray-300 transition-colors"
                >
                  <FileText className="h-5 w-5 text-[#C9A050] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-[#0F1E36]">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ann.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mandatory Signature & Incomplete Application Warning */}
            <div className="space-y-3 pt-2">
              <div className="bg-amber-50 border border-amber-300 p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>Mandatory Signature on Annexures:</strong> Please note that all the annexures listed above shall be <strong>duly signed by the Nominee</strong>.
                </div>
              </div>

              <div className="bg-gray-100 border border-gray-300 p-4 text-xs text-gray-700 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-gray-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Incomplete Applications:</strong> In case an incomplete application form is received, the Association may approach the candidate; however, this will depend on the time available and the instructions given by the selection committee. Hence, we request you to please send the complete application to avoid any rejection.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Appeal to Circulate & Official Signatories */}
        <section className="mx-auto max-w-5xl px-6 space-y-8">
          <div className="bg-[#0F1E36] text-white p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A050] uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5">
                <Share2 className="h-3.5 w-3.5" />
                <span>Call to All Alumni</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Circulate this Notification
              </h3>

              <p className="text-sm leading-relaxed text-gray-300">
                &ldquo;All alumni friends are requested to circulate this notification to their alumni groups so as to extend the reach to the majority of alumni.&rdquo;
              </p>

              {/* Signatories Block */}
              <div className="pt-8 mt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="font-bold text-base text-[#C9A050]">
                    (Akshay Pachchigar)
                  </div>
                  <div className="text-xs text-gray-300 mt-1 font-semibold">
                    Coordinator
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Ace Alumnus Accolade 2026
                  </div>
                </div>

                <div>
                  <div className="font-bold text-base text-[#C9A050]">
                    (Tushar Mehta)
                  </div>
                  <div className="text-xs text-gray-300 mt-1 font-semibold">
                    Hon. Secretary
                  </div>
                  <div className="text-[11px] text-gray-400">
                    SVNIT Alumni Association
                  </div>
                </div>

                <div>
                  <div className="font-bold text-base text-[#C9A050]">
                    (Ranjit Sinha)
                  </div>
                  <div className="text-xs text-gray-300 mt-1 font-semibold">
                    President
                  </div>
                  <div className="text-[11px] text-gray-400">
                    SVNIT Alumni Association
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Final Call to Action */}
        <section className="mx-auto max-w-5xl px-6 pb-6">
          <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-[#C9A050]/40 p-8 sm:p-12 text-center space-y-6">
            <Award className="mx-auto h-12 w-12 text-[#C9A050]" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1E36]">
              Ready to Submit a Nomination?
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete the online nomination form or submit via physical mail / email before <strong>25th November 2026</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/ace-alumni-accolade/nominate"
                className="px-8 py-3.5 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-lg transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Open online nomination form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={REGISTRATION_DRIVE_CIRCULAR.driveViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white border border-gray-300 text-gray-800 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4 text-[#C9A050]" />
                <span>View Drive Circular</span>
              </a>

              <a
                href="/downloads/ACE_Alumnus_Accolade_2026_Notice_and_Nomination_Form.docx"
                download
                className="px-6 py-3.5 bg-white border border-gray-300 text-gray-800 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4 text-[#C9A050]" />
                <span>Download Form (DOCX)</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Document Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
            <div className="flex items-center justify-between bg-[#0F1E36] text-white px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-[#C9A050]" />
                <span className="font-bold text-sm">
                  {REGISTRATION_DRIVE_CIRCULAR.title} — Official Preview
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={REGISTRATION_DRIVE_CIRCULAR.driveViewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C9A050] hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open in Google Drive</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-300 hover:text-white p-1 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full bg-gray-100">
              <iframe
                src={REGISTRATION_DRIVE_CIRCULAR.drivePreviewUrl}
                className="w-full h-full border-0"
                title="Google Drive Fullscreen Preview"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
