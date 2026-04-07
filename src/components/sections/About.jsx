import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedCounter } from '../ui/AnimatedCounter'
import { personal } from '../../data/personal'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { useTilt } from '../../hooks/useTilt'

export function About() {
  const { ref, rotateX, rotateY, scale } = useTilt(10)

  return (
    <section
      id="about"
      className="relative scroll-mt-24 px-5 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="About"
          title="About Me"
          description="A snapshot of who I am, what I build, and how I collaborate."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              ref={ref}
              style={{
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
                transformStyle: 'preserve-3d',
              }}
            >
            <GlassCard glowOnHover className="p-8">
              <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-3 font-syne text-3xl font-extrabold text-white shadow-[var(--glow-sm)]">
                LD
              </div>
              <h3 className="text-center font-syne text-2xl font-bold text-white">
                {personal.name}
              </h3>
              <p className="mt-1 text-center font-grotesk text-pink-2">
                {personal.role}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-pink/25 bg-pink/10 px-3 py-1 text-xs text-text2">
                  <FaMapMarkerAlt className="text-pink" />
                  {personal.location}
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Open to roles & freelance
                </span>
              </div>
            </GlassCard>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="font-grotesk text-text2"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-syne text-2xl font-bold text-white md:text-3xl"
            >
              Crafting Digital Experiences with Purpose
            </motion.h3>
            <motion.p variants={fadeInUp} className="mt-4 leading-relaxed">
              {personal.bio}
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-4 leading-relaxed">
              {personal.bioExtended}
            </motion.p>
            <motion.ul variants={fadeInUp} className="mt-8 space-y-3">
              {personal.whatIBring.map((item) => (
                <li key={item} className="flex gap-3 text-text">
                  <span className="mt-1 text-pink">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3"
        >
          {[
            {
              end: 2,
              label: 'Years Experience (in project building)',
              suffix: '+',
            },
            { end: personal.stats.projects, label: 'Projects Built', suffix: '+' },
            { end: personal.stats.technologies, label: 'Technologies', suffix: '+' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeInUp}>
              <GlassCard
                glowOnHover
                className="flex flex-col items-center p-6 text-center"
              >
                <AnimatedCounter end={s.end} suffix={s.suffix} />
                <p className="mt-2 font-grotesk text-sm text-text3">{s.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
