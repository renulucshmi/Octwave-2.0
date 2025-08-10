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
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "backdrop-blur-md" : "backdrop-blur-sm"
      }`}
    >
      <div className="section">
        <nav className="flex items-center justify-between gap-4 py-3">
          {/* Left: Logo + wordmark (simple, no extra styling) */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Octwave logo"
              width={108}
              height={108}
              priority
              className="object-contain h-16"
            />
            <span className="hidden sm:block text-xl font-semibold tracking-wide octwave-gradient-text dark:text-white">
              OCTWAVE
            </span>
          </Link>

          {/* Right: Register button + admin link + mobile menu toggle */}
          <div className="flex items-center gap-2">
            <Link href="/register" className="btn-primary">
              Register
            </Link>
            
            <Link href="/admin" className="hidden md:block text-xs text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white px-2 py-1 rounded transition-colors">
              Admin
            </Link>

            <button
              aria-label="Toggle menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
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
          <div className="md:hidden pb-3 px-2">
            <Link
              href="/register"
              className="block w-full text-center btn-ghost"
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* thin border gradient underline */}
      <div className="h-px octwave-gradient-bg opacity-40" />
    </header>
  );
}
