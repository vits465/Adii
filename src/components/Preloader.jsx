import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, CheckCircle2, Cpu, Globe, Server, Layers, ShieldCheck, Zap } from 'lucide-react'

const DIAGNOSTIC_PILLARS = [
  {
    id: 'webgl',
    label: 'WebGL 3D Core',
    icon: Globe,
    desc: 'Dynamic Barycentric Shaders & 8K Earth Mesh',
    threshold: 20,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    bgActive: 'bg-cyan-500/10',
  },
  {
    id: 'api',
    label: '156 REST Endpoints',
    icon: Server,
    desc: 'House of Hackney (43 Collections) & JourneyFlicker',
    threshold: 45,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgActive: 'bg-emerald-500/10',
  },
  {
    id: 'db',
    label: 'Distributed Architecture',
    icon: DatabaseIcon,
    desc: 'MongoDB ACID Transactions, Redis Cache & Razorpay',
    threshold: 70,
    color: 'text-violet-400',
    borderColor: 'border-violet-500/40',
    bgActive: 'bg-violet-500/10',
  },
  {
    id: 'ux',
    label: 'Sensory UI & Audio',
    icon: Zap,
    desc: '60 FPS Custom Lerp Cursor & Glass Aesthetics',
    threshold: 90,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    bgActive: 'bg-amber-500/10',
  },
]

