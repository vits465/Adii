import React from 'react'
import { Palette } from 'lucide-react'

export const THEMES = {
  indigo: {
    id: 'indigo',
    name: 'Cyber Indigo',
    primary: '#6366f1',
    secondary: '#38bdf8',
    glow: 'rgba(99, 102, 241, 0.4)',
    accentClass: 'from-indigo-500 to-cyan-400',
  },
  gold: {
    id: 'gold',
    name: 'Champagne Gold',
    primary: '#f59e0b',
    secondary: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.4)',
    accentClass: 'from-amber-400 to-yellow-300',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint',
    primary: '#10b981',
    secondary: '#2dd4bf',
    glow: 'rgba(16, 185, 129, 0.4)',
    accentClass: 'from-emerald-400 to-teal-300',
  },
}

export default function ThemeSelector({ currentTheme, onSelectTheme }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-[#090e1c]/90 border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="pl-2 pr-1 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
        <Palette size={13} className="text-indigo-400" />
        <span className="hidden sm:inline">PALETTE</span>
      </div>

      {Object.values(THEMES).map((th) => {
        const active = currentTheme === th.id
        return (
          <button
            key={th.id}
            onClick={() => onSelectTheme(th.id)}
            title={th.name}
            className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
              active
                ? 'scale-115 ring-2 ring-white shadow-lg'
                : 'opacity-60 hover:opacity-100 hover:scale-105'
            }`}
            style={{
              backgroundColor: th.primary,
            }}
          />
        )
      })}
    </div>
  )
}
