"use client";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/home/HeroBanner";

export default function AssociationProjectsPage() {
  const dummyProjects = [
    {
      id: 1,
      title: "SVNIT Smart Classroom Renovation",
      description: "Upgrading core engineering department classrooms with modern hybrid lecture delivery systems, visual display boards, and ergonomic seating setups.",
      impact: "Directly benefits 2000+ students weekly",
      status: "In Progress",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Alumni Incubation & Seed Fund",
      description: "A startup support grant providing direct capital backing, legal guidance, and mentorship connections for SVNIT student-founded projects.",
      impact: "Supported 12 startups last year",
      status: "Active",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Legacy Sports Complex",
      description: "Modernizing the campus outdoor sports facilities, including floodlit tennis courts, synthetic athletics running track lanes, and multi-purpose courts.",
      impact: "Fostering athletic excellence",
      status: "Completed",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen text-[#0F1E36]">
      <HeroBanner />
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Association Projects</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto font-quicksand">
            Evolving SVNIT campus infra, student innovation, and research through targeted alumni initiatives.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col hover:shadow-lg transition">
              <img src={project.image} alt={project.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      project.status === "Completed" ? "bg-green-100 text-green-800" :
                      project.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1E36]">{project.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{project.description}</p>
                </div>
                
                <div className="border-t border-gray-100 mt-6 pt-4 text-xs text-gray-600">
                  <p><strong>Impact:</strong> {project.impact}</p>
                  <button className="mt-4 w-full py-2 bg-red-900 text-white hover:bg-red-950 text-xs font-bold rounded-lg transition duration-200">
                    Learn More & Support
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
