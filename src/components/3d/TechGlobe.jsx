import { Html, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { FaAws } from 'react-icons/fa6'
import {
  SiC,
  SiCss,
  SiDocker,
  SiMongodb,
  SiNeo4J,
  SiPostgresql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiVite,
} from 'react-icons/si'

function fibonacciSphere(samples, radius) {
  const pts = new Float32Array(samples * 3)
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const t = phi * i
    const x = Math.cos(t) * r
    const z = Math.sin(t) * r
    pts[i * 3] = x * radius
    pts[i * 3 + 1] = y * radius
    pts[i * 3 + 2] = z * radius
  }
  return pts
}

function GlobePoints() {
  const ref = useRef(null)
  const geometry = useMemo(() => {
    const positions = fibonacciSphere(800, 2.5)
    const colors = new Float32Array(800 * 3)
    for (let i = 0; i < 800; i++) {
      const y = positions[i * 3 + 1] / 2.5
      const t = (y + 1) / 2
      colors[i * 3] = THREE.MathUtils.lerp(1, 0.91, t)
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.85, 0.13, t)
      colors[i * 3 + 2] = THREE.MathUtils.lerp(0.91, 0.42, t)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.12
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
      />
    </points>
  )
}

const orbiters = [
  { Icon: SiC, label: 'C' },
  { Icon: SiPython, label: 'Python' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: SiMongodb, label: 'MongoDB' },
  { Icon: SiRedis, label: 'Redis' },
  { Icon: SiNeo4J, label: 'Neo4j' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiVite, label: 'Vite' },
  { Icon: SiTailwindcss, label: 'Tailwind' },
  { Icon: SiCss, label: 'CSS' },
  { Icon: SiDocker, label: 'Docker' },
  { Icon: FaAws, label: 'AWS' },
].map((item, i, arr) => ({
  ...item,
  angle: (2 * Math.PI * i) / arr.length,
}))

function OrbitLabels() {
  const group = useRef(null)
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.2
  })

  return (
    <group ref={group}>
      {orbiters.map(({ Icon, label, angle }) => {
        const r = 3.55
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        const y = 0.15 + Math.sin(angle * 2) * 0.12
        return (
          <Html key={label} position={[x, y, z]} center distanceFactor={9}>
            <div className="flex min-w-[52px] flex-col items-center gap-0.5 rounded-lg border border-pink/25 bg-dark-2/95 px-1.5 py-1 text-[8px] text-text shadow-lg backdrop-blur-md sm:min-w-[56px] sm:gap-1 sm:rounded-xl sm:px-2 sm:py-1.5 sm:text-[9px] md:text-[10px]">
              <Icon className="text-base text-pink sm:text-lg" />
              <span className="max-w-[4.5rem] text-center font-grotesk leading-tight text-text2">
                {label}
              </span>
            </div>
          </Html>
        )
      })}
    </group>
  )
}

export function TechGlobe() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <GlobePoints />
      <Suspense fallback={null}>
        <OrbitLabels />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.65}
      />
    </>
  )
}
