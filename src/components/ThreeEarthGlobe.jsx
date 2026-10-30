import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const MARKERS = [
  { name: 'Surat, India (HQ / Base)', lat: 21.1702, lon: 72.8311, desc: 'Development Hub & Residence', color: 0x10b981 },
  { name: 'London, UK (House of Hackney)', lat: 51.5074, lon: -0.1278, desc: 'Luxury E-Commerce Client Base', color: 0x3b82f6 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.006, desc: 'Global Scalper & High-Frequency API Hub', color: 0x8b5cf6 },
  { name: 'Dubai, UAE (JourneyFlicker)', lat: 25.2048, lon: 55.2708, desc: 'Luxury Travel Destination Corridor', color: 0xf59e0b },
  { name: 'Tokyo, Japan', lat: 35.6762, lon: 139.6503, desc: 'Global Edge Distribution & CDN Node', color: 0xec4899 },
]

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return new THREE.Vector3(x, y, z)
}

export default function ThreeEarthGlobe({ onSelectMarker }) {
  const mountRef = useRef(null)
  const [activeMarker, setActiveMarker] = useState(MARKERS[0])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth || 600
    const height = mount.clientHeight || 500

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 3.8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8)
    sunLight.position.set(5, 3, 5)
    scene.add(sunLight)

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    rimLight.position.set(-5, -2, -5)
    scene.add(rimLight)

    // Globe Group
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)

    const textureLoader = new THREE.TextureLoader()

    // Earth Sphere
    const earthRadius = 1.3
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64)

    // Load textures from public assets
    const dayTexture = textureLoader.load('/assets/earth_day.jpg')
    const normalTexture = textureLoader.load('/assets/earth_normal.jpg')
    const specularTexture = textureLoader.load('/assets/earth_specular.jpg')
    const cloudsTexture = textureLoader.load('/assets/earth_clouds.jpg')

    const earthMat = new THREE.MeshPhongMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      specularMap: specularTexture,
      specular: new THREE.Color(0x333333),
      shininess: 15,
    })
    const earthMesh = new THREE.Mesh(earthGeo, earthMat)
    globeGroup.add(earthMesh)

    // Atmosphere Clouds Layer
    const cloudsGeo = new THREE.SphereGeometry(earthRadius * 1.015, 64, 64)
    const cloudsMat = new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat)
    globeGroup.add(cloudsMesh)

    // Atmospheric Glow Halo
    const haloGeo = new THREE.SphereGeometry(earthRadius * 1.15, 32, 32)
    const haloMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          gl_FragColor = vec4(0.2, 0.6, 1.0, 1.0) * intensity * 0.7;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const haloMesh = new THREE.Mesh(haloGeo, haloMat)
    globeGroup.add(haloMesh)

    // Marker Pins
    const pinGroup = new THREE.Group()
    globeGroup.add(pinGroup)

    MARKERS.forEach((m) => {
      const pos = latLonToVector3(m.lat, m.lon, earthRadius * 1.02)
      
      // Pin dot
      const dotGeo = new THREE.SphereGeometry(0.024, 16, 16)
      const dotMat = new THREE.MeshBasicMaterial({ color: m.color })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(pos)
      pinGroup.add(dot)

      // Pulsing Ring
      const ringGeo = new THREE.RingGeometry(0.03, 0.045, 24)
      const ringMat = new THREE.MeshBasicMaterial({
        color: m.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.position.copy(pos.clone().multiplyScalar(1.002))
      ring.lookAt(pos.clone().multiplyScalar(2))
      pinGroup.add(ring)
    })

    // Drag / Orbit interaction
    let isDragging = false
    let prevMousePos = { x: 0, y: 0 }
    let rotationSpeed = { x: 0.001, y: 0.003 }

    const onMouseDown = (e) => {
      isDragging = true
      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseMove = (e) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMousePos.x
      const deltaY = e.clientY - prevMousePos.y

      globeGroup.rotation.y += deltaX * 0.005
      globeGroup.rotation.x += deltaY * 0.005

      prevMousePos = { x: e.clientX, y: e.clientY }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    mount.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    // Resize
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Render loop
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)

      if (!isDragging) {
        globeGroup.rotation.y += 0.0025
        cloudsMesh.rotation.y += 0.0035
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      mount.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement)
      }
      earthGeo.dispose()
      earthMat.dispose()
      cloudsGeo.dispose()
      cloudsMat.dispose()
      haloGeo.dispose()
      haloMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden glass-panel border border-white/10 flex flex-col items-center justify-center p-4">
      {/* 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Info Pill overlay */}
      <div className="absolute top-6 left-6 z-10 glass-panel px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse glow-beacon" />
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">WebGL Global Node</div>
          <div className="text-sm font-semibold text-white tracking-wide">3D Interactive Earth & Trade Matrix</div>
        </div>
      </div>

      {/* Interactive City Selector */}
      <div className="absolute bottom-6 inset-x-6 z-10 flex flex-wrap gap-2 justify-center">
        {MARKERS.map((m) => (
          <button
            key={m.name}
            onClick={() => {
              setActiveMarker(m)
              if (onSelectMarker) onSelectMarker(m)
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 border ${
              activeMarker?.name === m.name
                ? 'bg-white text-black font-bold border-white shadow-lg'
                : 'bg-black/60 text-zinc-300 border-white/10 hover:border-white/40'
            }`}
          >
            {m.name.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Active Marker Details */}
      {activeMarker && (
        <div className="absolute top-6 right-6 z-10 glass-panel px-4 py-2.5 rounded-xl border border-white/10 text-right max-w-[240px]">
          <div className="text-xs font-bold text-emerald-400 font-mono">{activeMarker.name}</div>
          <div className="text-xs text-zinc-400 mt-0.5">{activeMarker.desc}</div>
          <div className="text-[10px] text-zinc-500 font-mono mt-1">
            Lat: {activeMarker.lat}° | Lon: {activeMarker.lon}°
          </div>
        </div>
      )}

      <div className="absolute bottom-2 left-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pointer-events-none">
        Drag to rotate globe • 8K High-Res Shaders
      </div>
    </div>
  )
}

