import { motion } from 'framer-motion'
import { journeyItems } from '../../data/experience'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { SectionTitle } from '../ui/SectionTitle'

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-24 px-5 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Journey"
          title="Experience & Journey"
          description="Education milestones and campus events—each step on the timeline below."
        />

        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <div
              className="pointer-events-none absolute left-[15px] top-3 bottom-8 w-px bg-gradient-to-b from-pink via-pink/45 to-pink/10 md:left-[17px]"
              aria-hidden
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="space-y-0"
            >
              {journeyItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="relative pb-14 pl-10 last:pb-2 md:pl-12"
                >
                  <span
                    className="absolute left-[9px] top-2 z-[1] h-4 w-4 rounded-full border-2 border-pink bg-dark shadow-[var(--glow-sm)] md:left-[11px]"
                    aria-hidden
                  />
                  {item.kind === 'education' ? (
                    <div className="pt-0.5">
                      <h3 className="font-syne text-xl font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-grotesk text-pink-2">
                        {item.institution}
                      </p>
                      <span className="mt-3 inline-block rounded-full border border-pink/25 bg-pink/10 px-3 py-1 text-xs font-grotesk text-text2">
                        {item.period}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-syne text-lg font-bold leading-snug text-white md:text-xl">
                        {item.title}
                      </h3>
                      <ul className="mt-4 list-disc space-y-2.5 pl-5 font-grotesk text-sm leading-relaxed text-text2 marker:text-pink">
                        {item.bullets.map((line, idx) => (
                          <li key={`${item.id}-${idx}`}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

