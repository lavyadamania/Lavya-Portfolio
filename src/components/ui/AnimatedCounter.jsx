import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

export function AnimatedCounter({
  end,
  duration = 1.6,
  suffix = '',
  prefix = '',
}) {
  const [val, setVal] = useState(0)
  const [ref, inView] = useInView({ threshold: 0.35, triggerOnce: true })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    const from = 0
    const to = Number(end) || 0

    const tick = (now) => {
      const p = Math.min(1, (now - start) / (duration * 1000))
      const eased = easeOutCubic(p)
      setVal(Math.round(from + (to - from) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return (
    <span
      ref={ref}
      className="font-syne text-4xl font-bold text-pink md:text-5xl"
    >
      {prefix}
      {val}
      {suffix}
    </span>
  )
}
