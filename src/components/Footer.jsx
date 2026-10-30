import React from 'react'
import { Mail, Phone, ArrowUpRight, Heart, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolioData'

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative z-20 w-full border-t border-white/10 bg-black/80 backdrop-blur-xl py-10 px-6 md:px-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info: Location & Distinction */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
          <div className="font-sarrif font-bold text-sm tracking-wider text-white">
            {personalInfo.shortName}.
          </div>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            {personalInfo.location}
          </div>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            BCA DISTINCTION (8.78 SGPA)
          </div>
        </div>

        {/* Center: Quick Links */}
        <div className="flex items-center gap-6 text-xs font-mono tracking-widest uppercase text-zinc-400">
          <button
            onClick={() => onNavigate('work')}
            className="hover:text-white transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="hover:text-white transition-colors"
          >
            Profile
          </button>
          <button
            onClick={() => onNavigate('record')}
            className="hover:text-white transition-colors"
          >
            Record
          </button>
          <button
            onClick={() => onNavigate('globe')}
            className="hover:text-white transition-colors"
          >
            3D Lab
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-white transition-colors"
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
            className="text-zinc-400 hover:text-white transition-colors"
            title="GitHub"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={personalInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
            title="WhatsApp Direct"
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
        <div>
          © {new Date().getFullYear()} Chauhan Aditya Ganpatbhai. Built with React 19, Three.js, & Tailwind CSS.
        </div>
        <div className="flex items-center gap-2">
          <span>Inspired by high-fashion brutalism</span>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
          <span className="text-zinc-400">Oscar Career Point Academy</span>
        </div>
      </div>
    </footer>
  )
}
