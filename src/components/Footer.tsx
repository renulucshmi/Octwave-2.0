"use client";

import Image from "next/image";
import { Globe, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto">
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent"
          aria-hidden
        />
        <div className="section pt-12 pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3 items-start">
              {/* Branding */}
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
                  <Image
                    src="/logo.png"
                    alt="IEEE IAS UoM"
                    fill
                    className="object-contain p-1.5"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white">
                    IEEE IAS • University of Moratuwa
                  </p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Octwave 2.0
                  </p>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Event Structure", href: "#event-structure" },
                  { label: "Timeline", href: "#timeline" },
                  { label: "Prizes", href: "#prizes" },
                  { label: "Rules", href: "#rules" },
                  { label: "Contact", href: "#contact" },
                  { label: "Register", href: "/register" },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* Social + Contact */}
              <div className="flex md:justify-end">
                <div className="flex items-center gap-3">
                  <a
                    aria-label="Official Website"
                    href="https://ias.uom.lk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Globe size={16} />
                  </a>
                  <a
                    aria-label="Facebook"
                    href="https://www.facebook.com/IASUOM/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/company/ieeeiasuom/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-black/60 dark:text-white/60">
                © {year} Octwave 2.0 • IEEE Industry Applications Society,
                University of Moratuwa
              </p>
              <div className="flex items-center gap-4 text-xs text-black/60 dark:text-white/60">
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="hover:text-black dark:hover:text-white transition-colors"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
