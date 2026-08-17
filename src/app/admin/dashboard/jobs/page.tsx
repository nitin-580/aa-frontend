"use client";

import React, { useEffect, useState } from "react";

interface JobPost {
  id: number;
  role: string;
  company: string;
  location: string;
  batchPreferred: string;
  postedBy: string;
  link: string;
}

export default function AdminJobsPage() {
  const [jobsList, setJobsList] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPost | null>(null);
  const [role, setRole] = useState("contractor");

  // Form states
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [batchPreferred, setBatchPreferred] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchJobs();
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("svn_admin_role") || "contractor";
      setRole(savedRole);
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobsList(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingJob(null);
    setJobRole("");
    setCompany("");
    setLocation("");
    setBatchPreferred("");
    setPostedBy("");
    setLink("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (job: JobPost) => {
    setEditingJob(job);
    setJobRole(job.role);
    setCompany(job.company);
    setLocation(job.location);
    setBatchPreferred(job.batchPreferred);
    setPostedBy(job.postedBy);
    setLink(job.link);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can modify job referral posts.");
      return;
    }
    if (!jobRole || !company || !postedBy) {
      alert("Role, Company, and Posted By are required fields.");
      return;
    }

    const jobPayload = {
      id: editingJob ? editingJob.id : undefined,
      role: jobRole,
      company,
      location: location || "Remote",
      batchPreferred: batchPreferred || "All batches welcome",
      postedBy,
      link: link || "#"
    };

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobPayload)
      });
      if (!res.ok) throw new Error("Failed to save job referral");
      alert("Job referral saved successfully!");
      setIsModalOpen(false);
      fetchJobs();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (role !== "superadmin") {
      alert("Unauthorized! Only Superadmin can delete job postings.");
      return;
    }
    if (confirm("Are you sure you want to delete this job posting?")) {
      try {
        const res = await fetch(`/api/jobs?id=${id}`, {
          method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete job post");
        alert("Job post deleted successfully!");
        fetchJobs();
      } catch (error: any) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="p-6 text-gray-900 bg-[#F4F6F9] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0F1E36]">Manage Job Referrals</h1>
          <p className="text-sm text-gray-500 mt-1">Add, edit, or delete job referral listings for the SVNIT community.</p>
        </div>
        {role === "superadmin" ? (
          <button 
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-red-900 text-white rounded-lg font-semibold hover:bg-red-955 transition shadow-md"
          >
            + Add Referral Listing
          </button>
        ) : (
          <span className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg text-xs">
            Read-Only (Contractor)
          </span>
        )}
      </div>

      {/* Jobs list table */}
      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-600">Loading job postings...</p>
        ) : (
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold uppercase text-gray-500 tracking-wider">
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Target Batches</th>
                <th className="px-6 py-4">Referrer</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {jobsList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                    No job referral postings found in the database.
                  </td>
                </tr>
              ) : (
                jobsList.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-bold text-[#0F1E36]">
                      {job.company}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#0F1E36]">
                      {job.role}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {job.batchPreferred}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {job.postedBy}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      {role === "superadmin" ? (
                        <>
                          <button 
                            onClick={() => handleOpenEdit(job)}
                            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded font-medium transition"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job.id)}
                            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded font-medium transition"
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No actions available</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-[#0F1E36] mb-4 border-b pb-2">
              {editingJob ? "Edit Job Referral" : "Add Job Referral"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Job Role / Title *</label>
                <input 
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="Eg: Software Engineer"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Company *</label>
                  <input 
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Eg: Google"
                    className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Location</label>
                  <input 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Eg: Bangalore (Hybrid)"
                    className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Preferred Batches</label>
                <input 
                  type="text"
                  value={batchPreferred}
                  onChange={(e) => setBatchPreferred(e.target.value)}
                  placeholder="Eg: 2020 - 2024 batches"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Posted By (Name & Batch) *</label>
                <input 
                  type="text"
                  value={postedBy}
                  onChange={(e) => setPostedBy(e.target.value)}
                  placeholder="Eg: Alok Sharma (CSE '16)"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Link / Referral Instructions</label>
                <input 
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Eg: https://careers.google.com or email address"
                  className="w-full border px-3 py-2 rounded text-sm text-black outline-none focus:border-[#0F1E36]"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 bg-red-900 hover:bg-red-955 text-white rounded font-bold text-sm transition"
                >
                  Save Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
