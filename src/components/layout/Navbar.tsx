"use client";
import React, { useState } from "react";
import { Menu, X, ShoppingCart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();

  const navItems = [
    {
      name: "About Us",
      href: "/about",
      align: "left",
      preview: {
        image: "/images/svnit-campus-dusk.jpg",
        tag: "About Association",
        title: "Our Legacy, Your Pride",
        description: "Connecting 25,000+ global alumni, celebrating memories, and supporting student initiatives.",
        primaryButtonText: "Explore About",
        primaryButtonHref: "/about",
      },
    },
    {
      name: "Alumni Accolade",
      href: "/ace-alumni-accolade",
      align: "left",
      preview: {
        image: "/images/hero-award.jpg",
        tag: "Accolade 2026",
        title: "ACE Alumnus Accolade",
        description: "Honouring distinguished alumni achievements across 16 categories for Convention 2026.",
        primaryButtonText: "View Notice",
        primaryButtonHref: "/ace-alumni-accolade",
        secondaryButtonText: "Nominate",
        secondaryButtonHref: "/ace-alumni-accolade/nominate",
      },
    },
    {
      name: "Merchandise",
      href: "/merchandise",
      align: "center",
      preview: {
        image: "/images/diary.png",
        tag: "Official Store",
        title: "Alumni Merchandise",
        description: "Browse authentic executive diaries, apparel, lapel pins, and jubilee reunion kits.",
        primaryButtonText: "Browse Store",
        primaryButtonHref: "/merchandise",
      },
    },
    {
      name: "Announcements",
      href: "/announcements",
      align: "center",
      preview: {
        image: "/images/announcements/22nd_global_alumni_convention_invitation.png",
        tag: "Notices & Bulletins",
        title: "Latest Announcements",
        description: "Official circulars for the 22nd Global Convention, MC election drives, and notices.",
        primaryButtonText: "View Circulars",
        primaryButtonHref: "/announcements",
      },
    },
    {
      name: "Media",
      href: "/media",
      align: "center",
      preview: {
        image: "/aaphotos/ramzat-garba/image.png",
        tag: "Gallery & Reels",
        title: "Media & Photo Gallery",
        description: "Relive memories from milestone jubilee reunions, convention fulfillments, and looping reels.",
        primaryButtonText: "View Gallery",
        primaryButtonHref: "/media",
      },
    },
    {
      name: "Contact Us",
      href: "/contact",
      align: "right",
      preview: {
        image: "/images/svnit-campus-dusk.jpg",
        tag: "Campus Office · Surat",
        title: "Contact Alumni Office",
        description: "Reach the Alumni Office near SBI Bank, SVNIT Campus. Phone: +91-8758366507.",
        primaryButtonText: "Get in Touch",
        primaryButtonHref: "/contact",
      },
    },
    {
      name: "SVNIT Alumni Portal",
      href: "/alumni-portal",
      isPortal: true,
      externalUrl: "https://www.svnit.ac.in/web/alumni/",
      align: "right",
      preview: {
        image: "/images/svnit_alumni_portal_preview.webp",
        tag: "svnit.ac.in/web/alumni/",
        title: "Official SVNIT Alumni Portal",
        description: "Redirect to the official portal for voter registration and membership card access.",
        primaryButtonText: "Preview",
        primaryButtonHref: "/alumni-portal",
        secondaryButtonText: "Redirect",
        secondaryButtonHref: "https://www.svnit.ac.in/web/alumni/",
        isExternalSecondary: true,
      },
    },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#7f1d1d] text-white text-[11px] sm:text-xs font-semibold py-2 px-3 text-center border-b border-red-950 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 shadow-inner">
        <span className="bg-white/20 text-white text-[9px] sm:text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shrink-0">Announcement</span>
        <span className="leading-snug text-center">
          OFFICIAL SVNIT ALUMNI ASSOCIATION | ONLY DOMESTIC ORDERS ARE ACCEPTED (INTERNATIONAL DELIVERY STARTS 1 APRIL 2027) | SUPPORT: +91-8758366507
        </span>
      </div>

      <div className="bg-[#0F1E36] text-white shadow-lg sticky z-40 top-0">
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
            <ul className="flex items-center space-x-4 lg:space-x-6 text-xs lg:text-sm font-medium tracking-wide">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="hover:text-red-500 border-b-2 border-transparent hover:border-red-500 pb-1 transition-all duration-300 inline-flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                    {item.isPortal && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A050] animate-pulse"></span>
                    )}
                  </Link>

                  {/* Hover Quick Preview Card for every nav item */}
                  {item.preview && (
                    <div
                      className={`absolute top-full pt-3 hidden group-hover:block z-50 w-72 pointer-events-auto ${
                        item.align === "right"
                          ? "right-0"
                          : item.align === "left"
                          ? "left-0"
                          : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-3 text-slate-800 space-y-2.5 transition-all duration-200">
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-[16/10] bg-gray-900">
                          <img
                            src={item.preview.image}
                            alt={`${item.name} Preview`}
                            className="w-full h-full object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                          <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-mono font-semibold truncate max-w-[90%] bg-black/40 px-1.5 py-0.5 rounded">
                            {item.preview.tag}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-xs text-[#0F1E36]">
                            {item.preview.title}
                          </p>
                          <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
                            {item.preview.description}
                          </p>
                        </div>
                        <div className={`grid ${item.preview.secondaryButtonText ? "grid-cols-2" : "grid-cols-1"} gap-1.5 pt-1`}>
                          {item.preview.secondaryButtonText && (
                            item.preview.isExternalSecondary ? (
                              <a
                                href={item.preview.secondaryButtonHref || item.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] font-bold text-[11px] rounded text-center uppercase tracking-wider flex items-center justify-center gap-1 shadow transition"
                              >
                                <span>{item.preview.secondaryButtonText}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <Link
                                href={item.preview.secondaryButtonHref || item.href}
                                className="px-2.5 py-1.5 bg-[#C9A050] hover:bg-[#b88e3e] text-[#0F1E36] font-bold text-[11px] rounded text-center uppercase tracking-wider flex items-center justify-center gap-1 shadow transition"
                              >
                                <span>{item.preview.secondaryButtonText}</span>
                              </Link>
                            )
                          )}
                          <Link
                            href={item.preview.primaryButtonHref || item.href}
                            className="px-2.5 py-1.5 bg-[#0F1E36] hover:bg-[#1a2e4d] text-white font-semibold text-[11px] rounded text-center uppercase tracking-wider flex items-center justify-center transition"
                          >
                            <span>{item.preview.primaryButtonText}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side - Shopping Cart Button */}
          <div className="flex items-center gap-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-white hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-650 text-white text-[10px] font-bold h-5.5 w-5.5 rounded-full flex items-center justify-center border-2 border-[#0F1E36]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0F1E36] border-t border-red-900/20 px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2 border-b border-white/5"
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-red-500 font-medium transition text-sm"
                >
                  {item.name}
                </Link>
                {item.isPortal && item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#C9A050] font-bold uppercase tracking-wider flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded"
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
