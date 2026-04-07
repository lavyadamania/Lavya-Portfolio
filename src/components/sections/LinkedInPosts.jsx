import { motion } from 'framer-motion'
import { FaLinkedin } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { useLinkedIn } from '../../hooks/useLinkedIn'
import { formatDate } from '../../utils/helpers'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { SectionTitle } from '../ui/SectionTitle'

function LinkedInSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-[340px] animate-pulse rounded-xl border border-[#0A66C2]/10 bg-dark-4/40"
        />
      ))}
    </div>
  )
}

export function LinkedInPosts() {
  const { posts, loading, error } = useLinkedIn()

  return (
    <section id="linkedin" className="scroll-mt-24 px-5 py-[120px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Professional Updates"
          title="LinkedIn Posts"
          description="Recent thoughts, milestones, and project updates from LinkedIn."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl flex-col rounded-2xl border border-[#0A66C2]/25 bg-dark-3/40 p-5 backdrop-blur-sm lg:max-w-none"
        >
          <div className="mb-4 flex items-center justify-between border-b border-[#0A66C2]/20 pb-3">
            <div className="flex items-center gap-2">
              <FaLinkedin className="text-xl text-[#0A66C2]" />
              <h3 className="font-syne text-lg font-bold text-white">
                Recent LinkedIn Activity
              </h3>
            </div>
            {error && (
              <span className="text-[10px] font-grotesk text-text3 opacity-60">
                {error}
              </span>
            )}
          </div>

          {loading ? (
            <LinkedInSkeleton />
          ) : (
            <div className="grid max-h-[480px] gap-4 overflow-y-auto pr-1 md:grid-cols-2 lg:max-h-none lg:grid-cols-2">
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  className="group overflow-hidden rounded-xl border border-[#0A66C2]/15 bg-dark-4/60 transition-colors hover:border-[#0A66C2]/30"
                >
                  <div className="flex items-start justify-between border-b border-[#0A66C2]/15 p-4">
                    <div className="min-w-0">
                      <p className="truncate font-syne text-sm font-semibold text-white">
                        {post.author || 'LinkedIn Update'}
                      </p>
                      {post.headline ? (
                        <p className="mt-0.5 truncate font-grotesk text-xs text-text3">
                          {post.headline}
                        </p>
                      ) : null}
                      <p className="mt-1 font-grotesk text-xs text-text3">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    <FaLinkedin className="shrink-0 text-xl text-[#0A66C2]" />
                  </div>

                  <div className="p-4">
                    <p className="line-clamp-5 min-h-[96px] font-grotesk text-sm leading-relaxed text-text2">
                      {post.excerpt}
                    </p>

                    {post.image ? (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 block overflow-hidden rounded-lg border border-[#0A66C2]/15"
                        data-cursor-hover
                        aria-label="Open LinkedIn post"
                      >
                        <img
                          src={post.image}
                          alt="LinkedIn post preview"
                          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </a>
                    ) : null}

                    <div className="mt-4 flex items-center justify-between text-xs text-text3">
                      <span className="text-[#0A66C2]">
                        {post.likes} likes · {post.comments} comments
                      </span>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-grotesk text-sm font-medium text-[#0A66C2] hover:underline"
                        data-cursor-hover
                      >
                        View Post
                        <FiExternalLink className="text-xs" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
