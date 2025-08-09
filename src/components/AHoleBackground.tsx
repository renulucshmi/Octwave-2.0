'use client';

import React, { useEffect, useRef } from 'react';

interface AHoleBackgroundProps {
  className?: string;
  height?: string;
  opacity?: number;
}

const AHoleBackground: React.FC<AHoleBackgroundProps> = ({ 
  className = '', 
  height = '100vh',
  opacity = 1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let discs: any[] = [];
    let lines: any[] = [];
    let particles: any[] = [];
    let clip: any = {};
    let render: any = {};
    let rect: DOMRect;
    let linesCanvas: OffscreenCanvas;
    let particleArea: any = {};

    // Easing functions (simplified version)
    const easingUtils = {
      linear: (t: number) => t,
      easeInExpo: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1))
    };

    const setSize = () => {
      rect = containerRef.current!.getBoundingClientRect();
      
      render = {
        width: rect.width,
        height: rect.height,
        dpi: window.devicePixelRatio || 1
      };

      canvas.width = render.width * render.dpi;
      canvas.height = render.height * render.dpi;
    };

    const tweenValue = (start: number, end: number, p: number, ease = false) => {
      const delta = end - start;
      const easeFn = ease ? easingUtils.easeInExpo : easingUtils.linear;
      return start + delta * easeFn(p);
    };

    const tweenDisc = (disc: any) => {
      const startDisc = {
        x: rect.width * 0.5,
        y: rect.height * 0.6,
        w: rect.width * 0.4,
        h: rect.height * 0.5
      };

      const endDisc = {
        x: rect.width * 0.5,
        y: rect.height * 1.2,
        w: 0,
        h: 0
      };

      disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
      disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, true);
      disc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
      disc.h = tweenValue(startDisc.h, endDisc.h, disc.p);

      return disc;
    };

    const setDiscs = () => {
      const { width, height } = rect;
      discs = [];

      const startDisc = {
        x: width * 0.5,
        y: height * 0.6,
        w: rect.width * 0.4,
        h: rect.height * 0.5
      };

      const totalDiscs = 100;
      let prevBottom = height;
      clip = {};

      for (let i = 0; i < totalDiscs; i++) {
        const p = i / totalDiscs;
        const disc = tweenDisc({ p });
        const bottom = disc.y + disc.h;

        if (bottom <= prevBottom) {
          clip = {
            disc: { ...disc },
            i
          };
        }

        prevBottom = bottom;
        discs.push(disc);
      }

      clip.path = new Path2D();
      clip.path.ellipse(
        clip.disc.x,
        clip.disc.y,
        clip.disc.w,
        clip.disc.h,
        0,
        0,
        Math.PI * 2
      );
      clip.path.rect(
        clip.disc.x - clip.disc.w,
        0,
        clip.disc.w * 2,
        clip.disc.y
      );
    };

    const setLines = () => {
      const { width, height } = rect;
      lines = [];

      const totalLines = 100;
      const linesAngle = (Math.PI * 2) / totalLines;

      for (let i = 0; i < totalLines; i++) {
        lines.push([]);
      }

      discs.forEach((disc) => {
        for (let i = 0; i < totalLines; i++) {
          const angle = i * linesAngle;
          const p = {
            x: disc.x + Math.cos(angle) * disc.w,
            y: disc.y + Math.sin(angle) * disc.h
          };
          lines[i].push(p);
        }
      });

      linesCanvas = new OffscreenCanvas(width, height);
      const linesCtx = linesCanvas.getContext('2d');
      if (!linesCtx) return;

      lines.forEach((line) => {
        linesCtx.save();

        let lineIsIn = false;
        line.forEach((p1: any, j: number) => {
          if (j === 0) return;

          const p0 = line[j - 1];

          if (!lineIsIn && 
              (linesCtx.isPointInPath(clip.path, p1.x, p1.y) ||
               linesCtx.isPointInStroke(clip.path, p1.x, p1.y))) {
            lineIsIn = true;
          } else if (lineIsIn) {
            linesCtx.clip(clip.path);
          }

          linesCtx.beginPath();
          linesCtx.moveTo(p0.x, p0.y);
          linesCtx.lineTo(p1.x, p1.y);
          linesCtx.strokeStyle = '#444';
          linesCtx.lineWidth = 2;
          linesCtx.stroke();
          linesCtx.closePath();
        });

        linesCtx.restore();
      });
    };

    const initParticle = (start = false) => {
      const sx = particleArea.sx + particleArea.sw * Math.random();
      const ex = particleArea.ex + particleArea.ew * Math.random();
      const dx = ex - sx;
      const y = start ? particleArea.h * Math.random() : particleArea.h;
      const r = 0.5 + Math.random() * 4;
      const vy = 0.5 + Math.random();

      return {
        x: sx,
        sx,
        dx,
        y,
        vy,
        p: 0,
        r,
        c: `rgba(255, 255, 255, ${Math.random()})`
      };
    };

    const setParticles = () => {
      const { width, height } = rect;
      particles = [];

      particleArea = {
        sw: clip.disc.w * 0.5,
        ew: clip.disc.w * 2,
        h: height * 0.85
      };
      particleArea.sx = (width - particleArea.sw) / 2;
      particleArea.ex = (width - particleArea.ew) / 2;

      const totalParticles = 100;
      for (let i = 0; i < totalParticles; i++) {
        particles.push(initParticle(true));
      }
    };

    const drawDiscs = () => {
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 2;

      const startDisc = {
        x: rect.width * 0.5,
        y: rect.height * 0.6,
        w: rect.width * 0.4,
        h: rect.height * 0.5
      };

      ctx.beginPath();
      ctx.ellipse(startDisc.x, startDisc.y, startDisc.w, startDisc.h, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();

      discs.forEach((disc, i) => {
        if (i % 5 !== 0) return;

        if (disc.w < clip.disc.w - 5) {
          ctx.save();
          ctx.clip(clip.path);
        }

        ctx.beginPath();
        ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();

        if (disc.w < clip.disc.w - 5) {
          ctx.restore();
        }
      });
    };

    const drawLines = () => {
      ctx.drawImage(linesCanvas, 0, 0);
    };

    const drawParticles = () => {
      ctx.save();
      ctx.clip(clip.path);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.c;
        ctx.beginPath();
        ctx.rect(particle.x, particle.y, particle.r, particle.r);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
    };

    const moveDiscs = () => {
      discs.forEach((disc) => {
        disc.p = (disc.p + 0.001) % 1;
        tweenDisc(disc);
      });
    };

    const moveParticles = () => {
      particles.forEach((particle) => {
        particle.p = 1 - particle.y / particleArea.h;
        particle.x = particle.sx + particle.dx * particle.p;
        particle.y -= particle.vy;

        if (particle.y < 0) {
          const newParticle = initParticle();
          particle.y = newParticle.y;
        }
      });
    };

    const tick = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(render.dpi, render.dpi);

      moveDiscs();
      moveParticles();
      drawDiscs();
      drawLines();
      drawParticles();

      ctx.restore();
      animationRef.current = requestAnimationFrame(tick);
    };

    const init = () => {
      setSize();
      setDiscs();
      setLines();
      setParticles();
      tick();
    };

    const handleResize = () => {
      setSize();
      setDiscs();
      setLines();
      setParticles();
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height,
    overflow: 'hidden',
    background: 'var(--background)',
    opacity
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    zIndex: 2,
    display: 'block',
    width: '120%',
    height: '100%',
    background: 'radial-gradient(ellipse at 50% 40%, transparent 20%, black 70%)',
    transform: 'translate3d(-50%, -50%, 0)',
    pointerEvents: 'none'
  };

  const auraStyles: React.CSSProperties = {
    position: 'absolute',
    top: '-40%',
    left: '50%',
    zIndex: 3,
    width: '25%',
    height: '100%',
    background: `linear-gradient(
      20deg,
      #00f8f1,
      #ffbd1e20 16.5%,
      #fe848f 33%,
      #fe848f20 49.5%,
      #00f8f1 66%,
      #00f8f160 85.5%,
      #ffbd1e 100%
    ) 0 100% / 100% 200%`,
    borderRadius: '0 0 100% 100%',
    filter: 'blur(30px)',
    mixBlendMode: 'plus-lighter',
    opacity: 0.6,
    transform: 'translate3d(-50%, 0, 0)',
    animation: 'aura-glow 5s infinite linear',
    pointerEvents: 'none'
  };

  const afterOverlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    zIndex: 5,
    display: 'block',
    width: '80%',
    height: '80%',
    background: 'radial-gradient(ellipse at 50% 60%, #a900ff 15%, transparent 60%)',
    mixBlendMode: 'overlay',
    transform: 'translate3d(-50%, -50%, 0)',
    pointerEvents: 'none'
  };

  const scanlineStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
    background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
    mixBlendMode: 'overlay',
    opacity: 0.3,
    pointerEvents: 'none'
  };

  return (
    <>
      <style jsx>{`
        @keyframes aura-glow {
          0% {
            background-position: 0 100%;
          }
          100% {
            background-position: 0 300%;
          }
        }
      `}</style>
      <div 
        ref={containerRef} 
        className={`ahole-background ${className}`}
        style={containerStyles}
      >
        <canvas 
          ref={canvasRef}
          style={{ 
            display: 'block', 
            width: '100%', 
            height: '100%' 
          }} 
        />
        <div style={overlayStyles} />
        <div style={auraStyles} />
        <div style={afterOverlayStyles} />
        <div style={scanlineStyles} />
      </div>
    </>
  );
};

export default AHoleBackground;