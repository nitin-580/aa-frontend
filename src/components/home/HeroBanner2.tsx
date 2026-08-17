"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const posters = [
  "/aaphotos/ramzat-garba/image.png",
  "/aaphotos/healthcheckup/Healthcheckupcamp.png",
  "/aaphotos/ramzat-garba/image copy.png",
  "/aaphotos/healthcheckup/image.png",
  "/aaphotos/ramzat-garba/image copy 2.png"
];

const HeroBanner2 = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === posters.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? posters.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0F1E36]">
      {/* Background Slides */}
      {posters.map((poster, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-35" : "opacity-0"
          }`}
        >
          <img
            src={poster}
            alt={`SVNIT Campus ${index + 1}`}
            className="w-full h-full object-cover filter grayscale-20 brightness-75"
            onError={(e) => {
              // Fallback to Unsplash inside case of path differences
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop";
            }}
          />
        </div>
      ))}

      {/* Red Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/80 to-transparent"></div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
        <div className="bg-white/90 p-4 rounded-full shadow-lg mb-6 border-2 border-red-900 animate-pulse">
          <img
            src="/logo/logowithoutbg.png"
            alt="SVNIT Emblem"
            className="h-20 w-20 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/logo.png";
            }}
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Stay Connected. <span className="text-red-500">Stay Inspired.</span> <br />
          Stay <span className="underline decoration-red-900">SVNIT</span>.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl font-light font-quicksand">
          Welcome to the official portal of the Sardar Vallabhbhai National Institute of Technology Alumni Association. Reconnect, share, and support the legacy of excellence.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/merchandise"
            className="px-8 py-4 bg-red-900 text-white font-bold text-base rounded-lg hover:bg-red-950 transition duration-300 shadow-lg"
          >
            Explore Merchandise
          </Link>
          <Link
            href="/chapters"
            className="px-8 py-4 border-2 border-white text-white font-semibold text-base rounded-lg hover:bg-white hover:text-[#0F1E36] transition duration-300 shadow-md"
          >
            Explore Alumni Network
          </Link>
        </div>
      </div>

      {/* Left/Right Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-20"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition z-20"
      >
        ❯
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 w-full flex justify-center space-x-2.5 z-20">
        {posters.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              current === index ? "bg-red-900 scale-125" : "bg-gray-400/50 hover:bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner2;

