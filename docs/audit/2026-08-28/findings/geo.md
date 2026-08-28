# AI Search Readiness (GEO) Findings — saharasoft.org

**Score: 75/100** · robots.txt + llms.txt live-verified, 2026-08-28

## Passes
- **Crawler access:** robots.txt explicitly allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Bytespider, Applebot-Extended; CCBot blocked (deliberate, defensible); sitemap declared
- **llms.txt (2.6 KB, live 200):** well-structured — intro, What we do, 10-product table with live domains, services, key links. Top-decile for a site this size.
- **Citability foundation:** locally specific, quotable positioning ("custom software development company based in Nairobi, Kenya… water utilities… logistics fleets and event organizers"); every page has clean heading structure and factual product claims

## Issues
| Sev | Issue | Evidence | Fix |
|---|---|---|---|
| Medium | **Staging/API hostnames in llms.txt** — LLM-facing manifest points crawlers at non-production systems | `staging-garage.saharasoft.org`, `realator.api.saharasoft.org`, `courier.saharasoft.org` | Remove or replace with production URLs |
| Medium | **Nothing concrete to cite** | No statistics site-wide; no named authors; cost post explicitly withholds numbers for the cost query | Publish figures, named expertise, FAQ answers |
| Low | llms.txt omits pricing + contact links in Key links section | — | Add for completeness |
