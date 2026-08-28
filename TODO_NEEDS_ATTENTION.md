# GorillaTool site — things still needing addition / replacement

Status snapshot after the 2026-08-27 asset + rebrand pass. This lists what is
DONE, and what still needs YOUR input (real business details, missing images,
form config) before the site is fully production-ready.

---

## ✅ Done in this pass
- Theme color changed green → **#b7282c** (all CSS vars, hex, and rgba variants).
- Browser-tab titles (`<title>`) changed StarlandMech → **GorillaTool** (all 14 pages).
- `<meta name="theme-color" content="#b7282c">` added to all pages.
- Logos placed: header = red GORILLA+ wordmark, footer = white version.
- 8 illustrations placed into banner/testimonial slots.
- ~50 product photos replaced/added.
- Product lines expanded: drills +2, stands +7, plus 3 new categories
  (Wall Saws, Water Drills & Dust Collectors, Water Tanks) on products.html.

---

## 🔴 1. Branding text still says "StarlandMech" (191 occurrences)
Only the browser-tab titles were changed. Body text, headings, alt text, SEO
meta, and footer still say StarlandMech. Needs a full find-replace pass — but
some are judgment calls (taglines, "22+ years" history), so left for review.

Per-file text occurrences of "starland":
```
index.html                     27      pages/contact.html             16
pages/services.html            14      pages/after-sale-service.html  13
pages/about.html               13      pages/diamond-core-drill.html  12
pages/drill-stand.html         12      pages/floor-grinder.html       12
pages/parts-consumables.html   11      pages/products.html            11
pages/technical-help.html      11      pages/research-development.html 10
pages/product-news.html        10      pages/technical-article.html   10
assets/js/components.js         7      assets/js/main.js               1
```
**Action:** decide exact brand name/spelling ("GorillaTool" vs "Gorilla Tool"
vs "GORILLA+") then do the global replace. Tell me and I'll run it.

## 🔴 2. SEO / canonical URLs still point to starlandmech.com (16 files)
Every page has `<link rel="canonical">`, `og:url`, `og:image`, `twitter:image`
pointing at `https://starlandmech.com/...`. Also `sitemap.xml` and `robots.txt`.
These must become `https://www.gorillatool.au/...` or search engines index the
wrong domain.
**Action:** global replace `starlandmech.com` → `www.gorillatool.au` across
HTML + sitemap.xml + robots.txt. (Straightforward — I can do in one pass.)

## 🔴 3. Contact details are still Starland's (Chinese office)
`pages/contact.html` (and footer) show:
- Phone: `+0086 571 83513821`, `+86-17720211439` (China numbers)
- Email: `info@starlandmech.com`
- Social handles: `@starlandmech`, `starland_mech.gar`, WhatsApp/Telegram/etc.
- No street address currently filled in.
**Action:** provide the real GorillaTool AU phone, email (e.g. info@gorillatool.au),
physical address, and social links. I'll drop them in.

## 🔴 4. Contact / quote forms are NOT wired up
- All quote forms post to `https://formspree.io/f/YOUR_FORM_ID` (placeholder —
  submissions go nowhere).
- `assets/js/main.js` has EmailJS IDs that belong to the old Starland account
  (`service_bldx9hm`, `template_ez29iok`, …) — will send to Starland's inbox,
  not yours.
**Action:** create your own Formspree form + EmailJS account, give me the IDs.
See `WEB_DEPLOY_NOTE.md` (EmailJS section) for the step-by-step.

## 🟡 5. Images with no replacement supplied (still Starland/placeholder)
The zip had no images for these slots, so they are unchanged:
- `hero-banner-01.jpg`, `hero-banner-03.jpg` — homepage hero carousel (still old photos).
- `hero-person-placeholder.png` — homepage hero figure.
- `assets/images/smiling-young-construction-engineer-...png` — referenced in
  about.html but **file is missing → broken image** (was already missing in the
  original Starland site). Either supply a photo or I can point it at an existing one.
- Floor grinder product photos (FG/FS/CTP series) — zip had no grinder images,
  so those cards still use the old Starland photos.
- Partner/testimonial logos (`partner-logo-01..11`, `home-partner-*`) — still
  Starland's partners. Replace if you have your own.
- Team member photos (`team-*.jpg`, `home-team-member-*`) — still Starland staff.
**Action:** send replacements for any of the above you want changed.

## 🟡 6. Footer white logo — sanity check on light sections
Footer uses the white logo (`logo-footer.png`) on the dark red footer — good.
Header now uses the red logo on the red header bar (`--bg-green` is now red).
**Check visually:** red logo on a red header may be low-contrast. If so, switch
the header to use the WHITE logo instead (one-line change in components.js).

---

## Quick wins I can do immediately on your say-so
1. Global `starlandmech.com` → `www.gorillatool.au` (SEO URLs) — safe, do now.
2. Global brand text `StarlandMech` → your chosen name — needs name confirmed.
3. Fix the broken about.html image (point to an existing photo).
4. Swap header to white logo if contrast is bad.

Reply with: brand spelling, contact details, form IDs, and which images to swap.
