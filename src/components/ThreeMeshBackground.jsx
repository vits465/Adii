import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeMeshBackground({ activeSection = 'main' }) {
  const containerRef = useRef(null)
  const activeSectionRef = useRef(activeSection)

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene & Camera setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 2.4

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Master 3D Root Group for Section Parallax
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // 1. MAIN POLYHEDRON CRYSTAL (Icosahedron with barycentric wireframe)
    const baseGeo = new THREE.IcosahedronGeometry(0.82, 2)
    const count = baseGeo.attributes.position.count
    const barycentric = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 3) {
      barycentric[i * 3 + 0] = 1; barycentric[i * 3 + 1] = 0; barycentric[i * 3 + 2] = 0
      barycentric[(i + 1) * 3 + 0] = 0; barycentric[(i + 1) * 3 + 1] = 1; barycentric[(i + 1) * 3 + 2] = 0
      barycentric[(i + 2) * 3 + 0] = 0; barycentric[(i + 2) * 3 + 1] = 0; barycentric[(i + 2) * 3 + 2] = 1
    }
    baseGeo.setAttribute('aBary', new THREE.BufferAttribute(barycentric, 3))

    // Iridescent Chromatic Shifting GLSL Shader
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uIntensity: { value: 1.0 },
      },
      vertexShader: `
        attribute vec3 aBary;
        varying vec3 vBary;
        varying vec3 vNormal;
        varying vec3 vEye;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vBary = aBary;
          vNormal = normalMatrix * normal;

          // Organic breathing vertex wave displacement
          float wave = sin(position.y * 3.5 + uTime * 1.5) * 0.04 + cos(position.x * 3.5 + uTime * 1.2) * 0.03;
          vec3 displaced = position + normal * wave;

          vec4 worldPos = modelViewMatrix * vec4(displaced, 1.0);
          vEye = -worldPos.xyz;
          vWorldPos = displaced;
          gl_Position = projectionMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vBary;
        varying vec3 vNormal;
        varying vec3 vEye;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uIntensity;

        vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
          return a + b * cos( 6.28318 * (c * t + d) );
        }

        void main() {
          // Sharp glowing wireframe lines
          vec3 d = fwidth(vBary);
          vec3 s = smoothstep(d * 0.7, d * 2.0, vBary);
          float wireframe = 1.0 - min(s.x, min(s.y, s.z));

          // Fresnel rim lighting
          vec3 normal = normalize(vNormal);
          vec3 eye = normalize(vEye);
          float fresnel = pow(1.0 - max(0.0, dot(normal, eye)), 2.2);

          // Dynamic vibrant rainbow palette (Cyan, Magenta, Violet, Gold, Emerald)
          float t = uTime * 0.12 + vWorldPos.y * 0.7 + vWorldPos.x * 0.4;
          vec3 vibrantColor = palette(
            t,
            vec3(0.5, 0.5, 0.5),
            vec3(0.5, 0.5, 0.5),
            vec3(1.0, 1.0, 1.0),
            vec3(0.0, 0.33, 0.67)
          );

          vec3 neonCyan = vec3(0.02, 0.85, 0.98);
          vec3 neonPurple = vec3(0.68, 0.25, 0.98);
          vec3 neonEmerald = vec3(0.06, 0.75, 0.50);

          vec3 wireColor = mix(vibrantColor, neonCyan, sin(uTime * 0.7) * 0.5 + 0.5);
          vec3 rimColor = mix(neonPurple, neonEmerald, cos(uTime * 0.5) * 0.5 + 0.5);

          vec3 finalColor = wireColor * (wireframe * 1.5) + rimColor * (fresnel * 1.3);
          float alpha = (wireframe * 0.95 + fresnel * 0.7) * uIntensity;

          if (alpha < 0.03) discard;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(baseGeo, customMaterial)
    masterGroup.add(mesh)

    // 2. INNER GLOWING NUCLEUS (Points lattice)
    const pointsGeo = new THREE.IcosahedronGeometry(0.72, 1)
    const pointsMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    })
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat)
    masterGroup.add(pointsMesh)

    // 3. DUAL GYROSCOPIC ORBITAL RINGS
    // Ring 1: Outer tilted cyan ring
    const ring1Geo = new THREE.TorusGeometry(1.25, 0.008, 16, 120)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3.5
    masterGroup.add(ring1)

    // Beacon 1: Traveling photon
    const beacon1Geo = new THREE.SphereGeometry(0.035, 16, 16)
    const beacon1Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    const beacon1 = new THREE.Mesh(beacon1Geo, beacon1Mat)
    masterGroup.add(beacon1)

    // Ring 2: Inner tilted violet ring
    const ring2Geo = new THREE.TorusGeometry(1.08, 0.006, 16, 100)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    ring2.rotation.x = -Math.PI / 4.5
    masterGroup.add(ring2)

    // Beacon 2: Traveling photon
    const beacon2Geo = new THREE.SphereGeometry(0.028, 16, 16)
    const beacon2Mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e })
    const beacon2 = new THREE.Mesh(beacon2Geo, beacon2Mat)
    masterGroup.add(beacon2)

    // 4. FLOATING SATELLITE CRYSTAL NODES (Octahedrons around periphery)
    const satellites = []
    const satelliteCount = 5
    const satPalette = [0x38bdf8, 0xa855f7, 0x10b981, 0xec4899, 0xf59e0b]

    for (let i = 0; i < satelliteCount; i++) {
      const satGeo = new THREE.OctahedronGeometry(0.12 + Math.random() * 0.08, 0)
      const satMat = new THREE.MeshBasicMaterial({
        color: satPalette[i % satPalette.length],
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      })
      const satMesh = new THREE.Mesh(satGeo, satMat)
      const angle = (i / satelliteCount) * Math.PI * 2
      const dist = 1.9 + Math.random() * 0.7
      satMesh.position.set(
        Math.cos(angle) * dist,
        Math.sin(angle) * dist * 0.75,
        (Math.random() - 0.5) * 1.2
      )
      satMesh.userData = {
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.015 + Math.random() * 0.02,
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatAmp: 0.08 + Math.random() * 0.05,
        baseY: satMesh.position.y,
      }
      satellites.push(satMesh)
      masterGroup.add(satMesh)
    }

    // 5. AMBIENT CONSTELLATION STARFIELD
    const particleCount = 280
    const particlePos = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const paletteColors = [
      new THREE.Color(0x06b6d4),
      new THREE.Color(0x818cf8),
      new THREE.Color(0xc084fc),
      new THREE.Color(0x34d399),
      new THREE.Color(0xfbbf24),
    ]

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3 + 0] = (Math.random() - 0.5) * 9
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 7
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 5

      const col = paletteColors[Math.floor(Math.random() * paletteColors.length)]
      particleColors[i * 3 + 0] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })
    const particleField = new THREE.Points(particleGeo, particleMat)
    scene.add(particleField)

    // Interactive mouse inertia
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1
      const normY = -(e.clientY / window.innerHeight) * 2 + 1
      targetX = normX * 0.6
      targetY = normY * 0.4
      customMaterial.uniforms.uMouse.value.set(normX, normY)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Target position interpolation based on section
    let currentX = 0
    let currentY = 0
    let currentScale = 1

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Target transforms per section
      let targetPosX = 0
      let targetPosY = 0
      let targetScale = 1

      const sec = activeSectionRef.current
      if (sec === 'main') {
        targetPosX = window.innerWidth > 1024 ? 0.35 : 0
        targetPosY = 0.05
        targetScale = 1.05
      } else if (sec === 'work') {
        targetPosX = 0.75
        targetPosY = -0.15
        targetScale = 0.8
      } else if (sec === 'profile') {
        targetPosX = -0.65
        targetPosY = 0.2
        targetScale = 0.82
      } else if (sec === 'record' || sec === 'globe') {
        targetPosX = 0.8
        targetPosY = 0.3
        targetScale = 0.6
      } else {
        targetPosX = 0
        targetPosY = 0
        targetScale = 0.85
      }

      // Smooth section lerp
      currentX += (targetPosX - currentX) * 0.04
      currentY += (targetPosY - currentY) * 0.04
      currentScale += (targetScale - currentScale) * 0.04

      masterGroup.position.x = currentX
      masterGroup.position.y = currentY
      masterGroup.scale.set(currentScale, currentScale, currentScale)

      // Damped mouse rotation
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Core rotation
      mesh.rotation.x = mouseY * 0.6 + elapsedTime * 0.16
      mesh.rotation.y = mouseX * 0.6 + elapsedTime * 0.22
      pointsMesh.rotation.x = -mouseY * 0.5 + elapsedTime * 0.11
      pointsMesh.rotation.y = -mouseX * 0.5 - elapsedTime * 0.17

      // Ring rotations
      ring1.rotation.z = elapsedTime * 0.15
      ring2.rotation.z = -elapsedTime * 0.18

      // Orbital Beacons
      const b1Angle = elapsedTime * 0.8
      beacon1.position.set(
        Math.cos(b1Angle) * 1.25,
        Math.sin(b1Angle) * 1.25 * Math.cos(ring1.rotation.x),
        Math.sin(b1Angle) * 1.25 * Math.sin(ring1.rotation.x)
      )

      const b2Angle = -elapsedTime * 0.95
      beacon2.position.set(
        Math.cos(b2Angle) * 1.08,
        Math.sin(b2Angle) * 1.08 * 0.7,
        Math.sin(b2Angle) * 1.08 * 0.7
      )

      // Floating Satellites
      satellites.forEach((sat) => {
        sat.rotation.x += sat.userData.rotSpeedX
        sat.rotation.y += sat.userData.rotSpeedY
        sat.position.y =
          sat.userData.baseY +
          Math.sin(elapsedTime * sat.userData.floatSpeed) * sat.userData.floatAmp
      })

      // Starfield subtle slow drift
      particleField.rotation.y = elapsedTime * 0.02
      particleField.rotation.x = Math.sin(elapsedTime * 0.04) * 0.06

      customMaterial.uniforms.uTime.value = elapsedTime

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      baseGeo.dispose()
      customMaterial.dispose()
      pointsGeo.dispose()
      pointsMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      beacon1Geo.dispose()
      beacon1Mat.dispose()
      beacon2Geo.dispose()
      beacon2Mat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="mesh-container"
      className="fixed inset-0 pointer-events-none transition-opacity duration-700 opacity-95"
      style={{
        zIndex: 0,
      }}
    />
  )
}
