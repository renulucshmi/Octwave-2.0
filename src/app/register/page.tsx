"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(102, 126, 234, 0.6);
          }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-indigo-400/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Main Icon */}
        <div className="float-animation mb-8">
          <div className="w-32 h-32 mx-auto rounded-full octwave-gradient-bg pulse-glow flex items-center justify-center text-4xl text-white shadow-2xl">
            🚧
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold octwave-gradient-text mb-6">
          Registration Portal
        </h1>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-800 mb-8">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          Under Development
        </div>

        {/* Description */}
        <div className="space-y-4 mb-12">
          <p className="text-xl sm:text-2xl text-black/80 dark:text-white/90 leading-relaxed">
            We're building something amazing! 🎯
          </p>
          <p className="text-lg text-black/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed">
            Our registration portal is currently under development. Soon you'll be able to register your team, 
            submit your details, and join the Octwave 2.0 competition with ease.
          </p>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12 max-w-4xl mx-auto">
          <div className="card p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full octwave-gradient-bg flex items-center justify-center text-white text-xl">
              👥
            </div>
            <h3 className="text-lg font-semibold mb-2 octwave-gradient-text">Team Registration</h3>
            <p className="text-sm text-black/70 dark:text-white/80">
              Register your team of 2-4 members
            </p>
          </div>

          <div className="card p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full octwave-gradient-bg flex items-center justify-center text-white text-xl">
              📝
            </div>
            <h3 className="text-lg font-semibold mb-2 octwave-gradient-text">Easy Forms</h3>
            <p className="text-sm text-black/70 dark:text-white/80">
              Simple and intuitive registration forms
            </p>
          </div>

          <div className="card p-6 text-center hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full octwave-gradient-bg flex items-center justify-center text-white text-xl">
              ⚡
            </div>
            <h3 className="text-lg font-semibold mb-2 octwave-gradient-text">Instant Confirmation</h3>
            <p className="text-sm text-black/70 dark:text-white/80">
              Get immediate registration confirmation
            </p>
          </div>
        </div>

        {/* Timeline Information */}
        <div className="card p-8 mb-12 bg-white/10 dark:bg-black/20 backdrop-blur-sm border-2 border-white/20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full octwave-gradient-bg flex items-center justify-center text-white font-bold">
              📅
            </div>
            <h3 className="text-xl font-bold octwave-gradient-text">Expected Launch</h3>
          </div>
          <p className="text-lg text-black/80 dark:text-white/90 mb-4">
            Registration portal will be available soon!
          </p>
          <p className="text-sm text-black/70 dark:text-white/80">
            Stay tuned to our social media channels for updates on the registration opening.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link 
            href="/" 
            className="btn-primary text-base px-8 py-4 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              ← Back to Home
            </span>
          </Link>
          
          <button 
            disabled
            className="btn-ghost text-base px-8 py-4 opacity-50 cursor-not-allowed"
          >
            Register Team (Coming Soon)
          </button>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <p className="text-sm text-black/60 dark:text-white/60 mb-2">
            Questions about registration?
          </p>
          <p className="text-sm text-black/70 dark:text-white/80">
            Contact us: <span className="octwave-gradient-text font-semibold">octwave@ieee.lk</span>
          </p>
        </div>
      </div>

      {/* Floating particles for visual appeal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full octwave-gradient-bg opacity-30 animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
