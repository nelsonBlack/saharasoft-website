# Schema Findings — saharasoft.org

**Score: 80/100** · JSON-LD parsed + validated on all 19 pages, 2026-08-28

## Coverage (per page)
- index.html → Organization + WebSite + ProfessionalService (geo −1.2921/36.8219, areaServed "Africa, Worldwide", priceRange $$)
- about.html → @graph: AboutPage + Organization
- blog/index.html → Blog; blog/*.html (6) → BlogPosting (headline, description, image, author, publisher, datePublished/Modified, mainEntityOfPage, url)
- case-studies/*.html (4) → Article; case-studies/index.html → CollectionPage
- contact.html → ContactPage · products/index.html → ItemList · pricing.html + services → ProfessionalService
- 404.html → NONE (acceptable)
- **Zero invalid-JSON blocks.** Mapping page-type → schema-type is correct throughout.

## Issues
| Sev | Issue | Fix |
|---|---|---|
| Medium | `author` on all BlogPostings is `Organization`; publisher logo is `og-image.jpg` (1200×630 social card, not a logo) | Author → `Person` + LinkedIn `sameAs`; dedicated square logo |
| Medium | No `FAQPage` anywhere despite FAQ-shaped pages (pricing, cost, services) | Add FAQ sections + schema |
| Low | No `BreadcrumbList` on nested pages | Add |
| Low | Organization `sameAs` only lists saharasoftsolutions.com; `PostalAddress` lacks street/postal code | Enrich; add LinkedIn/GitHub |
| Info | No AggregateRating/Review — correct (do not fabricate) | — |
