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

export default function ModernFuturisticFAQ() {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number, size: number, opacity: number}>>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.02,
      vy: (Math.random() - 0.5) * 0.02,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2
    }));
    setParticles(initialParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.vx + 100) % 100,
        y: (particle.y + particle.vy + 100) % 100,
        opacity: 0.2 + Math.sin(Date.now() * 0.001 + particle.id) * 0.3
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const toggleItem = (id: number) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" >
      
      {/* Animated Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              background: `linear-gradient(135deg, var(--octwave-from), var(--octwave-via), var(--octwave-to))`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(201, 39, 124, 0.5)`
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 39, 124, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 39, 124, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 transform-gpu perspective-1000">
            <span className="octwave-gradient-text drop-shadow-lg">
              Frequently Asked Questions
            </span>
          </h1>
         
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-lg border border-slate-800 hover:border-pink-500/50 transition-all duration-500 transform-gpu hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20"
              style={{
                transform: `perspective(1000px) rotateX(${Math.sin(index * 0.5) * 2}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              
              {/* 3D Depth Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-2xl transform translate-z-[-10px] group-hover:translate-z-[-5px] transition-transform duration-300" />
              
              {/* Question Button */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-6 text-left flex items-center gap-4 hover:bg-slate-800/40 transition-all duration-300 relative z-10"
              >
                
                {/* 3D Icon */}
                <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 text-pink-400 group-hover:from-pink-500/30 group-hover:to-purple-500/20 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                  {item.icon}
                  <div className="absolute inset-0 rounded-xl bg-pink-500/10 blur-md group-hover:bg-pink-500/20 transition-all duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 text-slate-300 border border-slate-600 shadow-inner">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-300 drop-shadow-sm">
                    {item.question}
                  </h3>
                </div>

                {/* 3D Chevron */}
                <div className={`flex-shrink-0 text-slate-400 transition-all duration-500 transform group-hover:text-pink-400 group-hover:scale-110 ${
                  activeItem === item.id ? 'rotate-180 text-pink-400' : ''
                }`}>
                  <ChevronDown className="w-5 h-5 drop-shadow-sm" />
                </div>
              </button>

              {/* Answer Panel with 3D effect */}
              <div className={`overflow-hidden transition-all duration-500 ease-out transform-gpu ${
                activeItem === item.id 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="pl-12 pt-2 border-l-2 border-gradient-to-b from-pink-500/40 to-purple-500/20 relative">
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-pink-400 to-purple-400 blur-sm" />
                    <p className="text-slate-300 leading-relaxed backdrop-blur-sm p-4 rounded-lg bg-slate-800/20 border border-slate-700/30 shadow-inner">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              
              {/* 3D Border highlight */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-pink-400/20 transition-all duration-300" />
            </div>
          ))}
        </div>       
      </div>
    </div>
  );
}