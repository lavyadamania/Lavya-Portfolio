import { motion } from 'framer-motion'

export function PinkButton({
  children,
  variant = 'filled',
  onClick,
  href,
  icon: Icon,
  type = 'button',
  className = '',
  disabled = false,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-grotesk text-sm font-semibold transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-pink focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:pointer-events-none disabled:opacity-50'

  const styles =
    variant === 'filled'
      ? 'bg-pink text-white shadow-[var(--glow-sm)]'
      : 'border border-pink bg-transparent text-pink'

  const motionProps = disabled
    ? {}
    : {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.97 },
        transition: { type: 'spring', stiffness: 400, damping: 22 },
      }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${base} ${styles} ${className}`}
        {...motionProps}
        {...rest}
      >
        {Icon && <Icon className="text-lg" />}
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${className}`}
      {...motionProps}
      {...rest}
    >
      {Icon && <Icon className="text-lg" />}
      {children}
    </motion.button>
  )
}
