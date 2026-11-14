# DESIGN.md — DARSHEEL SHOKEEN (V5.0 AWWWARDS CONTENDER EDITION)
## Architectural Cyber Monolith & Playable Engineering Exhibition

---

## 1. Context (From Discovery)

- **Artifact Type:** Portfolio & Engineering Publication (`artifact-types.md` § Portfolio / Brand Site).
- **Positioning:** Independent Product Engineer, Systems Architect, and Founder-Builder.
- **Audience:** Global design directors, engineering leaders, technology founders, and elite clients seeking top 1% product execution.
- **Primary Action:** Explore flagship engineering work, test live interactive widgets, inspect technical case studies, and initiate high-value collaboration commissions.
- **Brand Adjectives:** Architectural, Sovereign, Instrumental, Luminous, Precise.
- **Visual Word Translations:**
  - *Architectural* -> Strict geometric grid, hairline scaffolding, running section coordinates (`01 //`, `02 //`), no decorative card clutter.
  - *Sovereign* -> Authoritative display typography, self-hosted runtime, zero third-party tracking scripts, local telemetry.
  - *Instrumental* -> Playable interactive widgets inside each project (vinyl audio visualizer, IoT node switcher, 5E pedagogical stepper, DCF valuation model).
  - *Luminous* -> Radiant Hyper Cyan and Sky Azure accents against deep mineral obsidian, subtle ambient back-radiation halos.
  - *Precise* -> Tabular monospaced figures (`tabular-nums`), debounced ADC sensor readouts, live IST clock with second ticks.
- **3-Word Aesthetic Essence:** Deep Monolith Cyan.
- **Single-Minded Proposition:** An independent product engineer who designs with international editorial prestige and builds with first-principles systems rigor.
- **Archetype:** Creator / Sage.
- **References:**
  - *Admire:* Apple WWDC Developer Keynotes (fluid spring kinetics), Linear (keyboard command palette, micro-haptics), Stripe Press (editorial typographic discipline), Active Theory / Awwwards Site of the Day (spatial motion, sound design).
  - *Avoid:* Generic SaaS purple-on-black AI templates, floating blob shapes, fake 3D isometric stock illustrations, ungrounded testimonials, center-aligned body copy.
- **Mode:** Dark Mode Native (OLED Deep Titanium `#06080D` / OKLCH `oklch(0.12 0.015 245)`).
- **Density:** Airy and expansive for project showcases; dense and technical for telemetry and valuation matrices.
- **Constraints:** Vanilla ES6+ and pure CSS for maximum performance, zero bloated frameworks, sub-100ms TTI, WCAG 2.2 AA compliance, full `prefers-reduced-motion` override.

---

## 2. Aesthetic & Signature Moves

- **Direction:** Architectural Cyber Monolith (Editorial Swiss Hybrid).
- **Defining Trait:** High-contrast editorial typography and architectural hairline scaffolding replacing standard SaaS card grids; playable interactive engineering widgets directly on flagship showcases.
- **Signature Moves:**
  1. **Real-Time Telemetry Cockpit:** Live orbital coordinates `[ 28°36'N 77°12'E • NEW DELHI ]`, live IST clock with seconds, and authentic animated character avatar inside an architectural titanium floating capsule with dynamic 3D cursor tilt.
  2. **Playable Engineering Exhibition:**
     - *AlbumCanvas:* Interactive vinyl record spin + 16-band real-time SVG audio visualizer + dynamic wallpaper color extraction simulator.
     - *Smart Flood Alert:* Interactive IoT sensing node toggle (Node 01 vs Node 02) + dynamic depth gauge + morphing SVG hydrograph + simulated Meta Cloud WhatsApp evacuation dispatch.
     - *LessonPlan Maker:* Interactive 5E pedagogical cycle stepper + real-time NEP 2020 learning outcome prompt generator.
     - *Financial Research Platform:* Interactive quantitative DCF valuation model with revenue CAGR and WACC sliders dynamically computing intrinsic share value and margin of safety.
  3. **Native Web Audio API Sound Design:** Optional micro-audio haptics synthesized client-side (sine blip at 800Hz/1200Hz, 15ms) with a dedicated navbar sound toggle (`🔊 Audio: ON / OFF`). Zero external audio files required.
  4. **Smooth Magnetic Cursor:** Precision custom pointer dot with spring-lagging trailing ring that magnetically locks to interactive controls on desktop pointers.

---

## 3. Typography Architecture

