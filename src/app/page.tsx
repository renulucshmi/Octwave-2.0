"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import SmoothFollower from "@/components/SmoothFollowercursot";
import NeuralInterfaceFAQ from "@/components/faq";
import AHoleBackground from "@/components/AHoleBackground";
import { useEffect, useState } from "react";
import PrizeSection from "@/components/PrizeSection";

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
function useDashAnimation(text: string, letterDelay: number = 100) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    setAnimationComplete(true);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return { animationStarted, animationComplete, showContent, handleAnimationEnd };
}

export default function Home() {
  const mainHeading = "Ride the Octwave 2.0";
  const badgeText = "";
  const firstParagraph = "Team-based AI/ML challenge solving real industry problems.";
  const secondParagraph = "Workshops series and AI/ML competition organized by IEEE IAS of University of Moratuwa. Work with a problem statement, apply practical AI/ML techniques, and collaborate with academia and industry to deliver impactful, feasible solutions.";

  const dashAnimation = useDashAnimation(mainHeading);

  // Split heading for mobile responsiveness
  const firstLine = "Ride the";
  const secondLine = "Octwave 2.0";

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
          font-size: clamp(2rem, 8vw, 4rem);
          color: var(--foreground);
          letter-spacing: 2px;
          font-weight: bold;
        }
        .letter.animate {
          animation: dash 300ms ease-in forwards;
          opacity: 0;
        }
        .main-heading.done-animating {
          animation: done-animating 200ms ease-in;
        }
      `}</style>

      {/* Hero */}
      <header className="relative overflow-hidden min-h-[80vh] -mt-12">
        {/* Animated Background */}
        <div className="absolute inset-0 z-6">
          <AHoleBackground 
            height="100%" 
            opacity={0.25}
            className="w-full h-full"
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 pb-20 sm:pb-28">
          <SmoothFollower/>
          <div className="text-center">
          {/* Badge - appears after dash animation (no typing animation) */}
          {badgeText && (
            <div 
              className={`inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-black/10 text-black/70 ring-1 ring-black/10 dark:bg-black/20 dark:text-white/80 dark:ring-white/10 min-h-[28px] transition-all duration-500 ${
                dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span>{badgeText}</span>
            </div>
          )}
          
          {/* Main Heading with Dash Animation - Mobile Responsive */}
          <h1 className="mt-16 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <div 
              className={`main-heading ${dashAnimation.animationComplete ? 'done-animating' : ''}`}
            >
              {dashAnimation.animationStarted ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                  {/* First Line: "Ride the" */}
                  <div className="mb-2 sm:mb-0">
                    {firstLine.split('').map((letter, index) => (
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
                  
                  {/* Second Line: "Octwave 2.0" */}
                  <div>
                    {secondLine.split('').map((letter, index) => (
                      <span
                        key={index + firstLine.length}
                        className={`letter ${dashAnimation.animationStarted ? 'animate' : ''}`}
                        style={{ 
                          animationDelay: `${100 * (index + firstLine.length)}ms`,
                        }}
                        onAnimationEnd={index === secondLine.length - 1 ? dashAnimation.handleAnimationEnd : undefined}
                      >
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <span className="opacity-0 ">Ride the Octwave 2.0</span>
              )}
            </div>
          </h1>
          
          {/* First Paragraph - appears after dash animation (no typing animation) */}
          <p 
            className={`mt-4 text-base sm:text-lg md:text-xl text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium min-h-[1.5rem] sm:min-h-[1.75rem] md:min-h-[2rem] transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {firstParagraph}
          </p>
          
          {/* Second Paragraph - appears after dash animation (no typing animation) */}
          <p 
            className={`mt-3 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {secondParagraph}
          </p>
          
          {/* Buttons - appear after animation is complete */}
          <div 
            className={`mt-8 flex items-center justify-center gap-3 transition-all duration-500 ${
              dashAnimation.showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <a href="/register" className="btn-primary">Register Now</a>
          </div>
          </div>
        </div>
      </header>

      {/* Event Structure */}
      <section id="event-structure" className="section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">Event Structure</h2>
          <p className="text-lg text-black/70 dark:text-white/80 max-w-2xl mx-auto">
            A comprehensive journey from learning to competing
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introductory Session */}
          <div className="card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full octwave-gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 octwave-gradient-text">
                Introductory Session
              </h3>
              <p className="text-base leading-relaxed text-black/80 dark:text-white/90 max-w-2xl mx-auto">
                This session provides participants with an overview of industry trends in Artificial Intelligence (AI) and Machine 
                Learning (ML). Experts will discuss the applications of machine learning in industrial settings, offering insights into 
                its transformative potential. The session aims to establish a foundational understanding before moving into more 
                technical topics in subsequent workshops.
              </p>
            </div>
          </div>

          {/* Workshops */}
          <div className="card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full octwave-gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold mb-6 octwave-gradient-text">
                Workshops
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <h4 className="font-semibold text-black dark:text-white mb-2">Session 1</h4>
                  <p className="text-sm text-black/70 dark:text-white/80">Introduction to Machine Learning</p>
                </div>
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <h4 className="font-semibold text-black dark:text-white mb-2">Session 2</h4>
                  <p className="text-sm text-black/70 dark:text-white/80">Building models and handling time series data</p>
                </div>
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <h4 className="font-semibold text-black dark:text-white mb-2">Session 3</h4>
                  <p className="text-sm text-black/70 dark:text-white/80">About data engineering</p>
                </div>
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-4 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <h4 className="font-semibold text-black dark:text-white mb-2">Session 4</h4>
                  <p className="text-sm text-black/70 dark:text-white/80">Introduction to Kaggle platform</p>
                </div>
              </div>
            </div>
          </div>

          {/* Competition */}
          <div className="card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full octwave-gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold mb-6 octwave-gradient-text">
                Competition
              </h3>
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-6 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white">
                      📝
                    </div>
                    <h4 className="text-lg font-bold text-black dark:text-white">Team Registration (Online)</h4>
                  </div>
                  <p className="text-sm text-black/80 dark:text-white/90">
                    Teams will be registered with all details, and individual registrants will be grouped into teams.
                  </p>
                </div>
                
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-6 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white">
                      💻
                    </div>
                    <h4 className="text-lg font-bold text-black dark:text-white">Preliminary Round (Online)</h4>
                  </div>
                  <p className="text-sm text-black/80 dark:text-white/90">
                    A Kaggle competition and report submission. 10 teams will be chosen from this round, considering 
                    the competition rank and evaluation of reports.
                  </p>
                </div>
                
                <div className="bg-white/10 dark:bg-black/20 rounded-lg p-6 border border-white/20 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white">
                      🏆
                    </div>
                    <h4 className="text-lg font-bold text-black dark:text-white">Final Round (Physical)</h4>
                  </div>
                  <p className="text-sm text-black/80 dark:text-white/90">
                    A challenge round at the University of Moratuwa. Problem statement and dataset will be provided. 
                    Final presentations will be done in front of a judging board, concluding with the awarding ceremony.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <VectorTimeline />
    

      {/* Prizes */}
      <PrizeSection />

      {/* Rules Section */}
      <section id="rules" className="section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">Competition Rules</h2>
          <p className="text-lg text-black/70 dark:text-white/80 max-w-2xl mx-auto">
            Guidelines and regulations for fair competition
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eligibility Rules */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  👥
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">Team Eligibility</h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>All team members must be from the same university</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Teams can have 1-4 members maximum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Open to undergraduate students from government and private institutions in Sri Lanka</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Submission Rules */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  📝
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">Submission Guidelines</h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>All code must be original and developed during the competition period</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>External libraries and frameworks are allowed with proper attribution</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Submissions must include documentation and a technical report</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Late submissions will not be accepted under any circumstances</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Competition Conduct */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  ⚖️
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">Fair Play & Conduct</h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Collaboration between teams is strictly prohibited during competition phases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Use of pre-existing solutions or plagiarism will result in immediate disqualification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Teams must attend all mandatory workshops and sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Professional conduct and respect for organizers and participants is required</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  🏆
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">Evaluation Criteria</h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Technical innovation and creativity (30%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Solution accuracy and performance (25%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Code quality and documentation (20%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Presentation and communication (15%)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Real-world applicability and impact (10%)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="section pb-20">
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold octwave-gradient-text mb-6 text-center">📞 Contact Information</h2>
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <p className="text-black/80 dark:text-white/90">
              <strong>Renulucshmi Prakasan</strong> (Co-chair - OctWave 2.0): 
              <a href="tel:+94754350533" className="octwave-gradient-text font-semibold ml-2">+94754350533</a>
            </p>
            <p className="text-black/80 dark:text-white/90">
              <strong>Rashmitha Hansamal</strong> (Co-chair - OctWave 2.0): 
              <a href="tel:+94776057351" className="octwave-gradient-text font-semibold ml-2">+94776057351</a>
            </p>
            <p className="text-black/80 dark:text-white/90">
              <strong>Abinaya Subramaniam</strong> (Co-chair - OctWave 2.0): 
              <a href="tel:+94763885326" className="octwave-gradient-text font-semibold ml-2">+94763885326</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="section pb-24">
        <div className="card p-6 md:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">Ready to ride the Octwave 2.0?</h3>
          <p className="mt-2 text-black/70 dark:text-white/80">Register your team and start building.</p>
          <div className="mt-6 flex justify-center gap-3">
            <a className="btn-primary" href="/register">Register</a>
          </div>
        </div>
      </section>
    </div>
  );
}