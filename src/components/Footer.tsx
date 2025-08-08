"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent" aria-hidden />
        <div className="section pt-12 pb-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3 items-start">
              {/* Branding */}
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-black/10 dark:ring-white/10">
                  <Image src="/logo.png" alt="IEEE IAS UoM" fill className="object-contain p-1.5" />
                </div>
                <div>
                  <p className="font-semibold text-black dark:text-white">IEEE IAS • University of Moratuwa</p>
                  <p className="text-sm text-black/60 dark:text-white/60">Octwave 2.0</p>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="grid grid-cols-2 gap-3 text-sm">
                {[{label:"About",href:"#about"},{label:"Tracks",href:"#tracks"},{label:"Timeline",href:"#timeline"},{label:"Prizes",href:"#prizes"},{label:"FAQ",href:"#faq"},{label:"Register",href:"#register"}].map(l => (
                  <a key={l.label} href={l.href} className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors">
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* Social + Contact */}
              <div className="flex md:justify-end">
                <div className="flex items-center gap-3">
                  <a aria-label="Twitter" href="#" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                    <span>𝕏</span>
                  </a>
                  <a aria-label="LinkedIn" href="#" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                    in
                  </a>
                  <a aria-label="GitHub" href="#" className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/5 dark:hover:bg-white/5">
                    <span>GH</span>
                  </a>
                  <a href="mailto:hello@example.com" className="ml-2 text-sm text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white">hello@example.com</a>
                </div>
              </div>
            </div>

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-black/60 dark:text-white/60">© {year} Octwave 2.0 • IEEE Industry Applications Society, University of Moratuwa</p>
              <div className="flex items-center gap-4 text-xs text-black/60 dark:text-white/60">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
