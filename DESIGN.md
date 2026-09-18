---
_provenance:
  writtenBy: stardust:replica
  mode: bounded-single
  synthesizedFrom:
    - stardust/current/pages/index.json (customProps + rendered stylesheet)
    - Phase-3 CSS lift
colors:
  brown: "#8A7156"       # primary / heading ink
  brown-lt: "#B09A80"
  brown-xlt: "#D4C4B0"
  coral: "#E3876E"       # accent / CTA
  coral-dk: "#D0705A"    # CTA hover
  linen: "#E5E3DC"       # surface / tinted sections
  white: "#FFFFFF"       # background
  ink: "#333333"         # body text
typography:
  display: "'Bodoni Moda', serif"     # headings, eyebrows
  body: "'Poppins', Arial, Tahoma, sans-serif"
  accents: ["'Montserrat'", "'Nunito Sans'", "'Rubik'"]
rounded: "20px"          # cards; pill = 100px; small = 10px
spacing: "8px base; section pad ~ 60–90px vertical"
components: [header-nav, enquiry-form, package-card, destination-card, theme-card, testimonial, blog-card, footer]
---

# DESIGN — India Uncharted (descriptive, preserve mode)

Captured visual system of the live site. Values lifted from the site's own CSS
custom properties (`--brown`, `--coral`, `--linen`, …) and its inline
stylesheet. This is the recreation target — frozen except for entries in
`stardust/replica/inconsistency-register.md`.

## Palette (lifted from `customProps`)

| Role | Token | Value |
|---|---|---|
| Heading ink / primary | `--brown` | `#8A7156` |
| Primary light | `--brown-lt` | `#B09A80` |
| Primary x-light | `--brown-xlt` | `#D4C4B0` |
| Accent / CTA | `--coral` | `#E3876E` |
| CTA hover | `--coral-dk` | `#D0705A` |
| Surface / tint | `--linen` | `#E5E3DC` |
| Background | `--white` | `#FFFFFF` |
| Hairline rule | `--rule` | `rgba(138,113,86,0.18)` |
| Rule medium | `--rule-md` | `rgba(138,113,86,0.35)` |

## Typography

- **Display / headings / eyebrows:** `'Bodoni Moda', serif` (Google Fonts,
  open-licensed — self-hostable / linkable, no substitution).
- **Body / UI:** `'Poppins', Arial, Tahoma, sans-serif`.
- Secondary sans faces present in cascade: Montserrat, Nunito Sans, Rubik.
- Preset sizes: small 13px, normal 16px, medium 20px, large 36px, x-large/huge 42px.

## Motifs

- **Shadows:** `--shadow` `0 2px 40px rgba(138,113,86,0.10)`,
  `--shadow-lg` `0 8px 60px rgba(138,113,86,0.15)` (warm brown-tinted).
- **Radii:** cards `20px`; pill buttons `100px`; small elements `10px`.
- **Easing:** `--ease` `cubic-bezier(0.25,0.46,0.45,0.94)`,
  `--ease-out` `cubic-bezier(0.16,1,0.3,1)`.
- **Buttons:** coral fill, white text, pill radius; hover → `--coral-dk`.

## Container

Contained content column ~`1342px` max-width, centered; full-bleed hero and
banner bands break out to viewport width.

## Fonts policy

All faces are Google Fonts (Bodoni Moda, Poppins, Montserrat, Nunito Sans,
Rubik) — open-licensed. Recreate via the same public source (link or
self-host); zero commercial-kit substitution required.
