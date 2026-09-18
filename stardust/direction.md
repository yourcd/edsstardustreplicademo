---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-09-17T05:50:00Z
  againstInput: https://indiauncharted.com/
  readArtifacts:
    - stardust/current/pages/index.json
    - stardust/current/pages/*.json
    - Phase-3 CSS lift (customProps + rendered stylesheet)
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of
https://indiauncharted.com/, promoted with **no `direct` invocation and no
creative decisions**.

Entry: bounded pilot (`--pages`, one representative page per archetype). The
descriptive `current/PRODUCT.md` / `DESIGN.md` / `DESIGN.json` are NOT produced
by a bounded crawl, so this run takes the **bounded promotion branch**
(`preserve-direction.md` § 1a).

Synthesized (bounded-single): current/pages/index.json + Phase-3 CSS lift →
PRODUCT.md · DESIGN.md · DESIGN.json (at 2026-09-17T05:50:00Z). Every value
traces to a captured string or a lifted CSS value; nothing invented.

Permitted deltas: ONLY the entries of
stardust/replica/inconsistency-register.md (0 entries — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

## Pilot scope

One archetype recreated + gated per page type before any site-wide fan-out:

| Archetype (page type) | Representative page |
|---|---|
| landing (home) | `/` |
| package (product/detail) | `/goa-yoga-retreat-package-3-days-2-nights/` |
| destination-landing | `/agra-tour-packages/` |
| destination (taxonomy) | `/destination/goa/` |
| activity (taxonomy) | `/activity/cycle-tour/` |
| article (blog post) | `/yoga-holiday-in-goa/` |
| listing (destinations) | `/destinations/` |
| listing (blogs) | `/blogs/` |
| contact | `/contact-us/` |

Gate breakpoints: **1440 and 360** (confirmed with user).

If the pilot grows to full site scope, Phase 1 re-runs with `--prep` and the
verbatim promotion REPLACES this synthesized spec.
