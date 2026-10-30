import React, { useState } from 'react'
import { ExternalLink, ArrowUpRight, Sparkles, Server, Eye } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import { projectsData } from '../data/portfolioData'

const PROJECT_THEMES = {
  'house-of-hackney': {
    border: 'border-emerald-500/35 hover:border-emerald-400',
    glow: 'hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accentText: 'text-emerald-400',
  },
  'journeyflicker': {
    border: 'border-cyan-500/35 hover:border-cyan-400',
    glow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.35)]',
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    accentText: 'text-cyan-400',
  },
  'bobby-salon': {
    border: 'border-rose-500/35 hover:border-rose-400',
    glow: 'hover:shadow-[0_0_35px_rgba(244,63,94,0.35)]',
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    accentText: 'text-rose-400',
  },
  'the-flat-white': {
    border: 'border-amber-500/35 hover:border-amber-400',
    glow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accentText: 'text-amber-400',
  },
  'treadiiiio': {
    border: 'border-teal-500/35 hover:border-teal-400',
    glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.35)]',
    badge: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    accentText: 'text-teal-400',
  },
  'atlantico-international': {
    border: 'border-indigo-500/35 hover:border-indigo-400',
    glow: 'hover:shadow-[0_0_35px_rgba(99,102,241,0.35)]',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    accentText: 'text-indigo-400',
  },
}

function TiltCard({ project, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const theme = PROJECT_THEMES[project.id] || PROJECT_THEMES['house-of-hackney']

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotX = -(y / (rect.height / 2)) * 12
    const rotY = (x / (rect.width / 2)) * 12
    setTilt({ x: rotX, y: rotY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      className="perspective-container group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`tilt-card relative rounded-3xl overflow-hidden glass-panel border ${theme.border} ${theme.glow} transition-all duration-300 shadow-xl cursor-pointer`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        onClick={() => onSelect(project)}
      >
        {/* Project Thumbnail Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold border backdrop-blur-md shadow-md ${theme.badge}`}>
              {project.category}
            </span>
          </div>

          {/* Quick Preview Icon */}
          <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
            <Eye size={15} />
          </div>

          {/* Live Link Badge */}
          {project.liveUrl && (
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-[11px] font-mono text-white bg-black/80 px-3 py-1 rounded-lg border border-emerald-500/40 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-emerald" />
              <span className="font-semibold">LIVE PRODUCTION</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 tilt-inner">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-sarrif font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans line-clamp-1">
                {project.tagline}
              </p>
            </div>
            <ArrowUpRight size={22} className={`${theme.accentText} group-hover:translate-x-1 group-hover:-translate-y-1 transition-all`} />
          </div>

          {/* Quick Stats or Specs */}
          {project.stats && (
            <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-white/10">
              {project.stats.slice(0, 2).map((s, idx) => (
                <div key={idx} className="text-left">
                  <div className={`text-sm font-mono font-bold ${theme.accentText}`}>{s.value}</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges with Colorful Subtle Glows */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.slice(0, 4).map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10 group-hover:border-white/20"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 font-semibold">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import confetti from 'canvas-confetti'

export default function WorkScreen({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const categories = [
    { name: 'ALL', count: projectsData.length, color: 'from-cyan-500 to-blue-500' },
    {
      name: 'FULL-STACK CAPSTONE',
      count: projectsData.filter((p) => p.category.toUpperCase().includes('CAPSTONE')).length,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'FULL-STACK CLIENT',
      count: projectsData.filter((p) => p.category.toUpperCase().includes('CLIENT')).length,
      color: 'from-cyan-500 to-indigo-500',
    },
    {
      name: '3D & CREATIVE',
      count: projectsData.filter((p) => p.category.toUpperCase().includes('3D') || p.category.toUpperCase().includes('CREATIVE')).length,
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'WEB APPS',
      count: projectsData.filter((p) => p.category.toUpperCase().includes('APP') || p.category.toUpperCase().includes('FINTECH')).length,
      color: 'from-amber-500 to-rose-500',
    },
  ]

  const handleFilterClick = (catName) => {
    setActiveFilter(catName)
    if (catName === 'FULL-STACK CAPSTONE') {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#10b981', '#06b6d4', '#6366f1'],
      })
    }
  }

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category.toUpperCase().includes(activeFilter))

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-emerald" />
            ENGINEERED & DEPLOYED ARCHITECTURES
          </div>
          <h2 className="text-4xl sm:text-6xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-violet-400 tracking-wide">
            FEATURED WORK.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-xl font-sans">
            Full-stack production platforms, 156-endpoint REST APIs, transaction-safe booking engines, and cinematic 3D web experiences.
          </p>
        </div>

        {/* Category Filters with colorful active states and dynamic count */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.name
            return (
              <button
                key={cat.name}
                onClick={() => handleFilterClick(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all duration-300 border ${
                  isActive
                    ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)] scale-105`
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3D Perspective Card Grid with animated switch entrance */}
      <div
        key={activeFilter}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-tabSwitch"
      >
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="animate-fadeInUp"
            style={{ animationDelay: `${idx * 70}ms` }}
          >
            <TiltCard
              project={project}
              onSelect={onSelectProject}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
