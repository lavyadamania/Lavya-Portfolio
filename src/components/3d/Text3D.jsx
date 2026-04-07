import { Center, Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Text3DName() {
  const group = useRef(null)
  const pink = useRef(null)
  const white = useRef(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.65) * 0.07
    }
    if (pink.current) {
      pink.current.position.x = Math.cos(t * 0.9) * 2.2
      pink.current.position.z = Math.sin(t * 0.9) * 1.4
    }
    if (white.current) {
      white.current.position.x = Math.sin(t * 0.7) * 2
      white.current.position.z = Math.cos(t * 0.7) * 1.6
    }
  })

  return (
    <Center position={[0, 0.85, 0]}>
      <group ref={group}>
        <pointLight
          ref={pink}
          color="#e8206a"
          intensity={2.5}
          distance={12}
          position={[2, 2, 2]}
        />
        <pointLight
          ref={white}
          color="#ffffff"
          intensity={1.8}
          distance={14}
          position={[-2, 1, 2]}
        />
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={0.38}
          height={0.1}
          curveSegments={10}
          bevelEnabled
          bevelThickness={0.018}
          bevelSize={0.018}
          bevelSegments={2}
          castShadow
        >
          LAVYA DAMANIA
          <meshStandardMaterial
            color="#e8206a"
            metalness={0.8}
            roughness={0.2}
            emissive="#e8206a"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </group>
    </Center>
  )
}
