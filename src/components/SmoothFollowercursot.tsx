"use client"

import { useState, useEffect, useRef } from "react"

export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 })
  const dotPosition = useRef({ x: 0, y: 0 })
  const borderDotPosition = useRef({ x: 0, y: 0 })
  const trailPositions = useRef<Array<{ x: number, y: number }>>([])

  const [renderPos, setRenderPos] = useState({ 
    dot: { x: 0, y: 0 }, 
    border: { x: 0, y: 0 },
    trail: [] as Array<{ x: number, y: number }>
  })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number, x: number, y: number, timestamp: number }>>([])

  const DOT_SMOOTHNESS = 0.25
  const BORDER_DOT_SMOOTHNESS = 0.12
  const TRAIL_LENGTH = 8

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      
      // Add to trail
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY })
      if (trailPositions.current.length > TRAIL_LENGTH) {
        trailPositions.current.pop()
      }
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      // Create ripple effect
      const newRipple = {
        id: Date.now(),
        x: mousePosition.current.x,
        y: mousePosition.current.y,
        timestamp: Date.now()
      }
      setRipples(prev => [...prev, newRipple])
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll("a, button, img, input, textarea, select, [role='button']")
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter)
      element.addEventListener("mouseleave", handleMouseLeave)
    })

    // Animation function for smooth movement
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS)
      dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS)

      borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS)
      borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS)

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: { x: borderDotPosition.current.x, y: borderDotPosition.current.y },
        trail: [...trailPositions.current]
      })

      requestAnimationFrame(animate)
    }

    // Start animation loop
    const animationId = requestAnimationFrame(animate)

    // Clean up ripples
    const rippleCleanup = setInterval(() => {
      setRipples(prev => prev.filter(ripple => Date.now() - ripple.timestamp < 1000))
    }, 100)

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
      })

      cancelAnimationFrame(animationId)
      clearInterval(rippleCleanup)
    }
  }, [isMounted])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 mix-blend-difference">
      
      {/* Trail Effect */}
      {renderPos.trail.map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.max(1, 4 - index * 0.5)}px`,
            height: `${Math.max(1, 4 - index * 0.5)}px`,
            transform: "translate(-50%, -50%)",
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: Math.max(0, 1 - index * 0.15),
            transition: "opacity 0.1s ease-out"
          }}
        />
      ))}

      {/* Main Cursor Dot */}
      <div
        className={`absolute rounded-full transition-all duration-200 ${
          isClicking 
            ? "bg-gradient-to-r from-pink-400 to-purple-500 scale-150" 
            : "bg-white"
        }`}
        style={{
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
          boxShadow: isHovering 
            ? "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(201, 39, 124, 0.4)" 
            : "0 0 10px rgba(255, 255, 255, 0.6)",
        }}
      />

      {/* Outer Ring */}
      <div
        className={`absolute rounded-full border-2 transition-all duration-300 ${
          isHovering 
            ? "border-gradient-to-r from-pink-400 to-purple-500" 
            : "border-white"
        }`}
        style={{
          width: isHovering ? "56px" : isClicking ? "72px" : "32px",
          height: isHovering ? "56px" : isClicking ? "72px" : "32px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          background: isHovering 
            ? "radial-gradient(circle, rgba(201, 39, 124, 0.1) 0%, transparent 70%)" 
            : "transparent",
          boxShadow: isHovering 
            ? "0 0 30px rgba(201, 39, 124, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)" 
            : "0 0 15px rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Magnetic Field Effect when hovering */}
      {isHovering && (
        <div
          className="absolute rounded-full border border-purple-400/30 animate-ping"
          style={{
            width: "80px",
            height: "80px",
            transform: "translate(-50%, -50%)",
            left: `${renderPos.border.x}px`,
            top: `${renderPos.border.y}px`,
          }}
        />
      )}

      {/* Click Ripples */}
      {ripples.map((ripple) => {
        const elapsed = Date.now() - ripple.timestamp
        const progress = elapsed / 1000 // 1 second animation
        
        return (
          <div
            key={ripple.id}
            className="absolute rounded-full border-2 border-pink-400"
            style={{
              width: `${20 + progress * 100}px`,
              height: `${20 + progress * 100}px`,
              transform: "translate(-50%, -50%)",
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              opacity: Math.max(0, 1 - progress),
              background: `radial-gradient(circle, rgba(201, 39, 124, ${0.2 * (1 - progress)}) 0%, transparent 70%)`,
            }}
          />
        )
      })}

      {/* Particle System for Movement */}
      {isHovering && Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"
          style={{
            left: `${renderPos.border.x + Math.cos(Date.now() * 0.003 + i) * 30}px`,
            top: `${renderPos.border.y + Math.sin(Date.now() * 0.003 + i) * 30}px`,
            transform: "translate(-50%, -50%)",
            animationDelay: `${i * 0.1}s`,
            opacity: 0.7
          }}
        />
      ))}

      {/* Cursor State Indicator */}
      {isHovering && (
        <div
          className="absolute text-xs font-mono font-bold text-white bg-black/70 px-2 py-1 rounded-lg backdrop-blur-sm"
          style={{
            left: `${renderPos.border.x + 40}px`,
            top: `${renderPos.border.y - 40}px`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none"
          }}
        >
          ⚡ Interactive
        </div>
      )}
    </div>
  )
}