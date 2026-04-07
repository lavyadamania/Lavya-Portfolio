import { motion } from 'framer-motion'

export function GlassCard({
  children,
  className = '',
  glowOnHover = false,
  onClick,
  ...rest
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick(e)
              }
            }
          : undefined
      }
      className={[
        'rounded-2xl border border-pink/15 bg-white/[0.03] backdrop-blur-sm transition-[box-shadow,border-color] duration-300',
        glowOnHover &&
          'hover:border-pink/40 hover:shadow-[var(--glow)]',
        onClick && 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
