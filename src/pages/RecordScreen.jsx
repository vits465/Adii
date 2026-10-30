import React, { useState } from 'react'
import {
  Server,
  Database,
  ShieldCheck,
  CreditCard,
  FileText,
  ExternalLink,
  Layers,
  ArrowRight,
  Code,
  Check,
  ChevronRight,
} from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'

const DOMAIN_MODULES = [
  {
    name: 'Authentication & Access Control',
    endpoints: 18,
    collections: 4,
    desc: 'JWT token rotation, HTTP-only cookie handlers, role-based middleware (Admin, Staff, Trade Client, B2C Customer), bcrypt password hashing.',
    sampleRoutes: [
      { method: 'POST', path: '/api/v1/auth/register', desc: 'Zod-validated payload, creates customer or trade profile' },
      { method: 'POST', path: '/api/v1/auth/login', desc: 'Issues access JWT and refresh token' },
      { method: 'POST', path: '/api/v1/auth/refresh', desc: 'Rotates refresh token and issues fresh access token' },
      { method: 'GET', path: '/api/v1/auth/me', desc: 'Fetches authenticated user context and permissions' },
    ],
  },
  {
    name: 'Product Catalogue & Variants',
    endpoints: 42,
    collections: 14,
    desc: 'Deep multi-variant modeling for wallpapers, fabrics, furnishings, and paint. Dimension calculations, pattern repeats, swatch inventory.',
    sampleRoutes: [
      { method: 'GET', path: '/api/v1/products', desc: 'Faceted search, category filters, sorting & pagination' },
      { method: 'GET', path: '/api/v1/products/:slug', desc: 'Aggregated product detail with variant matrix and gallery' },
      { method: 'POST', path: '/api/v1/admin/products', desc: 'Multi-part Cloudinary image upload and variant generation' },
      { method: 'PUT', path: '/api/v1/admin/products/:id/stock', desc: 'Atomic inventory decrement with rollbacks' },
    ],
  },
  {
    name: 'Cart, Pricing & Discount Engine',
    endpoints: 24,
    collections: 6,
    desc: 'Guest vs. authenticated cart hydration, B2B tiered wholesale pricing rules, promotional voucher coupons, dynamic tax computation.',
    sampleRoutes: [
      { method: 'GET', path: '/api/v1/cart', desc: 'Computes real-time line items, subtotal, and tax' },
      { method: 'POST', path: '/api/v1/cart/items', desc: 'Appends variant with quantity and customization notes' },
      { method: 'POST', path: '/api/v1/cart/apply-coupon', desc: 'Validates expiry, minimum spend, and voucher usage limits' },
    ],
  },
  {
    name: 'Checkout & Razorpay Payments',
    endpoints: 36,
    collections: 11,
    desc: 'Order state machine (Created → Authorized → Captured → Dispatched → Refunded). Razorpay cryptographic HMAC-SHA256 signature verification.',
    sampleRoutes: [
      { method: 'POST', path: '/api/v1/orders/checkout', desc: 'Locks inventory and generates Razorpay Order ID' },
      { method: 'POST', path: '/api/v1/orders/verify-payment', desc: 'Validates payment signature before finalizing order' },
      { method: 'POST', path: '/api/v1/webhooks/razorpay', desc: 'Asynchronous event handler for captured and failed payments' },
    ],
  },
  {
    name: 'Media Pipeline & Admin Analytics',
    endpoints: 36,
    collections: 8,
    desc: 'Cloudinary media CDN integration, on-the-fly transformations (w_1400, f_auto, q_auto), sales analytics dashboard, revenue reports.',
    sampleRoutes: [
      { method: 'GET', path: '/api/v1/admin/analytics/revenue', desc: 'MongoDB aggregation pipeline for MRR, AOV, and volume' },
      { method: 'POST', path: '/api/v1/admin/media/upload', desc: 'Direct secure streaming upload to Cloudinary buckets' },
    ],
  },
]

