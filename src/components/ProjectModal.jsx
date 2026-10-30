import React, { useEffect } from 'react'
import { X, ExternalLink, Layers, Server, Database, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0f1d] border border-cyan-500/30 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white text-zinc-300 hover:text-black flex items-center justify-center transition-all duration-200 z-10"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-400 font-semibold">{project.year}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-sarrif font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-1 font-sans">
            {project.tagline}
          </p>
        </div>

        {/* Action Links with Colorful Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pb-6 border-b border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 text-white font-mono font-bold text-xs tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105"
            >
              <ExternalLink size={14} />
              VISIT LIVE STORE / SITE
            </a>
          )}

          {project.backendUrl && (
            <a
              href={project.backendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-mono text-xs tracking-wider border border-cyan-500/30 transition-all hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <Server size={14} />
              BACKEND API LIVE
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all hover:scale-105"
            >
              <GithubIcon size={14} />
              SOURCE REPO
            </a>
          )}

          {project.githubFrontend && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all hover:scale-105"
            >
              <GithubIcon size={14} />
              FRONTEND REPO
            </a>
          )}

          {project.githubBackend && (
            <a
              href={project.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all hover:scale-105"
            >
              <GithubIcon size={14} />
              BACKEND REPO
            </a>
          )}
        </div>

        {/* Hero Visual Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-zinc-900 aspect-video shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-lg bg-black/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
              Primary Interface
            </div>
          </div>
          {project.secondaryImage && (
            <div className="relative rounded-2xl overflow-hidden border border-violet-500/30 bg-zinc-900 aspect-video shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <img
                src={project.secondaryImage}
                alt={`${project.title} secondary`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 px-3 py-1 rounded-lg bg-black/80 text-[10px] font-mono text-violet-300 border border-violet-500/30">
                Product & Architecture Visual
              </div>
            </div>
          )}
        </div>

        {/* Project Stats Banner with Colors */}
        {project.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-2xl bg-[#070b14] border border-white/10">
            {project.stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-300">
                  {s.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="my-6">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold mb-2">
            System Overview & Architecture
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Highlights List with Green Checkmarks */}
        {project.highlights && (
          <div className="my-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-3">
              Key Engineering Accomplishments
            </h3>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5 glow-emerald" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="my-6 pt-4 border-t border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold mb-3">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-cyan-300 border border-cyan-500/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
