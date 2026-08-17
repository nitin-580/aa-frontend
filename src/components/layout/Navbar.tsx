"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Merchandise", href: "/merchandise" },
    { name: "Jobs", href: "/jobs" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Convention", href: "/convention" },
    { name: "ACE Awards", href: "/ace-awards" },
    { name: "Projects", href: "/association-projects" },
    { name: "Chapters", href: "/chapters" }
  ];

  return (
    <div className="bg-[#0F1E36] text-white shadow-lg sticky z-50 top-0">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Mobile Menu Toggle & Logo */}
        <div className="flex items-center gap-x-4">
          <button 
            className="md:hidden text-white hover:text-red-500 transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          <Link href="/" className="flex items-center gap-x-3">
            <img
              src="/logo/logowithoutbg.png"
              alt="SVNIT Logo"
              className="h-12 w-12 object-contain bg-white rounded-full p-0.5"
              onError={(e) => {
                // Fallback inside case of path differences
                (e.target as HTMLImageElement).src = '/images/logo.png';
              }}
            />
            <span className="text-lg font-bold tracking-wider text-[#7f1d1d] font-sans hidden sm:inline-block">
              SVNIT Alumni Association
            </span>
          </Link>
        </div>

        {/* Desktop - Middle Horizontal Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-6 text-sm font-medium tracking-wide">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side - Empty for spacing since admin button is removed */}
        <div className="w-10 md:w-0"></div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F1E36] border-t border-red-900/20 px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white hover:text-red-500 font-medium py-2 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;

