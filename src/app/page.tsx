"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import SmoothFollower from "@/components/SmoothFollowercursot";
import NeuralInterfaceFAQ from "@/components/faq";
import { useEffect, useState, useRef } from "react";

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

// Custom hook for intersection observer
function useIntersectionObserver() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-reveal');
            if (id) {
              setVisibleElements(prev => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const elements = document.querySelectorAll('[data-reveal]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
}

// Custom hook for dash animation - made faster
function useDashAnimation(text: string, letterDelay: number = 80) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
    setTimeout(() => {
      setShowContent(true);
    }, 400);
  };

  return { animationStarted, animationComplete, showContent, handleAnimationEnd };
}

// Cosmic Background Component - Client-only to avoid hydration issues
const CosmicBackground = dynamic(() => Promise.resolve(function CosmicBg() {
  const [positions] = useState(() => {
    // Generate consistent positions on first render
    const generatePositions = () => ({
      constellations: Array.from({ length: 50 }, (_, i) => ({
        left: `${(i * 17 + 13) % 100}%`,
        top: `${(i * 23 + 7) % 100}%`,
        animationDelay: `${(i * 0.08) % 4}s`,
        color: ['var(--octwave-from)', 'var(--octwave-via)', 'var(--octwave-to)'][i % 3]
      })),
      orbs: Array.from({ length: 15 }, (_, i) => ({
        left: `${(i * 19 + 11) % 100}%`,
        top: `${(i * 29 + 5) % 100}%`,
        width: `${20 + (i * 4) % 60}px`,
        height: `${20 + (i * 4) % 60}px`,
        animationDelay: `${(i * 0.4) % 6}s`,
        animationDuration: `${4 + (i % 4)}s`
      })),
      beams: Array.from({ length: 12 }, (_, i) => ({
        top: `${10 + i * 8}%`,
        width: `${200 + (i * 25) % 300}px`,
        animationDelay: `${i * 0.8}s`,
        animationDuration: `${6 + (i % 4)}s`
      })),
      particles: Array.from({ length: 30 }, (_, i) => ({
        left: `${(i * 11 + 3) % 100}%`,
        animationDelay: `${(i * 0.4) % 12}s`,
        color: ['var(--octwave-from)', 'var(--octwave-via)', 'var(--octwave-to)'][i % 3],
        symbol: ['◦', '◉', '◊', '⧫', '⬟', '⬢'][i % 6]
      }))
    });
    return generatePositions();
  });

  return (
    <div className="cosmic-bg">
      {/* Neural Constellations */}
      {positions.constellations.map((pos, i) => (
        <div
          key={`star-${i}`}
          className="neural-constellation"
          style={pos}
        />
      ))}

      {/* Floating Orbs */}
      {positions.orbs.map((pos, i) => (
        <div
          key={`orb-${i}`}
          className="floating-orb"
          style={pos}
        />
      ))}

      {/* Energy Beams */}
      {positions.beams.map((pos, i) => (
        <div
          key={`beam-${i}`}
          className="energy-beam"
          style={pos}
        />
      ))}

      {/* Quantum Particles */}
      {positions.particles.map((pos, i) => (
        <div
          key={`particle-${i}`}
          className="quantum-particle"
          style={{
            left: pos.left,
            animationDelay: pos.animationDelay,
            color: pos.color
          }}
        >
          {pos.symbol}
        </div>
      ))}
    </div>
  );
}), { ssr: false });

