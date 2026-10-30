import React, { useState } from 'react'
import {
  ArrowRight,
  FileDown,
  Layers,
  Sparkles,
  Terminal,
  Code2,
  Database,
  ExternalLink,
  Zap,
  Globe,
  Server,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  Eye,
} from 'lucide-react'
import { personalInfo, projectsData, skillsData, educationAndCertifications } from '../data/portfolioData'
import { GithubIcon } from '../components/SocialIcons'

export default function MainScreen({ onNavigate, onSelectProject, onOpenApiConsole }) {
  const [activeApiTab, setActiveApiTab] = useState('products')

  // Featured flagship projects to spotlight on the homepage
  const spotlightProjects = projectsData.slice(0, 3)

  const apiSnippets = {
    products: {
      method: 'GET',
      route: '/api/v1/products?category=wallpaper&page=1&limit=6',
      status: '200 OK',
      time: '28ms',
      json: `{
  "success": true,
  "count": 6,
  "total": 48,
  "domain": "house_of_hackney",
  "data": [
    {
      "_id": "65e0a81f",
      "sku": "HOH-WP-001",
      "name": "Artemis Velvet Wallpaper",
      "price": 24500,
      "stock": 14,
      "inStock": true,
      "currency": "INR"
    }
  ]
}`,
    },
    checkout: {
      method: 'POST',
      route: '/api/v1/orders/checkout',
      status: '201 CREATED',
      time: '42ms',
      json: `{
  "success": true,
  "orderId": "order_HOH_99214",
  "paymentGateway": "RAZORPAY_V1",
  "razorpayOrderId": "order_PlK8z9aJ",
  "amount": 49000,
  "currency": "INR",
  "acidTransaction": "COMMITTED"
}`,
    },
    health: {
      method: 'GET',
      route: '/api/v1/health/system-metrics',
      status: '200 HEALTHY',
      time: '14ms',
      json: `{
  "status": "UP",
  "uptime": "99.98%",
  "endpoints": 156,
  "collections": 43,
  "dbLatency": "3ms",
  "region": "ap-south-1 (Mumbai)"
}`,
    },
  }

  return (
    <div className="relative z-10 font-sans">
      {/* =========================================================================
          SECTION 1: HERO VIEWPORT (Aesthetic Editorial Typography & WebGL Accent)
          ========================================================================= */}
      <section className="relative min-h-[95vh] flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Background Aurora Orbs */}
        <div className="aurora-orb w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/25 via-blue-600/20 to-transparent top-10 -left-40" />
        <div className="aurora-orb w-[650px] h-[650px] bg-gradient-to-tr from-violet-600/25 via-fuchsia-500/20 to-transparent top-32 -right-40" />

        {/* Top Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2.5 bg-[#091124]/90 border border-emerald-500/40 px-4 py-1.5 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse glow-emerald" />
            <span className="text-xs font-mono tracking-widest uppercase text-emerald-300 font-bold">
              {personalInfo.status}
            </span>
          </div>

          <div className="text-xs font-mono text-zinc-300 tracking-wider flex items-center gap-2 bg-[#091124]/90 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-xl shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-zinc-400">NODE:</span>
            <span className="text-cyan-300 font-bold">SURAT, GUJARAT, INDIA</span>
          </div>
        </div>

        {/* Central Master Kinetic Typography */}
        <div className="my-auto py-10 text-center select-none relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono tracking-widest uppercase text-white bg-gradient-to-r from-violet-500/20 via-cyan-500/20 to-fuchsia-500/20 border border-cyan-400/50 mb-6 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <Sparkles size={14} className="text-amber-400 animate-pulse" />
            <span className="font-bold tracking-widest">{personalInfo.name}</span>
          </div>

          <div className="relative">
            <h1 className="font-sarrif font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 via-indigo-300 to-violet-400 drop-shadow-[0_15px_40px_rgba(6,182,212,0.35)]">
              FULL-STACK
            </h1>

            <h2 className="font-sarrif font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 via-cyan-300 to-indigo-400 mt-2 sm:mt-4 drop-shadow-[0_15px_40px_rgba(16,185,129,0.3)]">
              ARCHITECT.
            </h2>
          </div>

          <p className="max-w-2xl mx-auto mt-6 text-sm sm:text-base md:text-lg text-zinc-300 font-sans leading-relaxed">
            Crafting high-velocity MERN platforms, 156-endpoint enterprise REST APIs, transaction-safe booking engines, and cinematic Three.js WebGL experiences.
          </p>

          {/* Quick Skill Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {['REACT.JS', 'NODE.JS & EXPRESS', 'MONGODB (43 COLLECTIONS)', 'THREE.JS & SHADERS', 'NEXT.JS', 'REST APIS', 'RAZORPAY'].map((skill, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white/5 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 transition-colors shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <button
              onClick={() => onNavigate('work')}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-600 text-white font-mono font-bold text-xs tracking-widest hover:opacity-95 transition-all shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:scale-105 active:scale-95"
            >
              <span>EXPLORE ALL WORK</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#0a1226]/90 hover:bg-white/10 text-white font-mono font-semibold text-xs tracking-widest border border-cyan-400/40 hover:border-cyan-300 backdrop-blur-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-105 active:scale-95"
            >
              <span>VIEW FULL PROFILE</span>
            </button>

            <a
              href={personalInfo.resumePath}
              download="Aditya_Chauhan_Resume.pdf"
              className="flex items-center gap-2 px-6 py-4 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono font-semibold text-xs tracking-widest border border-emerald-500/50 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95"
            >
              <FileDown size={15} />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>

        {/* Hero Bottom Telemetry Pillar */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center relative z-10">
          <div className="glass-panel p-4 rounded-2xl border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              156+
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80 mt-1 font-semibold">
              Documented Endpoints
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-violet-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-fuchsia-400">
              43
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-violet-300/80 mt-1 font-semibold">
              MongoDB Schemas
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-emerald-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              8.78
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300/80 mt-1 font-semibold">
              BCA SGPA Distinction
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:border-amber-400 transition-colors">
            <div className="text-3xl sm:text-4xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-400">
              6
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 mt-1 font-semibold">
              Live Production Apps
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CREATIVE ARCHITECTURAL MANIFESTO & 3 PILLARS
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            ENGINEERING PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300 tracking-wide">
            THE ARCHITECTURAL PARADIGM.
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed font-sans">
            Modern web applications should not just function reliably—they must captivate visually and perform without friction. Here is how I structure mission-critical digital systems from schema to shader:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Layered Backend Architecture */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <Server size={24} />
              </div>
              <div className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase mb-1">
                PILLAR 01 // RELIABILITY
              </div>
              <h3 className="text-2xl font-sarrif font-bold text-white mb-3">
                3-Tier Layered Architecture
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                Clean separation of concerns with Controller → Service → Repository patterns. Isolating business rules from persistence allows sub-40ms queries and clean scalability.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-cyan-300">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>156 Modular Endpoints</span>
            </div>
          </div>

          {/* Pillar 2: Spatial WebGL & Creative 3D */}
          <div className="glass-panel p-8 rounded-3xl border border-violet-500/30 hover:border-violet-400 transition-all duration-300 hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-500/20 text-violet-300 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <div className="text-xs font-mono text-violet-400 font-bold tracking-widest uppercase mb-1">
                PILLAR 02 // CREATIVITY
              </div>
              <h3 className="text-2xl font-sarrif font-bold text-white mb-3">
                Spatial WebGL & GLSL Shaders
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                Real-time 60FPS Three.js meshes, barycentric wireframe shaders, 8K planetary textures, and interactive physics that transform flat pages into sensory experiences.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-violet-300">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>GPU-Accelerated 60 FPS</span>
            </div>
          </div>

          {/* Pillar 3: Atomic Data & Payment Resilience */}
          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <div className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase mb-1">
                PILLAR 03 // INTEGRITY
              </div>
              <h3 className="text-2xl font-sarrif font-bold text-white mb-3">
                ACID Transactions & Razorpay
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                Multi-document MongoDB ACID transactions prevent race conditions during booking or stock checkout. Integrated cryptographic webhooks guarantee financial consistency.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-300">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>Zero Double-Booking Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CURATED PROJECT SPOTLIGHT (Briefs & Live Links)
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-bold">
              CURATED PRODUCTION SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-5xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300 tracking-wide">
              FEATURED PROJECT BRIEFS.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-2 max-w-xl font-sans">
              Hand-picked enterprise systems and creative web applications deployed live with full documentation and public source code.
            </p>
          </div>

          <button
            onClick={() => onNavigate('work')}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/15 text-cyan-300 hover:text-white border border-cyan-500/40 hover:border-cyan-300 text-xs font-mono font-bold tracking-wider transition-all"
          >
            <span>VIEW ALL 6 PRODUCTION APPS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3 Spotlight Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {spotlightProjects.map((project, idx) => (
            <div
              key={project.id}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                className="relative aspect-video w-full overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => onSelectProject ? onSelectProject(project) : onNavigate('work')}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/40 to-transparent opacity-85 group-hover:opacity-50 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {project.liveUrl && (
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-[11px] font-mono text-white bg-black/80 px-3 py-1 rounded-lg border border-emerald-500/40 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse glow-emerald" />
                    <span className="font-semibold">LIVE PRODUCTION</span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectProject ? onSelectProject(project) : onNavigate('work')}
                    className="text-2xl font-sarrif font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 mt-2 font-sans line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Quick Specs */}
                {project.stats && (
                  <div className="grid grid-cols-2 gap-2 my-5 pt-4 border-t border-white/10">
                    {project.stats.slice(0, 2).map((s, sIdx) => (
                      <div key={sIdx} className="text-left">
                        <div className="text-sm font-mono font-bold text-cyan-400">{s.value}</div>
                        <div className="text-[10px] font-mono uppercase text-zinc-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold"
                    >
                      <span>VISIT LIVE</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      <GithubIcon size={13} />
                      <span>CODE REPO</span>
                    </a>
                  )}

                  <button
                    onClick={() => onSelectProject ? onSelectProject(project) : onNavigate('work')}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-200 text-xs font-mono font-bold border border-white/10 transition-all hover:border-cyan-400"
                  >
                    SPECS & DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE REST API TERMINAL / BACKEND BENCHMARK PREVIEW
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ENTERPRISE MERN BACKEND RUNTIME
              </div>
              <h2 className="text-3xl sm:text-4xl font-sarrif font-bold text-white">
                Live REST API Playground.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-xl font-sans">
                Simulate production responses from House of Hackney's 156-endpoint architecture. Test payload delivery, headers, and ACID transactions.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenApiConsole ? onOpenApiConsole() : onNavigate('record')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-600 text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105 transition-all"
              >
                <Terminal size={14} />
                <span>OPEN FULL CONSOLE</span>
              </button>
            </div>
          </div>

          {/* Endpoint Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <button
              onClick={() => setActiveApiTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all border ${
                activeApiTab === 'products'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              GET /products (Catalog)
            </button>

            <button
              onClick={() => setActiveApiTab('checkout')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all border ${
                activeApiTab === 'checkout'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              POST /orders/checkout (Razorpay)
            </button>

            <button
              onClick={() => setActiveApiTab('health')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all border ${
                activeApiTab === 'health'
                  ? 'bg-violet-500/20 text-violet-300 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              GET /health/system-metrics
            </button>
          </div>

          {/* Interactive Mock Terminal Response Box */}
          <div className="rounded-2xl bg-[#040814] border border-cyan-500/30 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 bg-[#080f24] border-b border-white/10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {apiSnippets[activeApiTab].method}
                </span>
                <span className="text-zinc-200 truncate">{apiSnippets[activeApiTab].route}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {apiSnippets[activeApiTab].status}
                </span>
                <span className="text-cyan-400 font-bold">
                  {apiSnippets[activeApiTab].time}
                </span>
              </div>
            </div>

            <pre className="p-5 font-mono text-xs sm:text-sm text-cyan-300/90 overflow-x-auto leading-relaxed">
              <code>{apiSnippets[activeApiTab].json}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: ACADEMIC CREDENTIALS & ACADEMY HONORS
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Degree */}
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ACADEMIC EXCELLENCE
                </span>
                <span className="text-xs font-mono text-zinc-400">2021 – 2024</span>
              </div>
              <h3 className="text-2xl font-sarrif font-bold text-white mb-2">
                Bachelor of Computer Applications (BCA)
              </h3>
              <div className="text-sm font-sans text-cyan-300">
                Udhna Citizen College • Veer Narmad South Gujarat University (VNSGU)
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-sans">
                Graduated with Distinction, achieving an outstanding <strong className="text-amber-300">SGPA of 8.78</strong>. Specialized in relational database systems, object-oriented design, algorithmic computation, and advanced web technologies.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>LOCATION: SURAT, GUJARAT</span>
              <span className="text-emerald-400 font-bold">VERIFIED DEGREE</span>
            </div>
          </div>

          {/* Full-Stack Academy Training */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  SPECIALIZED ACADEMY TRAINING
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">COMPLETED 2024–2025</span>
              </div>
              <h3 className="text-2xl font-sarrif font-bold text-white mb-2">
                Full Stack Web Development Program
              </h3>
              <div className="text-sm font-sans text-violet-300">
                Oscar Career Point Academy • Surat, Gujarat
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-sans">
                Comprehensive practical training focusing on production-grade MERN architectures, distributed databases, authentication workflows, REST API security, and high-performance React frontends.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>CAPSTONE: HOUSE OF HACKNEY</span>
              <span className="text-cyan-300 font-bold">156 APIS / 43 COLLECTIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FINAL COLLABORATION & ACTION CTA
          ========================================================================= */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 relative text-center">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-cyan-400/40 shadow-[0_0_60px_rgba(6,182,212,0.25)] max-w-4xl mx-auto relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 mb-6 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            LET'S BUILD SOMETHING EXTRAORDINARY
          </div>

          <h2 className="text-3xl sm:text-5xl font-sarrif font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-300 tracking-wide">
            READY FOR YOUR NEXT HIGH-IMPACT ROLE.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 mt-4 max-w-xl mx-auto font-sans leading-relaxed">
            Whether you are building a high-concurrency e-commerce engine, an interactive 3D WebGL showcase, or modern web microservices—I am available to bring precision and speed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-600 text-white font-mono font-bold text-xs tracking-widest shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all"
            >
              START A CONVERSATION
            </button>

            <a
              href={personalInfo.resumePath}
              download="Aditya_Chauhan_Resume.pdf"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 hover:bg-white/15 text-zinc-200 font-mono font-semibold text-xs tracking-widest border border-white/20 transition-all hover:scale-105"
            >
              <FileDown size={15} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
