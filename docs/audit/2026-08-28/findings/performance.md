# Performance Findings — saharasoft.org (static estimate)

**Score: 75/100** · ⚠ No Lighthouse/CrUX available in this environment — static weight analysis only, 2026-08-28

## Passes
- Homepage transfer ≈ **319 KB** total (HTML + CSS + JS + 12 images, uncompressed) — small baseline
- Single stylesheet; **zero render-blocking scripts** (all `defer`/`async`)
- Below-fold galleries lazy-loaded (about 5/5, products 10/10, index 11/12); case-study LCP images correctly eager

## Issues
| Sev | Issue | Evidence |
|---|---|---|
| High | Homepage LCP is an 859 KB raw PNG | `images/hero-collage.png` |
| Medium | Referenced heavies in legacy formats | product-lakevictoria100.png 1.05MB · lakevictoria100-hero.png 965KB · features_homepages2.jpg 743KB · features_psd.jpg 632KB · product-inbuildr.png 587KB · case-study-inbuildr.png 575KB · inbuildr-hero.png 563KB |
| Info | Disk format skew | 194 PNG / 163 JPG vs only 36 WebP |

## Follow-up
Connect GSC/CrUX (field LCP/INP/CLS) and run Lighthouse mobile to replace this estimate with measured CWV.
