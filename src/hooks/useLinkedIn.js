import axios from 'axios'
import { useEffect, useState } from 'react'
import { linkedinPosts as fallbackPosts } from '../data/linkedin'

const CACHE_KEY = 'linkedin_portfolio_cache_v1'
const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours

function stripHtml(input = '') {
  return String(input)
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFirstImage(input = '') {
  const html = String(input)
  const srcMatch = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
  if (srcMatch?.[1]) return srcMatch[1]

  const urlMatch = html.match(/https?:\/\/[^\s"']+\.(?:png|jpe?g|gif|webp)/i)
  return urlMatch?.[0] || null
}

function toPost(item, idx) {
  const htmlBody = item.content || item.description || ''
  const plainBody = stripHtml(htmlBody)
  const title = stripHtml(item.title || '')
  const fallbackBody = plainBody || title || 'Latest update from LinkedIn.'

  return {
    id: item.guid || item.id || `li-${idx}`,
    author: stripHtml(item.author || item.creator || 'LinkedIn Update'),
    headline: stripHtml(item.role || item.subtitle || ''),
    excerpt: fallbackBody,
    date: item.pubDate || item.date || new Date().toISOString(),
    likes: Number(item.likes) || 0,
    comments: Number(item.comments) || 0,
    image:
      item.thumbnail ||
      item.image ||
      item.enclosure?.link ||
      extractFirstImage(htmlBody),
    url: item.link || item.url || '#',
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { t, posts } = JSON.parse(raw)
    if (Date.now() - t > CACHE_DURATION) return null
    return posts
  } catch {
    return null
  }
}

function writeCache(posts) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ t: Date.now(), posts })
    )
  } catch {
    /* ignore */
  }
}

function getInitialState() {
  if (typeof window === 'undefined') {
    return { posts: fallbackPosts, loading: true, error: null }
  }
  const cached = readCache()
  if (cached) {
    return { posts: cached, loading: false, error: null }
  }
  return { posts: fallbackPosts, loading: true, error: null }
}

export function useLinkedIn() {
  const [{ posts, loading, error }, setState] = useState(getInitialState)

  useEffect(() => {
    const feedUrl = import.meta.env.VITE_LINKEDIN_FEED_URL

    // If no URL is provided, skip fetching and just use fallback
    if (!feedUrl) {
      setState((prev) => ({ ...prev, loading: false }))
      return
    }

    if (!loading) return

    axios
      .get(feedUrl)
      .then((res) => {
        // Handle both raw RSS-to-JSON structures or custom ones
        // rss2json.com format: res.data.items
        const items = res.data.items || res.data
        if (Array.isArray(items)) {
          const transformed = items
            .map((item, idx) => toPost(item, idx))
            .filter((post) => post.url && post.excerpt)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4)

          if (!transformed.length) {
            throw new Error('LinkedIn feed had no usable items')
          }

          setState({ posts: transformed, loading: false, error: null })
          writeCache(transformed)
        } else {
          throw new Error('Invalid LinkedIn feed data format')
        }
      })
      .catch((err) => {
        console.error('LinkedIn fetch error:', err)
        setState({
          posts: fallbackPosts,
          loading: false,
          error: 'Could not update LinkedIn feed. Showing latest stable data.',
        })
      })
  }, [loading])

  return { posts, loading, error }
}
