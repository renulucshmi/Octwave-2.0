"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import SmoothFollower from "@/components/SmoothFollowercursot";
import NeuralInterfaceFAQ from "@/components/faq";
import { useEffect, useState } from "react";

// Dynamically import VectorTimeline to avoid hydration issues
const VectorTimeline = dynamic(() => import("@/components/timeline"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center">
    <div className="animate-pulse text-center">
      <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)] rounded-full"></div>
      <p className="text-sm text-black/60 dark:text-white/60">Loading timeline...</p>
    </div>
  </div>
});

// Custom hook for dash animation - made faster
function useDashAnimation(text: string, letterDelay: number = 100) { // Reduced from 300 to 100
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 200); // Reduced from 500 to 200

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
    setTimeout(() => {
      setShowContent(true);
    }, 300); // Reduced from 800 to 300
  };

  return { animationStarted, animationComplete, showContent, handleAnimationEnd };
}

export default function Home() {
  const mainHeadingLine1 = "Ride the Octwave 2.0 —";
  const mainHeadingLine2 = "Build the Future";
  const badgeText = "Octwave 2.0 • Registration Open • Organized by IEEE IAS, University of Moratuwa";
  const firstParagraph = "Team-based AI/ML challenge solving real industry problems.";
  const secondParagraph = "Work with a problem statement, apply practical AI/ML techniques, and collaborate with academia and industry to deliver impactful, feasible solutions.";

  const dashAnimation = useDashAnimation(mainHeadingLine1 + mainHeadingLine2);

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx>{`
        @keyframes dash {
          0% {
            transform: skew(-30deg,0deg) translateX(300%) scale(.8);
            opacity: 1;
          }
          40% {
            transform: skew(10deg,0deg) translateX(100%) scale(.9);
          }
          60% {
            transform: skew(10deg,0deg) translateX(-10px) scale(1.2);
          }
          70% {
            transform: skew(0,0deg) translateX(0) scale(1.3);
          }
          75% {
            transform: skew(0,0deg) translateX(0) scale(1.3);
          }
          90% {
            transform: skew(0,0deg) translateX(0) scale(.85);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes done-animating {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .letter {
          display: inline-block;
          font-size: clamp(2.5rem, 8vw, 5rem);
          color: transparent;
          background: linear-gradient(135deg, var(--octwave-from) 0%, var(--octwave-via) 50%, var(--octwave-to) 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          letter-spacing: 1px;
          font-weight: 800;
          text-shadow: 0 0 40px color-mix(in oklab, var(--octwave-via) 30%, transparent),
                       0 0 80px color-mix(in oklab, var(--octwave-from) 15%, transparent);
          animation: gradient-text 4s ease-in-out infinite;
        }
        
        @keyframes gradient-text {
          0% {
            background-position: 0% 50%;
          }
          33% {
            background-position: 50% 50%;
          }
          66% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .letter.animate {
          animation: dash 300ms ease-in forwards; /* Reduced from 500ms to 300ms */
          opacity: 0;
        }
        .main-heading.done-animating {
          animation: done-animating 200ms ease-in; /* Reduced from 300ms to 200ms */
        }
      `}</style>

      {/* Hero */}
      <header className="section pt-20 pb-24 sm:pt-32 sm:pb-36 relative">
        {/* Neural Network Background */}
        <div className="neural-bg">
          {/* Neural nodes */}
          {Array.from({length: 15}).map((_, i) => (
            <div 
              key={i}
              className="neural-node"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
          {/* Data streams */}
          {Array.from({length: 8}).map((_, i) => (
            <div 
              key={i}
              className="data-stream"
              style={{
                top: `${20 + i * 10}%`,
                width: '200px',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
          {/* Matrix characters */}
          {Array.from({length: 40}).map((_, i) => (
            <div 
              key={i}
              className="matrix-char"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
        
        <SmoothFollower/>
        <div className="text-center">
          {/* Badge - appears after dash animation (no typing animation) */}
          <div 
            className={`inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold glass-effect text-black/90 dark:text-white/90 min-h-[32px] transition-all duration-500 animate-float ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></div>
            <span>{badgeText}</span>
          </div>
          
          {/* Main Heading with Dash Animation */}
          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-bold leading-tight min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] text-shadow-glow">
            <div 
              className={`main-heading ${dashAnimation.animationComplete ? 'done-animating' : ''}`}
              style={{ minHeight: 'inherit' }}
            >
              {dashAnimation.animationStarted ? (
                <>
                  <div>
                    {mainHeadingLine1.split('').map((letter, index) => (
                      <span
                        key={index}
                        className={`letter ${dashAnimation.animationStarted ? 'animate' : ''}`}
                        style={{ 
                          animationDelay: `${100 * index}ms`,
                        }}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </div>
                  <div>
                    {mainHeadingLine2.split('').map((letter, index) => (
                      <span
                        key={index + mainHeadingLine1.length}
                        className={`letter ${dashAnimation.animationStarted ? 'animate' : ''}`}
                        style={{ 
                          animationDelay: `${100 * (index + mainHeadingLine1.length)}ms`,
                        }}
                        onAnimationEnd={index === mainHeadingLine2.length - 1 ? dashAnimation.handleAnimationEnd : undefined}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <span className="opacity-0">Ride the Octwave 2.0 — Build the Future</span>
              )}
            </div>
          </h1>
          
          {/* First Paragraph - appears after dash animation (no typing animation) */}
          <p 
            className={`mt-6 text-lg sm:text-xl md:text-2xl text-black/90 dark:text-white/90 max-w-3xl mx-auto font-semibold min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {firstParagraph}
          </p>
          
          {/* Second Paragraph - appears after dash animation (no typing animation) */}
          <p 
            className={`mt-4 text-base sm:text-lg md:text-xl text-black/80 dark:text-white/75 max-w-3xl mx-auto font-medium leading-relaxed transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {secondParagraph}
          </p>
          
          {/* Buttons - appear after animation is complete */}
          <div 
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a href="#register" className="btn-primary w-full sm:w-auto">
              Register Now
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#tracks" className="btn-ghost w-full sm:w-auto">
              Explore Tracks
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Tracks */}
      <section id="tracks" className="section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">Competition Tracks</h2>
          <p className="text-lg text-black/80 dark:text-white/70 max-w-2xl mx-auto">Choose your path to innovation across three exciting challenge domains</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              title: "AI & Data", 
              desc: "Machine learning, intelligent agents, and data products that create real-world impact.",
              icon: "🤖",
              gradient: "from-blue-500 to-purple-600"
            },
            { 
              title: "Web & Cloud", 
              desc: "Next-generation applications, developer experience tools, and cloud-native solutions.",
              icon: "☁️",
              gradient: "from-green-500 to-blue-600"
            },
            { 
              title: "Sustainability", 
              desc: "Technology solutions for climate action, renewable energy, and social good.",
              icon: "🌱",
              gradient: "from-emerald-500 to-teal-600"
            },
          ].map((t, index) => (
            <div 
              key={t.title} 
              className="card p-8 text-black dark:text-white group cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform duration-300`}>
                  {t.icon}
                </div>
                <h3 className="text-xl font-bold">{t.title}</h3>
              </div>
              <p className="text-black/80 dark:text-white/80 leading-relaxed">{t.desc}</p>
              <div className="mt-6 flex items-center text-sm font-semibold octwave-gradient-text group-hover:translate-x-2 transition-transform duration-300">
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <VectorTimeline />
    

      {/* Prizes */}
      <section className="section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">Prize Pool</h2>
          <p className="text-lg text-black/80 dark:text-white/70 max-w-2xl mx-auto">Recognition and rewards for outstanding innovation</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { 
              place: "Grand Prize", 
              amt: "$3,000",
              icon: "🏆",
              desc: "Overall champion",
              highlight: true
            },
            { 
              place: "Runner Up", 
              amt: "$1,500",
              icon: "🥈",
              desc: "Second place"
            },
            { 
              place: "Track Winners", 
              amt: "$500 each",
              icon: "🎯",
              desc: "Best in category"
            },
          ].map((p, index) => (
            <div 
              key={p.place} 
              className={`card p-8 text-center text-black dark:text-white group ${p.highlight ? 'ring-2 ring-yellow-400/50 scale-105' : ''}`}
            >
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 mb-2">{p.place}</h3>
              <p className="text-3xl font-bold octwave-gradient-text mb-2">{p.amt}</p>
              <p className="text-sm text-black/70 dark:text-white/60">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ Section */}
      <section className="section pb-20">
        <NeuralInterfaceFAQ />
      </section>
      

      {/* CTA */}
      <footer id="register" className="section pb-32">
        <div className="card p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-octwave-from/20 via-octwave-via/20 to-octwave-to/20 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">Ready to ride the Octwave 2.0?</h3>
            <p className="text-lg text-black/90 dark:text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">Join hundreds of innovators in building solutions that matter. Register your team and start your journey.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a className="btn-primary" href="#">
                Register Your Team
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a className="btn-ghost" href="#">
                View Competition Rules
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-black/70 dark:text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="whitespace-nowrap">Registration Open</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="whitespace-nowrap">Team-based Competition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="whitespace-nowrap">$5,000+ Prize Pool</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center space-y-2">
          <p className="text-sm text-black/70 dark:text-white/60">Organized by IEEE Industry Applications Society, University of Moratuwa</p>
          <p className="text-xs text-black/50 dark:text-white/40">© {new Date().getFullYear()} Octwave 2.0. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}