# Action Plan — saharasoft.org SEO

Prioritized: Critical → High → Medium → Low. Effort in parentheses.

## Phase 1 — Critical fixes (Week 1)

- [ ] **Answer the cost query.** Add real KES ranges/tiers (e.g., discovery, MVP, integration bands) to `blog/custom-software-cost-kenya.html`; make `pricing.html`'s promise true. Target 1,200+ words. *(4–6 h writing)*
- [ ] **Add the 3 missing meta descriptions** — `software-development-services.html`, `blog/why-invest-custom-software.html`, `case-studies/index.html`. *(30 min)*
- [ ] **308-redirect www → apex** in Caddy (`www.saharasoft.org` → `https://saharasoft.org`). *(15 min)*
- [ ] **Convert homepage hero** `images/hero-collage.png` (859 KB) to WebP/AVIF with PNG fallback; do the same for other referenced >300 KB images. *(1–2 h)*
- [ ] **De-duplicate homepage ↔ products grid**: replace the homepage's 10-tile clone with a 3–4 tile "selected work" summary linking to `/products/`. *(1–2 h)*

## Phase 2 — High-impact improvements (Weeks 2–3)

- [ ] **Humanize E-E-A-T**: full name + role + LinkedIn for the founder; real bios for team cards; switch BlogPosting `author` to `Person` with `sameAs`; add named authors to posts. *(2–3 h)*
- [ ] **Add hard metrics to the TallyDue case study**: client name (with permission), connections/users served, collections improvement %, timeframe, a client quote. Kill the verbatim homepage reuse. *(2–3 h)*
- [ ] **Expand `software-development-services.html`** to 800–1,000 words: per-service sections, process, tech stack, FAQs — differentiate from the homepage's "What we do". *(4–6 h)*
- [ ] **Fix or fold `blog/why-invest-custom-software.html`**: add Kenya/Africa specifics and numbers, or redirect it into the cost post. *(2–4 h)*
- [ ] **Add security headers** (HSTS, X-Content-Type-Options, Referrer-Policy, X-Frame-Options) in Caddy. *(30 min)*

## Phase 3 — Content & authority (Month 2)

- [ ] **Add FAQ sections + FAQPage schema** to pricing, services, and cost pages. *(3–4 h)*
- [ ] **Add BreadcrumbList schema** on nested pages. *(1 h)*
- [ ] **Enrich Organization schema**: street/postal address, LinkedIn + GitHub in `sameAs`, real logo ImageObject (stop using og-image as publisher logo). *(1 h)*
- [ ] **Publish 2–4 statistic-bearing posts** (water-utility collections, M-Pesa integration costs/timelines) — every citable number is an AI-citation and backlink magnet. *(ongoing)*
- [ ] **Shorten 4 overlong titles** (water 105→<65, mobile-money 86→<65, partner 82→<65, homepage 75→<65). *(30 min)*
- [ ] **Clean llms.txt**: remove staging/API hostnames (`staging-garage`, `realator.api`, `courier.saharasoft.org`) or replace with production URLs only. *(15 min)*

## Phase 4 — Monitoring & hygiene (Ongoing)

- [ ] **Delete 307 orphan images (~27.9 MB)** + `.DS_Store`/`.db` from repo and deploy; add deploy ignore rules. *(1 h)*
- [ ] Set up **Google Search Console** + CrUX/Lighthouse monitoring to replace this audit's static performance estimate with field CWV. *(1 h)*
- [ ] Keep `lastmod` in sitemap.xml honest on each publish; keep 1-H1/canonical/OG discipline (currently perfect).
- [ ] Re-audit quarterly; re-run this audit after Phase 1–2 for score delta.
