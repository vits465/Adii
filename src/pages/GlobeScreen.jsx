import React, { useState } from 'react'
import ThreeEarthGlobe from '../components/ThreeEarthGlobe'
import { Globe, Server, Shield, Zap, Sparkles } from 'lucide-react'

export default function GlobeScreen() {
  const [selectedCity, setSelectedCity] = useState(null)

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 glow-beacon" />
          WEBGL 3D SHADER LAB • GLOBAL DEPLOYMENT
        </div>
        <h1 className="text-3xl sm:text-5xl font-sarrif font-black text-white tracking-wide">
          INTERACTIVE 3D EARTH GLOBE.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl font-sans">
          Built with Three.js, custom GLSL atmosphere glow shaders, 8K ultra-resolution planetary surface maps, and real-time drag orbit physics.
        </p>
      </div>

      {/* 3D Globe Interactive Canvas */}
      <div className="mb-12">
        <ThreeEarthGlobe onSelectMarker={setSelectedCity} />
      </div>

      {/* Feature Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-4">
            <Zap size={20} />
          </div>
          <h3 className="font-sarrif font-bold text-lg text-white">Edge Performance</h3>
          <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
            Full-stack architectures deployed to global edge networks with Redis micro-caching, sub-100ms API response windows, and localized asset distribution.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-4">
            <Server size={20} />
          </div>
          <h3 className="font-sarrif font-bold text-lg text-white">Cross-Border Systems</h3>
          <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
            International currency formatting, dynamic Razorpay/Stripe payment routes, multilingual readiness, and multi-timezone scheduling workflows.
          </p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 mb-4">
            <Sparkles size={20} />
          </div>
          <h3 className="font-sarrif font-bold text-lg text-white">Advanced WebGL</h3>
          <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
            Hand-crafted GLSL fragment shaders, procedural noise calculations, normal bump mapping, and smooth 60fps rendering across desktop and mobile.
          </p>
        </div>
      </div>
    </section>
  )
}

