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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 glow-beacon" />
          AVAILABLE FOR HIRE & CONTRACTS
        </div>
        <h1 className="text-3xl sm:text-5xl font-sarrif font-black text-white tracking-wide">
          LET'S BUILD TOGETHER.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-sans">
          Whether you need a full-stack platform, an enterprise REST API, or a cinematic web experience, I'm ready to ship production code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-sarrif font-bold text-white">Direct Channels</h3>

            <div className="space-y-4">
              {/* WhatsApp One-Click */}
              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    Instant Chat
                  </div>
                  <div className="text-sm font-mono font-bold text-white group-hover:text-emerald-200">
                    +91 8200438411
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-zinc-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Email Address
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-zinc-200">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <GithubIcon size={18} className="text-zinc-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    GitHub Profile
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-zinc-200">
                    github.com/vits465
                  </div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <LinkedinIcon size={18} className="text-zinc-300" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    LinkedIn Network
                  </div>
                  <div className="text-sm font-mono font-semibold text-white group-hover:text-zinc-200">
                    chauhan-aditya-11832431a
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    Location
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
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-zinc-200 transition-all shadow-md"
              >
                <FileDown size={15} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative">
            <h3 className="text-2xl font-sarrif font-bold text-white mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-sans">
              Leave a note with your project requirements or hiring inquiry and I will respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-sarrif font-bold text-white">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-zinc-300 font-sans max-w-md mx-auto">
                  Thank you, {formData.name || 'friend'}. Your message has been logged. You can also connect immediately via WhatsApp for faster communication.
                </p>
                <a
                  href={personalInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs tracking-wider hover:bg-emerald-400 transition-all"
                >
                  <WhatsAppIcon size={16} />
                  <span>OPEN IN WHATSAPP</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-white text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-white text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project / Role Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-white text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web Application (MERN)</option>
                    <option value="REST API Architecture">REST API Architecture & Backend Design</option>
                    <option value="Luxury E-Commerce">Luxury E-Commerce Storefront</option>
                    <option value="Interactive 3D / Three.js">Interactive 3D / Three.js Web Experience</option>
                    <option value="Full-time Engineering Role">Full-time Engineering Role</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Project Overview or Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your product vision, timeline, and goals..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 focus:border-white text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
                >
                  <Send size={14} />
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
