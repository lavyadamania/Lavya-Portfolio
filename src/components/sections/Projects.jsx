import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { projects as allProjects } from '../../data/projects'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { ProjectCard } from '../ui/ProjectCard'
import { ProjectModal } from '../ui/ProjectModal'
import { SectionTitle } from '../ui/SectionTitle'

export function Projects() {
  const [modal, setModal] = useState(null)

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
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <AnimatePresence mode="popLayout">
              {allProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="w-[min(88vw,360px)] shrink-0 snap-center"
                >
                  <ProjectCard project={p} onOpen={setModal} />
                </motion.div>
              ))}
            </AnimatePresence>
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
