import type { MetadataRoute } from 'next'

const BASE_URL = 'https://pharmaciequartierhopitaux.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/maintenance', '/admin'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
