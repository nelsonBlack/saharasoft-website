# SEO Audit Report — saharasoft.org

**Date:** 2026-08-28 · **Scope:** 19 public pages (static HTML) · **Method:** Local source audit + live HTTP checks (curl). No Lighthouse/CrUX/GSC data available in this environment — Performance is a static-weight estimate.

---

## Executive Summary

**SEO Health Score: 75 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 85 | 18.7 |
| Content Quality | 23% | 55 | 12.7 |
| On-Page SEO | 20% | 85 | 17.0 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV, estimated) | 10% | 75 | 7.5 |
| AI Search Readiness | 10% | 75 | 7.5 |
| Images | 5% | 70 | 3.5 |

**Business type:** Professional services (custom software development agency, Nairobi KE, serving Africa/worldwide).

**Verdict:** The foundation is unusually good for a small static site — HTTPS with 308 redirects, complete sitemap, per-page canonicals, full OG/Twitter cards, near-complete schema coverage, AI crawler access with llms.txt, zero missing alt text, and clean internal linking. The score is held back almost entirely by **content substance**: no human authorship, no citable numbers anywhere, thin money pages, an anonymized flagship case study, and homepage/products/services pages competing for the same intent.

### Top 5 critical issues
1. **The cost blog post refuses to answer the cost query** — `blog/custom-software-cost-kenya.html` contains no KES figures or ranges while `pricing.html` explicitly promises "ranges… read how much custom software costs in Kenya." Both pages fail the query they target.
2. **Zero human E-E-A-T** — all posts bylined "By Saharasoft Solutions" with Organization-only author schema; about.html team grid has no last names, credentials, or LinkedIn profiles.
3. **Homepage ↔ products page cannibalization** — index.html duplicates the entire 10-tile products grid verbatim; both target the same intent.
4. **Head-term services page too thin** — `software-development-services.html` was ~355 words for "custom software development services" (competitors run 1,000+). *(Note: the earlier draft of this report listed 3 missing meta descriptions — a false positive caused by a regex that missed multi-line meta tags. All pages have descriptions.)*
5. **307 orphan legacy images (~27.9 MB)** shipped in the deploy alongside junk files — 97% of the images directory was unused (the homepage actually serves `hero-collage.webp`, 73 KB).

