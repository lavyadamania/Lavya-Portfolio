import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const { threshold = 0.15, triggerOnce = true, rootMargin = '0px' } = options
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) obs.disconnect()
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, triggerOnce, rootMargin])

  return [ref, isInView]
}
