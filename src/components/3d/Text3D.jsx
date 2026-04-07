import { Center, Text3D } from '@react-three/drei'
import { useRef } from 'react'

export function Text3DName({ compact = false }) {
  const group = useRef(null)
  const pink = useRef(null)
  const white = useRef(null)

  return (
    <Center position={[0, compact ? 1.45 : 0.85, 0]}>
      <group ref={group}>
        <pointLight
          ref={pink}
          color="#e8206a"
          intensity={compact ? 2 : 2.5}
          distance={12}
          position={[2, 2, 2]}
        />
        <pointLight
          ref={white}
          color="#ffffff"
          intensity={compact ? 1.2 : 1.8}
          distance={14}
          position={[-2, 1, 2]}
        />
        <Text3D
          font="/fonts/helvetiker_bold.typeface.json"
          size={compact ? 0.22 : 0.38}
          height={compact ? 0.07 : 0.1}
          letterSpacing={compact ? -0.035 : -0.02}
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
