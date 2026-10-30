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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950/95 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8"
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
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider bg-white/10 text-emerald-400 border border-emerald-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">{project.year}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-sarrif font-black tracking-wide text-white">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-1 font-sans">
            {project.tagline}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pb-6 border-b border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-zinc-200 transition-all shadow-md"
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
            >
              <GithubIcon size={14} />
              SOURCE REPOSITORY
            </a>
          )}

          {project.githubFrontend && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
            >
              <GithubIcon size={14} />
              BACKEND REPO
            </a>
          )}
        </div>

        {/* Hero Visual Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/70 text-[10px] font-mono text-zinc-300">
              Primary Interface
            </div>
          </div>
          {project.secondaryImage && (
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900 aspect-video">
              <img
                src={project.secondaryImage}
                alt={`${project.title} secondary`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/70 text-[10px] font-mono text-zinc-300">
                Product & Architecture Visual
              </div>
            </div>
          )}
        </div>

        {/* Project Stats Banner */}
        {project.stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-xl bg-white/5 border border-white/10">
            {project.stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg sm:text-xl font-sarrif font-black text-white">
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
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            System Overview & Architecture
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Highlights List */}
        {project.highlights && (
          <div className="my-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
              Key Engineering Accomplishments
            </h3>
            <ul className="space-y-2.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="my-6 pt-4 border-t border-white/10">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-zinc-200 border border-white/10"
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
