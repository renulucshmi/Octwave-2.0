"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-xl bg-black/20 border-b border-white/10" 
          : "backdrop-blur-sm"
      }`}
    >
      <div className="section">
        <nav className="flex items-center justify-between gap-4 py-4">
          {/* Left: Logo + wordmark (simple, no extra styling) */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="Octwave logo"
                width={56}
                height={56}
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-octwave-from/20 to-octwave-to/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
            <span className="hidden sm:block text-xl font-bold tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-octwave-from group-hover:to-octwave-to transition-all duration-300">
              OCTWAVE
            </span>
          </Link>

          {/* Right: Register button + mobile menu toggle */}
          <div className="flex items-center gap-3">
            <Link href="/register" className="btn-primary hidden sm:inline-flex">
              Register Now
            </Link>
            <Link href="/register" className="btn-primary sm:hidden">
              Register
            </Link>

            <button
              aria-label="Toggle menu"
              className={`md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl glass-effect text-white hover:bg-white/15 transition-all duration-300 ${
                open ? 'bg-white/15' : ''
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-5"
              >
                {open ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile drawer (only Register link required) */}
        {open && (
          <div className={`md:hidden pb-4 px-2 transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="glass-effect rounded-2xl p-4">
              <nav className="space-y-3">
                <Link
                  href="#tracks"
                  className="block text-center text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setOpen(false)}
                >
                  Explore Tracks
                </Link>
                <Link
                  href="#register"
                  className="block text-center text-white/90 hover:text-white transition-colors py-2"
                  onClick={() => setOpen(false)}
                >
                  Prize Pool
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center btn-primary"
                  onClick={() => setOpen(false)}
                >
                  Register Team
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* thin border gradient underline */}
      <div className={`h-px octwave-gradient-bg transition-opacity duration-300 ${
        scrolled ? 'opacity-60' : 'opacity-30'
      }`} />
    </header>
  );
}
