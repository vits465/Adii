import React from 'react'
import { ArrowRight, FileDown, Layers, Sparkles, Terminal, Code2, Database, ExternalLink } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'

export default function MainScreen({ onNavigate }) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-beacon" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-300">
            {personalInfo.status}
          </span>
        </div>

        <div className="text-xs font-mono text-zinc-400 tracking-wider">
          EST. 2025 • SURAT, GUJARAT, INDIA
        </div>
      </div>

      {/* Main Massive Editorial Typography (Inspired by undefined-shin's CREATOR / UNDEFINED) */}
      <div className="my-auto py-12 text-center select-none">
        <div className="inline-block px-4 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-zinc-400 border border-white/10 bg-white/5 mb-6 backdrop-blur-md">
          {personalInfo.name}
        </div>

        <div className="relative">
          {/* Main Title 1 */}
          <h1 className="font-sarrif font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-white mix-blend-difference drop-shadow-2xl">
            FULL-STACK
          </h1>

          {/* Main Title 2 with outlined style option */}
          <h2 className="font-sarrif font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mt-2 sm:mt-4">
            DEVELOPER
          </h2>
        </div>

        {/* Subtitle Bar */}
        <p className="mt-8 text-sm sm:text-base md:text-lg font-mono text-zinc-300 max-w-2xl mx-auto tracking-widest uppercase">
          REACT.JS • NODE.JS • EXPRESS • MONGODB • THREE.JS
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={() => onNavigate('work')}
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-mono font-bold text-xs tracking-widest hover:bg-zinc-200 transition-all shadow-xl hover:scale-105"
          >
            <span>EXPLORE WORK</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-semibold text-xs tracking-widest border border-white/20 hover:border-white/50 backdrop-blur-md transition-all hover:scale-105"
          >
            <span>VIEW PROFILE & LIVE IMAGES</span>
          </button>

          <a
            href={personalInfo.resumePath}
            download="Aditya_Chauhan_Resume.pdf"
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono font-semibold text-xs tracking-widest border border-emerald-500/30 transition-all hover:scale-105"
          >
            <FileDown size={15} />
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>
      </div>

      {/* Bottom Architectural Matrix Strip */}
      <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="glass-panel p-3.5 rounded-xl border border-white/10">
          <div className="text-xl sm:text-2xl font-sarrif font-black text-white">156</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
            REST API Endpoints
          </div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/10">
          <div className="text-xl sm:text-2xl font-sarrif font-black text-white">43</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
            MongoDB Schemas
          </div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/10">
          <div className="text-xl sm:text-2xl font-sarrif font-black text-emerald-400">8.78</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
            BCA SGPA (Distinction)
          </div>
        </div>

        <div className="glass-panel p-3.5 rounded-xl border border-white/10">
          <div className="text-xl sm:text-2xl font-sarrif font-black text-white">100%</div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-0.5">
            Production Deployed
          </div>
        </div>
      </div>
    </section>
  )
}

