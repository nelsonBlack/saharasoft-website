# On-Page SEO Findings — saharasoft.org

**Score: 85/100** · All 19 pages parsed, 2026-08-28

## Passes
- Unique `<title>` on every page; exactly **1 H1 per page** everywhere
- Complete OG (10 tags) + Twitter (4 tags) + favicon + `lang="en"` on every sampled page

## Issues
| Sev | Issue | Pages |
|---|---|---|
| ~~High~~ | *CORRECTED 2026-08-28: false positive — all three pages have descriptions in multi-line `<meta>` tags the extraction regex missed.* | — |
| Medium | Title > ~65 chars (SERP truncation) | water post (105), mobile-money (86), partner post (82), homepage (75) |

## Extracted data (title length · desc length · H1 · main-content words)
- index.html · 75 · 210 · 1 · 522
- software-development-services.html · 59 · **0 (missing)** · 1 · 332
- pricing.html · 50 · 184 · 1 · 349
- about.html · 57 · 174 · 1 · 525
- contact.html · 49 · 145 · 1 · 104 (OK for contact)
- products/index.html · 51 · 146 · 1 · 214
- case-studies/index.html · 35 · **0 (missing)** · 1 · 215
- case-studies/*.html · 62–76 · 126–170 · 1 · 281–336
- blog/index.html · 27 · 120 · 1 · 300
- blog/*.html (6 posts) · 64–105 · 117–158 · 1 · 284–601 (why-invest desc 0-len title 64, but desc **missing**; word count 284 = thin)
- 404.html · 37 · 137 · 1 · 42
