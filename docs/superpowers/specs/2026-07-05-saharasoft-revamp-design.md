# Saharasoft Solutions Website Revamp — Design Spec

**Date:** 2026-07-05  
**Scope:** Full visual and structural refresh of the static marketing site at `https://saharasoft.org/`.  
**Approach:** Cohesive design-system refresh (Approach B). No framework migration. Preserve all existing URLs, especially privacy policy pages.  
**Goal:** A modern, professional, distinctly non-template website that ranks, earns backlinks, and drives visitors to our live products and services.

---

## 1. Project Goals

1. **Unify the visual language** — replace the old BeTheme homepage with the same clean, modern system already started on the services page.
2. **Showcase our products** — link visitors to the live apps we operate (Arbec, TallyDue, Inbuildr, Baylink, GarageOS, etc.).
3. **Build an SEO & AI-search foundation** — semantic HTML, structured data, internal linking, machine-readable files (`llms.txt`, `pricing.md`, `products.md`).
4. **Create linkable assets** — case studies, industry guides, comparison pages, and a product gallery that earn backlinks and directory placements.
5. **Stay deployable as a static site** — keep the current GitHub Actions → Caddy deployment pipeline intact.

---

## 2. Visual Design Direction

### 2.1 Personality
- **Modern, editorial, East-African professional.** Not another generic SaaS template.
- Confident but warm. Tech-forward without being cold.
- Human-scale details: real photography, real app screens, real client names.

### 2.2 Color Palette
- **Base:** `#0F172A` (deep charcoal) or `#1B1B1F` for text and dark sections.
- **Surface:** `#FAFAF8` (warm off-white) and `#FFFFFF`.
- **Accent:** `#C65D2A` (warm terracotta) or `#0D8A7F` (deep teal). Pick one and use it as the single accent.
- **Neutral:** `#5E6470` for secondary text.
- **No:** purple-blue gradients, gradient text, alternating gray section backgrounds, cyan + purple on dark.

### 2.3 Typography
- **Display / Headings:** `Space Grotesk` or `Playfair Display` (one bold, characterful display face).
- **Body:** `Lato` or `IBM Plex Sans` (humanist, readable).
- **Scale:** dramatic jumps — hero headline 56–72px, section H2 32–40px, body 16–18px, line-height 1.1–1.3 for headings, 1.65–1.8 for body.
- **No:** Inter as default, single font family everywhere, or 16→24→32→40 incremental sizing.

### 2.4 Layout Principles
- Left-aligned by default; center only for the hero and CTA.
- Asymmetric 2-column hero (text + image/screenshot).
- Varied section rhythms: full-width dark band, narrow centered text, offset image + text, large image gallery.
- Max 2 visual container levels deep.
- Touch targets ≥ 44×44px on mobile.

### 2.5 Imagery & Icons
- **Real app screenshots** on devices (not generic mockups).
- **Client logos** where permission is available.
- **Team / office / location photography** if available.
- **SVG icons only** (Lucide or custom line icons). No emoji as icons.
- No AI-generated hero illustrations; no purple gradient placeholders.

### 2.6 Interactions
- Restrained: subtle hover color shifts, small underline reveals, lazy-loaded images.
- No: indiscriminate scroll-reveal fade-ins, bounce easing, glassmorphism backdrops, floating decorative badges.

---

## 3. Site Structure & Navigation

### 3.1 Final URL Map

| URL | Page | Notes |
|-----|------|-------|
| `/` | Homepage | Revamped hero + products + trust + case study + CTA |
| `/software-development-services.html` | Services | Refresh to match design system; keep existing URL |
| `/products/index.html` | Products overview | Hero grid of product categories + featured apps |
| `/products/arbec.html` | Arbec detail | Optional Phase 2/3 page |
| `/products/tallydue.html` | TallyDue detail | Optional |
| `/products/inbuildr.html` | Inbuildr detail | Optional |
| `/products/baylink.html` | Baylink detail | Optional |
| `/products/garageos.html` | GarageOS detail | Optional |
| `/case-studies/index.html` | Case studies gallery | Filterable gallery of shipped work |
| `/case-studies/<case>.html` | Individual case study | e.g., `/case-studies/tallydue-water-utility.html` |
| `/about.html` | About | Company story, team, process, location |
| `/contact.html` | Contact | Unified contact page (replace legacy `webdeveloper/contact.html`) |
| `/blog/index.html` | Blog listing | SEO content hub |
| `/blog/why-invest-custom-software.html` | Existing post | Keep; refresh to match design system |
| `/webdeveloper/terms_privacy_miradiapp.html` | Privacy policy | **Preserve as-is**; only update header/footer |
| `/webdeveloper/terms_privacy_watermeter.html` | Privacy policy | **Preserve as-is**; only update header/footer |
| `/404.html` | Custom 404 | Branded, with links back to products and services |
| `/sitemap.xml` | XML sitemap | Updated with all public URLs |
| `/robots.txt` | Robots file | Allow AI crawlers; link to sitemap |
| `/llms.txt` | AI context file | Overview of Saharasoft, products, links |
| `/pricing.md` | Machine-readable pricing | For AI agents; general services + product tiers |
| `/products.md` | Machine-readable product catalog | For AI agents |

