import { motion } from 'framer-motion'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { personal } from '../../data/personal'
import { useLenisRef } from '../../context/LenisContext'

const quick = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  const lenisRef = useLenisRef()

  const go = (id) => {
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
    <footer className="relative overflow-hidden border-t border-pink/20 bg-dark-2">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-pink"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="font-syne text-2xl font-extrabold text-pink">LD</p>
            <p className="mt-3 max-w-xs font-grotesk text-sm text-text2">
              {personal.tagline}
            </p>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold uppercase tracking-widest text-text3">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 font-grotesk text-text2">
              {quick.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => go(l.id)}
                    className="hover:text-pink"
                    data-cursor-hover
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-syne text-sm font-bold uppercase tracking-widest text-text3">
              Social
            </h4>
            <div className="mt-4 flex gap-4 text-xl text-text2">
              <a
                href={`https://github.com/${personal.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink"
                aria-label="GitHub"
                data-cursor-hover
              >
                <FaGithub />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink"
                aria-label="LinkedIn"
                data-cursor-hover
              >
                <FaLinkedin />
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink"
                aria-label="Instagram"
                data-cursor-hover
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-pink/10 pt-8 font-grotesk text-xs text-text3 md:flex-row">
          <p>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <span className="rounded-full border border-pink/20 bg-pink/5 px-3 py-1 text-[11px] text-pink-3">
            Built with React & Three.js
          </span>
        </div>
      </div>
    </footer>
  )
}
