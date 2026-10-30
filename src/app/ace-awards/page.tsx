"use client";

import React from "react";
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
  AlertCircle
} from "lucide-react";
import { 
  ACCOLADE_GROUPS, 
  ANNEXURES, 
  ANNEXURE_ADDITIONAL, 
  ELIGIBILITY_RULES, 
  SELECTION_CRITERIA, 
  KEY_DATES, 
  COMMITTEE_MEMBERS, 
  OFFICIAL_EMAILS,
  DIGNITARIES
} from "@/data/aceAwardsData";

export default function AceAwardsPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#0F1E36] font-sans antialiased">
      <Navbar />

      {/* Hero Header Section */}
      <header className="relative isolate overflow-hidden bg-[#0F1E36]">
        {/* Background Image & Ambient Overlays */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/images/hero-award.jpg"
            alt="Award scroll on a ceremonial dais in a convocation hall"
            className="h-full w-full object-cover opacity-35 filter brightness-75 scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1E36]/90 via-[#0F1E36]/80 to-[#0F1E36]"></div>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A050] inline-block mb-3 bg-[#C9A050]/10 px-4 py-1.5 border border-[#C9A050]/30">
            SVNIT Alumni Association
          </p>
          
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold leading-tight text-white font-display">
            ACE Alumnus Accolade 2026
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-200 font-light">
            Honouring alumni of SVNIT and SVRCET whose contribution to society, to the Association and to the Institute stands apart. Nominations for the 2026 edition are now invited.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ace-awards/nominate"
              className="px-8 py-4 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>File a nomination</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#guidelines"
              className="px-8 py-4 border-2 border-white/60 text-white font-semibold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-200"
            >
              Read the guidelines
            </a>
          </div>

          <div className="mt-10 inline-flex flex-wrap items-center justify-center gap-2 text-sm text-gray-300 bg-white/5 backdrop-blur-md px-6 py-3 border border-white/10">
            <span>Last date for filing:</span>
            <span className="text-[#C9A050] font-bold">25 November 2026</span>
            <span className="mx-2 text-[#C9A050] hidden sm:inline">·</span>
            <span>Announcement:</span>
            <span className="text-[#C9A050] font-bold">26 December 2026</span>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="space-y-24 py-16">
        
        {/* Section 1: About the Accolade & Key Dates */}
        <section id="guidelines" className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="rule-gold text-3xl font-bold font-display text-[#0F1E36]">
                About the Accolade
              </h2>
              <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 font-normal pt-2">
                <p>
                  The <strong className="text-[#0F1E36]">ACE Alumnus Accolade</strong>, established in 2019, recognises the notable achievements and contributions of SVNIT / SVRCET alumni each year. The 2026 edition continues this esteemed legacy at the <strong className="text-[#0F1E36]">Global Annual Alumni Convention on 26 December 2026</strong>.
                </p>
                <p>
                  It is intended to honour alumni who have made significant contributions to society, to the alumni association, to the institute, to student welfare, or who have demonstrated extraordinary leadership in their profession, industry, or entrepreneurial ventures.
                </p>
              </div>
            </div>

            {/* Key Dates Card */}
            <div className="lg:col-span-5 bg-white border border-gray-200 p-8 shadow-sm relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#C9A050]"></div>
              <div className="flex items-center gap-3 text-[#0F1E36] mb-6">
                <Calendar className="h-6 w-6 text-[#C9A050]" />
                <h3 className="font-display text-xl font-bold">Key Dates</h3>
              </div>
              <div className="space-y-6">
                {KEY_DATES.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-[#C9A050] pl-4 space-y-1">
                    <div className="text-sm font-bold text-[#C9A050] uppercase tracking-wider">
                      {item.date}
                    </div>
                    <div className="text-xs text-gray-600 leading-relaxed">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Who May Nominate & Selection Criteria */}
        <section className="bg-white border-y border-gray-200 py-20">
          <div className="mx-auto max-w-5xl px-6 grid gap-12 md:grid-cols-2">
            
            {/* Who may nominate */}
            <div className="space-y-6">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                Who may nominate
              </h2>
              <ul className="space-y-4 pt-2">
                {ELIGIBILITY_RULES.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                    <ShieldCheck className="h-5 w-5 text-[#C9A050] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection criteria & Committee */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                  Selection criteria
                </h2>
                <ul className="space-y-4 pt-2">
                  {SELECTION_CRITERIA.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700">
                      <Users className="h-5 w-5 text-[#C9A050] shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8F9FA] border border-gray-200 p-6 space-y-3">
                <h3 className="font-display text-base font-bold text-[#0F1E36]">
                  Selection Committee
                </h3>
                <ul className="space-y-2 text-xs text-gray-600">
                  {COMMITTEE_MEMBERS.map((member, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[#C9A050] rounded-full"></span>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Section 3: Accolade Categories (16 Categories) */}
        <section className="mx-auto max-w-5xl px-6 space-y-8">
          <div>
            <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
              Accolade categories
            </h2>
            <p className="mt-4 text-sm text-gray-600 max-w-2xl leading-relaxed">
              A nomination is made in one of the 16 categories below. You will choose the primary category in the online nomination form.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ACCOLADE_GROUPS.map((group, idx) => (
              <div 
                key={idx} 
                className={`bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow relative ${
                  idx === 0 || idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="text-xs font-bold text-[#C9A050] uppercase tracking-wider pb-2 border-b border-gray-100">
                  Group {group.group.split(" — ")[0]}
                </div>
                <h3 className="font-display text-base font-bold text-[#0F1E36] mt-3 mb-4">
                  {group.group.split(" — ")[1]}
                </h3>
                <ul className="space-y-2.5">
                  {group.categories.map((cat, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2 text-xs leading-relaxed text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A050] mt-1.5 shrink-0" />
                      <span>{cat.replace(/^\d+\.\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Documents to prepare */}
        <section className="bg-white border-y border-gray-200 py-20">
          <div className="mx-auto max-w-5xl px-6 space-y-10">
            <div>
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                Documents to prepare
              </h2>
              <p className="mt-4 text-sm text-gray-600 max-w-3xl leading-relaxed">
                Seven annexures accompany every nomination, along with additional evidence for the selected category. Each annexure must be duly signed by the nominee. Prepare them as PDF, DOC, or image files before you begin — you will upload them directly in the form.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[...ANNEXURES, ANNEXURE_ADDITIONAL].map((ann) => (
                <div key={ann.key} className="bg-[#F8F9FA] border border-gray-200 p-5 flex items-start gap-4">
                  <FileText className="h-5 w-5 text-[#C9A050] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm text-[#0F1E36]">
                      {ann.title}
                      {ann.key === "annexure8" && (
                        <span className="ml-2 text-xs font-normal text-gray-500">(as applicable)</span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {ann.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#E6F0FA]/60 border border-[#0F1E36]/15 p-4 text-xs text-gray-700 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#0F1E36] shrink-0" />
              <span>A recent passport-size colour photograph of the nominee is also required for the nomination dossier.</span>
            </div>
          </div>
        </section>

        {/* Section 5: Incomplete Applications Note */}
        <section className="mx-auto max-w-5xl px-6">
          <div className="bg-amber-50 border border-amber-200 p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong className="font-bold">Incomplete applications:</strong> In case an incomplete application form is received, someone from the Association might approach the candidate — however this will depend on the timeframe available and the instructions given by the selection committee.
            </div>
          </div>
        </section>

        {/* Section 6: Ready to Nominate Call to Action */}
        <section className="bg-[#0F1E36] text-white py-20 px-6">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Award className="mx-auto h-12 w-12 text-[#C9A050]" />
            
            <h2 className="text-3xl sm:text-4xl font-bold font-display">
              Ready to nominate?
            </h2>
            
            <p className="text-sm leading-relaxed text-gray-300 max-w-xl mx-auto">
              Complete the online nomination form and upload the required annexures. If you would rather email any document separately, send it to{" "}
              <span className="text-[#C9A050] font-medium">{OFFICIAL_EMAILS.join(", ")}</span>{" "}
              with the subject <span className="text-[#C9A050] font-mono">“AAA Nomination - Name of the Alumnus”</span>.
            </p>

            <div className="pt-6">
              <Link
                href="/ace-awards/nominate"
                className="px-10 py-4 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-2xl transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Open the nomination form</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="pt-8 text-[11px] text-gray-400 border-t border-white/10">
              {DIGNITARIES}
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
