import { memo } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { GlassCard } from './GlassCard'
import { useTilt } from '../../hooks/useTilt'
import { truncateText } from '../../utils/helpers'

function ProjectCardInner({ project, onOpen }) {
  const { ref, rotateX, rotateY, scale } = useTilt(12)

  return (
    <GlassCard glowOnHover className="h-full overflow-hidden p-0">
      <div
        ref={ref}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transformStyle: 'preserve-3d',
        }}
        className="h-full"
      >
        <div
          role="presentation"
          onClick={() => onOpen(project)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onOpen(project)
            }
          }}
          className="flex w-full cursor-pointer flex-col text-left outline-none"
          tabIndex={0}
          data-cursor-hover
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : null}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-pink/40 via-dark-3 to-dark ${project.image ? 'opacity-60 mix-blend-multiply' : ''}`}
            />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <span className="text-center font-syne text-xl font-bold text-white drop-shadow-lg md:text-2xl">
                {project.title}
              </span>
            </div>
            {project.featured && (
              <span className="absolute right-3 top-3 rounded-full bg-pink px-3 py-1 text-xs font-semibold text-white shadow-[var(--glow-sm)]">
                Featured
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-syne text-xl font-bold text-white">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 font-grotesk text-sm text-text2">
              {truncateText(project.description, 140)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-pink/15 px-2 py-0.5 text-xs text-pink-3"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex gap-3 px-5 pb-5 pt-0 text-text2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 transition-colors hover:text-pink"
            aria-label="GitHub"
            data-cursor-hover
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 transition-colors hover:text-pink"
            aria-label="Live site"
            data-cursor-hover
          >
            <FaExternalLinkAlt className="text-lg" />
          </a>
        </div>
      </div>
    </GlassCard>
  )
}

export const ProjectCard = memo(ProjectCardInner)
