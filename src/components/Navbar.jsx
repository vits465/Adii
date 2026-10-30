import React, { useState, useEffect } from 'react'
import { FileDown, Mail, Menu, X, Terminal, Globe, Layers, User, Briefcase, Sparkles } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { personalInfo } from '../data/portfolioData'

export default function Navbar({ activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'main', label: 'MAIN', icon: Sparkles, color: 'from-cyan-500 to-blue-500' },
    { id: 'work', label: 'WORK', icon: Briefcase, color: 'from-violet-500 to-purple-500' },
    { id: 'profile', label: 'PROFILE', icon: User, color: 'from-pink-500 to-rose-500' },
    { id: 'record', label: 'RECORD', icon: Layers, color: 'from-emerald-500 to-teal-500' },
    { id: 'globe', label: '3D LAB', icon: Globe, color: 'from-amber-500 to-orange-500' },
    { id: 'contact', label: 'CONTACT', icon: Terminal, color: 'from-fuchsia-500 to-cyan-500' },
  ]

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('main')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 text-white font-sarrif font-black text-sm flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:scale-110 group-hover:rotate-3">
            AC
          </div>
          <div>
            <div className="font-sarrif font-black text-lg tracking-wider text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-violet-400 group-hover:to-pink-400 transition-all">
              ADITYA CHAUHAN.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-emerald" />
              <span className="text-[10px] font-mono tracking-widest text-cyan-300/80 uppercase font-semibold">
                FULL-STACK DEVELOPER
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#0e1320]/80 border border-white/10 p-1.5 rounded-full backdrop-blur-xl shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 relative ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-[0_0_20px_rgba(139,92,246,0.6)] scale-105`
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-white' : 'text-zinc-400'} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Action Controls & Socials */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={personalInfo.resumePath}
            download="Aditya_Chauhan_Resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 hover:from-emerald-500 hover:via-cyan-500 hover:to-violet-500 text-white hover:text-black border border-cyan-500/40 hover:border-transparent transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
          >
            <FileDown size={14} />
            <span>RESUME</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 flex items-center justify-center text-zinc-300 hover:text-cyan-300 transition-all hover:scale-105"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-600/30 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-zinc-300 hover:text-cyan-300 transition-all hover:scale-105"
          >
            <LinkedinIcon size={16} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-[#07090e]/98 border-b border-white/10 backdrop-blur-2xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-mono tracking-wider text-left transition-colors ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white font-bold shadow-lg`
                      : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              )
            })}

            <div className="pt-4 border-t border-white/10 mt-2 flex items-center justify-between">
              <a
                href={personalInfo.resumePath}
                download="Aditya_Chauhan_Resume.pdf"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 text-white tracking-wider shadow-lg"
              >
                <FileDown size={15} />
                DOWNLOAD RESUME
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/10 text-white hover:text-cyan-400"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/10 text-white hover:text-cyan-400"
                >
                  <LinkedinIcon size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
