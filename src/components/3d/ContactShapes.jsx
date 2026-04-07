import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export function ContactShapes() {
  const g = useRef(null)
  const box = useMemo(() => new THREE.BoxGeometry(0.35, 0.35, 0.35), [])
  const torus = useMemo(() => new THREE.TorusGeometry(0.22, 0.06, 10, 32), [])
  const tet = useMemo(() => new THREE.TetrahedronGeometry(0.32, 0), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!g.current) return
    g.current.rotation.y = t * 0.35
    g.current.children[0].position.y = Math.sin(t * 1.4) * 0.08
    g.current.children[1].position.y = Math.sin(t * 1.2 + 1) * 0.1
    g.current.children[2].position.y = Math.sin(t * 1.6 + 2) * 0.09
  })

  return (
    <group ref={g} position={[0, 0, 0]}>
      <mesh geometry={box} position={[-0.5, 0, 0]} rotation={[0.4, 0.6, 0]}>
        <meshStandardMaterial
          color="#e8206a"
          wireframe
          emissive="#e8206a"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh geometry={torus} position={[0.55, 0.1, 0]} rotation={[0.5, 0.2, 0.3]}>
        <meshStandardMaterial
          color="#ff4d94"
          emissive="#ff4d94"
          emissiveIntensity={0.45}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      <mesh geometry={tet} position={[0, -0.35, 0.2]} rotation={[0.2, 0.9, 0.1]}>
        <meshStandardMaterial
          color="#ff85b8"
          wireframe
          emissive="#ff85b8"
          emissiveIntensity={0.55}
        />
      </mesh>
      <ambientLight intensity={0.4} />
      <pointLight color="#e8206a" intensity={1.2} position={[2, 2, 2]} />
    </group>
  )
}
