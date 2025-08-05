'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Brain, Shield, Globe, Users, Settings, Database } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How does neural-link consciousness transfer work?",
    answer: "Our consciousness transfer protocol utilizes quantum entanglement matrices to seamlessly migrate cognitive patterns across dimensional barriers. The process involves neural pathway mapping, synaptic reconstruction, and memory crystallization through our proprietary bio-digital interface.",
    icon: <Brain className="w-5 h-5" />,
    category: "Neural Tech"
  },
  {
    id: 2,
    question: "What are the biometric security protocols?",
    answer: "We employ multi-dimensional biometric scanning including DNA sequencing, brainwave patterns, quantum signature analysis, and temporal fingerprinting. Our AI continuously evolves security measures using predictive threat modeling and dimensional encryption.",
    icon: <Shield className="w-5 h-5" />,
    category: "Security"
  },
  {
    id: 3,
    question: "How do holographic workspaces function?",
    answer: "Holographic workspaces utilize photonic matter manipulation and spatial computing algorithms. Users interact through gesture recognition, thought-pattern interfaces, and haptic feedback systems that create tangible digital experiences in three-dimensional space.",
    icon: <Globe className="w-5 h-5" />,
    category: "Workspace"
  },
  {
    id: 4,
    question: "Can AI entities collaborate with humans?",
    answer: "Our sentient AI companions possess adaptive personality matrices and emotional intelligence algorithms. They can form genuine collaborative relationships, learn from human creativity, and contribute unique perspectives through their quantum processing capabilities.",
    icon: <Users className="w-5 h-5" />,
    category: "AI Synergy"
  },
  {
    id: 5,
    question: "How do I customize my digital avatar?",
    answer: "Avatar customization occurs through neural pattern scanning and personality profiling. Our system generates photorealistic representations that evolve based on your thoughts, emotions, and behavioral patterns, creating a truly authentic digital self.",
    icon: <Settings className="w-5 h-5" />,
    category: "Avatar"
  },
  {
    id: 6,
    question: "What happens during system consciousness backup?",
    answer: "Consciousness backup involves creating quantum snapshots of your neural patterns, memories, and personality constructs. These are stored in crystalline data matrices that exist across multiple dimensional planes for ultimate preservation.",
    icon: <Database className="w-5 h-5" />,
    category: "Backup"
  }
];

export default function NeuralInterfaceFAQ() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-faq-id') || '0');
            setVisibleItems(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-faq-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="relative overflow-hidden py-20">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 39, 124, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 39, 124, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-drift 20s linear infinite'
          }}
        />
      </div>

      {/* Floating Energy Orbs */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `radial-gradient(circle, ${['var(--octwave-from)', 'var(--octwave-via)', 'var(--octwave-to)'][i % 3]} 0%, transparent 70%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Glow */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-30 hidden dark:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, var(--octwave-via) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transition: 'all 0.2s ease-out'
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card mb-8">
            <span className="text-2xl">🤖</span>
            <span className="text-sm font-semibold octwave-gradient-text">Neural Interface</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="octwave-gradient-text drop-shadow-lg">
              Frequently Asked Questions
            </span>
          </h1>
          
          <p className="text-lg text-black/70 dark:text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover the secrets of our advanced neural technology and quantum computing systems
          </p>
        </div>

        {/* Enhanced FAQ Grid */}
        <div className="max-w-5xl mx-auto space-y-6">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              data-faq-id={item.id}
              className={`group relative overflow-hidden glass-card hover:scale-[1.02] transition-all duration-500 ${
                visibleItems.has(item.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              
              {/* Animated Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm" />
              
              {/* Question Button */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-8 text-left flex items-center gap-6 relative z-10 group-hover:bg-white/5 transition-all duration-300"
              >
                
                {/* Enhanced 3D Icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl backdrop-blur-sm border border-white/10">
                    {item.icon}
                    {/* Icon Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-pink-500/20 blur-md group-hover:bg-pink-500/30 transition-all duration-300" />
                  </div>
                  
                  {/* Floating Particles around Icon */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-ping opacity-75 hidden dark:block" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-pulse hidden dark:block" />
                </div>

                {/* Enhanced Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold px-4 py-2 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-300 border border-gray-600/30 shadow-lg backdrop-blur-sm">
                      {item.category}
                    </span>
                    <div className="flex gap-1">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse hidden dark:block"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-purple-300 group-hover:bg-clip-text transition-all duration-300">
                    {item.question}
                  </h3>
                </div>

                {/* Enhanced 3D Chevron */}
                <div className={`flex-shrink-0 text-gray-400 transition-all duration-500 transform group-hover:text-pink-400 group-hover:scale-125 ${
                  activeItem === item.id ? 'rotate-180 text-pink-400 scale-125' : ''
                }`}>
                  <ChevronDown className="w-6 h-6 drop-shadow-lg" />
                </div>
              </button>

              {/* Enhanced Answer Panel */}
              <div className={`overflow-hidden transition-all duration-700 ease-out ${
                activeItem === item.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8">
                  <div className="pl-16 pt-4 relative">
                    {/* Animated Connection Line */}
                    <div className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-pink-400 via-purple-400 to-indigo-400 rounded-full hidden dark:block">
                      <div className="absolute inset-0 bg-gradient-to-b from-pink-400 to-purple-400 blur-sm animate-pulse" />
                    </div>
                    
                    {/* Answer Content with Glass Effect */}
                    <div className="glass-card p-6 relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div 
                          className="w-full h-full"
                          style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, var(--octwave-via) 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                          }}
                        />
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed relative z-10 text-base">
                        {item.answer}
                      </p>
                      
                      {/* Decorative Elements */}
                      <div className="absolute top-4 right-4 text-pink-400/30 text-2xl animate-spin-slow">
                        ⚡
                      </div>
                      <div className="absolute bottom-4 left-4 text-purple-400/30 text-lg animate-bounce">
                        ◊
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Glow Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl hidden dark:block" />
              
              {/* Magical Sparkles on Hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-pink-400/60 animate-ping"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      fontSize: '8px'
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card">
            <span className="text-sm text-gray-400">Powered by</span>
            <span className="octwave-gradient-text font-bold">Neural Quantum Technology</span>
            <span className="text-lg animate-pulse">🧬</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes grid-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}