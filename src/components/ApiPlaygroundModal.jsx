import React, { useState } from 'react'
import { Terminal, Play, X, Check, Copy, Server, Database, ShieldCheck, Zap } from 'lucide-react'

const MOCK_ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/v1/products',
    category: 'Catalogue',
    desc: 'Fetch paginated luxury products with variant pricing & swatch counts',
    headers: { 'Accept': 'application/json', 'X-Api-Version': '1.0' },
    response: {
      status: 200,
      latency: '28ms',
      data: {
        page: 1,
        limit: 10,
        totalItems: 84,
        products: [
          {
            id: 'prod_981a',
            name: 'Plantasia Wallpaper — Sage',
            sku: 'HOH-WAL-001',
            price: { amount: 14000, currency: 'INR', unit: 'roll' },
            inventory: { inStock: true, availableUnits: 42 },
            variants: ['Sage', 'Indigo', 'Blush'],
            mediaUrl: 'https://res.cloudinary.com/tysd8i65/image/upload/house_of_hackney/wallpaper/plantasia',
          },
          {
            id: 'prod_442c',
            name: 'Artemis Velvet — Blush',
            sku: 'HOH-FAB-002',
            price: { amount: 8500, currency: 'INR', unit: 'meter' },
            inventory: { inStock: true, availableUnits: 120 },
            variants: ['Blush', 'Midnight'],
          },
        ],
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/orders/checkout',
    category: 'Payments',
    desc: 'Initialize transaction-safe order with Razorpay order signature lock',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer jwt.session.token' },
    response: {
      status: 201,
      latency: '46ms',
      data: {
        orderId: 'order_rzp_994821',
        razorpayKey: 'rzp_live_secret_vault',
        amount: 2250000,
        currency: 'INR',
        receipt: 'rcpt_HOH_2026_019',
        status: 'created',
        expiresAt: '2026-10-30T13:30:00Z',
      },
    },
  },
  {
    method: 'GET',
    path: '/api/v1/admin/analytics/revenue',
    category: 'Analytics',
    desc: 'MongoDB aggregation pipeline for MRR, average order value, and conversion',
    headers: { 'Authorization': 'Bearer admin.super.jwt' },
    response: {
      status: 200,
      latency: '34ms',
      data: {
        totalRevenue: '₹18,45,200',
        activeCarts: 142,
        successfulOrders: 389,
        conversionRate: '4.8%',
        topCategories: ['Wallpapers (54%)', 'Luxury Fabrics (28%)', 'Furnishings (18%)'],
        mongoPipeline: '$match → $group → $project → $sort',
      },
    },
  },
]

export default function ApiPlaygroundModal({ isOpen, onClose }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const ep = MOCK_ENDPOINTS[selectedIdx]

  const handleExecute = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 280)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(ep.response.data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-[#070b14] border border-indigo-500/40 rounded-3xl shadow-[0_0_60px_rgba(99,102,241,0.25)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0f1d]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="h-4 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
              <Terminal size={14} className="text-indigo-400" />
              <span>LIVE REST API CONSOLE (156 ENDPOINTS ENGINE)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Endpoint selector tabs */}
          <div className="flex flex-wrap gap-2">
            {MOCK_ENDPOINTS.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                  selectedIdx === idx
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/30'
                }`}
              >
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                    m.method === 'GET' ? 'bg-sky-500/30 text-sky-300' : 'bg-emerald-500/30 text-emerald-300'
                  }`}
                >
                  {m.method}
                </span>
                <span>{m.path}</span>
              </button>
            ))}
          </div>

          {/* Request URL Bar */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#0d1424] border border-indigo-500/30">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${
                ep.method === 'GET'
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {ep.method}
            </span>
            <span className="font-mono text-sm text-zinc-200 flex-1 truncate">
              https://houseofhackney-backeend.vercel.app{ep.path}
            </span>
            <button
              onClick={handleExecute}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-mono font-bold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] disabled:opacity-50"
            >
              <Play size={13} />
              <span>{loading ? 'SENDING...' : 'DISPATCH'}</span>
            </button>
          </div>

          {/* Response Console */}
          <div className="rounded-2xl bg-[#040711] border border-white/10 overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#090e1c] border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-zinc-400">Response Status:</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  {ep.response.status} OK
                </span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <Zap size={12} /> {ep.response.latency}
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? 'COPIED' : 'COPY JSON'}</span>
              </button>
            </div>

            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-[320px]">
              {JSON.stringify(ep.response.data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
