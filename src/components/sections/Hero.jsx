import { Canvas } from '@react-three/fiber'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, useEffect, useRef, useSyncExternalStore } from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { HiChevronDown } from 'react-icons/hi2'
import { BackgroundMesh } from '../3d/BackgroundMesh'
import { FloatingGeometry } from '../3d/FloatingGeometry'
import { ParticleField } from '../3d/ParticleField'
import { Text3DName } from '../3d/Text3D'
import { ErrorBoundary } from '../ErrorBoundary'
import { PinkButton } from '../ui/PinkButton'
import { TypewriterText } from '../ui/TypewriterText'
import { useLenisRef } from '../../context/LenisContext'
import { personal } from '../../data/personal'
import { fadeInUp, staggerContainer } from '../../utils/animations'

function subscribeReducedMotion(cb) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Matches Tailwind `md:` (768px) — mobile is &lt;768px */
function subscribeNarrow(cb) {
  const mq = window.matchMedia('(max-width: 767px)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

function getNarrow() {
  return window.matchMedia('(max-width: 767px)').matches
}

function HeroScene({ mouseRef, showText3d }) {
  return (
    <>
      <ambientLight intensity={0.22} />
      <BackgroundMesh />
      <ParticleField mouseRef={mouseRef} />
      <FloatingGeometry />
      {showText3d && (
        <Suspense fallback={null}>
          <Text3DName />
        </Suspense>
      )}
    </>
  )
}

export function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const lenisRef = useLenisRef()
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false
  )
  const narrow = useSyncExternalStore(subscribeNarrow, getNarrow, () => true)

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, (v) => -v * 0.3)

  useEffect(() => {
    let raf = 0
    const onMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const smooth = () => {
      mouseRef.current.x +=
        (targetMouse.current.x - mouseRef.current.x) * 0.06
      mouseRef.current.y +=
        (targetMouse.current.y - mouseRef.current.y) * 0.06
      raf = requestAnimationFrame(smooth)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(smooth)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (!el) return
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -72, lerp: 0.08 })
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 md:justify-start md:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0 md:pointer-events-auto">
        {reduceMotion ? (
          <div className="h-full w-full bg-gradient-to-b from-dark-3 via-dark to-dark" />
        ) : (
          <ErrorBoundary>
            <Canvas
              camera={{ position: [0, 0.2, 10], fov: 42 }}
              dpr={[1, 2]}
              gl={{ alpha: true, antialias: true }}
              className="h-full w-full"
            >
              <HeroScene mouseRef={mouseRef} showText3d={!narrow} />
            </Canvas>
          </ErrorBoundary>
        )}
        {narrow && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-dark/40 to-dark" />
        )}
      </div>

      <motion.div
        style={{ y: narrow ? 0 : parallaxY }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-24 text-center md:mt-[min(36vh,300px)] md:pb-28 lg:mt-[32vh]"
      >
        <motion.div
          variants={fadeInUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink/25 bg-dark-3/70 px-4 py-2 font-grotesk text-xs text-text2 backdrop-blur-md md:mb-5 md:text-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities
        </motion.div>

        {narrow && (
          <motion.h1
            variants={fadeInUp}
            className="whitespace-pre-line font-syne text-4xl font-extrabold uppercase leading-tight tracking-tight text-pink drop-shadow-[var(--glow)] sm:text-5xl md:hidden"
          >
            {personal.name.split(' ').join('\n')}
          </motion.h1>
        )}

        <motion.div
          variants={fadeInUp}
          className="mt-4 min-h-[3rem] md:mt-2"
        >
          <TypewriterText texts={personal.typewriterRoles} />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="mt-4 max-w-xl font-grotesk text-text2 md:text-lg"
        >
          {personal.role} from {personal.location.split(',')[0]}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <PinkButton onClick={scrollToProjects} data-cursor-hover>
            View My Work
          </PinkButton>
          <PinkButton
            variant="outlined"
            href={personal.resumeUrl}
            download
            data-cursor-hover
          >
            Download Resume
          </PinkButton>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex gap-5 text-xl text-text2"
        >
          <a
            href={`https://github.com/${personal.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-pink hover:drop-shadow-[var(--glow-sm)]"
            aria-label="GitHub"
            data-cursor-hover
          >
            <FaGithub />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-pink hover:drop-shadow-[var(--glow-sm)]"
            aria-label="LinkedIn"
            data-cursor-hover
          >
            <FaLinkedin />
          </a>
          <a
            href={personal.instagram}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-pink hover:drop-shadow-[var(--glow-sm)]"
            aria-label="Instagram"
            data-cursor-hover
          >
            <FaInstagram />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-grotesk text-[10px] uppercase tracking-[0.35em] text-text3"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>Scroll</span>
        <HiChevronDown className="text-lg text-pink" />
      </motion.div>
    </section>
  )
}