### 3.2 Global Navigation

**Top bar:**
- Logo → `/`
- Products → `/products/index.html`
- Services → `/software-development-services.html`
- Case Studies → `/case-studies/index.html`
- About → `/about.html`
- Blog → `/blog/index.html`
- Contact → `/contact.html`

**Footer:**
- Columns: Company, Products, Services, Resources, Legal.
- **Legal column must include:**
  - Miradiapp / Inbuildr Privacy Policy → `/webdeveloper/terms_privacy_miradiapp.html`
  - WaterBiller / TallyDue Privacy Policy → `/webdeveloper/terms_privacy_watermeter.html`
- Contact details, social links, copyright.

**Mobile:**
- Hamburger menu with same links, large touch targets.

---

## 4. Page-by-Page Specifications

### 4.1 Homepage (`/`)

**Hero Section**
- Asymmetric 2-column: left headline + subhead + CTA, right hero image / app collage.
- Headline: specific and concrete, e.g. “Custom software built for how East African businesses actually work.”
- CTA buttons: primary “Explore our products” → `/products/index.html`; secondary “See our services” → `/software-development-services.html`.
- No generic “Get Started” / “Learn More”.

**Product Mosaic Section**
- Not a 3-column grid of identical cards.
- Use a varied layout: 2 large featured tiles + 4 smaller tiles, or an alternating list.
- Each tile: app name, one-sentence problem, outcome, live link, screenshot fragment.
- Featured: Arbec, TallyDue, Inbuildr, Baylink, GarageOS.
- Secondary: Realator, Courier, Messaging, LakeVictoria100, Documenter.

**Trust / Stats Section**
- Keep the existing real stats (90+ clients, 8+ team, 12+ years) but present editorially — not as 3 metric cards with accent lines.
- Add a short client-sector list.

**Case Study Teaser**
- One strong case study with a real screenshot, client name, challenge, outcome, and “Read the case study” link.

**Services Snapshot**
- 2–3 service areas with specific links; avoid 3-card grid.

**CTA Band**
- Full-width dark band with a direct question: “Have a process that software could fix?”
- Button: “Tell us about your project” → `/contact.html`.

**Footer**
- Full footer with privacy policy links preserved.

### 4.2 Products Overview (`/products/index.html`)

- **H1:** “Products we’ve built for East African businesses.”
- **Category filter tabs:** Water & Utilities, Real Estate, Events & Conferences, Logistics & Transport, Healthcare & Operations, Productivity Tools.
- **Product cards:** screenshot, name, one-line problem, key outcome, live demo link, “Case study” link if available.
- **Bottom CTA:** “Need a custom product?” → `/contact.html`.

### 4.3 Product Detail Pages (`/products/<product>.html`)

- **Hero:** app name, tagline, key screenshot.
- **Problem it solves:** 2–3 sentences.
- **Key features:** 4–5 bullet points with real functionality.
- **Who it’s for:** target users/industries.
- **Live link:** `app.inbuildr.com`, `waterbiller.app`, etc.
- **Case study / testimonial:** if available.
- **Related products:** internal links to other products.
- **Schema:** `SoftwareApplication` with `aggregateRating` if available, `offers`.

### 4.4 Services Page (`/software-development-services.html`)

- Refresh existing content to match the new design system.
- Keep the same structure but apply shared CSS, header, footer, and SEO meta.
- Add internal links to Products and Case Studies.
- Update title/meta: keep keyword focus on “custom software development Kenya / East Africa.”

### 4.5 Case Studies Gallery (`/case-studies/index.html`)

- **H1:** “How we build software that matters.”
- Gallery layout with large thumbnails, client/project name, industry tag, and outcome snippet.
- Filter by industry.
- Lightbox for screenshots.
- Each item links to its own case study page.

### 4.6 Case Study Detail (`/case-studies/<case>.html`)

- **Hero:** client/project name, one-line result.
- **Sections:** Client, Challenge, Solution, Process, Tech Stack, Outcome, Screenshots, Quote.
- **Schema:** `Article` + `Organization`.
- **Internal links:** link to the relevant product page and service page.

