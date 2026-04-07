import { motion } from 'framer-motion'
import { journeyItems } from '../../data/experience'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

export function Experience() {
  const beStartIndex = journeyItems.findIndex((item) => item.id === 'be')
  const preCollegeItems = beStartIndex > -1 ? journeyItems.slice(0, beStartIndex) : journeyItems
  const collegeJourneyItems = beStartIndex > -1 ? journeyItems.slice(beStartIndex) : []

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
            {preCollegeItems.length > 0 ? (
              <div
                className="pointer-events-none absolute left-[15px] top-3 bottom-8 z-0 w-[2px] bg-gradient-to-b from-pink via-pink/75 to-pink/20 shadow-[0_0_10px_rgba(236,72,153,0.35)] md:left-1/2 md:-translate-x-1/2"
                aria-hidden
              />
            ) : null}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="space-y-0"
            >
              {preCollegeItems.map((item, index) => {
                const isRight = index % 2 === 1
                const isEducation = item.kind === 'education'

                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    className={`relative pb-14 last:pb-2 md:grid md:grid-cols-2 md:gap-10 ${isRight ? 'md:pl-12' : 'md:pr-12'}`}
                  >
                    <span
                      className="absolute left-[9px] top-2 z-[1] h-4 w-4 rounded-full border-2 border-pink bg-dark shadow-[var(--glow-sm)] md:left-1/2 md:-translate-x-1/2"
                      aria-hidden
                    />

                    <div
                      className={`${isRight ? 'ml-auto md:col-start-2 md:ml-0' : 'mr-auto md:col-start-1 md:mr-0'} w-[calc(100%-1.5rem)] max-w-[26rem] md:w-auto md:max-w-none`}
                    >
                      <GlassCard
                        glowOnHover
                        className="origin-center overflow-hidden rounded-[28px] border border-pink/25 bg-gradient-to-br from-white/[0.06] via-white/[0.035] to-pink/8 p-5 shadow-[0_0_0_1px_rgba(236,72,153,0.08)] transition-transform duration-300 md:p-6"
                        initial={{ opacity: 0, x: isRight ? 60 : -60, rotateX: 8, rotateY: isRight ? -8 : 8 }}
                        whileInView={{ opacity: 1, x: 0, rotateX: 0, rotateY: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: isRight ? -4 : 4 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-pink/12 via-transparent to-transparent opacity-60" aria-hidden />
                        <div className="relative z-[1] pt-0.5">
                          {isEducation ? (
                            <>
                              <h3 className="font-syne text-xl font-bold text-white md:text-2xl">
                                {item.title}
                              </h3>
                              <p className="mt-1 font-grotesk text-pink-2">
                                {item.institution}
                              </p>
                              <span className="mt-3 inline-block rounded-full border border-pink/25 bg-pink/10 px-3 py-1 text-xs font-grotesk text-text2">
                                {item.period}
                              </span>
                            </>
                          ) : (
                            <>
                              <h3 className="font-syne text-lg font-bold leading-snug text-white md:text-xl">
                                {item.title}
                              </h3>
                              <ul className="mt-4 list-disc space-y-2.5 pl-5 font-grotesk text-sm leading-relaxed text-text2 marker:text-pink">
                                {item.bullets.map((line, idx) => (
                                  <li key={`${item.id}-${idx}`}>{line}</li>
                                ))}
                              </ul>
                            </>
                          )}
                        </div>
                      </GlassCard>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {collegeJourneyItems.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                className="relative mt-6 overflow-hidden rounded-[34px] border border-pink/20 bg-gradient-to-br from-pink/5 via-transparent to-transparent px-4 py-8 shadow-[0_0_0_1px_rgba(236,72,153,0.08)] md:mt-8 md:px-8 md:py-10"
              >
                <div
                  className="pointer-events-none absolute left-[15px] top-8 bottom-8 z-0 w-[2px] bg-gradient-to-b from-pink via-pink/80 to-pink/25 shadow-[0_0_10px_rgba(236,72,153,0.35)] md:left-1/2 md:-translate-x-1/2"
                  aria-hidden
                />

                {collegeJourneyItems.map((item, index) => {
                  const isRight = index % 2 === 1
                  const isEducation = item.kind === 'education'

                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className={`relative pb-14 last:pb-2 md:grid md:grid-cols-2 md:gap-10 ${isRight ? 'md:pl-12' : 'md:pr-12'}`}
                    >
                      <span
                        className="absolute left-[9px] top-2 z-[1] h-4 w-4 rounded-full border-2 border-pink bg-dark shadow-[var(--glow-sm)] md:left-1/2 md:-translate-x-1/2"
                        aria-hidden
                      />

                        <div
                          className={`${isRight ? 'ml-auto md:col-start-2 md:ml-0' : 'mr-auto md:col-start-1 md:mr-0'} w-[calc(100%-1.5rem)] max-w-[26rem] md:w-auto md:max-w-none`}
                        >
                        <GlassCard
                          glowOnHover
                          className="origin-center overflow-hidden rounded-[28px] border border-pink/25 bg-gradient-to-br from-white/[0.06] via-white/[0.035] to-pink/8 p-5 shadow-[0_0_0_1px_rgba(236,72,153,0.08)] transition-transform duration-300 md:p-6"
                          initial={{ opacity: 0, x: isRight ? 60 : -60, rotateX: 8, rotateY: isRight ? -8 : 8 }}
                          whileInView={{ opacity: 1, x: 0, rotateX: 0, rotateY: 0 }}
                          viewport={{ once: true, amount: 0.2 }}
                          whileHover={{ y: -8, scale: 1.02, rotateX: 5, rotateY: isRight ? -4 : 4 }}
                            whileTap={{ scale: 0.985 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-pink/12 via-transparent to-transparent opacity-60" aria-hidden />
                          <div className="relative z-[1] pt-0.5">
                            {isEducation ? (
                              <>
                                <h3 className="font-syne text-xl font-bold text-white md:text-2xl">
                                  {item.title}
                                </h3>
                                <p className="mt-1 font-grotesk text-pink-2">
                                  {item.institution}
                                </p>
                                <span className="mt-3 inline-block rounded-full border border-pink/25 bg-pink/10 px-3 py-1 text-xs font-grotesk text-text2">
                                  {item.period}
                                </span>
                              </>
                            ) : (
                              <>
                                <h3 className="font-syne text-lg font-bold leading-snug text-white md:text-xl">
                                  {item.title}
                                </h3>
                                <ul className="mt-4 list-disc space-y-2.5 pl-5 font-grotesk text-sm leading-relaxed text-text2 marker:text-pink">
                                  {item.bullets.map((line, idx) => (
                                    <li key={`${item.id}-${idx}`}>{line}</li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </GlassCard>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

