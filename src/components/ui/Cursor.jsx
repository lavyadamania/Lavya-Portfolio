import { useEffect, useRef } from 'react'
import { lerp } from '../../utils/helpers'

export function Cursor() {
  const dot = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const ringEl = useRef(null)
  const dotEl = useRef(null)
  const raf = useRef(0)
  const hoverable = useRef(false)
  const invert = useRef(false)

  useEffect(() => {
    document.body.classList.add('cursor-none')

    const isHoverable = (el) => {
      if (!el || el === document.body) return false
      const tag = el.tagName
      if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT')
        return true
      if (el.getAttribute('role') === 'button') return true
      if (el.closest('[data-cursor-hover]')) return true
      if (el.closest('a, button, [role="button"]')) return true
      return false
    }

    const isDarkBg = (el) => {
      const n = el?.closest?.('[data-cursor-invert]')
      return Boolean(n)
    }

    const onMove = (e) => {
      dot.current.x = e.clientX
      dot.current.y = e.clientY
      const t = e.target
      hoverable.current = isHoverable(t)
      invert.current = isDarkBg(t)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      ring.current.x = lerp(ring.current.x, dot.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, dot.current.y, 0.12)

      if (dotEl.current) {
        dotEl.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringEl.current) {
        const size = hoverable.current ? 52 : 36
        ringEl.current.style.width = `${size}px`
        ringEl.current.style.height = `${size}px`
        ringEl.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
        ringEl.current.style.borderColor = invert.current
          ? 'rgba(232,232,240,0.85)'
          : 'rgba(232,32,106,0.75)'
        ringEl.current.style.background = invert.current
          ? 'rgba(232,32,106,0.15)'
          : 'transparent'
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotEl}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-pink shadow-[var(--glow-sm)] will-change-transform max-md:hidden"
        aria-hidden
      />
      <div
        ref={ringEl}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border-2 border-pink/70 will-change-transform max-md:hidden"
        style={{ width: 36, height: 36 }}
        aria-hidden
      />
    </>
  )
}
