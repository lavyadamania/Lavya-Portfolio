import { motion } from 'framer-motion'
import { personal } from '../../data/personal'
import { getLanguageColor } from '../../utils/helpers'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import { useGitHub } from '../../hooks/useGitHub'
import { GlassCard } from '../ui/GlassCard'
import { SectionTitle } from '../ui/SectionTitle'

function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-36 animate-pulse rounded-2xl bg-dark-4/80"
        />
      ))}
    </div>
  )
}

export function GitHub() {
  const { repos, profile, loading, error } = useGitHub()
  const chartUrl = `https://ghchart.rshah.org/e8206a/${personal.githubUsername}`

  return (
    <section id="github" className="scroll-mt-24 px-5 py-[120px] md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          subtitle="Open Source"
          title="GitHub Activity"
          description="Live snapshot of public repositories and profile stats."
        />

        {loading && <Skeleton />}

        {error && !loading && (
          <GlassCard className="border-red-500/30 p-8 text-center text-red-300">
            {error}. GitHub data will appear when the API is reachable.
          </GlassCard>
        )}

        {!loading && !error && profile && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <motion.div variants={fadeInUp}>
              <GlassCard className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
                <img
                  src={profile.avatar_url}
                  alt=""
                  loading="lazy"
                  className="h-20 w-20 rounded-full border border-pink/30"
                />
                <div className="flex-1">
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-syne text-2xl font-bold text-pink hover:underline"
                    data-cursor-hover
                  >
                    @{profile.login}
                  </a>
                  <p className="mt-2 max-w-2xl font-grotesk text-sm text-text2">
                    {profile.bio || 'Building full stack & creative web experiences.'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 font-grotesk text-sm text-text3">
                    <span>
                      <strong className="text-text">
                        {profile.followers}
                      </strong>{' '}
                      followers
                    </span>
                    <span>
                      <strong className="text-text">
                        {profile.public_repos}
                      </strong>{' '}
                      public repos
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div variants={fadeInUp} className="overflow-hidden rounded-2xl border border-pink/20 bg-dark-3/50 p-4">
              <p className="mb-3 font-grotesk text-xs uppercase tracking-widest text-text3">
                Contribution graph
              </p>
              <img
                src={chartUrl}
                alt="GitHub contribution chart"
                loading="lazy"
                className="w-full opacity-90"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {repos.map((repo) => (
                <motion.div key={repo.id} variants={fadeInUp}>
                  <GlassCard glowOnHover className="h-full p-5">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-syne text-lg font-bold text-pink hover:underline"
                      data-cursor-hover
                    >
                      {repo.name}
                    </a>
                    <p className="mt-2 line-clamp-3 font-grotesk text-sm text-text2">
                      {repo.description || 'No description provided.'}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3 font-grotesk text-xs text-text3">
                      <span>★ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              backgroundColor: getLanguageColor(repo.language),
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
