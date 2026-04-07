import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const COUNT = 3000

function fillSpherePositions(array) {
  for (let i = 0; i < COUNT; i++) {
    const r = 8 * Math.cbrt(Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    array[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    array[i * 3 + 2] = r * Math.cos(phi)
  }
}

export function ParticleField({ mouseRef }) {
  const pointsRef = useRef(null)
  const orig = useRef(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [])

  useLayoutEffect(() => {
    const pos = geometry.attributes.position.array
    fillSpherePositions(pos)
    orig.current = new Float32Array(pos)
    geometry.attributes.position.needsUpdate = true
  }, [geometry])

  useFrame(({ clock }) => {
    const mesh = pointsRef.current
    if (!mesh || !orig.current) return
    const posAttr = mesh.geometry.attributes.position
    const pos = posAttr.array
    const o = orig.current
    const t = clock.elapsedTime * 0.12
    const c = Math.cos(t)
    const s = Math.sin(t)
    const mx = (mouseRef?.current?.x ?? 0) * 6
    const my = (mouseRef?.current?.y ?? 0) * 6

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      let x = o[i3]
      let y = o[i3 + 1]
      let z = o[i3 + 2]
      let rx = x * c - z * s
      let rz = x * s + z * c
      let ry = y
      const dx = rx - mx
      const dy = ry - my
      const d = Math.sqrt(dx * dx + dy * dy) + 0.55
      const f = 0.32 / d
      rx += (dx / d) * f
      ry += (dy / d) * f
      pos[i3] = rx
      pos[i3 + 1] = ry
      pos[i3 + 2] = rz
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.015}
        color="#ffd6e8"
        transparent
        opacity={0.9}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
