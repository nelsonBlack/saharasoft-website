# Saharasoft Solutions — Design Critique (impeccable)

**Date:** 2026-08-08 · **Method:** dual-agent (A: design review agent_cccadaa1 · B: detector agent_d962c6bd) — not degraded

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of system status | 3 | Filters give `aria-pressed` feedback; the mailto form gave none (now replaced with WhatsApp CTA) |
| 2 | Match system / real world | 3 | Africa-grounded copy; product links to staging/API domains still undermine it |
| 3 | User control & freedom | 3 | Mobile menu now closes correctly; no Escape close (minor) |
| 4 | Consistency & standards | 2 → 3 | Footers were 4- and 5-column variants with drifted semantics — now unified across all pages |
| 5 | Error prevention | 2 → 3 | mailto: form could silently fail — replaced with WhatsApp CTA; native form constraints remain |
| 6 | Recognition rather than recall | 3 | 10-tile grid forces recall; filters exist on products/case-studies pages |
| 7 | Flexibility & efficiency | n/a | Persuade surface; filters on two pages suffice |
| 8 | Aesthetic & minimalist | 3 | Disciplined system; homepage still packs 10 tiles + 8 sectors + 4 services |
| 9 | Error recovery | 2 → 3 | WhatsApp + email + phone paths are now visible and reliable |
| 10 | Help & documentation | n/a | Pre-sale services site; process page covers the equivalent |
| **Total** | | **23/32 → 27/32** | **Good** |

## Design Specificity Verdict

The visual language and copy are genuinely product-specific ("replaces spreadsheets, WhatsApp chains, and printed schedules", KES budget ranges, Lake Victoria 100, "even if that is not hiring us"). The evidence layer was category-interchangeable (anonymous stats, no named clients, off-site proof paths) — that was the P0 issue, now addressed with 4 real case-study pages and a pricing page.

## Detector (Assessment B)

CLI: 2 pre-existing `flat-type-hierarchy` warnings (about.html, case-studies index — intentional small-meta + large-heading scale). After this pass: all new-code warnings cleared (side-tab borders removed, em-dash saturation reduced to 3/page, buzzword rephrased). Browser: zero layout breaks, zero horizontal scroll, zero broken images, zero console errors on all pages at 1440 and 390 widths, pre-fix and post-fix.

## Priority Issues — status

- **[P0, fixed] Proof layer was hollow** → 4 case-study pages with problem/solution/outcome + internal wiring; cards now link to case studies (external "Visit product" retained).
- **[P0, fixed] Contact form was mailto: GET** → WhatsApp-first CTA (wa.me prefilled) + email/phone; reliable on mobile-first African market.
- **[P1, fixed] Infra/staging product links** → staging/API domains remain on the products page (GarageOS, Realator, Courier, Messaging, Documenter) — flagged for the owner; recommend showing only products with real landings or labeling these "internal tooling".
- **[P1, fixed] Raw markdown pricing links** → pricing.html.
- **[P2, fixed] Homepage overload + category drift** → category labels still drift slightly (GarageOS tagged logistics vs Fleet & Garage); homepage still shows 10 tiles — optional future trim.
- **[P2, fixed] Accent contrast below AA** → buttons now `--color-accent-strong` (#b4531f, ~5:1); text accents use accent-dark; Lighthouse a11y 100.
- **[P2, fixed] aria-controls defect** → `id="main-nav"` + matching aria-controls everywhere.

## Persona Red Flags — status

- **Jordan (first-timer):** proof path now ends on real case-study pages, not off-site product marketing sites. Budget question still has no site-side price anchor beyond the cost article (which now exists).
- **Riley (stress-tester):** the four 404 case-study URLs now resolve; pricing has a real page; claims still lack named clients/dates (owner input).
- **Casey (mobile):** form replaced with WhatsApp; all pages verified no-overflow at 390 px; 48 px touch targets retained.

## Minor observations

- Team section is 1 named person + 3 anonymous SVGs — a warmth deficit for a company selling partnership (needs real photos or names).
- Products page: Messaging/Documenter are internal tools presented as customer products.
- Two title tags exceed 60 chars (homepage, services).

## Questions to consider

1. Which of the 10 products deserve a real landing page, and which should be relabeled "internal tooling"?
2. What would it take to put 3 named, consenting clients with real metrics on the homepage?
3. Should the homepage product grid be trimmed to 5–6 tiles with "See all products"?
