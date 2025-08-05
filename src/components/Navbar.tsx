"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-sm">
        <div className="section">
          <nav className="flex items-center justify-between gap-4 py-4">
            <div className="skeleton w-32 h-8 rounded-lg"></div>
            <div className="skeleton w-24 h-10 rounded-full"></div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "backdrop-blur-xl bg-black/10 dark:bg-white/5 shadow-lg shadow-purple-500/10" 
          : "backdrop-blur-md bg-transparent"
      }`}
    >
      <div className="section">
        <nav className="flex items-center justify-between gap-4 py-4">
          {/* Enhanced Logo Section */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              {/* Logo Container with Glow Effect */}
              <div className={`relative overflow-hidden rounded-2xl p-2 transition-all duration-300 ${
                scrolled 
                  ? "bg-gradient-to-br from-pink-500/20 to-purple-600/20 shadow-lg shadow-pink-500/20" 
                  : "bg-gradient-to-br from-pink-500/10 to-purple-600/10"
              }`}>
                <Image
                  src="/logo.png"
                  alt="Octwave logo"
                  width={48}
                  height={48}
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
                
                {/* Magical sparkles around logo */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75 group-hover:opacity-100 hidden dark:block"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse hidden dark:block"></div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
            </div>
            
            {/* Enhanced Wordmark */}
            <div className="hidden sm:block">
              <span className="text-xl font-black tracking-wider octwave-gradient-text group-hover:scale-105 transition-transform duration-300 inline-block">
                OCTWAVE
              </span>
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide">
                2.0 Competition
              </div>
            </div>
          </Link>

          {/* Enhanced Right Section */}
          <div className="flex items-center gap-3">
            {/* Enhanced Register Button */}
            <Link href="/register" className="btn-primary group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">🚀</span>
                Register
              </span>
              
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </Link>

            {/* Enhanced Mobile Menu Toggle */}
            <button
              aria-label="Toggle menu"
              className={`md:hidden relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 ${
                open
                  ? "border-pink-400/50 bg-pink-500/20 text-pink-400 rotate-180 scale-110"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-purple-400/50 hover:text-purple-400"
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              {/* Animated Hamburger/Close Icon */}
              <div className="relative w-5 h-5">
                <span className={`absolute block h-0.5 bg-current transition-all duration-300 ${
                  open 
                    ? "top-2 left-0 w-5 rotate-45" 
                    : "top-1 left-0 w-5"
                }`}></span>
                <span className={`absolute block h-0.5 bg-current transition-all duration-300 ${
                  open 
                    ? "opacity-0" 
                    : "top-2 left-0 w-5"
                }`}></span>
                <span className={`absolute block h-0.5 bg-current transition-all duration-300 ${
                  open 
                    ? "top-2 left-0 w-5 -rotate-45" 
                    : "top-3 left-0 w-5"
                }`}></span>
              </div>
              
              {/* Button glow effect */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                open 
                  ? "bg-pink-400/20 opacity-100" 
                  : "bg-purple-400/20 opacity-0 hover:opacity-100"
              } blur-md`}></div>
            </button>
          </div>
        </nav>

        {/* Enhanced Mobile Drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          open 
            ? "max-h-32 opacity-100 pb-6" 
            : "max-h-0 opacity-0"
        }`}>
          <div className="px-4">
            {/* Mobile Register Button */}
            <Link
              href="/register"
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/30 text-white font-semibold transition-all duration-300 hover:from-pink-500/30 hover:to-purple-600/30 hover:border-pink-400/50 hover:scale-105"
              onClick={() => setOpen(false)}
            >
              <span className="text-xl">🎯</span>
              Register Your Team
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Border Gradient */}
      <div className={`h-px transition-all duration-500 ${
        scrolled 
          ? "octwave-gradient-bg opacity-60 shadow-lg shadow-purple-500/20" 
          : "octwave-gradient-bg opacity-40"
      }`}></div>
      
      {/* Floating particles effect */}
      {scrolled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden dark:block">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}
    </header>
  );
}