### Top 5 quick wins
2. Add KES price ranges/tables to the cost post (fixes the pricing page's broken promise too).
3. Convert `hero-collage.png` and other large PNGs to WebP/AVIF (−60–80% weight).
4. Delete 307 orphan legacy images (~27.9 MB) and `.DS_Store`/`.db` files from the deploy.
5. Add `Person` authors with LinkedIn `sameAs` to blog posts and complete the team section.

---

## 1. Technical SEO — 85/100

### What works
- **HTTPS everywhere**: `http://` → `https://` 308 Permanent Redirect (Caddy). Cert valid.
- **robots.txt** (`robots.txt`): explicit Allow for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.; CCBot deliberately blocked; sitemap declared.
- **sitemap.xml**: exactly matches the 19 public pages (+ 2 `webdeveloper/terms_privacy_*` pages), lastmod current. 404 page correctly excluded.
- **Canonicals**: unique `rel=canonical` on every page, apex-host normalized.
- **404 handling**: `/nonexistent` returns real HTTP 404 with a styled custom page (no soft-404).
- **Internal linking**: no orphan pages — services/products/pricing/about/contact have 18 inbound links each; case-studies hub 14; blog hub 12. Blog posts cross-link contextually.
- **Clean rendering path**: one stylesheet, all `<script>` deferred/async — no render-blocking JS.

### Findings
| Severity | Finding | Evidence | Fix |
|---|---|---|---|
| **Medium** | **www is a live duplicate host.** `https://www.saharasoft.org/` serves 200 with full content (canonical tags are the only dedup). `http://www.` redirects to `https://www.` — never to apex. | curl `https://www.saharasoft.org/` → 200 | Add a 308 www → apex redirect in Caddy. |
| **Medium** | **No security headers** — no HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options, CSP. | `curl -sI https://saharasoft.org/` | Add HSTS + baseline headers in Caddyfile. |
| **Low** | **Repo/deploy hygiene**: 6 `.DS_Store` + 13 `.db` files inside `images/` get deployed. | `find images -name .DS_Store` | Purge + add to deploy ignore. |
| **Low** | `404.html` carries a self-canonical and is in the file set with a title ("Page Not Found") — harmless but noise. | 404.html | Drop canonical on 404. |

## 2. Content Quality — 55/100 (weakest category)

### What works
- Verifiable, checkable evidence: 10 named live products with real domains (tallydue.com, getbaylink.com, inbuildr.com…), consistent NAP (+254 721 137000, Nairobi) on every page.
- Local-market specificity that AI engines can quote: "M-Pesa paybill or till… usually non-negotiable for real businesses"; "The gap between reading a meter and collecting the money is where revenue disappears."
- A genuine internal-link cluster around water-utility billing (blog post ↔ TallyDue case study ↔ mobile-money post ↔ pricing).
- Dated posts (`<time>` + `datePublished`/`dateModified` schema), Challenge/Solution/Outcome case-study structure.

### Findings
| Severity | Finding | Evidence |
|---|---|---|
| **High** | **No human authorship anywhere.** Posts bylined "By Saharasoft Solutions"; team grid shows "Nelson — Founder & Lead Engineer" (no surname/credentials/LinkedIn) beside anonymous "Engineering"/"Product Design" cards. Google's E-E-A-T and AI engines both weight real people. | about.html, all blog/*.html |
| **High** | **The cost post contains no numbers.** The section literally titled "What projects cost in Kenya" says "There is no honest 'starting from' number" — while pricing.html promises the post has "the ranges Kenyan projects typically fall into." Broken internal promise; both pages target cost queries and neither answers it. | blog/custom-software-cost-kenya.html, pricing.html |
| **High** | **Flagship case study is anonymized and metric-free**: "Client: A water utility in Kenya"; sole metric is the vague "closes billing cycles in days instead of weeks," repeated verbatim on the homepage. No client name, scale, KES figures, quote, or timeframe. | case-studies/tallydue-water-utility.html, index.html |
| **High** | **Thin money pages**: services page ~355 words for the head term (competitors run 1,000+); why-invest post ~269 generic words with no Africa/Kenya angle; products hub ~200 words fully duplicated on homepage; case-studies hub ~213. | software-development-services.html, blog/why-invest-custom-software.html |
| **Medium** | **Cannibalization (3 pairs)**: (1) index.html ↔ products/index.html — identical tile-for-tile product grid; (2) index.html ↔ services page — both funnel "custom software development" head intent; (3) pricing.html ↔ cost post — same query, no numbers on either. Homepage case-study block also reuses the TallyDue text nearly word-for-word. | index.html vs products/index.html |
| **Medium** | **Almost zero citable statistics.** The only numbers on the whole site are unsubstantiated "90+/8+/12+" and "days instead of weeks." AI citation and link-earning both need concrete figures. | site-wide |
| **Medium** | **No FAQ sections and no FAQPage schema** on any page — missed opportunity for pricing, cost, and services queries. | site-wide |

**Per-page adequacy:** index ~505 (adequate/lean) · services ~355 (thin) · about ~512 (adequate, weak substance) · pricing ~336 (thin, needs FAQ) · cost post ~480 (underpowered for competitive keyword; needs 1,200+) · water post ~455 (best post, still no stats) · why-invest ~269 (clearly thin) · TallyDue case study ~319 (thin, no metrics) · case-studies hub ~213 (thin) · products hub ~200 (thinnest).

## 3. On-Page SEO — 85/100

### What works
- Unique titles on all 19 pages; exactly **1 H1 per page** everywhere; logical H2/H3 hierarchy.
- Complete Open Graph (10 tags) + Twitter cards (4 tags) + favicon + `lang="en"` on every sampled page.

### Findings
| Severity | Finding | Evidence |
|---|---|---|
| **Medium** | **4 titles exceed ~65 chars** and will truncate in SERPs: water post (105), mobile-money post (86), partner post (82), homepage (75). | titles as extracted |
| **Low** | Blog index description is generic; case-study titles use "Case Study \| Brand" pattern well — keep. | blog/index.html |

## 4. Schema & Structured Data — 80/100

### What works
Near-complete, valid JSON-LD coverage with correct page-to-type mapping:
- Homepage: `Organization` + `WebSite` + `ProfessionalService` (geo coords, areaServed, priceRange)
- About: `AboutPage`+`Organization` graph · Blog: `Blog` + `BlogPosting` (dates, publisher, mainEntityOfPage) · Case studies: `Article` + `CollectionPage` · Contact: `ContactPage` · Products: `ItemList` · Pricing/Services: `ProfessionalService`. Zero invalid-JSON blocks.

### Findings
| Severity | Finding | Fix |
|---|---|---|
| **Medium** | `author` on all BlogPostings is an `Organization`, and publisher "logo" points at `images/og-image.jpg` (a 1200×630 social image, not a logo). | Author → `Person` with `sameAs` LinkedIn; real square logo asset. |
| **Medium** | No `FAQPage` schema anywhere despite pricing/cost/services pages being FAQ-shaped queries. | Add FAQ sections + schema. |
| **Low** | No `BreadcrumbList`; Organization `sameAs` only lists saharasoftsolutions.com (no LinkedIn/GitHub); `PostalAddress` lacks street/postal code; no `AggregateRating` (correctly absent — do not fake). | Add breadcrumbs; enrich sameAs. |

## 5. Performance (static estimate; no lab data) — 75/100

- Homepage total ≈ **319 KB** (HTML+CSS+JS+12 images, uncompressed) — good baseline.
- Scripts are deferred; only one stylesheet — minimal render-blocking.
- **LCP risk:** initially flagged `hero-collage.png` (859 KB) — on deeper inspection that PNG was an *orphan*; the homepage serves `hero-collage.webp` (73 KB). Referenced-image weight was 1.09 MB total, largest file 90 KB. The real issue was deploy bloat, not page weight.
- No CDN/cache headers inspected beyond Caddy defaults; no CWV field data (CrUX/GSC) available — **this category could not be fully measured**.

## 6. Images — 70/100

- **Alt text: perfect.** 0 missing, 0 empty across all 19 pages. `loading="lazy"` applied to below-fold galleries (about 5/5, products 10/10, index 11/12).
- **Formats:** hero/product images are large PNGs; only 36 WebP files on disk. Convert referenced heavies to WebP/AVIF (−60–80%).
- **Repo bloat:** 307 orphan images (~27.9 MB of 28.8 MB total) are legacy template leftovers (features_*, slide-home-*, church_box_*, shop_*) shipped in the deploy, plus `.DS_Store`/`.db` junk.

## 7. AI Search Readiness (GEO) — 75/100

- **Crawler access:** robots.txt explicitly allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot-Extended (CCBot blocked — deliberate and defensible).
- **llms.txt** is present, well-structured (products table with live domains, services, key links) — top-decile for a site this size.
- **Citability:** positioning statements are quotable, but there are **no statistics to cite**, no named authors, and the cost post explicitly withholds the numbers its query demands.
- **⚠ Flag:** llms.txt points AI crawlers at non-production URLs — `staging-garage.saharasoft.org`, `realator.api.saharasoft.org`, `courier.saharasoft.org`. Staging/API hostnames in an LLM-facing manifest risk AI engines quoting or indexing staging systems.

---

## Method & Limitations

- Audited from the local repo (in sync with prod — homepage verified byte-identical) plus live curl checks of redirects, headers, robots/sitemap/llms.txt/404.
- **Not run:** Lighthouse/CrUX field CWV, GSC indexation, GA4, backlink profile, SERP positions — tooling/credentials unavailable in this environment. Performance score is a static estimate only.
- No DataForSEO/Google API enrichment available.


---

## Addendum — Improvements Applied (2026-08-28)

Implemented same-day from this audit's action plan (all verified post-change):

**Applied in the repo**
- ✅ Deleted 314 orphan/junk files (26.8 MB); zero public references broken; images/ now 2.2 MB / 120 files
- ✅ Homepage de-duplicated: 2 featured tiles + Inbuildr/Baylink + full-width portfolio strip linking to /products/ — removed all staging-host links from the homepage (verified in browser: no overlaps, strip spans grid)
- ✅ Cost post expanded 480→968 words: 4 hedged KES planning bands (100k–400k discovery / 500k–1.5M MVP / 1.5M–5M platform / 5M+ complex), FAQ section + FAQPage schema, dateModified bumped — pricing.html's "ranges" promise is now true
- ✅ Services page expanded 332→823 words: per-service detail with case-study links, honest industries section, FAQ + FAQPage schema; duplicate GA4 loader removed
- ✅ why-invest post expanded 269→535 words: Kenya/shilling specifics, contextual links into the cost/mobile-money/case-study cluster + Related reading block
- ✅ Pricing page: 4-question FAQ section + FAQPage schema (answers match visible text)
- ✅ E-E-A-T: 6 blog posts now bylined "Nelson Bwogora, Founder & Lead Engineer" with Person+worksFor author schema; about.html founder card uses full name
- ✅ BreadcrumbList schema on 13 nested pages; 404 self-canonical removed; all JSON-LD validates (0 invalid blocks)
- ✅ 5 long titles shortened (homepage 75→59, water 105→63, mobile-money 86→63, partner 82→59, construction 79→56)
- ✅ llms.txt staging/API hostnames replaced with "In private development"; Pricing + Contact added to key links
- ✅ sitemap lastmod bumped to 2026-08-28 for the 8 changed URLs

**Applied on the serving VPS (see `caddy-server-fixes.conf` for the full story)**
- ✅ www → apex redirect live (`https://www.saharasoft.org/` → 301 → apex; Caddy's `permanent` emits 301, SEO-equivalent to 308)
- ✅ Security headers live: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy; Server header removed
- Applied 2026-08-28 via one-off GitHub Actions workflow (direct SSH keys not authorized on the serving box); container restart required due to single-file bind-mount inode drift

**Needs business input (deliberately not fabricated)**
- TallyDue case-study hard metrics and client identity
- LinkedIn URLs for Person `sameAs`; real square logo asset for publisher schema
- KES planning bands are hedged market figures — review and adjust to your actual engagement economics before relying on them
