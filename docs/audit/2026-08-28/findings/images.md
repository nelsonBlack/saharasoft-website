# Images Findings — saharasoft.org

**Score: 70/100** · All 19 pages + images/ tree, 2026-08-28

## Passes
- **Alt text: 0 missing, 0 empty** across every `<img>` on all 19 pages
- Lazy-loading correctly applied below the fold; eager above-fold on case studies

## Issues
| Sev | Issue | Evidence | Fix |
|---|---|---|---|
| Medium | Heavy legacy formats on referenced assets | 859KB hero-collage.png; 1.05MB product-lakevictoria100.png; 965KB lakevictoria100-hero.png | Convert >300KB referenced images to WebP/AVIF + fallback |
| Low | **307 orphan images (~27.9 MB of 28.8 MB total)** shipped in deploy | Legacy template leftovers: features_portfolio.jpg, slide-home-2-bg.jpg, church_box_1.jpg, shop_page_slider_price2.png, shortcodes_slider_1.jpg… | Delete; add deploy ignore |
| Low | Junk files in images/ | 6 `.DS_Store`, 13 `.db` | Purge |

Math: 28.8 MB on disk − ~0.9 MB referenced = ~27.9 MB dead weight (97% of the images directory is unused).
