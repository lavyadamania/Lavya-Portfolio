import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { slideInFromBottom } from '../../utils/animations'

export function SectionTitle({ subtitle, title, description, id }) {
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      id={id}
      className="mb-14 max-w-3xl"
      variants={slideInFromBottom}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {subtitle && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[3px] text-pink">
          {subtitle}
        </p>
      )}
      <h2 className="font-syne text-4xl font-bold text-white md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl font-grotesk text-lg text-text2">
          {description}
        </p>
      )}
      <div className="mt-6 h-1 w-0 overflow-hidden rounded-full bg-pink/40">
        <motion.div
          className="h-full rounded-full bg-pink"
          initial={{ width: 0 }}
          animate={inView ? { width: 60 } : { width: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
