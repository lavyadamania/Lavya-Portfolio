import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { useLenisRef } from '../../context/LenisContext'
import { staggerContainer, fadeInUp } from '../../utils/animations'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const lenisRef = useLenisRef()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      if (window.scrollY < 120) setActive('home')
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.01 }
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  const go = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -72, lerp: 0.08 })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed left-0 right-0 top-0 z-[9992] transition-colors duration-300 ${
        open || scrolled
          ? 'border-b border-pink/20 bg-dark-2/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <button
          type="button"
          onClick={() => go('home')}
          className="font-syne text-xl font-extrabold tracking-tight text-pink drop-shadow-[var(--glow-sm)]"
          data-cursor-hover
        >
          LD
        </button>
        <ul className="hidden items-center gap-8 font-grotesk text-sm font-medium text-text2 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className={`relative transition-colors hover:text-pink ${
                  active === l.id ? 'text-pink' : ''
                }`}
                data-cursor-hover
              >
                {l.label}
                {active === l.id && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-pink shadow-[var(--glow-sm)]" />
                )}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="text-2xl text-pink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          data-cursor-hover
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute left-0 right-0 top-full z-[9991] flex h-[calc(100dvh-73px)] flex-col overflow-y-auto border-t border-pink/10 bg-dark/75 px-6 pb-10 pt-6 backdrop-blur-xl supports-[backdrop-filter]:bg-dark/60 md:hidden"
          >
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4 font-grotesk text-lg"
            >
              {links.map((l) => (
                <motion.li key={l.id} variants={fadeInUp}>
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className={`w-full border-b border-pink/10 py-3 text-left ${
                      active === l.id ? 'text-pink' : 'text-text'
                    }`}
                    data-cursor-hover
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
