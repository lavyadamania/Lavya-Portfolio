const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

function getHeaders(contentType = false) {
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  }
  if (contentType) headers['Content-Type'] = 'application/json'
  return headers
}

export function isTestimonialsCloudConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

export async function fetchTestimonialsCloud() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/testimonials?select=id,name,role,company,quote,rating,created_at&order=created_at.desc`,
    {
      headers: getHeaders(),
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to fetch testimonials')
  }

  const data = await res.json()
  return Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        company: item.company,
        quote: item.quote,
        rating: Number(item.rating) || 5,
        avatar: null,
      }))
    : []
}

export async function createTestimonialCloud(payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
    method: 'POST',
    headers: {
      ...getHeaders(true),
      Prefer: 'return=representation',
    },
    body: JSON.stringify([payload]),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Failed to create testimonial')
  }

  const data = await res.json()
  return data?.[0]
    ? {
        id: data[0].id,
        name: data[0].name,
        role: data[0].role,
        company: data[0].company,
        quote: data[0].quote,
        rating: Number(data[0].rating) || 5,
        avatar: null,
      }
    : null
}
