import React, { useState } from 'react'
import { ExternalLink, ArrowUpRight, Sparkles, Server, Eye } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import { projectsData } from '../data/portfolioData'

function TiltCard({ project, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Calculate rotation angles
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
        className="tilt-card relative rounded-2xl overflow-hidden glass-panel border border-white/10 group-hover:border-white/35 transition-all duration-300 shadow-xl cursor-pointer"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/75 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
              {project.category}
            </span>
          </div>

          {/* Quick Preview Icon */}
          <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye size={15} />
          </div>

          {/* Live Link Badge if available */}
          {project.liveUrl && (
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-[11px] font-mono text-zinc-300 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>LIVE DEMO</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-6 tilt-inner">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-sarrif font-bold text-white group-hover:text-zinc-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-sans line-clamp-1">
                {project.tagline}
              </p>
            </div>
            <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>

          {/* Quick Stats or Specs */}
          {project.stats && (
            <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-white/10">
              {project.stats.slice(0, 2).map((s, idx) => (
                <div key={idx} className="text-left">
                  <div className="text-xs font-mono font-bold text-white">{s.value}</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.slice(0, 4).map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorkScreen({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const categories = ['ALL', 'FULL-STACK CAPSTONE', 'FULL-STACK CLIENT', '3D & CREATIVE', 'WEB APPS']

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category.toUpperCase().includes(activeFilter))

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 glow-beacon" />
            ENGINEERED & DEPLOYED ARCHITECTURES
          </div>
          <h2 className="text-4xl sm:text-6xl font-sarrif font-black text-white tracking-wide">
            FEATURED WORK.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl font-sans">
            Full-stack web applications, 156-endpoint REST APIs, transaction-safe booking flows, and scroll-driven 3D web experiences.
          </p>
        </div>

        {/* Category Filters inspired by undefined-shin's WorkScreen tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
                activeFilter === cat
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Perspective Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <TiltCard
            key={project.id}
            project={project}
            onSelect={onSelectProject}
          />
        ))}
      </div>
    </section>
  )
}