- **Primary UI Sans:** `Plus Jakarta Sans`, `Inter`, `-apple-system`, `sans-serif`
  - Weights: `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold), `800` (Heavy).
  - Used for structural interface copy, buttons, badges, and navigation.
- **Editorial Display Serif:** `Newsreader`, `Georgia`, `serif`
  - Optical sizing active (`opsz: 6..72`), weights `400` / `500`, with italic emphasis.
  - Negative tracking on display headlines (`letter-spacing: -0.025em`).
- **Telemetry & Technical Monospace:** `JetBrains Mono`, `Consolas`, `monospace`
  - Weights: `400`, `500`, `600`.
  - `font-variant-numeric: tabular-nums` enforced to prevent horizontal number jitter.

### Modular Type Scale (1.25 Major Third)
| Token | Step | Size (Desktop) | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--text-display` | Display | `clamp(2.8rem, 5.8vw, 4.8rem)` | `1.05` | Hero headline statement |
| `--text-h1` | H1 | `clamp(2.0rem, 3.8vw, 3.2rem)` | `1.15` | Section titles |
| `--text-h2` | H2 | `clamp(1.5rem, 2.6vw, 2.2rem)` | `1.25` | Flagship project titles |
| `--text-h3` | H3 | `1.25rem (20px)` | `1.4` | Card titles and subsection headers |
| `--text-base` | Body | `1.0rem (16px)` | `1.65` | Narrative body copy (measure 65–75ch) |
| `--text-sm` | Small | `0.875rem (14px)` | `1.5` | Captions, button labels, and tech tags |
| `--text-xs` | Micro | `0.75rem (12px)` | `1.4` | Monospace coordinates, timestamps, and chips |

---

## 4. Color Architecture (OKLCH 60-30-10 System)

Authored in OKLCH with hex fallbacks. Dominant abyssal slate, structural titanium neutrals, and laser Hyper Cyan accent.

```css
:root {
  /* 60% Base Oceanic Slate Surfaces */
  --color-bg: oklch(0.12 0.015 245);          /* #06080D - Abyssal canvas */
  --color-surface: oklch(0.16 0.02 245);     /* #0C1017 - Structural columns & cards */
  --color-elevated: oklch(0.20 0.025 245);   /* #131B26 - Floating panels & popovers */
  --color-elevated-hover: oklch(0.24 0.03 245); /* #1A2433 - Interactive hover state */
  --color-card-glass: rgba(12, 16, 23, 0.85);

  /* 30% Structural Neutrals & Hairline Edges */
  --color-fg: oklch(0.97 0.005 240);         /* #F8FAFC - Primary titanium white */
  --color-fg-secondary: oklch(0.70 0.015 240); /* #94A3B8 - Descriptive slate */
  --color-fg-muted: oklch(0.52 0.02 240);    /* #64748B - Metadata & labels */
  --color-border: oklch(0.24 0.02 245);      /* #1D2A3D - Base hairline border (1px) */
  --color-border-hover: rgba(0, 229, 255, 0.45);

  /* 10% Sharp Accents & Semantic Telemetry Signals */
  --color-accent: oklch(0.85 0.18 200);      /* #00E5FF - Laser Hyper Cyan */
  --color-accent-secondary: oklch(0.72 0.15 220); /* #38BDF8 - Sky Azure */
  --color-accent-tertiary: oklch(0.55 0.22 255);  /* #2563EB - Electric Cobalt */
  --color-status-live: oklch(0.72 0.17 155); /* #10B981 - Emerald Live Pulse */
  --color-status-dev: oklch(0.78 0.16 75);   /* #F59E0B - Solar Amber Alert */
}
```

---

## 5. Spacing, Radius & Elevation

- **Spacing Base:** 4px grid. Constrained rhythm:
  `--space-1: 0.25rem (4px)`, `--space-2: 0.5rem (8px)`, `--space-3: 1rem (16px)`,
  `--space-4: 1.5rem (24px)`, `--space-5: 2rem (32px)`, `--space-6: 3rem (48px)`,
  `--space-8: 5rem (80px)`, `--space-10: 7.5rem (120px)`.
- **Radius:** Committed and disciplined:
  - Base cards & buttons: `var(--radius-sm): 6px` or `var(--radius-md): 10px`.
  - Capsules & badges: `var(--radius-pill): 9999px`.
  - Avatar frame: `50%` circular bezel.
- **Elevation Approach:** Pure lightness-based elevation with crisp 1px borders and dynamic radial spotlight glow (`--mouse-x`, `--mouse-y`), avoiding diffuse blurry drop-shadows.

---

## 6. Motion & Kinetic Engine

- **Duration Scale:**
  - Instant (micro-haptics, button press): `100ms`
  - Fast (tab transitions, hover shifts): `150ms`
  - Normal (card reveals, dropdowns): `250ms`
  - Slow (staggered scroll reveals, sheet drawer): `400ms`
- **Easing:**
  - `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)` (WWDC fluid spring physics)
  - `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
- **Tactile Feedback:** Instantaneous press compression: `:active { transform: scale(0.97) !important; }`. Zero mobile touch delay with `touch-action: manipulation`.
- **Accessibility Gate:** Strict `@media (prefers-reduced-motion: reduce)` bypasses all transforms, smooth scrolls, audio synthesizers, and continuous animations.

---

## 7. Quality Assurance & Compliance

- [x] WCAG 2.2 AA Contrast ratio (minimum 4.5:1, up to 14.2:1 for primary headings).
- [x] Visible focus indicator rings with `:focus-visible`.
- [x] Semantic HTML5 layout (`<article>`, `<header>`, `<nav>`, `<aside>`, `<time>`, `<figure>`).
- [x] All 4 flagship project covers locked in strict 16:10 aspect ratio with zero distortion.
- [x] Server-side zero-cache headers enforced through `index.php` and `projects.php`.
- [x] Responsive layout verified across 375px (Mobile), 768px (Tablet), 1024px (Laptop), and 1440px (Desktop).
