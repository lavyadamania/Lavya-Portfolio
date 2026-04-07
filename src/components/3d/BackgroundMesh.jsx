import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
uniform float uTime;
uniform float uScrollY;
varying float vDisp;
void main() {
  vec3 pos = position;
  float w = sin(pos.x * 0.35 + uTime * 0.45) * cos(pos.z * 0.42 + uTime * 0.28);
  w += sin(pos.z * 0.28 + uScrollY * 0.0018) * 0.14;
  float disp = w * 0.14;
  pos.y += disp;
  vDisp = disp;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`

const fragmentShader = `
varying float vDisp;
void main() {
  vec3 a = vec3(0.12, 0.02, 0.06);
  vec3 b = vec3(0.05, 0.02, 0.11);
  float t = clamp(vDisp * 3.5 + 0.45, 0.0, 1.0);
  vec3 col = mix(a, b, t);
  gl_FragColor = vec4(col, 0.32);
}
`

export function BackgroundMesh() {
  const meshRef = useRef(null)
  const scrollRef = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScrollY: { value: 0 },
    }),
    []
  )

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [uniforms]
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
    uniforms.uScrollY.value = scrollRef.current
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-0.45, 0.2, 0.1]}
      position={[0, -2, -8]}
      material={material}
    >
      <planeGeometry args={[20, 20, 80, 80]} />
    </mesh>
  )
}
