import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { testimonials } from '../../data/testimonials'
import { scaleIn } from '../../utils/animations'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { PinkButton } from '../ui/PinkButton'
import { TestimonialCard } from '../ui/TestimonialCard'

const STORAGE_KEY = 'user_testimonials_v1'

function readStoredItems() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveStoredItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    /* ignore */
  }
}

export function Testimonials() {
  const [userItems, setUserItems] = useState(readStoredItems)
  const [form, setForm] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
  })
  const [message, setMessage] = useState('')

  const items = [...userItems, ...testimonials]
  const [index, setIndex] = useState(0)
  const n = items.length

  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)

  useEffect(() => {
    if (n <= 1) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, 4000)
    return () => clearInterval(id)
  }, [n])

  useEffect(() => {
    if (!n) {
      setIndex(0)
      return
    }
    if (index >= n) setIndex(0)
  }, [index, n])

  const at = (offset) => items[(index + offset + n) % n]

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setMessage('')

    const name = form.name.trim()
    const quote = form.quote.trim()
    if (name.length < 2 || quote.length < 12) {
      setMessage('Please add a valid name and testimonial.')
      return
    }

    const item = {
      id: `u-${Date.now()}`,
      name,
      role: form.role.trim() || 'Visitor',
      company: form.company.trim() || 'Community',
      quote,
      rating: 5,
      avatar: null,
    }

    const updated = [item, ...userItems]
    setUserItems(updated)
    saveStoredItems(updated)
    setForm({ name: '', role: '', company: '', quote: '' })
    setMessage('Thanks! Your testimonial is now visible.')
    setIndex(0)
  }

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 px-5 py-[120px] md:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Social proof"
          title="What People Say"
          description="Share feedback in the same style and see it appear instantly."
        />

        <div className="relative mx-auto max-w-5xl">
          {n > 0 ? (
            <>
              <div className="flex items-center justify-center gap-2 md:gap-6">
                <motion.div
                  className="hidden w-[28%] shrink-0 scale-90 opacity-60 blur-[1px] md:block"
                  initial={false}
                >
                  <TestimonialCard item={at(-1)} active={false} />
                </motion.div>

                <div className="relative w-full md:w-[44%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={at(0).id}
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (n <= 1) return
                        if (info.offset.x < -60 || info.velocity.x < -400) next()
                        else if (info.offset.x > 60 || info.velocity.x > 400) prev()
                      }}
                    >
                      <TestimonialCard item={at(0)} active />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.div
                  className="hidden w-[28%] shrink-0 scale-90 opacity-60 blur-[1px] md:block"
                  initial={false}
                >
                  <TestimonialCard item={at(1)} active={false} />
                </motion.div>
              </div>

              {n > 1 ? (
                <div className="mt-8 flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={prev}
                    className="rounded-full border border-pink/30 p-3 text-pink transition-colors hover:bg-pink/10"
                    aria-label="Previous"
                    data-cursor-hover
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${
                          i === index
                            ? 'scale-125 bg-pink shadow-[var(--glow-sm)]'
                            : 'bg-pink/25'
                        }`}
                        aria-label={`Go to testimonial ${i + 1}`}
                        data-cursor-hover
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-pink/30 p-3 text-pink transition-colors hover:bg-pink/10"
                    aria-label="Next"
                    data-cursor-hover
                  >
                    <FaChevronRight />
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <GlassCard className="p-8 text-center">
              <p className="font-grotesk text-text2">
                No testimonials yet. Be the first to write one.
              </p>
            </GlassCard>
          )}

          {/* <GlassCard className="mt-10 p-5 md:p-6">
            <h3 className="font-syne text-xl font-bold text-white">Add a Testimonial</h3>
            <form onSubmit={onSubmit} className="mt-4 space-y-4 font-grotesk">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Role"
                  name="role"
                  value={form.role}
                  onChange={onChange}
                  placeholder="Designer, Founder, Engineer"
                />
              </div>

              <Field
                label="Company"
                name="company"
                value={form.company}
                onChange={onChange}
                placeholder="Company or community"
              />

              <div>
                <label className="mb-2 block text-sm text-text2">Testimonial</label>
                <textarea
                  name="quote"
                  value={form.quote}
                  onChange={onChange}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-pink/20 bg-dark-4 px-4 py-3 text-text outline-none transition-[box-shadow,border-color] focus:border-pink focus:shadow-[var(--glow-sm)]"
                />
              </div>

              {message ? <p className="text-sm text-text2">{message}</p> : null}

              <PinkButton type="submit" className="w-full !rounded-xl py-3">
                Submit Testimonial
              </PinkButton>
            </form>
          </GlassCard> */}
        </div>
      </div>
    </section>
  )
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-text2">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-pink/20 bg-dark-4 px-4 py-3 text-text outline-none transition-[box-shadow,border-color] focus:border-pink focus:shadow-[var(--glow-sm)]"
      />
    </div>
  )
}
