import React, { useState, useEffect } from 'react'
import ThreeMeshBackground from './components/ThreeMeshBackground'
import CurtainOverlay from './components/CurtainOverlay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'

import MainScreen from './pages/MainScreen'
import WorkScreen from './pages/WorkScreen'
import ProfileScreen from './pages/ProfileScreen'
import RecordScreen from './pages/RecordScreen'
import GlobeScreen from './pages/GlobeScreen'
import ContactScreen from './pages/ContactScreen'

export default function App() {
  const [activeSection, setActiveSection] = useState('main')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Sync with URL Hash just like undefined-shin (/#/MainScreen, /#/WorkScreen, etc.)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').toLowerCase()
      if (['main', 'mainscreen'].includes(hash)) setActiveSection('main')
      else if (['work', 'workscreen'].includes(hash)) setActiveSection('work')
      else if (['profile', 'aboutme'].includes(hash)) setActiveSection('profile')
      else if (['record', 'recordscreen'].includes(hash)) setActiveSection('record')
      else if (['globe', 'lab', '3d'].includes(hash)) setActiveSection('globe')
      else if (['contact'].includes(hash)) setActiveSection('contact')
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Update hash when activeSection changes
  const changeSection = (id) => {
    if (id === activeSection) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveSection(id)
      window.location.hash = `#/${id === 'main' ? 'MainScreen' : id}`
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 300)
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* 3D Morphing Wireframe Crystal WebGL Canvas */}
      <ThreeMeshBackground activeSection={activeSection} />

      {/* High-Fashion Split Curtain Animation */}
      <CurtainOverlay isTransitioning={isTransitioning} />

      {/* Global Editorial Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={changeSection}
      />

      {/* Screen Container */}
      <main className="relative z-10 transition-opacity duration-300">
        {activeSection === 'main' && (
          <MainScreen onNavigate={changeSection} />
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
          <RecordScreen />
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

      {/* Global Editorial Footer */}
      <Footer onNavigate={changeSection} />
    </div>
  )
}

