"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isSubmitPage = pathname === '/submit';

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

          {/* Left: Logo + Site Name */}

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

          {/* Right: Submit/Back to Home button */}

          <div className="flex items-center gap-2">
            {isSubmitPage ? (
              <Link href="/" className="btn-primary">
                ← Back to Home
              </Link>
            ) : (
              <Link href="/submit" className="btn-primary">
                Submit Project
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* thin border gradient underline */}
      <div className="h-px octwave-gradient-bg opacity-40" />
    </header>
  );
}
