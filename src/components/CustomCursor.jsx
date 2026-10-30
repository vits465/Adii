import React, { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only enable for pointer (non-touch) devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setPos({ x: mouseX, y: mouseY })
      if (!isVisible) setIsVisible(true)

      // Check if target has cursor attributes
      const target = e.target.closest('button, a, input, select, textarea, [data-cursor]')
      if (target) {
        setHovered(true)
        const customText = target.getAttribute('data-cursor') || ''
        setCursorText(customText)
      } else {
        setHovered(false)
        setCursorText('')
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    // Smooth lerp loop for outer ring
    let animId
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          opacity: hovered ? 0 : 1,
        }}
      />

      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-indigo-400/60 -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 flex items-center justify-center backdrop-blur-[1px] ${
          hovered
            ? 'w-14 h-14 bg-indigo-500/20 border-cyan-400/80 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
            : 'w-8 h-8 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
