# Saharasoft website — Mobbin-style redesign plan

**Date:** 2026-11-14
**Repo:** `saharasoft/website/saharasoft_website` (static HTML, `css/design-system.css`, deploys to the VPS on push to `main`)
**Reference:** https://mobbin.com/ (home page)
**Builds on:** `2026-07-05-saharasoft-revamp-design.md` — same URLs, same static pipeline, same SEO/structured data. This plan changes the visual language and the homepage narrative, not the stack.

## Outcome

Saharasoft reads like a product gallery, not an agency brochure: white canvas, very large tight headlines, and the real product screens doing most of the talking — the way Mobbin lets its screenshot library sell the product.

Acceptance check: the homepage and products page match the section order below at 375 / 768 / 1440 px, every existing URL still resolves, Lighthouse performance and accessibility do not drop below the current live scores, and `tests/consent-*.test.js` still pass.

## What makes Mobbin look like Mobbin

| Mobbin trait | Saharasoft translation |
|---|---|
| Pure white canvas, near-black type, one saturated brand colour used sparingly (logo, small marks) | `#fff` background, `#0a0a0a` text, warm grey surfaces (`#f5f5f4`), single accent kept for links and marks only |
| Huge, tightly tracked, left-aligned stacked headline with small images set inline between words ("Where [img] teams…") | Hero: "Custom software [TallyDue icon] built for how [phone screen] African businesses actually work." with product thumbnails inline |
| "Trusted by" logo strip directly under the hero | Client / product logo strip (product marks we own; client logos only with permission) |
| Short problem statement in large text ("Design research took hours. Now, it's one search.") | "Billing took weeks. Now it closes in days." — two-line pain → outcome |
| "One library for all your needs" — tabs (Apps, Sites, Screens, Flows…) over a dense grid of real screens | "One team for every workflow" — tabs by sector (Water, Property, Events, Construction, Logistics) over grids of real product screens from `images/products/screenshots` |
| Interactive demo card (prompt → "Found 5 apps") | "Describe your workflow" card → matching products/case studies (static, scripted states; no backend) |
| Customer story cards: title, sector · Read story | Case-study cards from `case-studies/` with sector · Read case study |
| One large pull quote with name and role | One real client quote (must be supplied — not invented) |
| Vertical spotlight ("Designing in fintech? Finance+ goes deeper.") | "Running a water utility? TallyDue goes deeper." spotlight band |
| Closing CTA with origin story | "Find what fits. Build what's next." + 12-year story, Contact / See pricing |
| Minimal sticky nav, black primary button | Same; black rounded-rectangle primary button |

House rules that override the reference: no pill/capsule buttons or chips (Mobbin uses them — we use 8–10 px rounded rectangles, tabs marked by underline/hairline), no coloured card-edge accent bars, no ellipsis truncation of content text.

## Phases

### 1. Design tokens (`css/design-system.css`) — affects every page at once
- Colours: white base, near-black text, warm grey surface and hairline border, accent reduced to links/marks.
- Type: keep self-hosted Space Grotesk (display) + Lato (body); new display scale up to ~96 px desktop / 48 px phone, letter-spacing −0.03 to −0.04 em, line-height 1.0–1.05.
- Radii: cards/screens 16–20 px, buttons 10 px. Soft single-layer shadow on screenshot cards only.
- Components: nav (centred links, black CTA), buttons (primary black, secondary outline), screenshot card, tab bar (underline active state), logo strip, story card, quote, spotlight band, footer.

### 2. Homepage rebuild (`index.html`)
Section order: nav → hero with inline thumbnails → logo strip → problem statement → sector tabs + screen grid → workflow demo card → case-study cards → quote → TallyDue spotlight → closing CTA → footer. Keep all JSON-LD, meta, consent script, skip link. Tabs: no-JS fallback shows all sectors stacked; JS only toggles `hidden` and `aria-selected`.

### 3. Shared chrome on all 18 live pages
New header/footer markup in `404`, `about`, `contact`, `pricing`, `software-development-services`, `products/index`, `blog/*` (7), `case-studies/*` (5). Pages are hand-duplicated HTML, so replace the header/footer blocks mechanically and diff each file.

### 4. Gallery pages
- `products/index.html` → Mobbin-style library grid with sector tabs, every product a screenshot card linking to its live domain.
- `case-studies/index.html` → story-card grid.

### 5. Inner pages (light touch)
About, contact, pricing, services, blog and case-study articles inherit tokens; fix only what breaks (long-form width ~68ch, larger H1, image radii).

### 6. Verify
Local static preview at 375 / 768 / 1440, keyboard + screen-reader pass on tabs, Lighthouse vs. live baseline, consent tests, link check across the 18 pages, `deploy.yml` rsync rules still include any new assets.

### 7. Ship
Commit on `main` locally. Pushing `main` deploys production (saharasoft.org), so push only with explicit approval.

## Inputs needed

1. Accent: keep terracotta `#c65d2a` as the single accent, or switch to a Mobbin-like saturated blue.
2. Client logos we have permission to show (otherwise the strip uses our own product marks).
3. One real client quote with name and role (otherwise the quote section is dropped).
4. Scope for the first pass: homepage + tokens + chrome only, or all phases.

## Not in scope
Framework migration, URL changes, new copywriting beyond the homepage, the legacy `theme/`, `plugins/`, `webdeveloper/` folders.

## Implementation decisions (2026-11-18)

Branch: `redesign-gallery-2026-11` (cut from `tally-538-tallydue-referral` so the consent module and its tests are included).

- **Inputs defaulted** so work is not blocked: accent stays terracotta `#c65d2a` (links, marks, focus only); logo strip uses our own product icons; the pull-quote section is omitted until a real quote with name and role is supplied; scope is all phases.
- **Fresh visuals first.** Products have all been updated since the August screenshots, so every product's live site is re-captured (desktop 1440 + phone 390) into `images/products/screens/`, plus real app icons and in-app UI from product repos. Products whose site is login-only, staging-only or down are shown smaller and not oversold.
- **Shared assets:** `css/design-system.css` v2 (tokens + gallery components: inline-thumb display headline, logo strip, statement, underline tabs, screen cards, workflow demo, story cards, spotlight band, light footer); `js/site.js` (menu, ARIA tabs with no-JS stacked fallback, scripted workflow demo) added to the deploy include list; `images/brand/mark.svg` + `favicon.svg`; chrome markup in `docs/redesign/chrome.html`.
- **Work split:** homepage, products gallery and case-studies index built against the new screenshots; the 14 inner pages get the new chrome and a light token pass in parallel.
- **Ship:** commit on the branch; merging to `main` deploys production, so that waits for explicit approval.
