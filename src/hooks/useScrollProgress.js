import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)
  const scrollYRef = useRef(0)

  useEffect(() => {
    const update = () => {
      rafRef.current = 0
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const height = doc.scrollHeight - window.innerHeight
      const pct = height <= 0 ? 0 : (scrollTop / height) * 100
      setProgress(Math.min(100, Math.max(0, pct)))
    }

    const onScroll = () => {
      scrollYRef.current = window.scrollY
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return progress
}
