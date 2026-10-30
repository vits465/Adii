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
    { id: 'main', label: 'MAIN', icon: Sparkles },
    { id: 'work', label: 'WORK', icon: Briefcase },
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'record', label: 'RECORD', icon: Layers },
    { id: 'globe', label: '3D LAB', icon: Globe },
    { id: 'contact', label: 'CONTACT', icon: Terminal },
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
          ? 'bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('main')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-white text-black font-sarrif font-black text-sm flex items-center justify-center transition-transform group-hover:scale-105">
            AC
          </div>
          <div>
            <div className="font-sarrif font-black text-lg tracking-wider text-white group-hover:text-zinc-300 transition-colors">
              ADITYA CHAUHAN.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse glow-beacon" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                FULL-STACK DEV
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
          {navLinks.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-black shadow-lg scale-102'
                    : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-black' : 'text-zinc-400'} />
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
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 shadow-sm"
          >
            <FileDown size={14} />
            <span>RESUME</span>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
          >
            <GithubIcon size={16} />
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
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
        <div className="lg:hidden fixed inset-x-0 top-[73px] bg-black/95 border-b border-white/10 backdrop-blur-xl px-6 py-6 transition-all duration-300">
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
                      ? 'bg-white text-black font-bold'
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-white text-black tracking-wider"
              >
                <FileDown size={15} />
                DOWNLOAD RESUME
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/10 text-white"
                >
                  <GithubIcon size={18} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-white/10 text-white"
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
