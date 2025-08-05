'use client'
import React, { useEffect, useState } from 'react';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  color: string;
  glowColor: string;
  iconPath: string;
  dataPoints: number[];
  emoji: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2024',
    title: 'Neural Network Integration',
    color: 'var(--octwave-from)',
    glowColor: 'var(--octwave-from)',
    iconPath: 'M12 2L2 7V10C2 16 6 22 12 22S22 16 22 10V7L12 2Z',
    dataPoints: [95, 87, 92, 88, 94],
    emoji: '🧠'
  },
  {
    id: 2,
    year: '2023',
    title: 'Holographic Interface Launch',
    color: 'var(--octwave-via)',
    glowColor: 'var(--octwave-via)',
    iconPath: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z',
    dataPoints: [89, 91, 85, 93, 90],
    emoji: '🌐'
  },
  {
    id: 3,
    year: '2022',
    title: 'Quantum Leap Protocol',
    color: 'var(--octwave-to)',
    glowColor: 'var(--octwave-to)',
    iconPath: 'M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z',
    dataPoints: [78, 82, 86, 91, 88],
    emoji: '⚡'
  },
  {
    id: 4,
    year: '2021',
    title: 'Cybernetic Enhancement',
    color: 'var(--octwave-from)',
    glowColor: 'var(--octwave-from)',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z',
    dataPoints: [72, 75, 79, 84, 81],
    emoji: '🚀'
  },
];

const VectorTimeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    const elements = document.querySelectorAll('[data-timeline-item]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, [isMounted]);

  return (
    <div className="min-h-screen overflow-hidden relative py-20">
      
      <style jsx>
        {`
        .rotate-circle {
          animation: rotateCircle 6s linear infinite;
          transform-origin: 30px 30px;
        }
        
        @keyframes rotateCircle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes data-flow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .data-flow-animation {
          stroke-dasharray: 20 5;
          animation: data-flow 3s linear infinite;
        }

        @keyframes hologram-flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .hologram-flicker {
          animation: hologram-flicker 2s ease-in-out infinite;
        }

        @keyframes magical-float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(8px) rotate(240deg);
          }
        }

        .magical-float {
          animation: magical-float 4s ease-in-out infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Enhanced Background Effects - Dark Mode */}
      <div className="absolute inset-0 pointer-events-none hidden dark:block">
        {/* Quantum Field Lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`field-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
            style={{
              top: `${i * 5}%`,
              left: '0',
              right: '0',
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${Math.sin(time + i) * 2}deg)`,
              opacity: Math.sin(time + i) * 0.3 + 0.3
            }}
          />
        ))}

        {/* Floating Data Crystals */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`crystal-${i}`}
            className="absolute w-2 h-2 magical-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 rounded-sm rotate-45 opacity-60 shadow-lg" 
                 style={{ 
                   boxShadow: `0 0 10px ${['#c9277c', '#8c2da5', '#3e34bb'][i % 3]}` 
                 }} />
          </div>
        ))}

        {/* Energy Pulses */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`pulse-${i}`}
            className="absolute rounded-full animate-ping"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              background: `radial-gradient(circle, ${['var(--octwave-from)', 'var(--octwave-via)', 'var(--octwave-to)'][i % 3]} 0%, transparent 70%)`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      {/* Light Mode High-Speed Blinking Balls */}
      <div className="absolute inset-0 pointer-events-none block dark:hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`pink-pulse-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + Math.sin(i) * 40}%`,
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              background: `radial-gradient(circle, #f472b6 0%, transparent 70%)`,
              animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
              animationDelay: `${i * 0.5}s`,
              opacity: 0.4
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Glow */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-20 hidden dark:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, var(--octwave-via) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="relative z-20 py-4 px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card mb-8">
            <span className="text-2xl magical-float">⏰</span>
            <span className="text-sm font-semibold octwave-gradient-text">Temporal Matrix</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black octwave-gradient-text mb-6 relative">
            Event Timeline
            {/* Floating decorations */}
            <div className="absolute -top-4 -right-4 text-2xl magical-float text-pink-400">✨</div>
            <div className="absolute -bottom-4 -left-4 text-xl magical-float text-purple-400" style={{ animationDelay: '1s' }}>💫</div>
          </h1>
          
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-400"></div>
            <div className="px-4 py-2 rounded-full glass-card">
              <span className="text-purple-400 text-sm font-mono tracking-wider font-bold">🌊 Octwave 2.0</span>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>

        {/* Enhanced Timeline Container */}
        <div className="max-w-7xl mx-auto relative">
          {/* Enhanced Central Neural Network */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-6">
            <svg className="w-full h-full" viewBox="0 0 60 1000" preserveAspectRatio="none">
              <defs>
                <linearGradient id="enhancedNeuralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--octwave-from)" stopOpacity="0.8" />
                  <stop offset="20%" stopColor="var(--octwave-via)" stopOpacity="1" />
                  <stop offset="40%" stopColor="var(--octwave-to)" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="var(--octwave-from)" stopOpacity="0.7" />
                  <stop offset="80%" stopColor="var(--octwave-via)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--octwave-to)" stopOpacity="0.8" />
                </linearGradient>
                <filter id="enhancedNeuralGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--octwave-from)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--octwave-via)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--octwave-to)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Main Neural Path */}
              <path
                d="M30,0 Q40,100 30,200 Q20,300 30,400 Q40,500 30,600 Q20,700 30,800 Q40,900 30,1000"
                stroke="url(#enhancedNeuralGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#enhancedNeuralGlow)"
              />
              
              {/* Data Flow Lines */}
              <path
                d="M30,0 Q35,100 30,200 Q25,300 30,400 Q35,500 30,600 Q25,700 30,800 Q35,900 30,1000"
                stroke="url(#dataFlowGradient)"
                strokeWidth="3"
                fill="none"
                className="data-flow-animation"
              />
              
              {/* Enhanced Neural Synapses */}
              {[...Array(40)].map((_, i) => (
                <g key={i}>
                  <circle
                    cx="30"
                    cy={i * 25}
                    r="2"
                    fill="var(--octwave-via)"
                    opacity="0.9"
                    className="animate-pulse"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '3s'
                    }}
                  />
                  <circle
                    cx="30"
                    cy={i * 25}
                    r="4"
                    fill="none"
                    stroke="var(--octwave-from)"
                    strokeWidth="1"
                    opacity="0.5"
                    className="animate-ping"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '4s'
                    }}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Enhanced Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                data-timeline-item
                data-id={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group`}
              >
                {/* Enhanced Holographic Event Container */}
                <div
                  className={`w-5/12 transform transition-all duration-1000 ${
                    visibleItems.includes(event.id)
                      ? 'translate-x-0 opacity-100 scale-100'
                      : index % 2 === 0
                      ? '-translate-x-20 opacity-0 scale-95'
                      : 'translate-x-20 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <div className="relative">
                    <svg 
                      className={`w-full h-48 ${index % 2 === 0 ? 'ml-0' : 'mr-16'}`} 
                      viewBox="0 0 450 160"
                    >
                      <defs>
                        <linearGradient id={`enhancedHologram-${event.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={event.color} stopOpacity="0.1" />
                          <stop offset="50%" stopColor={event.color} stopOpacity="0.25" />
                          <stop offset="100%" stopColor={event.color} stopOpacity="0.1" />
                        </linearGradient>
                        <filter id={`enhancedHologramGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <pattern id={`enhancedScanlines-${event.id}`} patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="2" fill={event.color} opacity="0.1"/>
                          <rect y="2" width="4" height="2" fill="transparent"/>
                        </pattern>
                      </defs>
                      
                      {/* Enhanced Holographic Container */}
                      <path
                        d={index % 2 === 0 
                          ? "M50,30 L370,30 L395,50 L370,130 L50,130 L25,110 L25,50 Z"
                          : "M400,30 L80,30 L55,50 L80,130 L400,130 L425,110 L425,50 Z"
                        }
                        fill={`url(#enhancedHologram-${event.id})`}
                        stroke={event.color}
                        strokeWidth="2"
                        filter={`url(#enhancedHologramGlow-${event.id})`}
                        className="hologram-flicker group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Enhanced Scanlines */}
                      <path
                        d={index % 2 === 0 
                          ? "M50,30 L370,30 L395,50 L370,130 L50,130 L25,110 L25,50 Z"
                          : "M400,30 L80,30 L55,50 L80,130 L400,130 L425,110 L425,50 Z"
                        }
                        fill={`url(#enhancedScanlines-${event.id})`}
                        opacity="0.4"
                      />
                      
                      {/* Enhanced Holographic Icon */}
                      <g transform={`translate(${index % 2 === 0 ? '40' : '380'}, 45)`}>
                        <circle 
                          cx="15" 
                          cy="15" 
                          r="20" 
                          fill="none"
                          stroke={event.color}
                          strokeWidth="2"
                          filter={`url(#enhancedHologramGlow-${event.id})`}
                          className="animate-pulse"
                        />
                        <circle 
                          cx="15" 
                          cy="15" 
                          r="15" 
                          fill={event.color}
                          fillOpacity="0.15"
                          className="animate-pulse"
                          style={{ animationDuration: '2s' }}
                        />
                        
                        {/* Emoji Icon */}
                        <text 
                          x="15" 
                          y="20" 
                          textAnchor="middle" 
                          fontSize="16"
                          className="magical-float"
                        >
                          {event.emoji}
                        </text>
                        
                        {/* Floating Particles */}
                        <circle cx="5" cy="5" r="1" fill={event.color} opacity="0.8" className="animate-ping" />
                        <circle cx="25" cy="25" r="1" fill={event.color} opacity="0.6" className="animate-pulse" />
                      </g>
                      
                      {/* Enhanced Content */}
                      <foreignObject 
                        x={index % 2 === 0 ? "90" : "120"} 
                        y="45" 
                        width="200" 
                        height="100"
                      >
                        <div className="text-gray-800 dark:text-gray-200 p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse`} style={{backgroundColor: event.color}}></div>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 tracking-wide font-bold">
                              Phase #{event.id}
                            </span>
                            <div className="text-xs">✨</div>
                          </div>
                          <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white leading-relaxed break-words">
                            {event.title}
                          </h3>
                          {/* Mini Progress Bar */}
                          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: visibleItems.includes(event.id) ? '100%' : '0%',
                                background: `linear-gradient(90deg, ${event.color}, var(--octwave-via))`,
                                transitionDelay: `${index * 400 + 500}ms`
                              }}
                            />
                          </div>
                        </div>
                      </foreignObject>
                    </svg>
                  </div>
                </div>

                {/* Enhanced Central Neural Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                  <div 
                    className={`relative transform transition-all duration-1000 ${
                      visibleItems.includes(event.id) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`}
                    style={{ transitionDelay: `${index * 400 + 200}ms` }}
                  >
                    <svg width="80" height="80" viewBox="0 0 80 80">
                      <defs>
                        <radialGradient id={`enhancedNodeGradient-${event.id}`} cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="white" className="dark:[stop-color:theme(colors.gray.800)]" />
                          <stop offset="30%" stopColor={event.color} stopOpacity="0.4" />
                          <stop offset="70%" stopColor={event.color} stopOpacity="0.2" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <filter id={`enhancedNodeGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Outer Energy Ring */}
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke={event.color}
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        filter={`url(#enhancedNodeGlow-${event.id})`}
                        className="rotate-circle"
                        opacity="0.7"
                      />
                      
                      {/* Middle Ring */}
                      <circle
                        cx="40"
                        cy="40"
                        r="28"
                        fill="none"
                        stroke={event.color}
                        strokeWidth="1"
                        strokeDasharray="4,2"
                        className="rotate-circle"
                        style={{
                          animationDirection: 'reverse',
                          animationDuration: '8s'
                        }}
                        opacity="0.5"
                      />
                      
                      {/* Inner Core */}
                      <circle
                        cx="40"
                        cy="40"
                        r="22"
                        fill={`url(#enhancedNodeGradient-${event.id})`}
                        stroke={event.color}
                        strokeWidth="2"
                        filter={`url(#enhancedNodeGlow-${event.id})`}
                        className="animate-pulse"
                      />
                      
                      {/* Year Display */}
                      <text
                        x="40"
                        y="36"
                        textAnchor="middle"
                        className="text-sm font-mono font-bold"
                        fill={event.color}
                      >
                        {event.year}
                      </text>
                      
                      {/* ID Display */}
                      <text
                        x="40"
                        y="48"
                        textAnchor="middle"
                        className="text-lg font-bold fill-gray-800 dark:fill-gray-200"
                      >
                        {event.id}
                      </text>

                      {/* Magical Sparkles */}
                      <text x="25" y="25" className="text-xs magical-float" fill={event.color}>✨</text>
                      <text x="55" y="55" className="text-xs magical-float" fill={event.color} style={{ animationDelay: '1s' }}>💫</text>
                    </svg>
                  </div>
                </div>

                {/* Enhanced Neural Connection */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2">
                  <div className={`${index % 2 === 0 ? '-translate-x-full' : 'translate-x-0'}`}>
                    <svg width="140" height="8" viewBox="0 0 140 8">
                      <defs>
                        <linearGradient id={`enhancedConnection-${event.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={event.color} stopOpacity="0" />
                          <stop offset="20%" stopColor={event.color} stopOpacity="0.6" />
                          <stop offset="50%" stopColor="var(--octwave-via)" stopOpacity="1" />
                          <stop offset="80%" stopColor={event.color} stopOpacity="0.6" />
                          <stop offset="100%" stopColor={event.color} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,4 Q35,0 70,4 Q105,8 140,4"
                        stroke={`url(#enhancedConnection-${event.id})`}
                        strokeWidth="6"
                        fill="none"
                        className={`transform transition-all duration-1000 ${
                          visibleItems.includes(event.id) ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ 
                          transformOrigin: index % 2 === 0 ? 'right' : 'left',
                          transitionDelay: `${index * 400 + 600}ms`,
                          filter: `drop-shadow(0 0 8px ${event.color})`
                        }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VectorTimeline;