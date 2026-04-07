import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { projects as allProjects } from '../../data/projects'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { ProjectCard } from '../ui/ProjectCard'
import { ProjectModal } from '../ui/ProjectModal'
import { SectionTitle } from '../ui/SectionTitle'

export function Projects() {
  const [modal, setModal] = useState(null)
  const mobileRailRef = useRef(null)

  const featuredProjects = allProjects.filter((project) => project.featured)

  const scrollFeaturedRail = () => {
    const rail = mobileRailRef.current
    if (!rail) return

    const card = rail.querySelector('[data-project-card]')
    const cardWidth = card?.getBoundingClientRect().width ?? rail.clientWidth * 0.88

    rail.scrollBy({
      left: cardWidth + 16,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="projects"
      className="scroll-mt-24 px-5 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Portfolio"
          title="Featured Projects"
          description="Selected builds spanning commerce, realtime, 3D, and AI-assisted workflows."
        />

        <div className="md:hidden">
          <div className="relative">
            <div
              ref={mobileRailRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <AnimatePresence mode="popLayout">
                {featuredProjects.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="w-[min(88vw,360px)] shrink-0 snap-center"
                    data-project-card
                  >
                    <ProjectCard project={p} onOpen={setModal} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {featuredProjects.length > 1 ? (
              <button
                type="button"
                onClick={scrollFeaturedRail}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-pink/40 bg-gradient-to-br from-pink via-pink-2 to-pink-3 p-3 text-white shadow-[var(--glow-sm)] backdrop-blur-md transition-transform transition-colors hover:scale-105 hover:from-pink-2 hover:to-pink"
                aria-label="Next featured project"
                data-cursor-hover
              >
                <FaChevronRight className="text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" />
              </button>
            ) : null}
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="hidden columns-1 gap-6 md:block lg:columns-2 xl:columns-3"
        >
          {allProjects.map((p) => (
            <motion.div
              key={p.id}
              variants={fadeInUp}
              className="mb-6 break-inside-avoid"
            >
              <ProjectCard project={p} onOpen={setModal} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={modal} onClose={() => setModal(null)} />
    </section>
  )
}
