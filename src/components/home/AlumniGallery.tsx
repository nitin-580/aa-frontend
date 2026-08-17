"use client";
import React, { useState } from "react";

interface Photo {
  src: string;
  alt: string;
  category: "Health Checkup" | "Ramzat Garba";
  title: string;
}

const AlumniGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | "Health Checkup" | "Ramzat Garba">("All");

  const photos: Photo[] = [
    {
      src: "/aaphotos/healthcheckup/Healthcheckupcamp.png",
      alt: "Health Checkup Camp Banner",
      category: "Health Checkup",
      title: "Health Checkup Camp Banner",
    },
    {
      src: "/aaphotos/healthcheckup/image.png",
      alt: "Health Checkup Camp Activity",
      category: "Health Checkup",
      title: "Alumni Doctor Consultations",
    },
    {
      src: "/aaphotos/ramzat-garba/image.png",
      alt: "Ramzat Garba Event",
      category: "Ramzat Garba",
      title: "Garba Dance Night Celebration",
    },
    {
      src: "/aaphotos/ramzat-garba/image copy.png",
      alt: "Garba Gathering",
      category: "Ramzat Garba",
      title: "Alumni Gathering & Festivities",
    },
    {
      src: "/aaphotos/ramzat-garba/image copy 2.png",
      alt: "Garba Group Photo",
      category: "Ramzat Garba",
      title: "Community Group Photo",
    },
  ];

  const filteredPhotos = activeFilter === "All" 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white py-16 text-[#0F1E36] border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3 font-sans">
            Alumni Event Highlights
          </h2>
          <p className="text-lg text-gray-500 font-dancing">
            Reconnecting, rejoicing, and giving back to the community.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-3 mb-10">
          {(["All", "Health Checkup", "Ramzat Garba"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition duration-300 shadow-sm ${
                activeFilter === filter
                  ? "bg-red-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={idx}
              className="group relative bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3] border border-gray-100"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/product1.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                  {photo.category}
                </span>
                <h4 className="text-white font-bold text-sm leading-tight">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlumniGallery;
