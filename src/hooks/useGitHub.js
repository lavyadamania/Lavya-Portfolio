import axios from 'axios'
import { useEffect, useState } from 'react'
import { personal } from '../data/personal'

const CACHE_KEY = 'github_portfolio_cache_v1'
const ONE_HOUR = 60 * 60 * 1000

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { t, profile, repos } = JSON.parse(raw)
    if (Date.now() - t > ONE_HOUR) return null
    return { profile, repos }
  } catch {
    return null
  }
}

function writeCache(profile, repos) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ t: Date.now(), profile, repos })
    )
  } catch {
    /* ignore */
  }
}

function getInitialState() {
  if (typeof window === 'undefined') {
    return { repos: [], profile: null, loading: true, error: null }
  }
  const cached = readCache()
  if (cached) {
    return {
      repos: cached.repos,
      profile: cached.profile,
      loading: false,
      error: null,
    }
  }
  return { repos: [], profile: null, loading: true, error: null }
}

export function useGitHub() {
  const [{ repos, profile, loading, error }, setState] = useState(getInitialState)

  useEffect(() => {
    if (!loading) return

    const username = personal.githubUsername
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    const userUrl = `https://api.github.com/users/${username}`
    const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`

    Promise.all([
      axios.get(userUrl, { headers }),
      axios.get(reposUrl, { headers }),
    ])
      .then(([userRes, reposRes]) => {
        setState({
          profile: userRes.data,
          repos: Array.isArray(reposRes.data) ? reposRes.data : [],
          loading: false,
          error: null,
        })
        writeCache(userRes.data, reposRes.data)
      })
      .catch((err) => {
        setState({
          repos: [],
          profile: null,
          loading: false,
          error: err?.message || 'Failed to load GitHub data',
        })
      })
  }, [loading])

  return { repos, profile, loading, error }
}
