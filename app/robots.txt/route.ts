import { siteUrl } from '@/lib/site'

export async function GET() {
  const body = `# Content Signals
#
# search:   building a search index and providing search results.
# ai-input: inputting content into AI models (e.g., RAG, grounding).
# ai-train: training or fine-tuning AI models.

User-agent: *
Content-Signal: search=yes,ai-input=yes,ai-train=yes
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
