import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IoArrowUp } from 'react-icons/io5'
import { useLenisRef } from '../../context/LenisContext'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const lenisRef = useLenisRef()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo('top', { lerp: 0.12 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          onClick={goTop}
          className="fixed bottom-8 right-6 z-[9980] flex h-12 w-12 items-center justify-center rounded-full bg-pink text-white shadow-[var(--glow-sm)] transition-shadow hover:shadow-[var(--glow)] max-md:bottom-6 max-md:right-4"
          aria-label="Back to top"
        >
          <IoArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
