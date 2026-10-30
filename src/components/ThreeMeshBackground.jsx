import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeMeshBackground({ activeSection = 'main' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 1.6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Create Polyhedron Geometry (Subdivided Icosahedron)
    const baseGeo = new THREE.IcosahedronGeometry(0.72, 2)
    const pos = baseGeo.attributes.position
    const count = pos.count

    // Compute barycentric coordinates for procedural geometric wireframe edges
    const barycentric = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 3) {
      barycentric[i * 3 + 0] = 1; barycentric[i * 3 + 1] = 0; barycentric[i * 3 + 2] = 0;
      barycentric[(i + 1) * 3 + 0] = 0; barycentric[(i + 1) * 3 + 1] = 1; barycentric[(i + 1) * 3 + 2] = 0;
      barycentric[(i + 2) * 3 + 0] = 0; barycentric[(i + 2) * 3 + 1] = 0; barycentric[(i + 2) * 3 + 2] = 1;
    }
    baseGeo.setAttribute('aBary', new THREE.BufferAttribute(barycentric, 3))

    // Shader Material inspired by undefined-shin's GLSL crystal
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
        uniform float uTime;

        void main() {
          vBary = aBary;
          vNormal = normalMatrix * normal;
          
          // Subtle organic breathing vertex displacement
          vec3 displaced = position + normal * (sin(position.y * 5.0 + uTime * 1.5) * 0.035);
          vec4 worldPos = modelViewMatrix * vec4(displaced, 1.0);
          vEye = -worldPos.xyz;
          gl_Position = projectionMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vBary;
        varying vec3 vNormal;
        varying vec3 vEye;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uIntensity;

        void main() {
          // Sharp glowing wireframe lines
          vec3 d = fwidth(vBary);
          vec3 s = smoothstep(d * 0.8, d * 1.8, vBary);
          float wireframe = 1.0 - min(s.x, min(s.y, s.z));

          // Fresnel rim lighting
          vec3 normal = normalize(vNormal);
          vec3 eye = normalize(vEye);
          float fresnel = pow(1.0 - max(0.0, dot(normal, eye)), 2.8);

          // Subtle iridescent gradient
          vec3 lineCol = mix(vec3(0.9, 0.95, 1.0), vec3(0.3, 0.6, 1.0), sin(uTime * 0.5 + normal.y * 3.0) * 0.5 + 0.5);
          vec3 faceCol = vec3(0.02, 0.03, 0.06);

          vec3 finalColor = mix(faceCol, lineCol, wireframe * 0.85 + fresnel * 0.45);
          float alpha = (wireframe * 0.9 + fresnel * 0.5) * uIntensity;

          if (alpha < 0.05) discard;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(baseGeo, customMaterial)
    scene.add(mesh)

    // Inner glowing core points
    const pointsGeo = new THREE.IcosahedronGeometry(0.68, 1)
    const pointsMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.45,
    })
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat)
    scene.add(pointsMesh)

    // Ambient floating particles
    const particleCount = 200
    const particlePos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 6
      particlePos[i + 1] = (Math.random() - 0.5) * 6
      particlePos[i + 2] = (Math.random() - 0.5) * 4
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
    })
    const particleField = new THREE.Points(particleGeo, particleMat)
    scene.add(particleField)

    // Mouse tracking with inertia
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

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Damped mouse rotation
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Mesh rotation
      mesh.rotation.x = mouseY + elapsedTime * 0.12
      mesh.rotation.y = mouseX + elapsedTime * 0.18
      pointsMesh.rotation.x = -mouseY + elapsedTime * 0.08
      pointsMesh.rotation.y = -mouseX + elapsedTime * 0.12

      particleField.rotation.y = elapsedTime * 0.02

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
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="mesh-container"
      className="fixed inset-0 pointer-events-none transition-opacity duration-700 opacity-90"
      style={{
        zIndex: 0,
      }}
    />
  )
}

