# Technical SEO Findings — saharasoft.org

**Score: 85/100** · Live curl checks + local source, 2026-08-28

## Passes
- HTTPS enforced: `http://` → 308 → `https://` (Caddy); homepage live = local (byte-identical first 4KB)
- robots.txt: explicit Allow for GPTBot/ClaudeBot/PerplexityBot/Google-Extended/Applebot-Extended; CCBot blocked; sitemap declared
- sitemap.xml: 21 URLs = 19 public pages + 2 webdeveloper terms pages; exactly matches disk; homepage at `/`; 404 excluded; lastmod current
- Canonicals: unique, apex-normalized on all 19 pages
- 404: real HTTP 404 status + styled custom page (no soft-404)
- Internal links: zero orphan pages (hubs have 12–18 inbound links); blog posts carry 2–3 contextual content links each
- Rendering: 1 stylesheet, all scripts deferred — no render-blocking JS

## Issues
| Sev | Issue | Evidence | Fix |
|---|---|---|---|
| Medium | www = live duplicate host | `https://www.saharasoft.org/` → 200 full content; `http://www.` → 308 → `https://www.` (never apex); only canonicals dedupe | 308 www→apex in Caddy |
| Medium | No security headers | No HSTS / X-Content-Type-Options / Referrer-Policy / X-Frame-Options / CSP in `curl -sI` | Add baseline headers in Caddyfile |
| Low | Junk deployed | 6 `.DS_Store` + 13 `.db` files under `images/` | Purge + deploy ignore |
| Low | 404 self-canonical noise | 404.html has `<link rel=canonical href=/404.html>` | Drop canonical on 404 |
