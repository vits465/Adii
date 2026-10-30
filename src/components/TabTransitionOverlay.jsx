import React, { useEffect, useState } from 'react'
import { Sparkles, Briefcase, User, Layers, Globe, Terminal, Cpu } from 'lucide-react'

const SECTION_METADATA = {
  main: {
    sector: '01',
    title: 'COMMAND CENTER',
    tagline: 'Full-Stack Portfolio Overview & Hero Spatial Canvas',
    icon: Sparkles,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    accentColor: '#38bdf8',
  },
  work: {
    sector: '02',
    title: 'FEATURED ARCHITECTURES',
    tagline: 'House of Hackney, JourneyFlicker & Production Deployments',
    icon: Briefcase,
    gradient: 'from-violet-500 via-purple-500 to-indigo-500',
    accentColor: '#8b5cf6',
  },
  profile: {
    sector: '03',
    title: 'DEVELOPER PROFILE & RESUME',
    tagline: 'BCA Distinction 8.78 SGPA, Oscar Academy & Core Competencies',
    icon: User,
    gradient: 'from-pink-500 via-rose-500 to-violet-500',
    accentColor: '#ec4899',
  },
  record: {
    sector: '04',
    title: 'REST REPOSITORY & BENCHMARKS',
    tagline: '156 Documented Endpoints, 43 Collections & System Architecture',
    icon: Layers,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentColor: '#10b981',
  },
  globe: {
    sector: '05',
    title: '3D PLANETARY LAB',
    tagline: '8K Earth WebGL Simulation, Orbit Controls & Global Telemetry',
    icon: Globe,
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    accentColor: '#f59e0b',
  },
  contact: {
    sector: '06',
    title: 'DIRECT CONTACT TERMINAL',
    tagline: 'Instant Messaging, Phone/WhatsApp & Inquiries',
    icon: Terminal,
    gradient: 'from-fuchsia-500 via-cyan-500 to-blue-500',
    accentColor: '#06b6d4',
  },
}

export default function TabTransitionOverlay({ isTransitioning, targetSection }) {
  const [displayMeta, setDisplayMeta] = useState(SECTION_METADATA.main)

  useEffect(() => {
    if (targetSection && SECTION_METADATA[targetSection]) {
      setDisplayMeta(SECTION_METADATA[targetSection])
    }
  }, [targetSection])

  const Icon = displayMeta.icon || Sparkles

  return (
    <div
      className={`fixed inset-0 z-[120] pointer-events-none transition-all duration-300 ${
        isTransitioning ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      {/* Top Kinetic Shutter Slice */}
      <div
        className={`absolute top-0 left-0 w-full h-1/2 bg-[#040817] border-b-2 border-cyan-400/60 shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-transform duration-350 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isTransitioning ? 'translate-y-0' : '-translate-y-full'
        }`}
      />

      {/* Bottom Kinetic Shutter Slice */}
      <div
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#040817] border-t-2 border-indigo-400/60 shadow-[0_-10px_30px_rgba(99,102,241,0.4)] transition-transform duration-350 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isTransitioning ? 'translate-y-0' : 'translate-y-full'
        }`}
      />

      {/* Center Laser Beam Sweep */}
      <div
        className={`absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee] -translate-y-1/2 transition-opacity duration-200 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Holographic HUD Sector Switch Announcement */}
      <div
        className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-300 ${
          isTransitioning ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <div className="relative glass-panel bg-[#070e24]/90 border border-cyan-400/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-[0_0_60px_rgba(6,182,212,0.45)] backdrop-blur-2xl">
          {/* Top Status Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 font-bold uppercase tracking-wider">
                ROUTING ENGAGED // SECTOR {displayMeta.sector}
              </span>
            </div>
            <span className="text-emerald-400 font-bold bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
              SWITCHING TAB
            </span>
          </div>

          {/* Central Emblem & Destination Title */}
          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/30 via-indigo-500/30 to-violet-500/30 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] mb-3">
              <Icon size={26} />
            </div>

            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold mb-1">
              DESTINATION VIEWPORT
            </div>

            <h3 className="font-sarrif font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300 tracking-wide">
              {displayMeta.title}
            </h3>

            <p className="text-xs font-sans text-zinc-300 mt-1.5 max-w-sm">
              {displayMeta.tagline}
            </p>
          </div>

          {/* Audio Equalizer & Coordinates */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <div className="flex items-center gap-1">
              {[4, 12, 20, 16, 24, 14, 8, 18, 12].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-cyan-400 rounded-full animate-pulse"
                  style={{ height: `${h}px`, animationDuration: `${0.25 + (i % 3) * 0.1}s` }}
                />
              ))}
            </div>

            <span className="text-zinc-400 tracking-wider">
              SURAT NODE // 21.1702° N, 72.8311° E
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

