# DESIGN SYSTEM: DARSHEEL SHOKEEN (V4.0)
## Cyber Cobalt & Hyper Cyan on Deep Abyssal Titanium

### 1. Strategy & Art Direction
- **Artifact:** Personal digital headquarters, product portfolio, and engineering publication.
- **Positioning:** Independent product engineer, systems architect, and founder-builder.
- **Brand Adjectives:** Instrumental, Sovereign, Precise, Luminous, Architectural.
- **3-Word Aesthetic Essence:** Deep Mineral Cyan & Technical Monolith.
- **Signature Move:** Real-Time Telemetry Cockpit & Magnetic Spotlight Glass (live IST clock, public visitor telemetry counter with spring ease, audio spectrum visualizer, and cursor-illuminated illuminated border beams).

---

### 2. Color System (60-30-10 Distribution)

#### Base Surfaces (60%)
| Token | Hex | Role |
| :--- | :--- | :--- |
| `--bg-main` | `#06090E` | Deepest mineral space slate, oceanic black canvas |
| `--bg-secondary` | `#0C1017` | Structural column and card background |
| `--bg-elevated` | `#131B26` | Floating card surfaces, toolbars, and popovers |
| `--bg-elevated-hover` | `#1A2433` | Interactive surface highlight |
| `--bg-card` | `rgba(19, 27, 38, 0.88)` | Translucent frosted glass card backdrop |

#### Structural Neutrals & Typography (30%)
| Token | Hex | Role |
| :--- | :--- | :--- |
| `--text-primary` | `#F8FAFC` | Crisp titanium white for headings and high emphasis |
| `--text-secondary` | `#94A3B8` | Cool metallic slate for body text and descriptive copy |
| `--text-muted` | `#64748B` | Subtle metadata, timestamps, and secondary captions |
| `--text-faint` | `#475569` | Micro-labels, grid lines, and decorative dividers |
| `--border-subtle` | `#1E2838` | Base hairline borders (1px) |
| `--border-medium` | `#2D3B52` | Elevated card edges and separators |
| `--border-hover` | `rgba(0, 229, 255, 0.45)` | Interactive border spotlight highlight |

#### Accents & Semantic Signals (10%)
| Token | Hex | Role |
| :--- | :--- | :--- |
| `--accent-primary` | `#00E5FF` | Laser-sharp Hyper Cyan for primary CTAs, links, and glows |
| `--accent-secondary` | `#38BDF8` | Sky Azure for badges, equalizer bars, and hover states |
| `--accent-tertiary` | `#2563EB` | Electric Cobalt for deep ambient glows and gradient tails |
| `--status-live` | `#10B981` | Emerald pulse for live production status and verified signals |
| `--status-dev` | `#F59E0B` | Solar Amber for warnings, active telemetry thresholds, and WIP |

---

### 3. Typography Architecture

- **Primary UI Sans:** `Plus Jakarta Sans`, `Inter`, `-apple-system`, `sans-serif`
  - Base body: `16px / 1.6`
  - Weights: `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold)
- **Editorial Serif:** `Newsreader`, `Georgia`, `serif`
  - Used selectively for high-impact italic emphasis in hero titles and section lead-ins.
  - Optical sizing active (`opsz: 6..72`).
  - Negative tracking on display sizes (`letter-spacing: -0.025em`).
- **Telemetry & Technical Monospace:** `JetBrains Mono`, `Consolas`, `monospace`
  - Used for sensor telemetry, code tokens, timestamps, and public telemetry tickers.
  - `font-variant-numeric: tabular-nums` enforced to prevent horizontal jitter during updates.

---

### 4. Motion & Physical Kinetic System (Apple Design & SmoothUI)

- **Input Latency Elimination:**
  - `touch-action: manipulation` across all interactive controls.
  - `:active { transform: scale(0.97); }` instant pointer-down compression.
- **Top Scroll Progress Rail:**
  - `#scroll-progress-rail` driven by throttled `requestAnimationFrame`.
  - Tri-gradient: `linear-gradient(90deg, #00E5FF 0%, #38BDF8 50%, #2563EB 100%)`.
- **Dynamic Spotlight Cards:**
  - Cursor tracking variables: `--mouse-x`, `--mouse-y`.
  - Dual-layer: Radial surface illumination (`520px`) + 1px illuminated border beam (`380px`).
  - Subtle 3D perspective tilt clamped to `±1.6deg`.
- **Fluid Nav Pill:**
  - Sliding spring pill with `cubic-bezier(0.16, 1, 0.3, 1)` transition following active and hovered navigation links.
- **AlbumCanvas Bespoke Micro-Interactions:**
  - 5-bar dynamic audio visualizer inside the live status badge.
  - Vinyl disc peek translating and rotating on card hover.
- **Accessibility:**
  - Full `@media (prefers-reduced-motion: reduce)` override disabling non-essential transforms and loops.

---

### 5. Quality & Compliance Checklist
- [x] WCAG 2.2 AA Contrast ratio (minimum 4.5:1, up to 14:1 on primary text).
- [x] Visible focus rings with `:focus-visible`.
- [x] Semantic HTML (`<article>`, `<header>`, `<nav>`, `<button>`, `<time>`).
- [x] All images locked in intentional `16:10` aspect ratio with zero distortion.
- [x] `color-scheme: dark` and `<meta name="theme-color" content="#06090E">`.
- [x] `text-wrap: balance` on headlines to eliminate typographic widows.
