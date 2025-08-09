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
}

// Deterministic particle positions to avoid hydration mismatch
const particleConfigs = [
  { left: 64.59, top: 57.02, color: 'var(--octwave-from)', delay: 2.56, duration: 3.73 },
  { left: 9.79, top: 35.13, color: 'var(--octwave-via)', delay: 0.71, duration: 2.29 },
  { left: 12.92, top: 0.34, color: 'var(--octwave-to)', delay: 2.27, duration: 3.74 },
  { left: 85.21, top: 78.45, color: 'var(--octwave-from)', delay: 1.32, duration: 2.88 },
  { left: 33.67, top: 92.12, color: 'var(--octwave-via)', delay: 0.89, duration: 3.15 },
  { left: 72.14, top: 23.89, color: 'var(--octwave-to)', delay: 1.95, duration: 2.67 },
  { left: 18.45, top: 65.34, color: 'var(--octwave-from)', delay: 0.45, duration: 3.42 },
  { left: 91.23, top: 12.67, color: 'var(--octwave-via)', delay: 2.78, duration: 2.91 },
  { left: 45.78, top: 88.21, color: 'var(--octwave-to)', delay: 1.67, duration: 3.28 },
  { left: 67.89, top: 45.67, color: 'var(--octwave-from)', delay: 0.23, duration: 2.54 },
  { left: 23.45, top: 71.23, color: 'var(--octwave-via)', delay: 2.12, duration: 3.67 },
  { left: 89.12, top: 34.56, color: 'var(--octwave-to)', delay: 1.44, duration: 2.76 },
  { left: 56.78, top: 89.34, color: 'var(--octwave-from)', delay: 0.78, duration: 3.21 },
  { left: 12.34, top: 56.78, color: 'var(--octwave-via)', delay: 2.45, duration: 2.89 },
  { left: 78.90, top: 23.45, color: 'var(--octwave-to)', delay: 1.23, duration: 3.45 },
  { left: 34.56, top: 67.89, color: 'var(--octwave-from)', delay: 0.56, duration: 2.98 },
  { left: 90.12, top: 45.23, color: 'var(--octwave-via)', delay: 2.34, duration: 3.12 },
  { left: 45.67, top: 78.90, color: 'var(--octwave-to)', delay: 1.78, duration: 2.65 },
  { left: 67.34, top: 12.56, color: 'var(--octwave-from)', delay: 0.67, duration: 3.78 },
  { left: 23.78, top: 89.67, color: 'var(--octwave-via)', delay: 2.89, duration: 2.43 }
];

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: 'WEEK 01',
    title: 'Introductory session & Workshop session 01',
    
    color: 'var(--octwave-from)',
    glowColor: 'var(--octwave-from)',
    iconPath: 'M12 2L2 7V10C2 16 6 22 12 22S22 16 22 10V7L12 2Z',
    dataPoints: [95, 87, 92, 88, 94]
  },
  {
    id: 2,
    year: 'WEEK 02',
    title: 'Workshop session 02 & 03',
    
    color: 'var(--octwave-via)',
    glowColor: 'var(--octwave-via)',
    iconPath: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
    dataPoints: [89, 91, 85, 93, 90]
  },
  {
    id: 3,
    year: 'WEEK 03',
    title: 'Workshop session 04 & Team Registration (online)',
    
    color: 'var(--octwave-to)',
    glowColor: 'var(--octwave-to)',
    iconPath: 'M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z',
    dataPoints: [78, 82, 86, 91, 88]
  },
  {
    id: 4,
    year: 'WEEK 04',
    title: 'Preliminary Round (online)',
    
    color: 'var(--octwave-from)',
    glowColor: 'var(--octwave-from)',
    iconPath: 'M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z',
    dataPoints: [72, 75, 79, 84, 81]
  },
  {
    id: 5,
    year: 'WEEK 05 & 06',
    title: 'Final Round',
    
    color: 'var(--octwave-via)',
    glowColor: 'var(--octwave-via)',
    iconPath: 'M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z',
    dataPoints: [95, 98, 92, 96, 100]
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
      { threshold: 0.2 }
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
    <div className="min-h-screen overflow-hidden relative" >
     
      <style jsx>
        {`
        .rotate-circle {
          animation: rotateCircle 4s linear infinite;
          transform-origin: 40px 40px;
        }
        
        @keyframes rotateCircle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

    

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particleConfigs.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              transform: isMounted ? `translate(${Math.sin(time + i) * 20}px, ${Math.cos(time + i) * 20}px)` : 'translate(0px, 0px)',
              opacity: 0.6
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Glow */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-5 dark:opacity-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, var(--octwave-via) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="relative z-20 py-4 px-4">
        {/* Futuristic Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <h1 className="text-7xl font-bold octwave-gradient-text mb-6 ">
             Event Timeline
            </h1>
            
          </div>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="w-8 h-0.5" style={{background: `linear-gradient(to right, transparent, var(--octwave-via))`}}></div>
            <div className="text-purple-400 dark:text-purple-300 text-xs font-mono tracking-wider font-semibold">Octwave 2.0</div>
            <div className="w-8 h-0.5" style={{background: `linear-gradient(to left, transparent, var(--octwave-via))`}}></div>
          </div>
        </div>

        {/* Main Timeline Container */}
        <div className="max-w-7xl mx-auto relative">
          {/* Central Neural Network */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-4">
            <svg className="w-full h-full" viewBox="0 0 40 1000" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--octwave-from)" />
                  <stop offset="20%" stopColor="var(--octwave-via)" />
                  <stop offset="40%" stopColor="var(--octwave-to)" />
                  <stop offset="60%" stopColor="var(--octwave-from)" />
                  <stop offset="80%" stopColor="var(--octwave-via)" />
                  <stop offset="100%" stopColor="var(--octwave-to)" />
                </linearGradient>
                <filter id="neuralGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Main Neural Path */}
              <path
                d="M20,0 Q30,100 20,200 Q10,300 20,400 Q30,500 20,600 Q10,700 20,800 Q30,900 20,1000"
                stroke="url(#neuralGradient)"
                strokeWidth="6"
                fill="none"
                filter="url(#neuralGlow)"
              />
              
              {/* Neural Synapses */}
              {[...Array(50)].map((_, i) => (
                <circle
                  key={i}
                  cx="20"
                  cy={i * 20}
                  r="1"
                  fill="var(--octwave-via)"
                  opacity="0.8"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                data-timeline-item
                data-id={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group`}
              >
                {/* Timeline Card */}
                {/* Holographic Event Container */}
                <div
                  className={`w-5/12 transform transition-all duration-1000 ${
                    visibleItems.includes(event.id)
                      ? 'translate-x-0 opacity-100 scale-100'
                      : index % 2 === 0
                      ? '-translate-x-16 opacity-0 scale-95'
                      : 'translate-x-16 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="relative">
                    <svg
                      className={`w-full h-30 sm:h-40 ${index % 2 === 0 ? 'ml-0' : 'mr-12'}`}
                      viewBox="0 0 400 130"
                    >
                      <defs>
                        <linearGradient id={`hologram-${event.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={event.color} stopOpacity="0.05" />
                          <stop offset="50%" stopColor={event.color} stopOpacity="0.15" />
                          <stop offset="100%" stopColor={event.color} stopOpacity="0.05" />
                        </linearGradient>
                        <filter id={`hologramGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <pattern id={`scanlines-${event.id}`} patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="2" fill={event.color} opacity="0.05"/>
                          <rect y="2" width="4" height="2" fill="transparent"/>
                        </pattern>
                      </defs>
                      
                      {/* Holographic Container - Desktop */}
                      <path
                        className="hidden sm:block transform transition-all duration-500 group-hover:scale-105"
                        d={index % 2 === 0 
                          ? "M40,20 L320,20 L340,40 L320,110 L40,110 L20,90 L20,40 Z"
                          : "M360,20 L80,20 L60,40 L80,110 L360,110 L380,90 L380,40 Z"
                        }
                        fill={`url(#hologram-${event.id})`}
                        stroke={event.color}
                        strokeWidth="2"
                        filter={`url(#hologramGlow-${event.id})`}
                      />
                      
                      {/* Holographic Container - Mobile */}
                      <path
                        className="block sm:hidden transform transition-all duration-500 group-hover:scale-105"
                        d={index % 2 === 0 
                          ? "M40,0 L320,0 L340,20 L320,220 L40,220 L20,200 L20,20 Z"
                          : "M360,0 L80,0 L60,20 L80,220 L360,220 L380,200 L380,20 Z"
                        }
                        fill={`url(#hologram-${event.id})`}
                        stroke={event.color}
                        strokeWidth="2"
                        filter={`url(#hologramGlow-${event.id})`}
                      />
                      
                      {/* Scanlines Effect */}
                      <path
                        d={index % 2 === 0 
                          ? "M40,20 L320,20 L340,40 L320,110 L40,110 L20,90 L20,40 Z"
                          : "M360,20 L80,20 L60,40 L80,110 L360,110 L380,90 L380,40 Z"
                        }
                        fill={`url(#scanlines-${event.id})`}
                        opacity="0.3"
                      />
                      
                      {/* Holographic Icon */}
                      <g transform={`translate(${index % 2 === 0 ? '30' : '340'}, 35)`}>
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="15" 
                          fill="none"
                          stroke={event.color}
                          strokeWidth="1.5"
                          filter={`url(#hologramGlow-${event.id})`}
                        />
                        <circle 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          fill={event.color}
                          fillOpacity="0.1"
                          className="animate-pulse"
                        />
                        <svg x="4" y="4" width="16" height="16" viewBox="0 0 24 24" fill={event.color}>
                          <path d={event.iconPath} />
                        </svg>
                      </g>
                      
                      {/* Content */}
                      <foreignObject 
                        x={index % 2 === 0 ? "70" : "100"} 
                        y="30" 
                        width="230" 
                        height="170"
                      >
                        <div className="text-gray-800 dark:text-gray-200 p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <div className={`w-1 h-1 rounded-full animate-pulse`} style={{backgroundColor: event.color}}></div>
                            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 tracking-wide font-semibold">#{event.id}</span>
                          </div>
                          <h3 className="text-3xl sm:text-sm font-bold mb-1 text-gray-900 dark:text-gray-100 leading-tight">
                            {event.title}
                          </h3>
                          {/* <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight">
                            {event.description}
                          </p> */}
                        </div>
                      </foreignObject>
                    </svg>
                  </div>
                </div>

                {/* Central Neural Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-30">
                  <div 
                    className={`relative transform transition-all duration-700 ${
                      visibleItems.includes(event.id) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                    }`}
                    style={{ transitionDelay: `${index * 300 + 200}ms` }}
                  >
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <defs>
                        <radialGradient id={`nodeGradient-${event.id}`} cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="white" className="dark:[stop-color:theme(colors.gray.800)]" />
                          <stop offset="30%" stopColor={event.color} stopOpacity="0.3" />
                          <stop offset="70%" stopColor={event.color} stopOpacity="0.1" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <filter id={`nodeGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Outer Ring - Fixed Animation */}
                      <circle
                        cx="30"
                        cy="30"
                        r="26"
                        fill="none"
                        stroke={event.color}
                        strokeWidth="1.5"
                        strokeDasharray="6,3"
                        filter={`url(#nodeGlow-${event.id})`}
                        className="rotate-circle"
                        style={{transformOrigin: '30px 30px'}}
                      />
                      
                      {/* Inner Core */}
                      <circle
                        cx="30"
                        cy="30"
                        r="20"
                        fill={`url(#nodeGradient-${event.id})`}
                        stroke={event.color}
                        strokeWidth="1.5"
                        filter={`url(#nodeGlow-${event.id})`}
                        className="animate-pulse"
                      />
                      
                      {/* Year Display */}
                      <text
                        x="30"
                        y="26"
                        textAnchor="middle"
                        className="text-xs font-mono font-bold"
                        fill={event.color}
                      >
                        {event.year}
                      </text>
                      
                      {/* ID Display */}
                      <text
                        x="30"
                        y="36"
                        textAnchor="middle"
                        className="text-sm font-bold fill-gray-800 dark:fill-gray-200"
                      >
                        {event.id}
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Neural Connection - Fixed positioning */}
                <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2">
                  <div className={`${index % 2 === 0 ? '-translate-x-full' : 'translate-x-0'}`}>
                    <svg width="120" height="6" viewBox="0 0 120 6">
                      <defs>
                        <linearGradient id={`connection-${event.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={event.color} stopOpacity="0" />
                          <stop offset="50%" stopColor={event.color} stopOpacity="0.8" />
                          <stop offset="100%" stopColor={event.color} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,3 Q30,0 60,3 Q90,6 120,3"
                        stroke={`url(#connection-${event.id})`}
                        strokeWidth="4"
                        fill="none"
                        className={`transform transition-all duration-700 ${
                          visibleItems.includes(event.id) ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{ 
                          transformOrigin: index % 2 === 0 ? 'right' : 'left',
                          transitionDelay: `${index * 300 + 400}ms`,
                          filter: `drop-shadow(0 0 6px ${event.color})`
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