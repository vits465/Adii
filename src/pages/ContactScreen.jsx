import React, { useState } from 'react'
import {
  Mail,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  FileDown,
  Sparkles,
  MessageSquare,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '../components/SocialIcons'
import confetti from 'canvas-confetti'
import { personalInfo } from '../data/portfolioData'

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'],
    })
  }

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Aurora Orbs */}
      <div className="aurora-orb w-[600px] h-[600px] bg-gradient-to-tr from-fuchsia-600/20 via-violet-600/15 to-transparent top-10 -left-60" />
      <div className="aurora-orb w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-emerald-600/15 to-transparent bottom-10 -right-40" />

      {/* Header */}
      <div className="mb-12 pb-6 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 glow-emerald" />
          AVAILABLE FOR HIRE & CONTRACTS
        </div>
        <h1 className="text-3xl sm:text-5xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-violet-300 tracking-wide">
          LET'S BUILD TOGETHER.
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-2xl font-sans">
          Whether you need an enterprise full-stack platform, a 156-endpoint REST architecture, or a cinematic web experience, I'm ready to ship production code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 relative z-10">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            <h3 className="text-xl font-sarrif font-bold text-white">Direct Channels</h3>

            <div className="space-y-4">
              {/* WhatsApp One-Click with vibrant green glow */}
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/15 hover:from-emerald-500/30 hover:to-teal-500/25 border border-emerald-500/40 text-emerald-300 transition-all group shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-102"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-500/25 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <WhatsAppIcon size={22} className="text-emerald-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                    Instant WhatsApp Chat
                  </div>
                  <div className="text-sm font-mono font-bold text-white group-hover:text-emerald-200">
                    +91 8200438411
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/10 hover:from-amber-500/25 hover:to-orange-500/20 border border-amber-500/30 text-amber-200 transition-all group shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-102"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <Mail size={20} className="text-amber-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Direct Email
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-amber-200">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-violet-500/15 to-purple-500/10 hover:from-violet-500/25 hover:to-purple-500/20 border border-violet-500/30 text-violet-200 transition-all group shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:scale-102"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <GithubIcon size={20} className="text-violet-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-violet-400 font-bold">
                    GitHub Profile
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-violet-200">
                    github.com/vits465
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-500/10 hover:from-cyan-500/25 hover:to-blue-500/20 border border-cyan-500/30 text-cyan-200 transition-all group shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-102"
              >
                <div className="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <LinkedinIcon size={20} className="text-cyan-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    LinkedIn Network
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-cyan-200">
                    chauhan-aditya-11832431a
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Base Headquarters
                  </div>
                  <div className="text-sm font-mono font-semibold text-white">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Resume Download */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={personalInfo.resumePath}
                download="Aditya_Chauhan_Resume.pdf"
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-600 hover:opacity-95 text-white font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-102"
              >
                <FileDown size={16} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
            <h3 className="text-2xl font-sarrif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-violet-300 mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 font-sans">
              Leave a note with your product vision, project requirements, or hiring inquiry and I will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-emerald-500/15 border border-emerald-500/40 text-center space-y-4 animate-in fade-in shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <div className="w-16 h-16 rounded-full bg-emerald-500/25 text-emerald-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-sarrif font-bold text-white">
                  Message Dispatched!
                </h4>
                <p className="text-sm text-zinc-300 font-sans max-w-md mx-auto">
                  Thank you, <span className="font-bold text-white">{formData.name || 'friend'}</span>. Your inquiry has been received. You can also message immediately on WhatsApp for priority response.
                </p>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all"
                >
                  <WhatsAppIcon size={18} />
                  <span>OPEN IN WHATSAPP</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-[#090d16] border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#090d16] border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-violet-300 font-semibold mb-1.5">
                    Project / Role Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#090d16] border border-white/10 focus:border-violet-400 text-sm text-white focus:outline-none transition-colors shadow-inner"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web Application (MERN)</option>
                    <option value="REST API Architecture">REST API Architecture & Backend Design</option>
                    <option value="Luxury E-Commerce">Luxury E-Commerce Storefront</option>
                    <option value="Interactive 3D / Three.js">Interactive 3D / Three.js Web Experience</option>
                    <option value="Full-time Engineering Role">Full-time Engineering Role</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-violet-300 font-semibold mb-1.5">
                    Project Overview or Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product vision, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl bg-[#090d16] border border-white/10 focus:border-violet-400 text-sm text-white focus:outline-none transition-colors resize-none shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 text-white font-mono font-bold text-xs tracking-widest hover:opacity-95 transition-all shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-102 active:scale-98"
                >
                  <Send size={15} />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
