"use client"
import React, { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1021/2000/1500",
  "https://picsum.photos/id/1018/2000/1500",
  "https://picsum.photos/id/1015/2000/1500",
  "https://picsum.photos/id/1005/2000/1500",
];

const Promotion = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out
              ${index === current ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}
          />
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              current === index ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next Buttons */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
        }
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        ❮
      </button>
      <button
        onClick={() =>
          setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
        }
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-70"
      >
        ❯
      </button>
    </div>
  );
};

export default Promotion;