function DatabaseIcon(props) {
  return <Layers {...props} />
}

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0)
  const [phaseText, setPhaseText] = useState('PHASE 01: INITIALIZING WEBGL & CORE KERNELS...')
  const [scrambleName, setScrambleName] = useState('CHAUHAN ADITYA GANPATBHAI')
  const [isExiting, setIsExiting] = useState(false)
  const [shutterOpen, setShutterOpen] = useState(false)
  const canvasRef = useRef(null)

  // Fast skip handler for instant entrance
  const handleSkip = () => {
    setPercent(100)
    setShutterOpen(true)
    setTimeout(() => {
      setIsExiting(true)
      if (onComplete) onComplete()
    }, 700)
  }

  // Interactive Particle Vortex Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particleCount = 130
    const particles = []
    const colors = ['#6366f1', '#38bdf8', '#a855f7', '#06b6d4', '#10b981', '#f59e0b']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 40 + Math.random() * 320,
        speed: (0.006 + Math.random() * 0.012) * (Math.random() > 0.45 ? 1 : -1),
        size: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.85 + 0.15,
      })
    }

    let frame = 0
    const render = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      // Draw particle orbit vortex
      particles.forEach((p) => {
        p.angle += p.speed
        const x = cx + Math.cos(p.angle) * p.radius
        const y = cy + Math.sin(p.angle) * p.radius

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(frame * 0.04 + p.radius) * 0.4)
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.fill()
      })

      // Radial energy wave pulse
      ctx.beginPath()
      ctx.arc(cx, cy, (frame * 2.4) % 400, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      animationId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Progress counter & informative phase updater
  useEffect(() => {
    const chars = '01#@<>[]*&$%=+'
    const targetName = 'CHAUHAN ADITYA GANPATBHAI'

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShutterOpen(true)
            setTimeout(() => {
              setIsExiting(true)
              if (onComplete) onComplete()
            }, 800)
          }, 350)
          return 100
        }

        const step = Math.max(1, Math.floor((100 - prev) / 6.5)) + Math.floor(Math.random() * 2)
        const next = Math.min(100, prev + step)

        // Informative Phase Updates so viewer clearly understands what is loading
        if (next < 25) {
          setPhaseText('PHASE 01/04: INITIALIZING GLSL SHADERS & 3D WEBGL GRAPHICS ENGINE...')
        } else if (next < 50) {
          setPhaseText('PHASE 02/04: HYDRATING REST REPOSITORY: 156 ROUTES & 43 COLLECTIONS...')
        } else if (next < 75) {
          setPhaseText('PHASE 03/04: MOUNTING PRODUCTION CAPSTONE & VERIFIED CLIENT PLATFORMS...')
        } else if (next < 95) {
          setPhaseText('PHASE 04/04: CALIBRATING SENSORY AUDIO EQUALIZER & LOW-LATENCY UI...')
        } else {
          setPhaseText('ALL SYSTEMS OPERATIONAL • WELCOME TO ADITYA CHAUHAN PORTFOLIO')
        }

        // Kinetic text scrambler
        if (Math.random() > 0.4) {
          const scrambled = targetName
            .split('')
            .map((c, i) => (c === ' ' ? ' ' : Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : c))
            .join('')
          setScrambleName(scrambled)
        } else {
          setScrambleName(targetName)
        }

        return next
      })
    }, 40)

    return () => clearInterval(interval)
  }, [onComplete])

  if (isExiting) return null

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden select-none bg-[#030611] font-sans">
      {/* Kinetic 6-Slice Shutter Exit Curtains */}
      <div className="absolute inset-0 z-50 pointer-events-none flex">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex-1 bg-[#02050e] border-r border-indigo-500/20 transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]"
            style={{
              transform: shutterOpen
                ? i % 2 === 0
                  ? 'translateY(-105%)'
                  : 'translateY(105%)'
                : 'translateY(0%)',
              transitionDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>

      {/* Main Preloader Content Body */}
      <div
        className={`absolute inset-0 z-40 bg-[#030611] flex flex-col justify-between p-6 sm:p-10 md:p-12 transition-opacity duration-400 overflow-y-auto ${
          shutterOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Background Interactive Particle Vortex Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-85"
        />

        {/* Top Header: Developer Identity & System Diagnostic Specs */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/40 text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs font-bold tracking-wider">CORE v2.6 // PRO</span>
            </div>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <div className="text-xs font-mono text-zinc-300">
              <span className="text-cyan-400 font-semibold">SURAT, GUJARAT, INDIA</span>
              <span className="text-zinc-400 ml-1.5 hidden md:inline">(21.1702° N, 72.8311° E)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="text-zinc-400">CREDENTIAL:</span>
              <span className="text-amber-300 font-bold">BCA DISTINCTION (8.78 SGPA)</span>
            </div>

            <button
              onClick={handleSkip}
              className="px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 hover:from-cyan-500 hover:to-indigo-500 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-transparent text-xs font-mono font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105"
            >
              SKIP INTRO ➔
            </button>
          </div>
        </div>

        {/* Center Futuristic Cybernetic HUD Rings & Hologram */}
        <div className="my-auto py-6 flex flex-col items-center justify-center relative z-10 text-center">
          {/* Layered Rotating Cyber HUD Core */}
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center mb-4">
            {/* Outer Slow Spinning Dashed Ring */}
            <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/35 animate-[spin_18s_linear_infinite]" />

            {/* Middle Reverse Ring with degree tick marks */}
            <div className="absolute inset-4 sm:inset-5 rounded-full border border-cyan-400/25 animate-[spin_12s_linear_infinite_reverse]">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400 font-bold bg-[#030611] px-1">
                000°
              </span>
              <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-[9px] font-mono text-cyan-400 font-bold bg-[#030611] px-1">
                090°
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-cyan-400 font-bold bg-[#030611] px-1">
                180°
              </span>
              <span className="absolute top-1/2 -left-2 -translate-y-1/2 text-[9px] font-mono text-cyan-400 font-bold bg-[#030611] px-1">
                270°
              </span>
            </div>

            {/* Glowing Accent Ring with pulsing orbit beacon */}
            <div className="absolute inset-8 sm:inset-10 rounded-full border-2 border-indigo-500/40 animate-[spin_6s_linear_infinite]">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
            </div>

            {/* Central Holographic Monogram Hexagon */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#091124]/90 border border-cyan-400/50 backdrop-blur-md flex flex-col items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.35)]">
              <span className="font-sarrif font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-tr from-white via-cyan-200 to-indigo-400">
                AC
              </span>
              <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold mt-0.5">
                PORTFOLIO
              </span>
            </div>
          </div>

          {/* Kinetic Scrambled Developer Name */}
          <div className="font-mono text-sm sm:text-base md:text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-violet-300 uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            {scrambleName}
          </div>

          {/* Role Subtitle for Instant Clarity */}
          <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-zinc-300 font-semibold mt-1 flex items-center justify-center gap-2">
            <span className="text-cyan-400">FULL-STACK DEVELOPER</span>
            <span className="text-zinc-600">•</span>
            <span className="text-violet-400">MERN & WEBGL ARCHITECT</span>
          </div>

          {/* Big High-Impact Percentage Counter */}
          <div className="font-sarrif font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-white flex items-baseline justify-center drop-shadow-[0_0_35px_rgba(99,102,241,0.5)] mt-1">
            <span className="tabular-nums">
              {percent < 10 ? `0${percent}` : percent}
            </span>
            <span className="text-3xl sm:text-4xl text-cyan-400 ml-1 font-mono">%</span>
          </div>

          {/* Oscillating Audio Frequency Sound Bars */}
          <div className="flex items-center gap-1.5 mt-2 h-5">
            {[6, 14, 22, 28, 18, 30, 24, 16, 26, 18, 12, 20, 14, 24].map((h, idx) => (
              <span
                key={idx}
                className="w-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full animate-pulse"
                style={{
                  height: `${Math.max(4, h * (percent / 100))}px`,
                  animationDuration: `${0.35 + (idx % 4) * 0.18}s`,
                }}
              />
            ))}
          </div>

          {/* Live Informative Stage Banner */}
          <div className="mt-3 px-5 py-2 rounded-full bg-[#0a1329] border border-cyan-500/40 text-xs font-mono tracking-widest text-cyan-300 font-semibold shadow-[0_0_20px_rgba(6,182,212,0.25)] max-w-xl">
            <span className="text-emerald-400 mr-2">⚡</span>
            {phaseText}
          </div>

          {/* Informative Subsystem Status Grid - Helps Visitor Understand All Systems */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 w-full max-w-4xl text-left">
            {DIAGNOSTIC_PILLARS.map((item) => {
              const Icon = item.icon
              const isLoaded = percent >= item.threshold
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all duration-300 backdrop-blur-md ${
                    isLoaded
                      ? `${item.borderColor} ${item.bgActive} shadow-lg`
                      : 'border-white/5 bg-white/2 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={isLoaded ? item.color : 'text-zinc-400'} />
                      <span className={`text-xs font-mono font-bold tracking-wide ${isLoaded ? 'text-white' : 'text-zinc-400'}`}>
                        {item.label}
                      </span>
                    </div>
                    {isLoaded ? (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        <CheckCircle2 size={10} />
                        READY
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-400">
                        {item.threshold}%
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-sans text-zinc-400 line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Multi-Segment Futuristic Progress Bar */}
        <div className="w-full max-w-3xl mx-auto relative z-10 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-300 font-semibold">OSCAR CAREER POINT ACADEMY</span>
              </span>
              <span className="hidden md:inline text-zinc-600">•</span>
              <span className="hidden md:inline text-zinc-400">6 PRODUCTION DEPLOYMENTS</span>
            </div>

            <span className="text-cyan-400 font-mono font-bold tracking-widest text-xs">
              {percent} / 100
            </span>
          </div>

          {/* Glowing Multi-Color Gradient Bar */}
          <div className="w-full h-2.5 bg-[#080e1e] rounded-full overflow-hidden border border-cyan-500/30 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(56,189,248,0.9)]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
