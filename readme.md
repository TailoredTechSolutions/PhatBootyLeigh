# Host Leigh — Design System

A dark, editorial luxury system for **Leigh**, a professional event host & emcee. It powers her "Empire Dashboard" (bookings, contracts, payouts) and her client-facing portfolio. The mood: a velvet-rope evening — near-black obsidian surfaces, gold leaf, the occasional rose.

---

## 1. Personality
- **Obsidian, not gray.** Surfaces are deep blue-black (`--ob-950`→`--ob-900`). Never use flat `#000` or neutral grays.
- **Gold is the signature, used sparingly.** Borders are gold at low alpha (`--border-hair` / `--border-soft`); fills/CTAs use `--gd-400`; text on dark uses `--gd-300` (most legible). One gold moment per region — don't gild everything.
- **Rose is the second voice.** A warm feminine accent for highlights, secondary metrics, "sold out" states.
- **Editorial serif + humanist sans + mono numerals.** Serif (Cormorant/Playfair) carries titles and names; DM Sans carries UI; mono carries money, dates and uppercase eyebrows.

## 2. Color
Link `styles.css` for all tokens. Families:
- **Obsidian** `--ob-950…--ob-50` — backgrounds → text on dark.
- **Gold** `--gd-500…--gd-100`, plus warm `--gold` / `--gold-lt` / `--ivory` for hero & portfolio.
- **Rose** `--rose-600…--rose-200`.
- **Status** `--success` `--warning` `--danger` (+ `-text` variants tuned for dark).
- **Semantic aliases** `--bg-app` `--surface-card` `--surface-raised` `--text-heading/body/muted/faint` `--accent` `--accent-text` `--border-hair/soft/strong`.

Borders are **always** a gold-tinted hairline, never solid gray.

## 3. Type
- Display: `--font-display` (Cormorant Garamond) · editorial `--font-display-alt` (Playfair).
- Body / UI: `--font-body` (DM Sans).
- Mono: `--font-mono` (JetBrains — KPI numerals) · `--font-mono-alt` (DM Mono — eyebrows, dates, counters).
- Eyebrows are uppercase, gold, wide-tracked (`--tr-eyebrow` 3px), often prefixed with a short gold rule.
- Scale: `--fs-display` 32 → `--fs-micro` 9. Dashboard body is 14px; never below 11px.

## 4. Spacing, radius, effects
- 4px base (`--sp-*`). Card padding `--sp-8` (20), grid gap `--sp-7` (16), page padding `--sp-10` (28).
- Radii: buttons/pills `--r-sm`, gig cards `--r-md`, primary/KPI cards `--r-lg`, embeds `--r-xl`.
- Shadows are deep (near-black). `--shadow-frame` is the signature framed-embed look (black ring + drop + faint gold glow). `--glow-gold` for active dots/rails.

## 5. Components (`window.HostLeighDesignSystem_02e8ee`)
`Button` · `Badge` · `Card` · `KpiCard` · `ProgressBar` · `GigCard` · `Avatar` · `SectionTitle` · `BorderGlow`.
See `components/components.html` for live usage and the `.d.ts` files for full props.

**BorderGlow** is the house treatment for **anything clickable that opens or expands** (cards, tiles, splash triggers). Three ways to apply it:
- React: wrap content in `<BorderGlow>` (gold by default; retune via `glowColor` / `colors` / `animated`).
- Plain HTML: give the box `class="border-glow-card"`, add `<span class="edge-light"></span>` + a `.border-glow-inner` wrapper, and load `border-glow.js` once (it auto-tracks the pointer, even on nodes added later).
- `GigCard` carries it built-in (`glow` prop, default on).

## 6. Background
Every page carries the **Galaxy** starfield (`galaxy-bg.js`) — a gold-hued WebGL field that auto-injects a fixed, `pointer-events:none` layer behind content (so it never blocks clicks). Include once per page: `<script type="module" src="<path>/galaxy-bg.js"></script>`. It honors reduced-motion and pauses on hidden tabs. Override the look by setting `window.GALAXY_OPTS = { density, hueShift, glowIntensity, … }` before it loads. For full-bleed layouts (the dashboard), keep `body` obsidian and set inner wrappers to `background: transparent` so stars show through the gutters.

## 7. Templates
- **Empire Dashboard** (`templates/empire-dashboard/`) — the booking/ops dashboard starting point.

## 8. Index
- `styles.css` — entry; `@import`s all tokens.
- `tokens/` — colors, typography, spacing, effects, fonts.
- `components/` — `Name.jsx` + `Name.d.ts` pairs.
- `foundations/` — Design System tab specimen cards.
- `templates/` — copyable starting layouts.
- `assets/photos/` — real event & portrait imagery.
