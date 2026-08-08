# Saharasoft Solutions — SEO Action Plan

**Date:** 2026-08-08 · **Health score:** 60 → 87/100

## Phase 1: Critical (done this pass)
- [x] Remove ~100 live BeTheme template pages (`theme/`, `plugins/`, legacy `webdeveloper/` pages) from production — rsync excludes + `--delete-excluded`; privacy pages rewritten in the design system so no legacy CSS/JS is needed.
- [x] Fix 4 dead case-study URLs in JSON-LD — detail pages created.
- [x] Hero LCP: 860 KB lazy PNG → 73 KB eager webp with `fetchpriority=high` + dimensions.
- [x] og:image/twitter:image (branded 1200×630) on all pages.
- [x] Self-hosted fonts (no render-blocking `@import`); CLS = 0.
- [x] Broken logo URL removed from JSON-LD (file never existed).

## Phase 2: High impact (done this pass)
- [x] 5 new blog posts targeting demand clusters (custom software cost Kenya, water utility billing, M-Pesa integration, construction field software, choosing a partner).
- [x] 4 case-study detail pages with Article schema.
- [x] pricing.html (replaces raw markdown footer links).
- [x] sitemap.xml refreshed (19 URLs, fresh lastmods, orphan removed); robots.txt expanded (Bytespider, Applebot-Extended).
- [x] Custom 404.html; contact form replaced with WhatsApp CTA (mobile-first conversion).
- [x] A11y: button contrast to AA, focus-visible, aria-controls fix, unified skip-link; Lighthouse a11y 100.
- [x] llms.txt now passes the llms-txt audit (markdown links).

## Phase 3: Owner actions (blocked on you)
1. **Google Search Console** (biggest remaining lever): verify `saharasoft.org` (DNS TXT or HTML file), submit `https://saharasoft.org/sitemap.xml`, monitor indexation; the deployed theme/ pages should disappear from the index over time (they're no longer served).
2. **GA4**: paste your Measurement ID into the `G-XXXXXXXXXX` placeholders on all pages (snippet is inert until then). Create the property in Google Analytics, grab the G-XXXX ID.
3. **Caddy 404 wiring** (VPS): add `handle_errors { rewrite * /404.html; file_server }` to the Caddyfile so the new 404 page serves for unknown paths.
4. **Social profiles**: send LinkedIn/X/GitHub URLs → add to footers + JSON-LD `sameAs` (removes the last sameAs gap).
5. **Testimonials / named clients**: 2–3 quotes with names/roles → homepage trust section + case studies. This is the single biggest conversion + E-E-A-T lever.
6. **WhatsApp number**: currently using the public phone `+254 721 137000` for the wa.me link; confirm it's the right WhatsApp line.

## Phase 4: Ongoing
- Blog cadence: 1 post/month minimum; link new posts to case studies and services.
- Monthly: refresh sitemap lastmods; check GSC coverage; keep the webp pipeline (any new image must be webp ≤60 KB for tiles).
- Consider: avif for hero, `srcset` on large tiles, HTTP/3 on Caddy, reviews/testimonials schema once you have quotes.
- Re-run this audit quarterly (or after any major content push).
