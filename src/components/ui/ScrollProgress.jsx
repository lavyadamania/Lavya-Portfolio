import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[9990] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left rounded-full bg-pink shadow-[var(--glow-sm)] transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
