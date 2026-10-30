import React, { useEffect, useState } from 'react'

export default function CurtainOverlay({ isTransitioning, onAnimationEnd }) {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    // Initial mount opening animation
    const timer = setTimeout(() => {
      setOpened(true)
      if (onAnimationEnd) onAnimationEnd()
    }, 700)
    return () => clearTimeout(timer)
  }, [onAnimationEnd])

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-700 ${
        opened && !isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Half Curtain */}
      <div
        className={`curtain-panel top transform transition-transform duration-800 ease-in-out ${
          opened && !isTransitioning ? 'scale-y-0' : 'scale-y-100'
        }`}
        style={{
          backgroundColor: '#050505',
          transformOrigin: 'top',
        }}
      />

      {/* Bottom Half Curtain */}
      <div
        className={`curtain-panel bottom transform transition-transform duration-800 ease-in-out ${
          opened && !isTransitioning ? 'scale-y-0' : 'scale-y-100'
        }`}
        style={{
          backgroundColor: '#050505',
          transformOrigin: 'bottom',
        }}
      />
    </div>
  )
}

