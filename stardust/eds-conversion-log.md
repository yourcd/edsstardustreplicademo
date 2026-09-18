# EDS conversion log — India Uncharted (stardust:deploy)

Environment: Experience Catalyst / DA project `yourcd/edsstardustreplicademo`.
Runtime: vanilla aem-boilerplate (contract in `stardust/runtime-contract.json`).
STOP after Step 9 — publishing is a UI action. Content pages are `content/<page>.plain.html`.

## Foundation (DONE)
- `styles/styles.css`: brand tokens (brown `#8a7156`, coral `#e3876e`, linen `#e5e3dc`, footer `#292622`),
  coral pill button system, section-style vocab (`.linen`, `.dark`), structural layer preserved
  (`body.appear` gate, `header { height: var(--nav-height) }`, `main > .section` scaffold), global box-sizing + img resets.
- `styles/fonts.css`: self-hosted Poppins (body), Tenor Sans (headings), Playfair Display (display/banner),
  Rubik (nav) — all open Google Fonts. Metric-matched `poppins-fallback`/`tenor-fallback` in styles.css.
- `--nav-height`: 80px desktop / 60px mobile (lifted from live).
- favicon: `/favicon.png` + head.html `<link rel="icon">` (the one permitted head.html edit).

## Chrome (DONE)
- `content/nav.plain.html`: 3 sections (brand wordmark / nav ul / phone-pill tools).
- `content/footer.plain.html`: 4 sections (brand blurb / Get In Touch / Quick Links / copyright bar).
- `blocks/header`: stock JS (hamburger machinery kept) + brand CSS (fixed white 80px bar, Rubik uppercase nav, coral phone pill, wordmark logo).
- `blocks/footer`: JS wraps first 3 sections in `.footer-grid`, last = `.footer-bar`; dark footer CSS.

## Block inventory + naming (LOCKED)
David's Model: prose bands = DEFAULT CONTENT; same-pattern card grids = ONE `cards` block + variant classes.

| Block | Type | Used by | Notes |
|---|---|---|---|
| `hero` | bespoke (rebrand stock) | home | linen bg, curved photo right, Playfair headline, enquiry form strip |
| `cards` | reconstructive + variants | home, listings, destination, activity | variants: `packages`, `destinations`, `themes`, `blogs`, `tiles` (dest/activity tour cards). ≤ real card pattern per variant |
| `feature-triplet` | bespoke | home | 3 icon features ("Find Travel Perfection") |
| `testimonial` | bespoke | home | centered quote card on photo band |
| `cta-banner` | template-slotted | home | full-bleed photo + Playfair headline + CTA |
| `itinerary` | reconstructive | package | day-by-day (day head = body role, bullets) |
| `inclusions` | reconstructive | package | 2 bordered cards (inclusions / exclusions) |
| `contact-form` | bespoke | contact | enquiry form + contact facts |

Default content (D1 — NOT blocks):
- Inner-page banner → section style `page-banner` (Playfair title over brown-overlay photo). Authored as default content h1 in a `.page-banner` section.
- Welcome intro (home), Tour Overview (package), Why Choose / Best Time (package) → default-content prose sections.

## Decode tiers
- template-slotted: hero, cta-banner, page-banner (fixed composition).
- reconstructive: cards (+variants), itinerary, inclusions (authors add/remove units).

## Reference prototypes (the visual spec, gated at 1440/360)
`stardust/prototypes/<archetype>-proposed.html` + `<archetype>.css` (+ shared canon.css).

## Pages built (package / destination / activity) — Step 9