### 4.7 About Page (`/about.html`)

- Company story: origin, mission, team size, location.
- Process: Discovery → Design → Development → Testing → Deployment.
- Team photos (optional, placeholder if not available).
- Location: Nairobi, Kenya; serving East Africa.
- **Schema:** `AboutPage` + `Organization`.

### 4.8 Contact Page (`/contact.html`)

- Unified page replacing `webdeveloper/contact.html`.
- Form fields: name, email, company, project type, budget range, message.
- Email: `nelson@saharasoftsolutions.com`.
- Phone: `+254 721 137000`.
- Location: Nairobi, Kenya.
- **Schema:** `ContactPage`.

### 4.9 Blog (`/blog/index.html` + existing post)

- Blog index listing posts with dates, topics, and excerpts.
- Refresh existing `why-invest-custom-software.html` to match design system.
- Add new posts as part of the SEO content plan (see Section 6).

### 4.10 Privacy Policy Pages (preserved)

- Keep `/webdeveloper/terms_privacy_miradiapp.html` and `/webdeveloper/terms_privacy_watermeter.html` content exactly as-is.
- Wrap only the header and footer in the new global nav/footer so users can navigate away.
- Do not change the canonical or title of these pages unless required by law/policy.

---

## 5. Product Catalog (Updated Naming)

| Product | Public Domain | Category | Notes |
|---------|---------------|----------|-------|
| Arbec | `arbecapp.saharasoftsolutions.com` | Events & Conferences | Conference/event management app |
| TallyDue | `waterbiller.app` | Water & Utilities | Billing & utility management (renamed from WaterBiller) |
| Inbuildr | `inbuildr.com` | Productivity / Construction | Productivity platform (renamed from Miradi) |
| Baylink | `getbaylink.com` | Logistics & Transport | Logistics / transport platform |
| GarageOS | `staging-garage.saharasoft.org` | Logistics / Fleet | Garage / fleet operations system |
| Realator | `realator.api.saharasoft.org` | Real Estate | Real estate data/API product |
| Courier | `courier.saharasoft.org` | Logistics & Transport | Courier service platform |
| Messaging | `messaging.prod.saharasoftsolutions.com` | Communications | Messaging service backend/portal |
| LakeVictoria100 | `lakevictoria100.com` | Events / Community | Lake Victoria 100 event platform |
| Documenter | `tools.saharasoftsolutions.com` | Productivity / Developer | Documenter tools / API |

---

## 6. SEO & AI-SEO Strategy

### 6.1 Traditional SEO
- Unique `<title>` and meta description for every page.
- Canonical URLs on every page.
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).
- Clean heading hierarchy: one H1 per page, H2s for sections, H3s for subsections.
- Alt text on every image.
- Internal link clusters: products → case studies → services → blog.
- Updated `sitemap.xml` and `robots.txt`.

### 6.2 Structured Data
- **Homepage / About / Contact:** `Organization`, `ProfessionalService`, `LocalBusiness`.
- **Products:** `SoftwareApplication` with `name`, `description`, `applicationCategory`, `operatingSystem`, `offers`, `aggregateRating` (if available).
- **Case Studies / Blog:** `Article` or `BlogPosting` with `author`, `datePublished`, `dateModified`.
- **Navigation:** `BreadcrumbList` on every page.
- **Products list:** `ItemList`.