export default function Home() {
  const mainHeading = "Ride the Octwave 2.0 - Build\nthe Future";
  const badgeText = "Octwave 2.0 • Registration Open • Organized by IEEE IAS, University of Moratuwa";
  const firstParagraph = "Team-based AI/ML challenge solving real industry problems.";
  const secondParagraph = "Work with a problem statement, apply practical AI/ML techniques, and collaborate with academia and industry to deliver impactful, feasible solutions.";

  const dashAnimation = useDashAnimation(mainHeading);
  const visibleElements = useIntersectionObserver();

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="hidden dark:block">
        <CosmicBackground />
      </div>
      
      {/* Light mode subtle background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden block dark:hidden" suppressHydrationWarning>
        {/* Simple floating dots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-pink-300/30 rounded-full"
            style={{
              left: `${(i * 12.5) % 80 + 10}%`,
              top: `${(i * 15) % 70 + 15}%`,
              animation: `light-sparkle ${6 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>
      
      
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
        @keyframes magical-glow {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(201, 39, 124, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 30px rgba(140, 45, 165, 0.6));
          }
        }
        .letter {
          display: inline-block;
          font-size: clamp(2rem, 8vw, 4.5rem);
          color: transparent;
          background: linear-gradient(135deg, #c9277c 0%, #8c2da5 50%, #3e34bb 100%);
          -webkit-background-clip: text;
          background-clip: text;
          letter-spacing: 2px;
          font-weight: 900;
          animation: magical-glow 3s ease-in-out infinite;
        }
        .letter.animate {
          animation: dash 250ms ease-out forwards;
          opacity: 0;
        }
        .main-heading.done-animating {
          animation: done-animating 300ms ease-out;
        }
        .magic-sparkle {
          position: absolute;
          color: var(--octwave-from);
          animation: sparkle 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        /* Light mode utility classes */
        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
      `}</style>

      {/* Hero */}
      <header className="section pt-20 pb-24 sm:pt-28 sm:pb-32 relative">
        <SmoothFollower/>
        
        <div className="text-center relative z-10">
          {/* Magic Sparkles */}
          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="magic-sparkle text-2xl"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>

          {/* Badge */}
          <div 
            className={`inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold glass-card min-h-[40px] transition-all duration-700 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            <span className="octwave-gradient-text">🚀 {badgeText}</span>
          </div>
          
          {/* Main Heading with Dash Animation */}
          <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl font-black leading-tight min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] relative">
            <div 
              className={`main-heading ${dashAnimation.animationComplete ? 'done-animating' : ''}`}
              style={{ minHeight: 'inherit' }}
            >
              {dashAnimation.animationStarted ? (
                mainHeading.split('').map((letter, index) => 
                  letter === '\n' ? (
                    <br key={index} />
                  ) : (
                    <span
                      key={index}
                      className={`letter ${dashAnimation.animationStarted ? 'animate' : ''}`}
                      style={{ 
                        animationDelay: `${80 * index}ms`,
                      }}
                      onAnimationEnd={index === mainHeading.length - 1 ? dashAnimation.handleAnimationEnd : undefined}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  )
                )
              ) : (
                <span className="opacity-0">Ride the Octwave 2.0 — Build the Future</span>
              )}
            </div>
          </h1>
          
          {/* First Paragraph */}
          <p 
            className={`mt-6 text-lg sm:text-xl md:text-2xl font-semibold max-w-3xl mx-auto transition-all duration-700 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {firstParagraph}
            </span>
          </p>
          
          {/* Second Paragraph */}
          <p 
            className={`mt-4 text-base sm:text-lg text-black/75 dark:text-white/85 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {secondParagraph}
          </p>
          
          {/* Enhanced Buttons */}
          <div 
            className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a href="#register" className="btn-primary group">
              <span className="relative z-10">🎯 Register Now</span>
            </a>
            <a href="#tracks" className="btn-ghost group">
              <span className="relative z-10">🔬 Explore Tracks</span>
            </a>
          </div>
        </div>
      </header>

      {/* Enhanced Tracks */}
      <section 
        id="tracks" 
        className="section pb-20" 
        data-reveal="tracks"
      >
        <div className={`reveal-up ${visibleElements.has('tracks') ? 'revealed' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold octwave-gradient-text text-center mb-4">
            🎯 Competition Tracks
          </h2>
          <p className="text-center text-black/70 dark:text-white/70 mb-12 max-w-2xl mx-auto">
            Choose your battlefield and showcase your expertise in cutting-edge technology domains
          </p>
        </div>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              title: "🤖 AI & Data", 
              desc: "Machine learning, intelligent agents, and data products that drive real-world impact.",
              icon: "🧠",
              gradient: "from-pink-500/20 to-purple-500/20"
            },
            { 
              title: "☁️ Web & Cloud", 
              desc: "Next-generation applications, developer experience tools, and cloud-native solutions.",
              icon: "🌐",
              gradient: "from-purple-500/20 to-indigo-500/20"
            },
            { 
              title: "🌱 Sustainability", 
              desc: "Technology solutions for climate action, renewable energy, and social good.",
              icon: "♻️",
              gradient: "from-indigo-500/20 to-pink-500/20"
            },
          ].map((track, index) => (
            <div 
              key={track.title} 
              className={`glass-card p-8 text-black/80 dark:text-white/90 group reveal-up stagger-${index + 1} ${
                visibleElements.has('tracks') ? 'revealed' : ''
              }`}
              data-reveal="tracks"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {track.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 octwave-gradient-text">{track.title}</h3>
              <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">{track.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Timeline */}
      <VectorTimeline />

      {/* Enhanced Prizes */}
      <section 
        className="section pb-20" 
        data-reveal="prizes"
      >
        <div className={`reveal-up ${visibleElements.has('prizes') ? 'revealed' : ''}`}>
          <h2 className="text-3xl sm:text-4xl font-bold octwave-gradient-text text-center mb-4">
            🏆 Prize Pool
          </h2>
          <p className="text-center text-black/70 dark:text-white/70 mb-12 max-w-2xl mx-auto">
            Compete for substantial rewards and recognition in the tech innovation community
          </p>
        </div>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { place: "🥇 Grand Prize", amt: "$3,000", desc: "Ultimate innovation award", gradient: "from-yellow-400/20 to-orange-500/20" },
            { place: "🥈 Runner Up", amt: "$1,500", desc: "Excellence in execution", gradient: "from-gray-300/20 to-gray-500/20" },
            { place: "🥉 Track Winners", amt: "$500 each", desc: "Best in category", gradient: "from-amber-400/20 to-yellow-500/20" },
          ].map((prize, index) => (
            <div 
              key={prize.place} 
              className={`glass-card p-8 text-center group reveal-scale stagger-${index + 1} ${
                visibleElements.has('prizes') ? 'revealed' : ''
              }`}
              data-reveal="prizes"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${prize.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl">
                  {index === 0 ? '👑' : index === 1 ? '⭐' : '🎯'}
                </span>
              </div>
              <p className="text-sm font-medium text-black/70 dark:text-white/70 mb-2">{prize.place}</p>
              <p className="text-3xl font-black octwave-gradient-text mb-2">{prize.amt}</p>
              <p className="text-xs text-black/60 dark:text-white/60">{prize.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced FAQ */}
      <section className="section pb-20">
        <NeuralInterfaceFAQ />
      </section>

      {/* Enhanced CTA */}
      <footer 
        id="register" 
        className="section pb-32"
        data-reveal="cta"
      >
        <div className={`glass-card p-12 md:p-16 text-center relative overflow-hidden group reveal-up ${
          visibleElements.has('cta') ? 'revealed' : ''
        }`}>
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-indigo-500/5 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-indigo-500/10 transition-all duration-500"></div>
          
          <div className="relative z-10">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl sm:text-3xl font-bold octwave-gradient-text mb-4">
              Ready to ride the Octwave 2.0?
            </h3>
            <p className="text-lg text-black/80 dark:text-white/85 mb-8 max-w-2xl mx-auto">
              Join the next generation of innovators and turn your ideas into reality. Register your team and start building the future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a className="btn-primary text-lg px-8 py-4" href="#">
                🎯 Register Your Team
              </a>
              <a className="btn-ghost text-lg px-8 py-4" href="#">
                📋 View Competition Rules
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center space-y-3">
          <p className="text-sm text-black/60 dark:text-white/60 flex items-center justify-center gap-2">
            <span>🏛️</span>
            Organized by IEEE Industry Applications Society, University of Moratuwa
          </p>
          <p className="text-xs text-black/50 dark:text-white/50" suppressHydrationWarning>
            © {new Date().getFullYear()} Octwave 2.0 • Building Tomorrow's Technology Today
          </p>
        </div>
      </footer>
    </div>
  );
}