export default function RecordScreen() {
  const [activeModule, setActiveModule] = useState(DOMAIN_MODULES[0])

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
      {/* Title Header */}
      <div className="mb-12 pb-8 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 glow-beacon" />
          ENTERPRISE CAPSTONE ARCHITECTURE ARCHIVE
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-sarrif font-black text-white tracking-wide">
          SYSTEM RECORD: HOUSE OF HACKNEY.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-3xl font-sans">
          A full-stack, enterprise-grade luxury e-commerce engine designed with a 3-layer architecture, 156 REST endpoints, and 43 MongoDB collections.
        </p>

        {/* Live Project Links */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <a
            href="https://houseofhackney.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs tracking-wider hover:bg-zinc-200 transition-all shadow-md"
          >
            <ExternalLink size={14} />
            <span>VISIT LIVE STOREFRONT</span>
          </a>

          <a
            href="https://houseofhackney-backeend.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
          >
            <Server size={14} />
            <span>LIVE API ENDPOINTS</span>
          </a>

          <a
            href="https://github.com/vits465/houseofhackney"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
          >
            <GithubIcon size={14} />
            <span>FRONTEND CODE</span>
          </a>

          <a
            href="https://github.com/vits465/houseofhackney-Backeend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs tracking-wider border border-white/20 transition-all"
          >
            <GithubIcon size={14} />
            <span>BACKEND CODE</span>
          </a>
        </div>
      </div>

      {/* 3-Tier Layered Architecture Diagram */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 mb-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              STRUCTURAL DESIGN PATTERN
            </div>
            <h2 className="text-2xl sm:text-3xl font-sarrif font-bold text-white">
              Repository → Service → Controller Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Separation of Concerns • Scalable Micro-modules
          </span>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Layer 1: Client & Middleware */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                01
              </div>
              <h3 className="font-sarrif font-bold text-base text-white">Client & Gateway</h3>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                React 19 SPA + Redux Toolkit communicating via REST JSON payloads.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              • Helmet & CORS<br />
              • Rate Limiting<br />
              • JWT Authorization
            </div>
          </div>

          {/* Layer 2: Controllers */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                02
              </div>
              <h3 className="font-sarrif font-bold text-base text-white">Route Controllers</h3>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Handles HTTP request/response cycle, status codes, and payload parsing.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              • Zod Payload Schema<br />
              • HTTP Status Mapping<br />
              • Centralized Errors
            </div>
          </div>

          {/* Layer 3: Services */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                03
              </div>
              <h3 className="font-sarrif font-bold text-base text-white">Domain Services</h3>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Pure business logic: pricing rules, discounts, Razorpay signature checks.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              • Razorpay HMAC-SHA256<br />
              • Stock Decrement Rules<br />
              • Multi-tier Pricing
            </div>
          </div>

          {/* Layer 4: Repositories & DB */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-xs mb-3">
                04
              </div>
              <h3 className="font-sarrif font-bold text-base text-white">Data Layer</h3>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Repository abstraction wrapping 43 Mongoose models and transactions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
              • 43 Collections<br />
              • Cloudinary CDN<br />
              • ACID Transactions
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Domain Module Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module Selector Sidebar */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            5 Core Domain Modules (156 Endpoints)
          </div>
          {DOMAIN_MODULES.map((mod, idx) => (
            <button
              key={idx}
              onClick={() => setActiveModule(mod)}
              className={`w-full text-left p-4 rounded-2xl transition-all border ${
                activeModule.name === mod.name
                  ? 'bg-white text-black font-bold border-white shadow-xl'
                  : 'glass-panel text-zinc-300 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span>MODULE 0{idx + 1}</span>
                <span className={activeModule.name === mod.name ? 'text-black' : 'text-emerald-400'}>
                  {mod.endpoints} Routes
                </span>
              </div>
              <div className="text-base font-sarrif font-bold mt-1">
                {mod.name}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Module Detail Panel */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400">
                  {activeModule.collections} MongoDB Collections • {activeModule.endpoints} REST Endpoints
                </span>
                <h3 className="text-2xl font-sarrif font-bold text-white mt-1">
                  {activeModule.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-sans mb-6">
              {activeModule.desc}
            </p>

            {/* Sample Endpoints Table */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                Sample Production Endpoints
              </div>
              {activeModule.sampleRoutes.map((r, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        r.method === 'GET'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : r.method === 'POST'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {r.method}
                    </span>
                    <span className="text-zinc-200">{r.path}</span>
                  </div>
                  <div className="text-[11px] font-sans text-zinc-400 text-left sm:text-right">
                    {r.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Documented in 26-Page Technical Specification PDF
            </span>
            <a
              href="https://houseofhackney-backeend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>TEST ON LIVE SWAGGER</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
