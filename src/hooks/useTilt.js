import { useEffect, useRef, useState } from 'react'
import { lerp } from '../utils/helpers'

export function useTilt(maxTilt = 15) {
  const ref = useRef(null)
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const target = useRef({ x: 0, y: 0, s: 1 })
  const current = useRef({ x: 0, y: 0, s: 1 })
  const rafRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const loop = () => {
      const c = current.current
      const t = target.current
      c.x = lerp(c.x, t.x, 0.15)
      c.y = lerp(c.y, t.y, 0.15)
      c.s = lerp(c.s, t.s, 0.18)
      setTransform({ rotateX: c.x, rotateY: c.y, scale: c.s })
      const settled =
        Math.abs(c.x - t.x) < 0.05 &&
        Math.abs(c.y - t.y) < 0.05 &&
        Math.abs(c.s - t.s) < 0.01
      if (!settled) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        rafRef.current = 0
      }
    }

    const startLoop = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      target.current.y = px * 2 * maxTilt
      target.current.x = -py * 2 * maxTilt
      target.current.s = 1.02
      startLoop()
    }

    const onLeave = () => {
      target.current.x = 0
      target.current.y = 0
      target.current.s = 1
      startLoop()
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxTilt])

  return { ref, rotateX: transform.rotateX, rotateY: transform.rotateY, scale: transform.scale }
}