### 6.3 AI-SEO Layer
- **`/llms.txt`**: concise overview of Saharasoft, products, services, and key links.
- **`/products.md`**: machine-readable product catalog.
- **`/pricing.md`**: general service pricing tiers and product availability.
- **Answer blocks**: 40–60 word self-contained passages for likely AI queries.
- **FAQ sections**: natural-language questions on service and product pages.
- **Comparison content**: “Custom software vs off-the-shelf,” “TallyDue vs generic billing tools.”
- **Freshness signals**: “Last updated” dates on blog and product pages.
- **Robots.txt**: allow `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `anthropic-ai`; block `CCBot` only if training opt-out is desired.

---

## 7. Backlink & Marketing Strategy

### 7.1 Directory & Review Placements
- **B2B Software:** Capterra, G2, GetApp, Product Hunt (for suitable products), Crunchbase.
- **Agency / Dev Shop Directories:** Clutch, GoodFirms, DesignRush, UpCity, The Manifest.
- **East African Tech:** Nairobi Garage, iHub, AfriTech, local business chambers.

### 7.2 Linkable Content Assets
- **“The Guide to Custom Software Development in Kenya”** — pillar page targeting local search.
- **Industry comparison pages:** “Water utility billing software in Kenya,” “Fleet management software for African logistics.”
- **Free tool / calculator:** “Mobile app development cost estimator” or “SaaS hosting readiness checklist.”
- **Open-source tools:** reusable components or dev utilities published on GitHub with a backlink.

### 7.3 Partner & Client Backlinks
- Add a client/partner logo section; ask for reciprocal directory/listing links.
- Create case studies that clients want to share.

### 7.4 PR & Community
- Guest posts on East African tech publications.
- Founder-led LinkedIn content and industry roundups.
- Authentic participation in Reddit/Quora around software development in Africa.

---

## 8. Gallery & Case Studies

### 8.1 Gallery Requirements
- Real screenshots of each product.
- Before/after workflow visuals if available.
- Client logo strip (with permission).
- Mobile and desktop screenshot pairs.

### 8.2 Case Study Template
Each case study page must contain:
1. Client / project name
2. Industry / location
3. Problem statement (2–3 sentences)
4. Solution overview (what we built)
5. Process highlights (2–3 bullets)
6. Tech stack
7. Outcome / metrics
8. Client quote (if available)
9. Screenshots / gallery
10. Related product and service links

---

## 9. Content Requirements (To Be Supplied or Approved)

- [ ] Final accent color choice (terracotta vs teal).
- [ ] Final display font choice (Space Grotesk vs Playfair Display).
- [ ] Product screenshots for each featured app.
- [ ] Case study details: client names, challenges, outcomes, quotes.
- [ ] Client/partner logos and permissions.
- [ ] Team photos or decision to use illustrations.
- [ ] Service pricing tiers or decision to keep “contact for quote.”
- [ ] Any brand guidelines or existing assets.

---

## 10. Implementation Phases

### Phase 1 — Foundation
- Create `css/design-system.css`.
- Build global `header.html` / `footer.html` includes or use build-time includes.
- Rewrite `index.html`.
- Refresh `software-development-services.html` to match design system.
- Ensure privacy policy pages retain correct links.

### Phase 2 — Products
- Build `/products/index.html`.
- Build `/products/<product>.html` for top 5 products (Arbec, TallyDue, Inbuildr, Baylink, GarageOS).
- Add “More products” section for remaining apps.

### Phase 3 — Case Studies & About
- Build `/case-studies/index.html`.
- Build 2–3 initial case study detail pages (template + content).
- Build `/about.html`.
- Build `/contact.html` and redirect legacy `webdeveloper/contact.html`.

### Phase 4 — SEO & AI Files
- Update `sitemap.xml` and `robots.txt`.
- Add `/llms.txt`, `/products.md`, `/pricing.md`.
- Add JSON-LD schema on every page.
- Add breadcrumb navigation.

### Phase 5 — Quality & Launch
- Run Lighthouse / PageSpeed audit.
- Run UI-AI-Detector 40-point audit on every page.
- Run HTML validation, link checker, and accessibility checks.
- Update `sitemap.xml` and submit to Google Search Console.
- Deploy via existing GitHub Actions workflow.

---

## 11. Anti–AI-Slop Checklist

Apply to every page before launch:

- [ ] No purple-to-blue gradients or gradient text.
- [ ] No alternating gray section backgrounds.
- [ ] No 3-column identical card grids repeated across sections.
- [ ] No Inter/Roboto as default; typography is paired and intentional.
- [ ] No hero eyebrow pills or uppercase “FEATURES” kickers.
- [ ] No generic “Get Started” / “Learn More” CTAs.
- [ ] No emoji as icons; SVG icons only.
- [ ] No glassmorphism or decorative gradient blobs.
- [ ] No indiscriminate scroll-reveal animations.
- [ ] No buzzword soup in headings.
- [ ] Touch targets ≥ 44×44px on mobile.
- [ ] Copy uses concrete verbs and specific outcomes.
- [ ] Images are real screenshots/photos, not AI placeholders.

---

## 12. Risks & Assumptions

- **Content:** Case studies and product screenshots may be placeholders until real assets are provided. The design will accommodate placeholder content cleanly.
- **Privacy policy links:** Existing URLs must remain valid; only the global header/footer will be updated.
- **Static deployment:** The site remains static HTML/CSS/JS; no server-side rendering is introduced.
- **Backlinks:** Directory submissions and guest posts require manual follow-up outside the website build.

---

## 13. Open Questions for Client

1. Which single accent color should we commit to — warm terracotta (`#C65D2A`) or deep teal (`#0D8A7F`)?
2. Do you have product screenshots and case study metrics available now, or should I build the pages with clearly marked placeholder content?
3. Which 2–3 case studies should be written first?
4. Should we keep the “contact for quote” model, or publish starting price ranges on `/pricing.md`?

