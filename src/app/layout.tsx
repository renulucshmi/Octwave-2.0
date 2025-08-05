import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Better performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Octwave 2.0 — AI/ML Innovation Competition",
  description:
    "Join Octwave 2.0, the premier AI/ML tech innovation competition. Build the future with cutting-edge technology. Register now and compete for $3,000+ in prizes.",
  keywords: [
    "AI competition",
    "Machine Learning",
    "Tech innovation",
    "IEEE",
    "University of Moratuwa",
    "Hackathon",
    "Programming contest",
    "Technology challenge"
  ],
  authors: [{ name: "IEEE IAS University of Moratuwa" }],
  creator: "IEEE Industry Applications Society",
  publisher: "University of Moratuwa",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://octwave.lk",
    title: "Octwave 2.0 — AI/ML Innovation Competition",
    description: "Build the future with AI/ML. Join Octwave 2.0 and compete for $3,000+ in prizes.",
    siteName: "Octwave 2.0",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Octwave 2.0 Competition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Octwave 2.0 — AI/ML Innovation Competition",
    description: "Build the future with AI/ML. Join Octwave 2.0 and compete for $3,000+ in prizes.",
    images: ["/og-image.jpg"],
    creator: "@octwave2024",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c9277c" },
    { media: "(prefers-color-scheme: dark)", color: "#3e34bb" },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#c9277c",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#c9277c",
    "msapplication-config": "/browserconfig.xml",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "Octwave 2.0 AI/ML Competition",
              "description": "Premier AI/ML tech innovation competition for students and professionals",
              "organizer": {
                "@type": "Organization",
                "name": "IEEE Industry Applications Society",
                "url": "https://ieee-ias.uom.lk"
              },
              "location": {
                "@type": "Place",
                "name": "University of Moratuwa",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "LK",
                  "addressLocality": "Moratuwa"
                }
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "eventStatus": "https://schema.org/EventScheduled"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Page loading indicator */}
        <div 
          id="loading-bar" 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 z-[100] transition-all duration-300"
          style={{ width: "0%" }}
          suppressHydrationWarning
        />
        
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded-lg z-[100] transition-all duration-200"
        >
          Skip to main content
        </a>
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content wrapper */}
        <main 
          id="main-content" 
          className="relative z-10"
          role="main"
        >
          {children}
        </main>

        {/* Enhanced performance and accessibility scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Smooth scrolling polyfill for older browsers
              if (!CSS.supports('scroll-behavior', 'smooth')) {
                const script = document.createElement('script');
                script.src = 'https://polyfill.io/v3/polyfill.min.js?features=smoothscroll';
                document.head.appendChild(script);
              }

              // Page loading progress
              let progress = 0;
              const loadingBar = document.getElementById('loading-bar');
              
              const updateProgress = (newProgress) => {
                progress = Math.min(newProgress, 100);
                if (loadingBar) {
                  loadingBar.style.width = progress + '%';
                  if (progress >= 100) {
                    setTimeout(() => {
                      loadingBar.style.opacity = '0';
                      setTimeout(() => {
                        loadingBar.style.display = 'none';
                      }, 300);
                    }, 200);
                  }
                }
              };

              // Simulate loading progress
              updateProgress(20);
              
              document.addEventListener('DOMContentLoaded', () => {
                updateProgress(60);
              });
              
              window.addEventListener('load', () => {
                updateProgress(100);
              });

              // Enhanced focus management for better accessibility
              document.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                  document.body.classList.add('keyboard-navigation');
                }
              });

              document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
              });

              // Reduced motion support
              const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
              
              if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
              }

              // Performance monitoring
              if ('performance' in window && 'observe' in window.PerformanceObserver.prototype) {
                const observer = new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                  }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
              }
            `,
          }}
        />

        {/* Analytics and tracking (placeholder - replace with your analytics) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics or other tracking code would go here
              // Example: gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  );
}