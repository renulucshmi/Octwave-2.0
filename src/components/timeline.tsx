'use client'
import React, { useEffect, useState } from 'react';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  iconPath: string;
  dataPoints: number[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: '2024',
    title: 'Neural Network Integration',
    description: 'Advanced AI consciousness merged with quantum computing infrastructure',
    color: '#00FFFF',
    glowColor: '#00FFFF',
    iconPath: 'M12 2L2 7V10C2 16 6 22 12 22S22 16 22 10V7L12 2Z',
    dataPoints: [95, 87, 92, 88, 94]
  },
  {
    id: 2,
    year: '2023',
    title: 'Holographic Interface Launch',
    description: 'Revolutionary 3D holographic user interfaces deployed across all platforms',
    color: '#FF00FF',
    glowColor: '#FF00FF',
    iconPath: 'M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z',
    dataPoints: [89, 91, 85, 93, 90]
  },
  {
    id: 3,
    year: '2022',
    title: 'Quantum Leap Protocol',
    description: 'Breakthrough in quantum communication enabling instant global connectivity',
    color: '#00FF00',
    glowColor: '#00FF00',
    iconPath: 'M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z',
    dataPoints: [78, 82, 86, 91, 88]
  },
  {
    id: 4,
    year: '2021',
    title: 'Cybernetic Enhancement',
    description: 'Human-machine interface technology revolutionizing productivity',
    color: '#FFD700',
    glowColor: '#FFD700',
    iconPath: 'M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z',
    dataPoints: [72, 75, 79, 84, 81]
  },
  {
    id: 5,
    year: '2020',
    title: 'Digital Consciousness',
    description: 'First successful upload of human consciousness to digital realm',
    color: '#FF4500',
    glowColor: '#FF4500',
    iconPath: 'M9 12L11 14L15 10M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12Z',
    dataPoints: [65, 68, 71, 76, 73]
  },
  {
    id: 6,
    year: '2019',
    title: 'Genesis Protocol',
    description: 'Foundation established for next-generation technological evolution',
    color: '#8A2BE2',
    glowColor: '#8A2BE2',
    iconPath: 'M12 2L2 7V10C2 16 6 22 12 22S22 16 22 10V7L12 2Z',
    dataPoints: [45, 52, 58, 63, 60]
  }
];

const VectorTimeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Add CSS for rotation animation */}
      <style jsx>{`
        .rotate-circle {
          animation: rotateCircle 4s linear infinite;
          transform-origin: 50px 50px;
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

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00FFFF" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <filter id="gridGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" filter="url(#gridGlow)"/>
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `translate(${Math.sin(time + i) * 20}px, ${Math.cos(time + i) * 20}px)`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Glow */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 opacity-10"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, #00FFFF 0%, transparent 70%)',
          filter: 'blur(40px)',
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="relative z-20 py-20 px-4">
        {/* Futuristic Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6 animate-pulse">
             Event Timeline
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-lg"></div>
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-cyan-400"></div>
            <div className="text-cyan-400 text-sm font-mono tracking-widest">Octwave 2.0</div>
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-cyan-400"></div>
          </div>
        </div>

        {/* Main Timeline Container */}
        <div className="max-w-7xl mx-auto relative">
          {/* Central Neural Network */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-4">
            <svg className="w-full h-full" viewBox="0 0 40 1000" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00FFFF" />
                  <stop offset="20%" stopColor="#FF00FF" />
                  <stop offset="40%" stopColor="#00FF00" />
                  <stop offset="60%" stopColor="#FFD700" />
                  <stop offset="80%" stopColor="#FF4500" />
                  <stop offset="100%" stopColor="#8A2BE2" />
                </linearGradient>
                <filter id="neuralGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
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
                  fill="#00FFFF"
                  opacity="0.6"
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
          <div className="space-y-40">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                data-timeline-item
                data-id={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } group`}
              >
                {/* Holographic Event Container */}
                <div
                  className={`w-5/12 transform transition-all duration-1000 ${
                    visibleItems.includes(event.id)
                      ? 'translate-x-0 opacity-100 scale-100'
                      : index % 2 === 0
                      ? '-translate-x-32 opacity-0 scale-95'
                      : 'translate-x-32 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <div className="relative">
                    <svg 
                      className={`w-full h-80 ${index % 2 === 0 ? 'ml-0' : 'mr-20'}`} 
                      viewBox="0 0 500 300"
                    >
                      <defs>
                        <linearGradient id={`hologram-${event.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={event.color} stopOpacity="0.1" />
                          <stop offset="50%" stopColor={event.color} stopOpacity="0.3" />
                          <stop offset="100%" stopColor={event.color} stopOpacity="0.1" />
                        </linearGradient>
                        <filter id={`hologramGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <pattern id={`scanlines-${event.id}`} patternUnits="userSpaceOnUse" width="4" height="4">
                          <rect width="4" height="2" fill={event.color} opacity="0.1"/>
                          <rect y="2" width="4" height="2" fill="transparent"/>
                        </pattern>
                      </defs>
                      
                      {/* Holographic Container */}
                      <path
                        d={index % 2 === 0 
                          ? "M80,50 L400,50 L450,100 L400,250 L80,250 L30,200 L30,100 Z"
                          : "M420,50 L100,50 L50,100 L100,250 L420,250 L470,200 L470,100 Z"
                        }
                        fill={`url(#hologram-${event.id})`}
                        stroke={event.color}
                        strokeWidth="2"
                        filter={`url(#hologramGlow-${event.id})`}
                        className="transform transition-all duration-500 group-hover:scale-105"
                      />
                      
                      {/* Scanlines Effect */}
                      <path
                        d={index % 2 === 0 
                          ? "M80,50 L400,50 L450,100 L400,250 L80,250 L30,200 L30,100 Z"
                          : "M420,50 L100,50 L50,100 L100,250 L420,250 L470,200 L470,100 Z"
                        }
                        fill={`url(#scanlines-${event.id})`}
                        opacity="0.5"
                      />
                      
                      {/* Holographic Icon */}
                      <g transform={`translate(${index % 2 === 0 ? '60' : '400'}, 80)`}>
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="30" 
                          fill="none"
                          stroke={event.color}
                          strokeWidth="2"
                          filter={`url(#hologramGlow-${event.id})`}
                        />
                        <circle 
                          cx="20" 
                          cy="20" 
                          r="20" 
                          fill={event.color}
                          fillOpacity="0.2"
                          className="animate-pulse"
                        />
                        <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24" fill={event.color}>
                          <path d={event.iconPath} />
                        </svg>
                      </g>
                      
                      {/* Data Visualization
                      <g transform={`translate(${index % 2 === 0 ? '120' : '150'}, 200)`}>
                        {event.dataPoints.map((point, i) => (
                          <rect
                            key={i}
                            x={i * 25}
                            y={50 - point * 0.5}
                            width="15"
                            height={point * 0.5}
                            fill={event.color}
                            fillOpacity="0.6"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                      </g> */}
                      
                      {/* Content */}
                      <foreignObject 
                        x={index % 2 === 0 ? "110" : "120"} 
                        y="70" 
                        width="250" 
                        height="120"
                      >
                        <div className="text-white p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full animate-pulse`} style={{backgroundColor: event.color}}></div>
                            <span className="text-xs font-mono text-gray-400 tracking-wider">NEURAL LOG #{event.id}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-300 leading-relaxed font-light">
                            {event.description}
                          </p>
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
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <defs>
                        <radialGradient id={`nodeGradient-${event.id}`} cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="black" />
                          <stop offset="30%" stopColor={event.color} stopOpacity="0.8" />
                          <stop offset="70%" stopColor={event.color} stopOpacity="0.4" />
                          <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                        <filter id={`nodeGlow-${event.id}`}>
                          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Outer Ring - Fixed Animation */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={event.color}
                        strokeWidth="2"
                        strokeDasharray="10,5"
                        filter={`url(#nodeGlow-${event.id})`}
                        className="rotate-circle"
                      />
                      
                      {/* Inner Core */}
                      <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill={`url(#nodeGradient-${event.id})`}
                        stroke={event.color}
                        strokeWidth="3"
                        filter={`url(#nodeGlow-${event.id})`}
                        className="animate-pulse"
                      />
                      
                      {/* Year Display */}
                      <text
                        x="50"
                        y="45"
                        textAnchor="middle"
                        className="text-xs font-mono font-bold"
                        fill={event.color}
                      >
                        {event.year}
                      </text>
                      
                      {/* ID Display */}
                      <text
                        x="50"
                        y="60"
                        textAnchor="middle"
                        className="text-lg font-bold"
                        fill="white"
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
                          <stop offset="50%" stopColor={event.color} stopOpacity="1" />
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
                          filter: `drop-shadow(0 0 10px ${event.color})`
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