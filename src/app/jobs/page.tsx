"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface JobPost {
  id: number;
  role: string;
  company: string;
  location: string;
  batchPreferred: string;
  postedBy: string;
  link: string;
}

export default function JobsPage() {
  const [jobsList, setJobsList] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);

  const initialJobs: JobPost[] = [
    {
      id: 1,
      role: "Senior Software Engineer (Backend)",
      company: "Google",
      location: "Bengaluru, India (Hybrid)",
      batchPreferred: "2015 - 2020 Batches",
      postedBy: "Alok Sharma (B.Tech CSE '16)",
      link: "https://google.com/careers"
    },
    {
      id: 2,
      role: "Lead Project Manager",
      company: "L&T Construction",
      location: "Mumbai, India",
      batchPreferred: "2010 - 2015 Batches",
      postedBy: "Rajesh Patel (B.Tech Civil '11)",
      link: "https://larsentoubro.com/careers"
    },
    {
      id: 3,
      role: "Product Manager (Internship)",
      company: "Razorpay",
      location: "Remote",
      batchPreferred: "Current Final Year Students / 2026 Batch",
      postedBy: "Sneha Mehta (B.Tech ECE '21)",
      link: "https://razorpay.com/jobs"
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setJobsList(data);
      } else {
        setJobsList(initialJobs);
      }
    } catch (err: any) {
      console.error(err);
      setJobsList(initialJobs);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F6F9] min-h-screen text-[#0F1E36]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-3 text-red-900">Opportunities for the SVNIT Community</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-quicksand">
              Discover referral opportunities across the SVNIT alumni ecosystem.
            </p>
          </div>
          <div className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-lg text-xs font-semibold">
            Read-Only Jobs Directory
          </div>
        </div>

        {/* Existing / Preview Opportunities list */}
        <h3 className="text-xl font-bold mb-6 border-b border-gray-200 pb-3">Alumni Referrals & Live Openings</h3>
        
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading openings from database...</p>
        ) : jobsList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No listings uploaded yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobsList.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <span className="bg-red-50 text-red-900 text-xs font-semibold px-2.5 py-1 rounded">
                    {job.company}
                  </span>
                  <h4 className="font-bold text-lg mt-3 text-[#0F1E36] line-clamp-1">{job.role}</h4>
                  <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                  <div className="border-t border-gray-100 mt-4 pt-4 space-y-1.5 text-xs text-gray-600 font-quicksand">
                    <p><strong>Target:</strong> {job.batchPreferred}</p>
                    <p><strong>Referral by:</strong> {job.postedBy}</p>
                  </div>
                </div>
                
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full text-center py-2.5 bg-gray-50 text-gray-700 hover:bg-red-900 hover:text-white text-xs font-bold rounded-lg transition duration-200 border border-gray-200"
                >
                  Apply / Contact Referrer
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
