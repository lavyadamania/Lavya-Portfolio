import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function SpinningShape({
  geometry,
  position,
  color,
  wireframe,
  opacity = 1,
  rotSpeed,
  bobPhase,
  emissiveIntensity = 0.6,
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!ref.current) return
    ref.current.rotation.x = t * rotSpeed[0]
    ref.current.rotation.y = t * rotSpeed[1]
    ref.current.rotation.z = t * rotSpeed[2]
    ref.current.position.y =
      position[1] + Math.sin(t * 1.2 + bobPhase) * 0.35
    const target = hovered ? 1.18 : 1
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.08)
    ref.current.scale.setScalar(scaleRef.current)
  })

  return (
    <group position={position}>
      <pointLight color={color} intensity={1.2} distance={8} />
      <mesh
        ref={ref}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          transparent={opacity < 1}
          opacity={opacity}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
    </group>
  )
}

function OctahedronCombo({ position, geometry }) {
  const group = useRef(null)
  const [hovered, setHovered] = useState(false)
  const scaleRef = useRef(1)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (!group.current) return
    group.current.rotation.x = t * 0.22
    group.current.rotation.y = t * 0.44
    group.current.rotation.z = t * 0.22
    group.current.position.y =
      position[1] + Math.sin(t * 1.2 + 2.1) * 0.35
    const target = hovered ? 1.18 : 1
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, 0.08)
    group.current.scale.setScalar(scaleRef.current)
  })

  return (
    <group position={position}>
      <pointLight color="#ff85b8" intensity={1.1} distance={8} />
      <group
        ref={group}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh geometry={geometry} castShadow>
          <meshStandardMaterial
            color="#ff85b8"
            transparent
            opacity={0.35}
            emissive="#ff85b8"
            emissiveIntensity={0.45}
            metalness={0.45}
            roughness={0.3}
          />
        </mesh>
        <mesh geometry={geometry} raycast={() => null}>
          <meshStandardMaterial
            color="#ff85b8"
            wireframe
            emissive="#ff85b8"
            emissiveIntensity={0.85}
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
      </group>
    </group>
  )
}

export function FloatingGeometry() {
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(0.55, 0), [])
  const torusGeo = useMemo(
    () => new THREE.TorusGeometry(0.42, 0.12, 12, 48),
    []
  )
  const octGeo = useMemo(() => new THREE.OctahedronGeometry(0.5, 0), [])

  return (
    <group>
      <SpinningShape
        geometry={icoGeo}
        position={[2.2, 0.8, -1]}
        color="#e8206a"
        wireframe
        rotSpeed={[0.31, 0.52, 0.18]}
        bobPhase={0}
        emissiveIntensity={0.8}
      />
      <SpinningShape
        geometry={torusGeo}
        position={[-2.4, -0.2, -0.5]}
        color="#ff4d94"
        wireframe
        rotSpeed={[0.42, 0.28, 0.36]}
        bobPhase={1.3}
        emissiveIntensity={0.75}
      />
      <OctahedronCombo position={[0.2, -1.2, 0.5]} geometry={octGeo} />
    </group>
  )
}
