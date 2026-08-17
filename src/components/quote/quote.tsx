"use client";
import React from "react";
import Link from "next/link";

const Quote = () => {
  return (
    <div className="bg-[#F4F6F9] py-14 px-6 sm:px-8 lg:px-12 border-t border-b border-[#0F1E36]/5">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-2xl sm:text-3xl text-[#0F1E36] font-dancing leading-relaxed">
          &ldquo;Carry a piece of SVNIT with you &mdash; exclusive alumni collectibles await!&rdquo;
        </p>
        <div className="flex justify-center items-center mt-6">
          <Link
            href="/merchandise"
            className="px-8 py-3 bg-red-900 text-white hover:bg-red-950 text-sm font-semibold rounded-lg transition duration-300 shadow-md"
          >
            Explore Merchandise
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quote;

