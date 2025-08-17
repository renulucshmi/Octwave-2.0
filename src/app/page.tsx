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
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-[var(--octwave-from)] to-[var(--octwave-to)] rounded-full"></div>
        <p className="text-sm text-black/60 dark:text-white/60">
          Loading timeline...
        </p>
      </div>
    </div>
  ),
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

  return {
    animationStarted,
    animationComplete,
    showContent,
    handleAnimationEnd,
  };
}

export default function Home() {
  const mainHeading = "Ride the Octwave 2.0";
  const badgeText = "";
  const firstParagraph =
    "Take part in expert-led workshops, work on real datasets, and compete with the best minds to create practical solutions.";
  const secondParagraph =
    " OctWave 2.0 is your chance to learn new skills, showcase your talent, and make a real impact.";

  const dashAnimation = useDashAnimation(mainHeading);

  // Split heading for mobile responsiveness
  const firstLine = "Ride the";
  const secondLine = "Octwave 2.0";

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx>{`
        @keyframes dash {
          0% {
            transform: skew(-30deg, 0deg) translateX(300%) scale(0.8);
            opacity: 1;
          }
          40% {
            transform: skew(10deg, 0deg) translateX(100%) scale(0.9);
          }
          60% {
            transform: skew(10deg, 0deg) translateX(-10px) scale(1.2);
          }
          70% {
            transform: skew(0, 0deg) translateX(0) scale(1.3);
          }
          75% {
            transform: skew(0, 0deg) translateX(0) scale(1.3);
          }
          90% {
            transform: skew(0, 0deg) translateX(0) scale(0.85);
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
            opacity={0.45}
            className="w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 pb-12 sm:pb-28">
          <SmoothFollower />
          <div className="text-center">
            {/* Badge - appears after dash animation (no typing animation) */}
            {badgeText && (
              <div
                className={`inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-3 py-1 text-xs font-medium bg-black/10 text-black/80 ring-1 ring-black/10 dark:bg-black/20 dark:text-white/80 dark:ring-white/10 min-h-[28px] transition-all duration-500 ${
                  dashAnimation.showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span>{badgeText}</span>
              </div>
            )}

            {/* Main Heading with Dash Animation - Mobile Responsive */}
            <h1 className="mt-16 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <div
                className={`main-heading ${
                  dashAnimation.animationComplete ? "done-animating" : ""
                }`}
              >
                {dashAnimation.animationStarted ? (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-4">
                    {/* First Line: "Ride the" */}
                    <div className="mb-2 sm:mb-0">
                      {firstLine.split("").map((letter, index) => (
                        <span
                          key={index}
                          className={`letter text-black dark:text-white ${
                            dashAnimation.animationStarted ? "animate" : ""
                          }`}
                          style={{
                            animationDelay: `${100 * index}ms`,
                          }}
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </span>
                      ))}
                    </div>

                    {/* Second Line: "Octwave 2.0" */}
                    <div>
                      {secondLine.split("").map((letter, index) => (
                        <span
                          key={index + firstLine.length}
                          className={`letter text-black dark:text-white ${
                            dashAnimation.animationStarted ? "animate" : ""
                          }`}
                          style={{
                            animationDelay: `${
                              100 * (index + firstLine.length)
                            }ms`,
                          }}
                          onAnimationEnd={
                            index === secondLine.length - 1
                              ? dashAnimation.handleAnimationEnd
                              : undefined
                          }
                        >
                          {letter === " " ? "\u00A0" : letter}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="opacity-0 text-black dark:text-white">
                    Ride the Octwave 2.0
                  </span>
                )}
              </div>
            </h1>

            {/* First Paragraph - appears after dash animation (no typing animation) */}
            <p
              className={`mt-4 text-base sm:text-lg md:text-xl text-black dark:text-gray-100 max-w-2xl mx-auto font-semibold min-h-[1.5rem] sm:min-h-[1.75rem] md:min-h-[2rem] transition-all duration-500 ${
                dashAnimation.showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {firstParagraph}
            </p>

            {/* Second Paragraph - appears after dash animation (no typing animation) */}
            <p
              className={`mt-3 text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto font-medium transition-all duration-500 ${
                dashAnimation.showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {secondParagraph}
            </p>

            {/* Buttons - appear after animation is complete */}
            <div
              className={`mt-8 flex items-center justify-center gap-3 transition-all duration-500 ${
                dashAnimation.showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <a href="/register" className="btn-primary">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Event Structure */}
      <section id="event-structure" className="section pb-20 pt-8 sm:pt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">
            Event Structure
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80 max-w-2xl mx-auto">
            A comprehensive journey from learning to competing
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Workshops */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/90 dark:bg-black/80 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 octwave-gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20 blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-600/30 blur-lg"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl octwave-gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-xl transform group-hover:rotate-3 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-6 octwave-gradient-text">
                  Workshops
                </h3>
                <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full"></div>
                <div className="grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
                  <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-black/30 dark:to-black/10 rounded-xl p-4 border border-white/30 dark:border-white/20 hover:border-pink-300 dark:hover:border-pink-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Session 1
                    </h4>
                    <p className="text-sm text-black/80 dark:text-white/80">
                      Introduction to Machine Learning
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-black/30 dark:to-black/10 rounded-xl p-4 border border-white/30 dark:border-white/20 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Session 2
                    </h4>
                    <p className="text-sm text-black/80 dark:text-white/80">
                      Building models and handling time series data
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-black/30 dark:to-black/10 rounded-xl p-4 border border-white/30 dark:border-white/20 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Session 3
                    </h4>
                    <p className="text-sm text-black/80 dark:text-white/80">
                      About data engineering
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/20 to-white/5 dark:from-black/30 dark:to-black/10 rounded-xl p-4 border border-white/30 dark:border-white/20 hover:border-indigo-300 dark:hover:border-indigo-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <h4 className="font-semibold text-black dark:text-white mb-2">
                      Session 4
                    </h4>
                    <p className="text-sm text-black/80 dark:text-white/80">
                      Introduction to Kaggle platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Competition */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative card p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/90 dark:bg-black/80 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 octwave-gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-pink-400/25 to-purple-600/25 blur-lg"></div>
              <div className="absolute bottom-4 left-4 w-14 h-14 rounded-full bg-gradient-to-br from-purple-400/20 to-indigo-600/20 blur-xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl octwave-gradient-bg flex items-center justify-center text-2xl font-bold text-white shadow-xl transform group-hover:rotate-3 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-6 octwave-gradient-text">
                  Competition
                </h3>
                <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full"></div>
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-gradient-to-br from-white/25 to-white/10 dark:from-black/40 dark:to-black/20 rounded-xl p-6 border border-white/30 dark:border-white/20 hover:border-pink-300 dark:hover:border-pink-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-md">
                        📝
                      </div>
                      <h4 className="text-lg font-bold text-black dark:text-white">
                        Team Registration (Online)
                      </h4>
                    </div>
                    <p className="text-sm text-black/80 dark:text-white/90">
                      Teams will register with all required details to
                      officially enter the competition.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/25 to-white/10 dark:from-black/40 dark:to-black/20 rounded-xl p-6 border border-white/30 dark:border-white/20 hover:border-purple-300 dark:hover:border-purple-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-md">
                        💻
                      </div>
                      <h4 className="text-lg font-bold text-black dark:text-white">
                        Preliminary Round (Online)
                      </h4>
                    </div>
                    <p className="text-sm text-black/80 dark:text-white/90">
                      A Kaggle competition where the Top 10 teams will be
                      selected based on the private leaderboard.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-white/25 to-white/10 dark:from-black/40 dark:to-black/20 rounded-xl p-6 border border-white/30 dark:border-white/20 hover:border-indigo-300 dark:hover:border-indigo-400 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-xl octwave-gradient-bg flex items-center justify-center text-sm font-bold text-white shadow-md">
                        🏆
                      </div>
                      <h4 className="text-lg font-bold text-black dark:text-white">
                        Final Round (Physical)
                      </h4>
                    </div>
                    <p className="text-sm text-black/80 dark:text-white/90">
                      The Top 10 finalist teams will compete at the University
                      of Moratuwa. A new problem statement and dataset will be
                      provided, and teams must submit their working code,
                      report, and presentation. Final presentations will be
                      judged, followed by the awarding ceremony.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline">
        <VectorTimeline />
      </section>

      {/* Prizes */}
      <PrizeSection />

      {/* Rules Section */}
      <section id="rules" className="section pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">
            General Rules for the Kaggle Competition (Round 1)
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80 max-w-2xl mx-auto">
            Guidelines and regulations for fair competition
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Eligibility */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  👥
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Eligibility
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Only officially registered participants are allowed to
                    compete.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    All team members must belong to the same university.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Team Formation */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  🤝
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Team Formation
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>Teams must consist of 2 to 4 members.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Each team must have a Team Leader who will create the team
                    on Kaggle.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Team members should join through the invitation link from
                    the leader.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Team names must follow the format: (example:
                    T05_DataWizards).
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Submissions */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  📝
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Submissions
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Each team can make a maximum of 8 submissions per day.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Teams must select up to 2 final submissions for evaluation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    If fewer than 2 are selected, Kaggle will auto-select the
                    best public score.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Final ranking will be based on the Private Leaderboard
                    score.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Usage */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  💾
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Data Usage
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Competition data may be used only for this competition.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Sharing, publishing, duplicating, or redistributing the data
                    outside the team is prohibited.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Teams must ensure no unauthorized access to the competition
                    data.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Code & Solution Sharing */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  💻
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Code & Solution Sharing
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Sharing code, solutions, or data between teams or publicly
                    is strictly prohibited.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>All work must be original to the team.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Evaluation & Advancement */}
          <div className="card p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 border-transparent hover:border-white/20 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  🏆
                </div>
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Evaluation & Advancement
                </h3>
              </div>
              <ul className="space-y-2 text-black/80 dark:text-white/90">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>
                    Rankings will be based on the Private Leaderboard score.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg mt-2 flex-shrink-0"></span>
                  <span>The Top 10 teams will qualify for the next round.</span>
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
                <h3 className="text-xl font-bold octwave-gradient-text">
                  Evaluation Criteria
                </h3>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold octwave-gradient-text mb-4">
            📞 Contact Us
          </h2>
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <p className="text-black/80 dark:text-white/90">
              <strong>Renulucshmi Prakasan</strong> (Co-chair - OctWave 2.0):
              <a
                href="tel:+94754350533"
                className="octwave-gradient-text font-semibold ml-2"
              >
                +94754350533
              </a>
            </p>
            <p className="text-black/80 dark:text-white/90">
              <strong>Rashmitha Hansamal</strong> (Co-chair - OctWave 2.0):
              <a
                href="tel:+94776057351"
                className="octwave-gradient-text font-semibold ml-2"
              >
                +94776057351
              </a>
            </p>
            <p className="text-black/80 dark:text-white/90">
              <strong>Abinaya Subramaniam</strong> (Co-chair - OctWave 2.0):
              <a
                href="tel:+94763885326"
                className="octwave-gradient-text font-semibold ml-2"
              >
                +94763885326
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="section pb-24">
        <div className="group relative">
          {/* Background gradient blur */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

          {/* Main card */}
          <div className="relative card p-8 md:p-12 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/90 dark:bg-black/80 rounded-2xl overflow-hidden">
            {/* Animated background overlay */}
            <div className="absolute inset-0 octwave-gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl"></div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-600/20 blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-600/30 blur-lg"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold bg-gradient-to-r from-pink-400/20 via-purple-500/20 to-indigo-500/20 text-transparent bg-clip-text octwave-gradient-text ring-1 ring-white/20 dark:ring-white/10 mb-6">
                <span className="text-2xl">🚀</span>
                <span>Join the Competition</span>
              </div>

              {/* Main heading */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold octwave-gradient-text mb-4">
                Ready to ride the Octwave 2.0?
              </h3>

              {/* Gradient divider */}
              <div className="w-24 h-1 mx-auto mb-4 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full"></div>

              {/* Description */}
              <p className="text-base sm:text-lg text-black/80 dark:text-white/90 max-w-md mx-auto mb-8 leading-relaxed">
                Register your team and start building innovative AI/ML solutions
                that solve real industry problems.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  className="btn-primary text-base px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  href="/register"
                >
                  🎯 Register Your Team
                </a>
                <a
                  className="btn-ghost text-base px-6 py-3 font-medium"
                  href="#event-structure"
                >
                  Learn More
                </a>
              </div>

              {/* Stats or additional info */}
              <div className="mt-8 flex items-center justify-center gap-8 text-sm text-black/60 dark:text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg"></span>
                  <span>Team-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg"></span>
                  <span>$1,600+ Prizes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full octwave-gradient-bg"></span>
                  <span>Real Industry Problems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
