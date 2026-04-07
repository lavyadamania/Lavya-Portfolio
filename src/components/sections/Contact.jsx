import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useState, Suspense } from 'react'
import { FaLinkedin, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import { HiCheck } from 'react-icons/hi2'
import { ContactShapes } from '../3d/ContactShapes'
import { ErrorBoundary } from '../ErrorBoundary'
import { GlassCard } from '../ui/GlassCard'
import { PinkButton } from '../ui/PinkButton'
import { SectionTitle } from '../ui/SectionTitle'
import { personal } from '../../data/personal'
import { fadeInUp, staggerContainer } from '../../utils/animations'

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const missing = []
    if (!serviceId || serviceId.includes('your_')) {
      missing.push('VITE_EMAILJS_SERVICE_ID')
    }
    if (!templateId || templateId.includes('your_')) {
      missing.push('VITE_EMAILJS_TEMPLATE_ID')
    }
    if (!publicKey || publicKey.includes('your_')) {
      missing.push('VITE_EMAILJS_PUBLIC_KEY')
    }

    if (missing.length) {
      setStatus('error')
      setErrorMsg(
        `Configure ${missing.join(', ')} in .env.local and restart dev server.`
      )
      return
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey }
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.text || err?.message || 'Something went wrong.')
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-[120px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Contact"
          title="Get In Touch"
          description="Tell me about your product, timeline, and goals — I’ll respond within a few days."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              variants={fadeInUp}
              className="font-syne text-3xl font-bold text-white md:text-4xl"
            >
              Let&apos;s Build Something Amazing
            </motion.h3>
            <motion.p variants={fadeInUp} className="font-grotesk text-text2">
              Open to full-time roles, internships, and select freelance
              engagements. I&apos;m happiest collaborating with teams who care
              about design quality and thoughtful engineering.
            </motion.p>
            <motion.ul
              variants={fadeInUp}
              className="space-y-4 font-grotesk text-text2"
            >
              <li className="flex items-center gap-3">
                <span className="text-pink">✉</span>
                <a
                  href={`mailto:${personal.email}`}
                  className="hover:text-pink"
                  data-cursor-hover
                >
                  {personal.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-pink" />
                {personal.location}
              </li>
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-pink" />
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink"
                  data-cursor-hover
                >
                  linkedin.com/in/lavya-damania-6778472a7
                </a>
              </li>
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="h-48 w-full max-w-md rounded-2xl border border-pink/15 bg-dark-3/50"
            >
              <ErrorBoundary>
                <Canvas camera={{ position: [0, 0, 3.8], fov: 42 }} dpr={[1, 1.5]}>
                  <Suspense fallback={null}>
                    <ContactShapes />
                  </Suspense>
                </Canvas>
              </ErrorBoundary>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlassCard
              className={`p-6 md:p-8 ${
                status === 'error' ? 'ring-2 ring-red-500/50' : ''
              }`}
            >
              <form onSubmit={onSubmit} className="space-y-5 font-grotesk">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
                <Field
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  required
                />
                <div>
                  <label className="mb-2 block text-sm text-text2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    required
                    rows={5}
                    className="w-full rounded-xl border border-pink/20 bg-dark-4 px-4 py-3 text-text outline-none transition-[box-shadow,border-color] focus:border-pink focus:shadow-[var(--glow-sm)]"
                  />
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-400"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15">
                      <HiCheck className="text-xl" />
                    </span>
                    <span className="font-medium">Message sent!</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <PinkButton
                  type="submit"
                  className="w-full !rounded-xl py-4"
                  disabled={status === 'sending'}
                  icon={FaPaperPlane}
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </PinkButton>
              </form>
            </GlassCard>
          </motion.div>
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