Blocks created (import-free, EW1 move-only decorate):
- `page-banner` (template-slotted): moves authored `<picture>` → `.page-banner-bg`, `<h1>/<h2>` → `.page-banner-title`; brown overlay `rgba(70,52,36,.42)`, centered Playfair 50px, min-height 449px desktop / 300px mobile, `padding-top: var(--nav-height)` for the fixed header. Values lifted from canon.css `.iu-pagebanner*`. Used by all 3 pages (the banner h1 is each page's single h1).
- `itinerary` (reconstructive): one row per day; moves each cell's `<p>` day-head + `<p>` intro + `<ul>` into `.itinerary-day`. Day-head is a BODY `<p>` (role parity with live), styled via `> p:first-of-type` (Tenor 26px brown) — NOT retagged to a heading. Hairline `--rule` divider between days. Reference package.css `.itinerary*`.
- `inclusions` (reconstructive): one row per card; moves `<h2>` + `<ul>` into `.inclusions-card`, two side-by-side bordered cards in `.inclusions-grid`. Reference package.css `.inex*`.

Default content (D1, not blocks): Tour Overview (lede + `Tour Overview` h2 + one `<p>` of `<strong>Label:</strong> value<br>` facts + photo), Why Choose / Best Time prose, package CTA (`<strong><a>` → primary button per runtime-contract), destination `GOA Tours` h2 + cards grid, activity `Cycle Tour Tours` h2 (empty term archive — no grid on live).

Content pages:
- `content/goa-yoga-retreat-package-3-days-2-nights.plain.html`
- `content/destination/goa.plain.html`  (cards variant `packages`; card titles h3, section title demoted to h2 so the banner h1 is the only h1)
- `content/activity/cycle-tour.plain.html`  (banner + h2 only; empty archive)

Gate results (per page):
- davids-model-lint: all 3 pass, 0 🔴. Advisories (all justified): D1 single-column prose on page-banner/itinerary/inclusions = genuine bespoke/reconstructive blocks (need bg-image layer / divider / bordered cards — not expressible as default content); D3 ragged rows on destination cards = the image-less "Goa Tour Packages" card (1 cell) vs image cards (2 cells) — the cards block's documented picture-optional shape, matches live.
- block-roundtrip: page-banner + itinerary + inclusions all "round-trip closed (0 structural 🔴)". Only advisory is IMG COUNT on page-banner (proto uses a CSS `background-image`; the EDS block authors a real `<img>` for the same photo — intentional image-slot difference).
- `cards` block cannot be exercised by block-roundtrip's inline harness (its module-scope `import { createOptimizedPicture }` from aem.js fails to install — documented harness limitation, exits 1 with 0 structural 🔴). cards is a pre-built shared block gated via its home/listing pages; the destination grid reuses it unmodified. Verify cards on destination/goa via the dev-server qa-gate at deploy time.
- qa-gate not run here (aem dev server boot is a deploy-time step; STOP after Step 9 per instructions).

STOP after files + local gates — no deploy (publishing is a UI action).

## Phase 5 COMPLETE (stopped at Step 9 — publishing is a UI action)

All 9 archetypes converted to EDS blocks + content. Files written, gates green, handoff run.

### Blocks (blocks/**)
Shared: `cards` (variants packages/destinations/themes/blogs/tiles), `header`, `footer`, `page-banner`.
Bespoke: `hero`, `feature-triplet`, `testimonial`, `cta-banner` (home); `itinerary`, `inclusions` (package); `contact-form` (contact).

### Content (content/*.plain.html — 8 pages + nav + footer)
index, goa-yoga-retreat-package-3-days-2-nights, destination/goa, activity/cycle-tour,
blogs, destinations, yoga-holiday-in-goa, contact-us + nav + footer.

### Gates
- davids-model-lint content/: PASS 0 🔴, 14 🟡 (all justified — bespoke template-slotted blocks + picture-optional card shapes).
- qa-gate (dev-server harness): home 24 ok / 2 fail, destinations + package all blocks loaded + render non-empty, 1 h1, 0 pageerrors, 0 broken images. The 2 fails everywhere = header/footer empty (nav/footer fragments 404 locally pre-publish — resolve on publish).
- token-completeness: clean (only false positive --cf-linen, a block-local var with fallback).
- content-handoff.mjs: 8 pages stripped of envelope + img srcs pointed at local files for EMA uploader.

### Fixes applied during reconcile
- 4 pages (blogs/destinations/yoga-holiday-in-goa/contact-us) initially authored their banner as `<h1>` + `section-metadata Style: page-banner` (no CSS); converted to the `page-banner` block for consistency with the other 5 pages.
- home was re-converted after the first agent stalled (0 tool-uses).

### HANDOFF: hand back to the user — they publish from the EMA UI. Do NOT PUT/preview from here.
