"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Exclusive() {
  const [votes, setVotes] = useState(150);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check has voted locally
    if (typeof window !== "undefined") {
      const votedState = localStorage.getItem("svn_heritage_box_has_voted");
      if (votedState) {
        setHasVoted(true);
      }
    }

    // Fetch dynamic votes count from Neon Database
    fetch("/api/voting")
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.votes === "number") {
          setVotes(data.votes);
        }
      })
      .catch(err => console.error("Error loading votes:", err));
  }, []);

  const handleVote = async () => {
    if (hasVoted) return;
    setHasVoted(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("svn_heritage_box_has_voted", "true");
    }

    try {
      const res = await fetch("/api/voting", { method: "POST" });
      const data = await res.json();
      if (data && typeof data.votes === "number") {
        setVotes(data.votes);
      } else {
        setVotes(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
      setVotes(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#F2F4F7] justify-center items-center py-16 px-6 sm:px-8 lg:px-12 gap-12 border-t border-b border-gray-300 filter grayscale-[20%]">
      
      {/* Image */}
      <div className="flex-shrink-0 relative group">
        <Image
          src="/images/image.png"
          alt="Exclusive Alumni Products"
          width={700}
          height={400}
          className="max-w-full rounded-xl shadow-lg filter grayscale contrast-110"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
          <span className="bg-red-900 text-white px-6 py-2.5 font-bold text-sm sm:text-base rounded-full uppercase tracking-widest shadow border border-red-800">
            COMING SOON
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="max-w-lg text-center lg:text-left">
        <div className='flex justify-center lg:justify-start gap-2 mb-4'>
          <p className="bg-gray-700 text-gray-200 px-3 py-1 font-semibold text-xs rounded-full uppercase tracking-wider">Exclusive</p>
          <span className="bg-gray-400 text-gray-800 px-3 py-1 font-semibold text-xs rounded-full uppercase tracking-wider">Premium Concept</span>
          <span className="bg-red-900/20 text-red-900 px-3 py-1 font-bold text-xs rounded-full uppercase tracking-wider">Upcoming</span>
        </div>
        <h1 className='text-3xl lg:text-4xl mb-6 font-bold font-sans text-red-900'>
          &ldquo;SVNIT Alumni Heritage Box&rdquo;
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-300 pt-6">
          Celebrate your legacy with the exclusive SVNIT Alumni Heritage Box! Curated specially for our esteemed alumni, this premium box is filled with carefully selected memorabilia, keepsakes, and exclusive merchandise that reflect the spirit and pride of our community. From elegant keychains and sippers to stylish stationery, each item is crafted to remind you of the unforgettable memories at SVNIT. Treat yourself—or a fellow alumnus—to this thoughtfully designed collection and carry a piece of SVNIT wherever you go.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`px-8 py-3.5 rounded-lg font-bold text-sm transition duration-300 shadow-md ${
              hasVoted
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-red-900 text-white hover:bg-red-950"
            }`}
          >
            {hasVoted ? "Voted ✔" : "Vote to Launch Box"}
          </button>
          
          <div className="text-sm font-semibold text-gray-505 font-sans">
            <span className="text-gray-955 font-bold text-base">{votes}</span> alumni interest votes received
          </div>
        </div>
      </div>
    </div>
  );
}
