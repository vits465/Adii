import React, { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ThreeMeshBackground from './components/ThreeMeshBackground'
import TabTransitionOverlay from './components/TabTransitionOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import ApiPlaygroundModal from './components/ApiPlaygroundModal'
import ThemeSelector, { THEMES } from './components/ThemeSelector'
import { Sparkles } from 'lucide-react'

import MainScreen from './pages/MainScreen'
import WorkScreen from './pages/WorkScreen'
import ProfileScreen from './pages/ProfileScreen'
import RecordScreen from './pages/RecordScreen'
import GlobeScreen from './pages/GlobeScreen'
import ContactScreen from './pages/ContactScreen'

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [activeSection, setActiveSection] = useState('main')
  const [targetSection, setTargetSection] = useState('main')
  const [selectedProject, setSelectedProject] = useState(null)
  const [apiConsoleOpen, setApiConsoleOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('indigo')
  const [welcomeBackToast, setWelcomeBackToast] = useState(false)

  // Apply theme variables to document root
  useEffect(() => {
    const theme = THEMES[currentTheme] || THEMES.indigo
    document.documentElement.style.setProperty('--color-primary', theme.primary)
    document.documentElement.style.setProperty('--color-secondary', theme.secondary)
    document.documentElement.style.setProperty('--color-glow', theme.glow)
  }, [currentTheme])

  // Sync with URL Hash (/#/MainScreen, /#/WorkScreen, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toLowerCase()
      let dest = 'main'
      if (['main', 'mainscreen'].includes(hash)) dest = 'main'
      else if (['work', 'workscreen'].includes(hash)) dest = 'work'
      else if (['profile', 'aboutme'].includes(hash)) dest = 'profile'
      else if (['record', 'recordscreen'].includes(hash)) dest = 'record'
      else if (['globe', 'lab', '3d'].includes(hash)) dest = 'globe'
      else if (['contact'].includes(hash)) dest = 'contact'

      if (dest !== activeSection) {
        changeSection(dest)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [activeSection])

  // Browser Tab Visibility Change (When user changes browser tabs)
  useEffect(() => {
    const originalTitle = 'Aditya Chauhan — Full-Stack Developer & WebGL Architect'
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '⚡ Come back! Explore 156 Endpoints | Aditya Chauhan'
      } else {
        document.title = originalTitle
        setWelcomeBackToast(true)
        const timer = setTimeout(() => setWelcomeBackToast(false), 3200)
        return () => clearTimeout(timer)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const changeSection = (id) => {
    if (id === activeSection) return
    setTargetSection(id)
    setIsTransitioning(true)

    setTimeout(() => {
      setActiveSection(id)
      window.location.hash = `#/${id === 'main' ? 'MainScreen' : id}`
      window.scrollTo({ top: 0, behavior: 'smooth' })

      setTimeout(() => {
        setIsTransitioning(false)
      }, 150)
    }, 380)
  }

  return (
    <div className="relative min-h-screen bg-[#030712] text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden font-sans">
      {/* Cinematic 0-100% Preloader with Deep Architectural Diagnostics */}
      {!loadingComplete && (
        <Preloader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* Smooth Magnetic Follower Cursor */}
      <CustomCursor />

      {/* 3D Morphing Crystal Wireframe WebGL Canvas */}
      <ThreeMeshBackground activeSection={activeSection} />

      {/* Futuristic Cyber Tab Transition Overlay */}
      <TabTransitionOverlay
        isTransitioning={isTransitioning}
        targetSection={targetSection}
      />

      {/* Browser Tab Switch "Welcome Back" Notification Toast */}
      {welcomeBackToast && (
        <div className="fixed top-24 right-6 z-[80] pointer-events-none animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#091329]/95 border border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.5)] backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles size={14} className="text-amber-400" />
            <div className="text-xs font-mono font-bold text-white tracking-wide">
              WELCOME BACK! <span className="text-cyan-300 font-normal">RESUMING EXPERIENCE</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Editorial Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={changeSection}
      />

      {/* Screen Container with Dynamic Stagger Animation */}
      <main
        key={activeSection}
        className="relative z-10 transition-all duration-500 ease-out animate-fadeInUp"
      >
        {activeSection === 'main' && (
          <MainScreen
            onNavigate={changeSection}
            onSelectProject={setSelectedProject}
            onOpenApiConsole={() => setApiConsoleOpen(true)}
          />
        )}

        {activeSection === 'work' && (
          <WorkScreen onSelectProject={setSelectedProject} />
        )}

        {activeSection === 'profile' && (
          <ProfileScreen
            onSelectProject={setSelectedProject}
            onNavigate={changeSection}
          />
        )}

        {activeSection === 'record' && (
          <RecordScreen onOpenApiConsole={() => setApiConsoleOpen(true)} />
        )}

        {activeSection === 'globe' && (
          <GlobeScreen />
        )}

        {activeSection === 'contact' && (
          <ContactScreen />
        )}
      </main>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Interactive REST API Playground Modal */}
      <ApiPlaygroundModal
        isOpen={apiConsoleOpen}
        onClose={() => setApiConsoleOpen(false)}
      />

      {/* Floating Theme / Palette Switcher */}
      <ThemeSelector
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Global Editorial Footer */}
      <Footer onNavigate={changeSection} />
    </div>
  )
}
