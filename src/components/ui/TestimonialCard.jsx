import { memo } from 'react'
import { FaStar } from 'react-icons/fa'
import { GlassCard } from './GlassCard'

function TestimonialCardInner({ item, active }) {
  return (
    <GlassCard
      glowOnHover={false}
      className={`relative h-full p-8 transition-[transform,filter] ${
        active ? 'shadow-[var(--glow)]' : 'opacity-90'
      }`}
    >
      <span
        className="pointer-events-none absolute left-4 top-2 font-syne text-8xl font-extrabold leading-none text-pink/20"
        aria-hidden
      >
        &ldquo;
      </span>
      <p className="relative z-[1] pt-10 font-grotesk text-lg leading-relaxed text-text md:text-xl">
        {item.quote}
      </p>
      <div className="relative z-[1] mt-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink to-pink-3 font-syne text-sm font-bold text-white">
          {item.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div>
          <p className="font-syne font-bold text-white">{item.name}</p>
          <p className="font-grotesk text-sm text-text2">
            {item.role}, {item.company}
          </p>
        </div>
      </div>
      <div className="relative z-[1] mt-4 flex gap-1 text-pink">
        {Array.from({ length: item.rating }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
    </GlassCard>
  )
}

export const TestimonialCard = memo(TestimonialCardInner)
