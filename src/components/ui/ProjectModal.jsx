import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa'
import { scaleIn } from '../../utils/animations'

export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-pink/25 bg-dark-2/95 p-6 shadow-[var(--glow)] md:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-pink/30 p-2 text-text2 transition-colors hover:border-pink hover:text-pink"
              aria-label="Close"
              data-cursor-hover
            >
              <FaTimes />
            </button>
            <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl border border-pink/20">
              {project.image ? (
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink/35 to-dark-3">
                <span className="font-syne text-3xl font-bold text-white">
                  {project.title}
                </span>
              </div>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-pink">
              {project.category}
            </p>
            <h2 className="mt-2 font-syne text-3xl font-bold text-white">
              {project.title}
            </h2>
            <p className="mt-4 font-grotesk leading-relaxed text-text2">
              {project.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-pink/30 bg-pink/10 px-3 py-1 text-sm text-pink-3"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-pink px-5 py-2.5 font-grotesk text-sm font-semibold text-white shadow-[var(--glow-sm)]"
                data-cursor-hover
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-pink px-5 py-2.5 font-grotesk text-sm font-semibold text-pink"
                data-cursor-hover
              >
                <FaExternalLinkAlt /> Live demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
