import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { TechGlobe } from '../3d/TechGlobe'
import { ErrorBoundary } from '../ErrorBoundary'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'
import { SkillBar } from '../ui/SkillBar'
import { skillCategories } from '../../data/skills'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 px-5 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Stack"
          title="Skills & Technologies"
          description="Tools I reach for to ship reliable, expressive products."
        />

        <div className="relative mt-2 h-[min(360px,52vh)] w-full touch-pan-y md:mt-0 md:h-[400px]">
          <ErrorBoundary>
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 45 }}
              dpr={[1, 2]}
              className="h-full w-full"
            >
              <Suspense
                fallback={
                  <mesh>
                    <boxGeometry />
                    <meshBasicMaterial color="#e8206a" wireframe />
                  </mesh>
                }
              >
                <TechGlobe />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {skillCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <motion.div key={cat.id} variants={fadeInUp}>
                <GlassCard
                  glowOnHover
                  className="h-full p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="mb-6 flex items-center gap-3 border-b border-pink/15 pb-4">
                    <Icon className="text-2xl text-pink" />
                    <h3 className="font-syne text-xl font-bold text-white">
                      {cat.name}
                    </h3>
                  </div>
                  {cat.skills.map((s) => (
                    <SkillBar key={s.name} name={s.name} icon={s.icon} />
                  ))}
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
