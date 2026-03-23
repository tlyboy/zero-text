import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          'zh-cn': `${siteUrl}/zh-cn`,
        },
      },
    },
  ]
}
