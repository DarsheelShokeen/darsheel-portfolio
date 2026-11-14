# DESIGN.md — DARSHEEL SHOKEEN
## Tom de Koning Reference Adaptation | Avant-Garde Minimalist & Liquid Glass Engineering

---

## 1. Context & Blueprint Translation

- **Reference Blueprint:** Tom de Koning Personal Portfolio (`https://www.tomdekoning.work/`).
- **Objective:** High-fidelity architectural recreation of Tom de Koning's layout, composition, typography, spacing, navigation, interactions, and animations, adapted 100% to Darsheel Shokeen's identity, content, and real software engineering projects.
- **Positioning:** Product Engineer, Systems Architect, and Independent Builder.
- **Audience:** Global design directors, engineering executives, technical founders, and elite teams looking for world-class product engineering.
- **Aesthetic Essence:** Dutch Avant-Garde Minimalist, High-Contrast Typography, Liquid Glass Refraction.
- **3-Word Essence:** Pitch, Vermilion, Sand.
- **Brand Adjectives:** Bold, Editorial, Tactile, Fluid, Uncompromising.

---

## 2. Color Palette System

Strictly aligned with the reference design tokens:

| Token | Hex Value | Role / Usage |
|---|---|---|
| `--black` | `#0B0B0B` | Primary background, fullscreen menu background, deep pitch black surfaces |
| `--sand` | `#E7E1D7` | Secondary text, stats labels, divider borders, clean linen neutral |
| `--orange` | `#F34213` | Primary accent, 8-point rotating star, text highlights, button background, menu dots, cursor |
| `--white` | `#FFFFFF` | Primary headlines, extreme display titles |
| `border-line` | `rgba(231, 225, 215, 0.2)` | 1px hairline horizontal scaffolding and table separators |
| `selection` | `#0B0B0B` on `#F34213` | Text selection highlight |

---

## 3. Typography Architecture

- **Primary Grotesque Sans:** `PP Neue Montreal` (`Ppneuemontreal`, `Plus Jakarta Sans`, `-apple-system`, `sans-serif`)
  - Weight: 400 (Regular), 500 (Medium), 600 (Semi-bold).
  - Used for interface elements, hero text, stats, navigation, body paragraphs.
- **Editorial Accent Serif:** `Playfair Display`, `Georgia`, `serif`
  - Style: Italic.
  - Signature Move: Dynamic wrapping of every letter 'O' and 'o' across headings into `<span class="playfair-o">o</span>` with negative optical kerning (`left: -0.075em`).
- **Scale Hierarchy:**
  - `heading-extreme`: `32vw` ("Work" display headline).
  - `heading-2`: `14.5vw` / `clamp(2.5rem, 8vw, 6rem)` (About statement).
  - `h1.text-align-right`: `clamp(3.5rem, 10vw, 8.5rem)` (Darsheel Shokeen title).
  - `h6`: `0.85rem` uppercase, letter-spaced labels.
  - Body: `1.05rem` / line-height `1.55`.

---

## 4. Key Sections & Visual Composition

1. **Floating Navigation (`navbar`):**
   - Left: Minimalist geometric "DS" lettermark button linked to `#header`.
   - Right: Pill menu button with 5-dot orange matrix icon that morphs into an 'X' on click.
   - Overlay Menu: Fullscreen `#0B0B0B` overlay featuring staggered slide-up links (`INFO`, `ABOUT`, `WORK`, `CONTACT`).
2. **Hero Section (`#header`):**
   - Sticky 3D geometric/procedural canvas (`image-sequence__canvas`) in right column responding to scroll.
   - Header top: `darsheelshokeen.xo.je` (Left), `portfolio 2026` (Right).
   - Header bottom: `Hi there`, 8-point geometric star in `#F34213` rotating with scroll velocity, intro manifesto, thin horizontal line, and massive right-aligned `darsheelshokeen.xo.je`.
   - Info block (`#info`): 2-column layout (`7fr 5fr`) with stats stack (Services, Experience, Delhi IST Clock, Availability, Focus Areas) and tactile dual-state pill button (`button-097` "View work" / "Explore Systems →").
3. **About Section (`#about`):**
   - Giant headline `heading-2`: *"I engineer software that commands attention — systems, products and beyond"*.
   - 2-column editorial grid (`_2-col is-3-9`) with Darsheel's engineering philosophy.
4. **Work Section (`#work`):**
   - Pre-headline: `What you’re here for (I guess)` + `<h2 class="heading-extreme">Work</h2>`.
   - Fullscreen horizontal **Liquid Glass Carousel**:
     - Three.js WebGL shader with liquid chromatic dispersion, rim waves, inertia dragging, touch swipe, and wheel scroll.
     - Darsheel's 5 projects: **AlbumCanvas**, **Smart Flood Alert**, **LessonPlan Maker**, **Financial Research Platform**, **EduCloud Management System**.
5. **Footer / Contact Section (`#contact`):**
   - Rounded container `footer-base`: Top bar, 2-column direct contact links (Email, GitHub, LinkedIn), horizontal line, and continuous infinite marquee `darsheelshokeen.xo.je`.
6. **Cursor Physics:**
   - Custom glowing orange path canvas with smooth trailing dot (`cursor-wrap`).
