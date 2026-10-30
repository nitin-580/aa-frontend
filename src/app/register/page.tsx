"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Vote, 
  CreditCard, 
  Smartphone, 
  Calendar, 
  ArrowRight,
  ShieldAlert,
  Send,
  Building,
  UserCheck
} from "lucide-react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    degree: "",
    passingYear: "",
    branch: "",
    rollNumber: "",
    registrationPurpose: "ALUMNUS (Voting Rights) - Register by 30 Nov 2026",
    currentDesignation: "",
    company: "",
    cityCountry: "",
    linkedinUrl: "",
    declarationAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.fullName.trim()) return setErrorMsg("Full Name is required.");
    if (!formData.email.trim()) return setErrorMsg("Email Address is required.");
    if (!formData.mobile.trim()) return setErrorMsg("Mobile Number is required.");
    if (!formData.degree.trim()) return setErrorMsg("Degree is required.");
    if (!formData.passingYear.trim() || !/^(19|20)\d{2}$/.test(formData.passingYear.trim())) {
      return setErrorMsg("Please enter a valid 4-digit Year of Passing (e.g. 2012).");
    }
    if (!formData.branch.trim()) return setErrorMsg("Branch / Department is required.");
    if (!formData.declarationAccepted) {
      return setErrorMsg("Please confirm the declaration to complete registration.");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setRegistrationId(data.registrationId || `SVNIT-REG-${formData.passingYear}-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#0F1E36] font-sans antialiased flex flex-col">
      <Navbar />

      {/* Hero Announcement Banner */}
      <section className="bg-[#0F1E36] text-white py-14 px-6 relative overflow-hidden border-b border-[#0F1E36]/20">
        <div className="max-w-4xl mx-auto space-y-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#7f1d1d] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Official Election Notice</span>
          </div>

          <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C9A050] uppercase">
            Sardar Vallabhbhai National Institute of Technology, Surat
          </h2>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
            Alumni Registration Drive on Portal
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Mandatory for voting in the upcoming SVNIT Alumni Association Management Committee Election. The election will be conducted in <strong className="text-[#C9A050]">ONLINE MODE</strong>.
          </p>

          {/* Key Mandate Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-4 text-left">
            <div className="bg-white/10 p-4 border border-white/15 backdrop-blur-sm space-y-1">
              <div className="text-xs font-bold text-[#C9A050] uppercase flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>Candidate Nominations</span>
              </div>
              <div className="text-xs text-gray-200">
                Register on or before <strong className="text-white">15th November, 2026</strong> for Nomination Rights.
              </div>
            </div>

            <div className="bg-white/10 p-4 border border-white/15 backdrop-blur-sm space-y-1">
              <div className="text-xs font-bold text-[#C9A050] uppercase flex items-center gap-1.5">
                <Vote className="h-4 w-4" />
                <span>Alumnus Voting Rights</span>
              </div>
              <div className="text-xs text-gray-200">
                Register on or before <strong className="text-white">30th November, 2026</strong> for Voting Rights.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        {submitted ? (
          /* Success Screen */
          <div className="bg-white border border-gray-200 p-8 sm:p-12 text-center space-y-6 shadow-md">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-600" />
            
            <h2 className="text-3xl font-bold font-display text-[#0F1E36]">
              Registration Submitted Successfully
            </h2>

            <div className="inline-block bg-[#F8F9FA] border border-gray-200 px-5 py-2.5 font-mono text-sm font-bold text-[#0F1E36]">
              Registration ID: {registrationId}
            </div>

            <p className="text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong className="text-[#0F1E36]">{formData.fullName}</strong>. Your alumni record has been registered for the upcoming SVNIT Alumni Association Election and added directly to the official registry.
            </p>

            {/* Benefits unlocked */}
            <div className="bg-[#E6F0FA]/60 border border-[#0F1E36]/15 p-6 text-left space-y-4">
              <h3 className="font-bold text-sm text-[#0F1E36] flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#C9A050]" />
                <span>Next Steps & Portal Benefits:</span>
              </h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F1E36] mt-1.5 shrink-0" />
                  <span>Your profile will be verified by the SVNIT Alumni Cell.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F1E36] mt-1.5 shrink-0" />
                  <span>You will receive approval to download your digital <strong>Alumni Membership Card</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0F1E36] mt-1.5 shrink-0" />
                  <span>Access credentials for the <strong>'My Alumni Network'</strong> mobile app and online voting portal will be sent to your registered email.</span>
                </li>
              </ul>
            </div>

            {/* Contact Signatures from Flyer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-left pt-4 border-t border-gray-200">
              <div>
                <div className="font-bold text-[#0F1E36]">Prof. Upena Dalal</div>
                <div className="text-gray-500">Dean - Alumni and RG</div>
                <div className="text-gray-500 font-mono">dean_arg@svnit.ac.in</div>
              </div>
              <div>
                <div className="font-bold text-[#0F1E36]">Er. Ranjit Sinha</div>
                <div className="text-gray-500">President - SVNIT ALUMNI ASSOCIATION</div>
                <div className="text-gray-500 font-mono">ranjetsinha@gmail.com</div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/"
                className="px-8 py-3 bg-[#0F1E36] text-white font-semibold text-sm hover:bg-[#1a2e4d] transition"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          /* Main Interactive Registration Form */
          <form onSubmit={handleSubmit} className="space-y-10">
            {errorMsg && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Academic & Graduation Details */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                1. Alumni Academic Information
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Anand Kumar Verma"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Degree from SVRCET / SVNIT <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="degree"
                    required
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#C9A050]"
                  >
                    <option value="">-- Select Degree --</option>
                    <option value="B.E. / B.Tech">B.E. / B.Tech</option>
                    <option value="M.E. / M.Tech">M.E. / M.Tech</option>
                    <option value="Ph.D.">Ph.D.</option>
                    <option value="M.Sc.">M.Sc. (5-Year Integrated / 2-Year)</option>
                    <option value="Other">Other SVNIT Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Year of Passing (Batch) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passingYear"
                    required
                    maxLength={4}
                    value={formData.passingYear}
                    onChange={handleChange}
                    placeholder="e.g. 2012"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Branch / Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#C9A050]"
                  >
                    <option value="">-- Select Branch --</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Electronics & Communication Engineering">Electronics & Communication</option>
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                    <option value="Applied Physics / Chemistry / Mathematics">Applied Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Roll Number / Student ID <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    placeholder="e.g. U12EE045"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Details */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                2. Contact Information
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Primary Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alumnus@domain.com"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Mobile Number (WhatsApp Preferred) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Current Location (City, State / Country)
                  </label>
                  <input
                    type="text"
                    name="cityCountry"
                    value={formData.cityCountry}
                    onChange={handleChange}
                    placeholder="e.g. Surat, Gujarat, India or San Jose, USA"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Professional & Purpose Details */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                3. Purpose of Registration & Election Rights
              </h2>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Select Your Registration Objective <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 p-3.5 border border-gray-200 bg-[#F8F9FA] cursor-pointer hover:border-[#C9A050] transition">
                      <input
                        type="radio"
                        name="registrationPurpose"
                        value="ALUMNUS (Voting Rights) - Register by 30 Nov 2026"
                        checked={formData.registrationPurpose.startsWith("ALUMNUS")}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#0F1E36]">
                          Alumnus — Voting Rights (Deadline: 30 Nov 2026)
                        </div>
                        <div className="text-xs text-gray-500">
                          Register to cast your vote in the upcoming SVNIT Alumni Association Management Committee Election.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 border border-gray-200 bg-[#F8F9FA] cursor-pointer hover:border-[#C9A050] transition">
                      <input
                        type="radio"
                        name="registrationPurpose"
                        value="CANDIDATE (Nomination Rights) - Register by 15 Nov 2026"
                        checked={formData.registrationPurpose.startsWith("CANDIDATE")}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#0F1E36]">
                          Candidate — Nomination Rights (Deadline: 15 Nov 2026)
                        </div>
                        <div className="text-xs text-gray-500">
                          Mandatory registration for alumni filing nomination as candidate for the Management Committee Election.
                        </div>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3.5 border border-gray-200 bg-[#F8F9FA] cursor-pointer hover:border-[#C9A050] transition">
                      <input
                        type="radio"
                        name="registrationPurpose"
                        value="General Alumni Membership Card & Directory Access"
                        checked={formData.registrationPurpose.startsWith("General")}
                        onChange={handleChange}
                        className="mt-1"
                      />
                      <div>
                        <div className="text-sm font-bold text-[#0F1E36]">
                          General Membership & Digital Card
                        </div>
                        <div className="text-xs text-gray-500">
                          Connect with the alumni network and download your SVNIT Alumni Membership Card.
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 pt-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Current Designation
                    </label>
                    <input
                      type="text"
                      name="currentDesignation"
                      value={formData.currentDesignation}
                      onChange={handleChange}
                      placeholder="e.g. Senior Principal Engineer"
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Larsen & Toubro / Google"
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      type="url"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Declaration */}
            <div className="bg-white border border-gray-200 p-6 sm:p-8 space-y-4 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                4. Declaration
              </h2>

              <div className="p-4 bg-[#F8F9FA] border border-gray-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="declarationAccepted"
                  name="declarationAccepted"
                  checked={formData.declarationAccepted}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 border-gray-300 text-[#0F1E36] focus:ring-[#C9A050]"
                />
                <label htmlFor="declarationAccepted" className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer select-none">
                  I solemnly declare that I am a bonafide alumnus of <strong>SVNIT / SVRCET Surat</strong>. All details provided above are true to the best of my knowledge, and I consent to portal registration for voting and association updates.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting to Portal...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="h-4 w-4" />
                    <span>Submit Alumni Registration</span>
                  </>
                )}
              </button>

              <div className="text-xs text-gray-500">
                Official SVNIT Portal: <a href="https://alumniportal.svnit.ac.in/" target="_blank" rel="noopener noreferrer" className="underline font-mono">https://alumniportal.svnit.ac.in/</a>
              </div>
            </div>

          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
