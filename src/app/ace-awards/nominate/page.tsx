"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  Loader2, 
  Mail,
  UserCheck,
  Send,
  Camera,
  UploadCloud,
  ExternalLink
} from "lucide-react";
import { 
  ACCOLADE_GROUPS, 
  ANNEXURES, 
  ANNEXURE_ADDITIONAL, 
  OFFICIAL_EMAILS 
} from "@/data/aceAwardsData";

export default function NominatePage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [missingField, setMissingField] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    nomineeName: "",
    degree: "",
    yearOfPassing: "",
    branch: "",
    category: "",
    dateOfBirth: "",
    addressResidence: "",
    addressWork: "",
    mobile: "",
    otherPhone: "",
    email: "",
    proposerName: "",
    proposerDegreeYear: "",
    proposerEmail: "",
    proposerMobile: "",
    proposerAddress: "",
    seconderName: "",
    seconderDegreeYear: "",
    seconderEmail: "",
    seconderMobile: "",
    seconderAddress: "",
    declarationAccepted: false,
  });

  // File names and preview tracking
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string>("");
  const [annexureFiles, setAnnexureFiles] = useState<{ [key: string]: File | null }>({});
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (errorMsg) setErrorMsg("");
    if (missingField === name) setMissingField("");
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const showError = (msg: string, fieldName?: string) => {
    setErrorMsg(msg);
    if (fieldName) {
      setMissingField(fieldName);
      const el = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        (el as HTMLElement).focus?.();
      }
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        showError("Photo file size exceeds 10 MB limit.", "photoUpload");
        return;
      }
      setPhotoFile(file);
      setErrorMsg("");
      setMissingField("");

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setPhotoBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setPhotoBase64("");
  };

  const handleAnnexureSelect = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg(`File for ${key} exceeds 10 MB limit.`);
        return;
      }
      setAnnexureFiles((prev) => ({ ...prev, [key]: file }));
      setErrorMsg("");
    }
  };

  const handleAdditionalFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).slice(0, 10);
      const oversized = selected.find((f) => f.size > 10 * 1024 * 1024);
      if (oversized) {
        setErrorMsg(`File "${oversized.name}" exceeds 10 MB limit.`);
        return;
      }
      setAdditionalFiles(selected);
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMissingField("");

    // Sanitize Year of Passing (handle 2-digit or 4-digit input)
    let yop = formData.yearOfPassing.trim();
    if (yop.length === 2 && /^\d{2}$/.test(yop)) {
      const num = parseInt(yop, 10);
      yop = num > 50 ? `19${yop}` : `20${yop}`;
      setFormData((prev) => ({ ...prev, yearOfPassing: yop }));
    }

    // Validate Required Fields - Section 1: Nominee Details
    if (!formData.nomineeName.trim()) return showError("Please enter Nominee Full Name.", "nomineeName");
    if (!formData.degree.trim()) return showError("Please enter Degree obtained from SVRCET / SVNIT.", "degree");
    if (!yop || !/^\d{4}$/.test(yop)) {
      return showError("Please enter a valid 4-digit Year of Passing (e.g. 1998 or 2012).", "yearOfPassing");
    }
    if (!formData.branch.trim()) return showError("Please enter Nominee Branch / Discipline.", "branch");
    if (!formData.dateOfBirth.trim()) return showError("Please enter Nominee Date of Birth.", "dateOfBirth");
    if (!formData.mobile.trim()) return showError("Please enter Nominee Mobile Number.", "mobile");
    if (!formData.email.trim()) return showError("Please enter Nominee Email Address.", "email");
    if (!formData.addressResidence.trim()) return showError("Please enter Nominee Residential Address.", "addressResidence");
    if (!formData.addressWork.trim()) return showError("Please enter Nominee Work / Office Address.", "addressWork");
    if (!formData.category) return showError("Please select one of the 16 Accolade Categories.", "category");
    if (!photoFile) return showError("Please upload a recent passport-size photograph.", "photoUpload");

    // Validate Required Fields - Section 2: Proposer Details
    if (!formData.proposerName.trim()) return showError("Please enter Proposer Full Name.", "proposerName");
    if (!formData.proposerDegreeYear.trim()) return showError("Please enter Proposer Degree & Year of Passing.", "proposerDegreeYear");
    if (!formData.proposerEmail.trim()) return showError("Please enter Proposer Email Address.", "proposerEmail");
    if (!formData.proposerMobile.trim()) return showError("Please enter Proposer Mobile Number.", "proposerMobile");
    if (!formData.proposerAddress.trim()) return showError("Please enter Proposer Postal / Work Address.", "proposerAddress");

    // Validate Required Fields - Section 3: Seconder Details
    if (!formData.seconderName.trim()) return showError("Please enter Seconder Full Name.", "seconderName");
    if (!formData.seconderDegreeYear.trim()) return showError("Please enter Seconder Degree & Year of Passing.", "seconderDegreeYear");
    if (!formData.seconderEmail.trim()) return showError("Please enter Seconder Email Address.", "seconderEmail");
    if (!formData.seconderMobile.trim()) return showError("Please enter Seconder Mobile Number.", "seconderMobile");
    if (!formData.seconderAddress.trim()) return showError("Please enter Seconder Postal / Work Address.", "seconderAddress");

    // Section 4: Annexures are optional / as applicable to nomination category

    if (!formData.declarationAccepted) {
      return showError("You must check the declaration box to submit the nomination.", "declarationAccepted");
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        yearOfPassing: yop,
        photoName: photoFile?.name || "",
        photoBase64: photoBase64,
        annexures: Object.fromEntries(
          Object.entries(annexureFiles).map(([k, v]) => [k, v?.name || ""])
        ),
        additionalEvidence: additionalFiles.map((f) => f.name),
      };

      const res = await fetch("/api/nominations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please verify your details.");
      }

      const generatedId = data.id || `AAA-${yop}-${Date.now().toString().slice(-6)}`;
      setSubmissionId(generatedId);
      if (data.photoUrl) setUploadedPhotoUrl(data.photoUrl);
      setSubmitted(true);
      setShowSuccessModal(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      showError(err.message || "Failed to submit nomination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-[#0F1E36] font-sans antialiased flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <header className="border-b border-[#0F1E36]/10 bg-[#0F1E36] text-white py-12 px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/ace-awards"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A050] hover:text-[#e0b96b] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Accolade details & guidelines</span>
          </Link>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold font-display text-white">
            Nomination Form — ACE Alumnus Accolade 2026
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Fields marked <span className="text-red-400 font-bold">*</span> are mandatory. Last date for submission: <strong className="text-[#C9A050]">25 November 2026</strong>.
          </p>
        </div>
      </header>

      {/* Body / Main Form or Confirmation */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        {submitted ? (
          /* Submission Success State */
          <div className="bg-white border border-gray-200 p-8 sm:p-12 text-center space-y-6 shadow-md animate-fade-in">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#C9A050]" />
            
            <h2 className="text-3xl font-bold font-display text-[#0F1E36]">
              Nomination Received
            </h2>
            
            <div className="inline-block bg-[#F8F9FA] border border-gray-200 px-4 py-2 font-mono text-sm text-[#0F1E36] font-semibold">
              Reference ID: {submissionId}
            </div>

            <p className="text-sm leading-relaxed text-gray-600 max-w-xl mx-auto">
              Thank you. The nomination of <strong className="text-[#0F1E36]">{formData.nomineeName}</strong> has been recorded along with the uploaded annexures, and the Association’s records have been updated.
            </p>

            <div className="bg-[#E6F0FA]/60 border border-[#0F1E36]/15 p-6 text-left space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F1E36]">
                <Mail className="h-4 w-4 text-[#C9A050]" />
                <span>Sending any further documents or endorsements?</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you would like to submit any additional citations, recommendations, or proof, you may email them directly to{" "}
                <strong className="text-[#0F1E36]">{OFFICIAL_EMAILS.join(", ")}</strong> with the subject line:
              </p>
              <div className="bg-white p-2.5 font-mono text-xs text-[#0F1E36] border border-gray-200">
                AAA Nomination - {formData.nomineeName} ({submissionId})
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/ace-awards"
                className="px-8 py-3 bg-[#0F1E36] text-white font-semibold text-sm hover:bg-[#1a2e4d] transition"
              >
                Back to the Accolade Page
              </Link>
            </div>
          </div>
        ) : (
          /* Main Interactive Nomination Form */
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {errorMsg && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Section 1: Nominee Details */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                1. Nominee Details
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name of Nominee <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nomineeName"
                    required
                    value={formData.nomineeName}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Ramesh K. Patel"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Degree Obtained from SVRCET / SVNIT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="degree"
                    required
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="e.g. B.E. / M.Tech / Ph.D."
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Year of Passing <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="yearOfPassing"
                    required
                    value={formData.yearOfPassing}
                    onChange={handleInputChange}
                    placeholder="e.g. 1998"
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Branch / Discipline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="branch"
                    required
                    value={formData.branch}
                    onChange={handleInputChange}
                    placeholder="e.g. Electrical Engineering"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Other Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="otherPhone"
                    value={formData.otherPhone}
                    onChange={handleInputChange}
                    placeholder="Landline or Alternate Mobile"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nominee@domain.com"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="addressResidence"
                    required
                    rows={2}
                    value={formData.addressResidence}
                    onChange={handleInputChange}
                    placeholder="Complete residential address"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Work / Office Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="addressWork"
                    required
                    rows={2}
                    value={formData.addressWork}
                    onChange={handleInputChange}
                    placeholder="Company / Institution address"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category Nominated For <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm bg-white focus:outline-none focus:border-[#C9A050]"
                  >
                    <option value="">-- Select One of 16 Accolade Categories --</option>
                    {ACCOLADE_GROUPS.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <p className="text-[11px] text-gray-500 mt-1">
                    The nomination dossier will be officially reviewed and evaluated under this category.
                  </p>
                </div>

                {/* Nominee Photograph Upload with Live Preview */}
                <div
                  id="photoUpload"
                  className={`sm:col-span-2 bg-[#F8F9FA] border-2 ${
                    missingField === "photoUpload"
                      ? "border-red-500 bg-red-50/40 ring-2 ring-red-200"
                      : "border-dashed border-gray-300"
                  } p-5 transition-all`}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    {/* Photo Thumbnail / Avatar Frame */}
                    <div className="relative w-28 h-36 bg-gray-100 border-2 border-gray-300 flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-sm">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Nominee Passport Photo Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-2 text-gray-400 flex flex-col items-center">
                          <Camera className="w-8 h-8 text-gray-400 mb-1" />
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-center leading-tight">
                            Passport Photo Preview
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upload Controls & Instructions */}
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#0F1E36] flex items-center justify-center sm:justify-start gap-1">
                          Recent Passport-Size Colour Photograph <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Upload a clear, front-facing colour photograph of the nominee (JPG or PNG format, max 10 MB).
                        </p>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <label className="cursor-pointer px-4 py-2.5 bg-white border border-gray-300 hover:border-[#C9A050] text-[#0F1E36] text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition flex items-center gap-2">
                          <UploadCloud className="w-4 h-4 text-[#C9A050]" />
                          <span>{photoFile ? "Change Photograph" : "Choose Photograph"}</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handlePhotoSelect}
                            className="hidden"
                          />
                        </label>

                        {photoFile && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold underline cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {photoFile && (
                        <div className="text-xs font-medium text-emerald-700 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <span>Attached: {photoFile.name} ({(photoFile.size / 1024).toFixed(1)} KB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Nomination Proposed By */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                  2. Nomination Proposed By
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  The proposer must be an alumnus of SVNIT / SVRCET.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Proposer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="proposerName"
                    required
                    value={formData.proposerName}
                    onChange={handleInputChange}
                    placeholder="Alumnus Name"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Degree & Year of Passing <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="proposerDegreeYear"
                    required
                    value={formData.proposerDegreeYear}
                    onChange={handleInputChange}
                    placeholder="e.g. B.E. Mechanical 1996"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Proposer Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="proposerEmail"
                    required
                    value={formData.proposerEmail}
                    onChange={handleInputChange}
                    placeholder="proposer@domain.com"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Proposer Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="proposerMobile"
                    required
                    value={formData.proposerMobile}
                    onChange={handleInputChange}
                    placeholder="+91 98200 XXXXX"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Proposer Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="proposerAddress"
                    required
                    rows={2}
                    value={formData.proposerAddress}
                    onChange={handleInputChange}
                    placeholder="Postal address of proposer"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Nomination Seconded By */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                  3. Nomination Seconded By
                </h2>
                <p className="text-xs text-gray-500 mt-2">
                  The seconder must be a different alumnus of SVNIT / SVRCET.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Seconder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="seconderName"
                    required
                    value={formData.seconderName}
                    onChange={handleInputChange}
                    placeholder="Alumnus Name"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Degree & Year of Passing <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="seconderDegreeYear"
                    required
                    value={formData.seconderDegreeYear}
                    onChange={handleInputChange}
                    placeholder="e.g. B.E. Civil 1999"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Seconder Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="seconderEmail"
                    required
                    value={formData.seconderEmail}
                    onChange={handleInputChange}
                    placeholder="seconder@domain.com"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Seconder Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="seconderMobile"
                    required
                    value={formData.seconderMobile}
                    onChange={handleInputChange}
                    placeholder="+91 99000 XXXXX"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Seconder Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="seconderAddress"
                    required
                    rows={2}
                    value={formData.seconderAddress}
                    onChange={handleInputChange}
                    placeholder="Postal address of seconder"
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:outline-none focus:border-[#C9A050]"
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Supporting Annexures */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                  4. Supporting Annexures
                </h2>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Upload documents and annexures relevant to the nominated category. Annexures are optional at initial submission and can be provided as PDF, DOC, DOCX, or images (max 10 MB per file).
                </p>
              </div>

              <div className="space-y-6 pt-2">
                {ANNEXURES.map((ann) => (
                  <div key={ann.key} className="border border-gray-200 p-4 bg-[#F8F9FA] space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#0F1E36]">
                        {ann.title} <span className="text-gray-400 font-normal text-[11px]">(Optional / As applicable)</span>
                      </label>
                      {annexureFiles[ann.key] && (
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Attached: {annexureFiles[ann.key]?.name}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{ann.description}</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      onChange={(e) => handleAnnexureSelect(ann.key, e)}
                      className="text-xs text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:border file:border-gray-300 file:text-xs file:bg-white hover:file:bg-gray-100 cursor-pointer"
                    />
                  </div>
                ))}

                {/* Annexure 8: Additional Evidences */}
                <div className="border border-gray-200 p-4 bg-[#F8F9FA] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#0F1E36]">
                      {ANNEXURE_ADDITIONAL.title} <span className="text-gray-400 font-normal">(Optional, up to 10 files)</span>
                    </label>
                    {additionalFiles.length > 0 && (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {additionalFiles.length} file(s) attached
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{ANNEXURE_ADDITIONAL.description}</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={handleAdditionalFilesSelect}
                    className="text-xs text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:border file:border-gray-300 file:text-xs file:bg-white hover:file:bg-gray-100 cursor-pointer"
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Declaration & Agreement */}
            <section className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="rule-gold text-2xl font-bold font-display text-[#0F1E36]">
                5. Declaration
              </h2>

              <div className="p-4 bg-[#F8F9FA] border border-gray-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="declarationAccepted"
                  name="declarationAccepted"
                  checked={formData.declarationAccepted}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 border-gray-300 text-[#0F1E36] focus:ring-[#C9A050]"
                />
                <label htmlFor="declarationAccepted" className="text-xs sm:text-sm text-gray-700 leading-relaxed cursor-pointer select-none">
                  I hereby agree to my nomination for the <strong>ACE Alumnus Accolade</strong> and assure that all information provided in this form and the attached annexures is factual and correct to the best of my knowledge.
                </label>
              </div>
            </section>

            {/* Submit Action */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {errorMsg && (
                <div className="p-4 bg-red-50 border-2 border-red-500 text-red-900 text-sm flex items-start gap-3 shadow-md">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Required Field Missing:</p>
                    <p className="text-red-800 text-xs sm:text-sm mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-10 py-4 bg-[#C9A050] text-[#0F1E36] font-bold text-sm uppercase tracking-wider hover:bg-[#b88e3e] shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Submitting nomination...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit nomination</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  Uploading documents may take a few moments. Please do not close this page while submitting.
                </p>
              </div>
            </div>

          </form>
        )}
      </main>

      {/* Success Popup Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 border-2 border-[#C9A050] shadow-2xl space-y-6 text-center relative">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A050] bg-[#C9A050]/15 px-3 py-1 border border-[#C9A050]/30 inline-block">
                Submission Confirmed
              </span>
              <h3 className="text-2xl font-bold font-display text-[#0F1E36]">
                Successfully Submitted!
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Thank you! The nomination dossier for <strong className="text-[#0F1E36]">{formData.nomineeName}</strong> has been successfully recorded in the Alumni Association Google Sheet.
              </p>
            </div>

            <div className="bg-[#F8F9FA] border border-gray-200 p-4 space-y-2 text-left text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Reference ID:</span>
                <span className="font-mono font-bold text-[#0F1E36] bg-[#C9A050]/20 px-2 py-0.5 border border-[#C9A050]/40">{submissionId}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Nominee:</span>
                <span className="font-semibold text-gray-900">{formData.nomineeName}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-medium">Category:</span>
                <span className="font-semibold text-gray-900 text-right max-w-[220px] truncate">{formData.category}</span>
              </div>
              {uploadedPhotoUrl && (
                <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Photograph:</span>
                  <a
                    href={uploadedPhotoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline flex items-center gap-1"
                  >
                    <span>View Photo Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500 font-medium">Database Status:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Recorded in Google Sheet
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-3 px-4 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] font-bold text-xs uppercase tracking-wider transition cursor-pointer shadow-md"
              >
                Close & View Dossier
              </button>
              <Link
                href="/ace-awards"
                className="flex-1 py-3 px-4 bg-[#0F1E36] hover:bg-[#1a2e4d] text-white font-bold text-xs uppercase tracking-wider transition text-center shadow-md flex items-center justify-center"
              >
                Accolade Home
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
