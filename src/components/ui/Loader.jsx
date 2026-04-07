import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader() {
  const [show, setShow] = useState(true)
  const [mounted, setMounted] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 2500
    let raf

    const tick = (now) => {
      const p = Math.min(100, ((now - start) / dur) * 100)
      setProgress(p)
      if (p < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const t = setTimeout(() => setShow(false), dur)

    return () => {
      clearTimeout(t)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {show && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="font-syne text-6xl font-extrabold tracking-tight text-pink"
            animate={{
              textShadow: [
                '0 0 20px rgba(232,32,106,0.4)',
                '0 0 50px rgba(232,32,106,0.75)',
                '0 0 20px rgba(232,32,106,0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            LD
          </motion.div>
          <div className="mt-10 h-1 w-56 overflow-hidden rounded-full bg-dark-4">
            <motion.div
              className="h-full rounded-full bg-pink"
              style={{ width: `${progress}%` }}
              transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
            />
          </div>
          <p className="mt-3 font-grotesk text-xs text-text3">
            {Math.round(progress)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
