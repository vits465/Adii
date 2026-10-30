import React from 'react'
import { Mail, Phone, ArrowUpRight, Heart, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolioData'

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-[#07090e]/90 backdrop-blur-2xl py-12 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info: Location & Distinction */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
          <div className="font-sarrif font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300">
            {personalInfo.shortName}.
          </div>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {personalInfo.location}
          </div>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <div className="text-xs font-mono text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold">
            BCA DISTINCTION (8.78 SGPA)
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase font-semibold text-zinc-400">
          <button
            onClick={() => onNavigate('work')}
            className="hover:text-cyan-300 transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="hover:text-violet-300 transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onNavigate('record')}
            className="hover:text-emerald-300 transition-colors"
          >
            Record
          </button>
          <button
            onClick={() => onNavigate('globe')}
            className="hover:text-amber-300 transition-colors"
          >
            3D Lab
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-pink-300 transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Right: Social Icon Links */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm hover:scale-110"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-600/30 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm hover:scale-110"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-amber-600/30 border border-white/10 hover:border-amber-500/50 flex items-center justify-center text-zinc-300 hover:text-white transition-all shadow-sm hover:scale-110"
            title="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-110"
            title="WhatsApp Direct"
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-3">
        <div>
          © {new Date().getFullYear()} Chauhan Aditya Ganpatbhai. Built with React 19, Three.js, & Tailwind CSS.
        </div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-300">High-Tech Cyber-Luxe</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 glow-cyan" />
          <span className="text-zinc-300">Oscar Career Point Academy</span>
        </div>
      </div>
    </footer>
  )
}
