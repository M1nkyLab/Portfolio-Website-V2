# Syed Haziq Portfolio — Design & Architecture Reference
> Reverse-engineered from `M1nkyLab/Portfolio-Website-V2` (branch: `main`)
> Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis

---

## 1. Tech Stack

| Layer | Library | Version | Purpose |
|---|---|---|---|
| Framework | `next` | 14.2.35 | App Router, SSR/static pages |
| UI | `react` / `react-dom` | ^18 | Component layer |
| Styling | `tailwindcss` | ^3.4.1 | Utility CSS + design tokens |
| Motion (declarative) | `framer-motion` | ^12.42 | Page transitions, peel/fold animations |
| Motion (imperative) | `gsap` (+ `ScrollTrigger`) | ^3.15 | Scroll-triggered reveals, magnetic cursor, headline loops |
| Smooth scroll | `@studio-freight/react-lenis` | ^0.0.47 | Inertia scrolling |
| Text splitting | `split-type` | ^0.3.4 | Per-line/word/char animation targets |
| Icons | `lucide-react` | ^1.22 | Line-icon set |
| Utility | `clsx` + `tailwind-merge` | — | `cn()` classname helper |
| Analytics | `@vercel/speed-insights` | ^2.0 | Perf monitoring |

No CMS, no backend, no database — fully static/client-driven content (hard-coded in components).

---

## 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root shell: Preloader, LenisProvider, MagneticCursor
│   ├── template.tsx        # Route-level enter transition (clip-path + blur)
│   ├── page.tsx            # Home — assembles PagePeelLayout
│   ├── about/page.tsx      # Standalone /about route (renders <About/> directly)
│   ├── contact/page.tsx    # Standalone /contact route (renders <Contact/> directly)
│   ├── globals.css         # Design tokens (CSS vars), font imports, base styles
│   ├── robots.ts / sitemap.ts
│   └── fonts/              # Local Geist fallback woff files (unused by default theme)
├── components/
│   ├── common/              # Reusable interaction primitives (see §5)
│   └── sections/            # Page content blocks: Hero, About, FeaturedWork, Experience, Contact
└── lib/utils.ts             # cn() = clsx + tailwind-merge
```

---

## 3. Design Tokens

Defined as CSS custom properties in `globals.css`, then bridged into Tailwind via `tailwind.config.ts`.

### 3.1 Color palette (`--syedhaziq-*`)

| Token | Hex | Role |
|---|---|---|
| `--syedhaziq-bg` | `#f4f3ef` | Primary background — warm off-white/cream |
| `--syedhaziq-surface` | `#e8e6df` | Secondary panel background (slightly darker cream) |
| `--syedhaziq-gold` | `#603434` | **Primary accent** — muted maroon/oxblood (named "gold" in tokens but functions as the brand accent) |
| `--syedhaziq-gold-dim` | `#452424` | Darker accent variant — borders, dividers |
| `--syedhaziq-text` | `#603434` | Primary text color (same as accent — text reads in maroon, not black) |
| `--syedhaziq-muted` | `#9c8a8a` | Secondary/muted text |
| `--syedhaziq-success` | `#4a8c6a` | Success state (unused in current UI) |
| `--syedhaziq-danger` | `#8c3a3a` | Error state (unused in current UI) |

One additional inline accent appears repeatedly outside the token system: `#faebe3` (blush/peach) used as the `FeaturedWork` section background.

**Palette character:** this is a *light, warm, editorial* palette — cream paper + oxblood ink — not a dark/crimson-on-black theme. Full-bleed inverted sections use solid `#603434` fill with `#f4f3ef` text (see §3.3).

### 3.2 Typography

| Token | Font | Usage |
|---|---|---|
| `font-display` | **Clash Display** (via Fontshare) | All headings (`h1–h6`), nav labels, big display type — the `SYEDHAZIQ` poster wordmark, hero headline, section titles |
| `font-body` | **Switzer** (via Fontshare) | Body copy, paragraphs |
| `font-mono` | **DM Mono** (Google Fonts) | Dates, tags, small meta labels (e.g. experience timeline dates, corner nav labels) |

Import (top of `globals.css`):
```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=switzer@300,400,500,600,700,800,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');
```

Design tokens (`@layer base` in `globals.css`):
```css
--font-display: 'Clash Display', sans-serif;
--font-body: 'Switzer', sans-serif;
--font-dm-mono: 'DM Mono', monospace;
```

**Why this pairing:** the site uses **Clash Display** for headings to give a clean, contemporary and bold feel that works perfectly for a modern portfolio. **Switzer** is used for body text as a highly legible, neutral geometric sans that doesn't compete with the dramatic headings. DM Mono is kept for utility roles like dates/labels, adding a subtle technical "case-file" touch.

Fonts are loaded via `@import url(...)` at the top of `globals.css` (Fontshare + Google Fonts CDN), not `next/font`. Local Geist `.woff` files exist in `src/app/fonts/` but are not wired into the active theme — likely leftover from `create-next-app` scaffolding.

Headings default to `font-medium tracking-tight` (see `@layer base` in `globals.css`). The font is well-suited for high-impact typography. Keep Clash Display to headline-scale use only; don't drop it into mono/label-scale text.

### 3.3 Inversion pattern (`data-cursor-invert`)

Sections meant to sit on the maroon fill (`About`, `Contact`) are tagged `data-cursor-invert="true"`. `MagneticCursor` listens for this attribute on `mousemove` and swaps its own colors (cream cursor/glow on dark sections, maroon cursor/glow on light sections) so the cursor stays visible against whatever background it's over.

### 3.4 Radii

```
rounded-card = 2px   (sharp, near-square — used for small chips/cards)
rounded-btn  = 6px   (buttons)
rounded-bleed = 0px  (full-bleed elements)
```

### 3.5 Cursor

Native cursor is hidden globally on `md:` and above (`* { cursor: none !important }`), replaced entirely by the custom `MagneticCursor` (§5.5).

---

## 4. Layout Architecture — The "Peel" Hub

The homepage is **not** a vertical scroll of stacked sections. It's a single-viewport **hub-and-spoke** layout:

```
┌─────────────────────────────┐
│  ABOUT              WORK    │   ← 4 corner labels, always visible
│                             │
│         [ HERO ]            │   ← top layer, full-bleed
│                             │
│  BACKGROUND       CONTACT   │
└─────────────────────────────┘
```

- `PagePeelLayout` renders the `Hero` as a fixed **top layer** covering the full viewport.
- Four `CornerButton`s sit in the four screen corners (`ABOUT` / `WORK` / `BACKGROUND` / `CONTACT`), each pinned to a `sections` entry (`About`, `FeaturedWork`, `Experience`, `Contact`).
- Clicking a corner "peels" the Hero layer away via a Framer Motion `clipPath` animation that collapses the top layer toward the **opposite** corner (e.g. clicking `top-left` collapses the clip-path toward `100% 100%`, revealing the section underneath as if the page were peeled back like paper).
- The revealed section fills the background layer (`z-0`); scrolling is re-enabled only while a section is open (`document.body.style.overflow` toggles based on `openedSection` state).
- A floating `✕` close button (top-right, `fixed`) returns to the hub, resetting scroll to top and re-locking body scroll.
- `/about` and `/contact` also exist as **standalone routes** that render the same section components directly (used for shareable/direct links, bypassing the peel interaction).

This is effectively a single-page-app pattern layered on top of Next.js routing — the hub is the "true" home, and standalone routes are secondary/SEO-friendly duplicates of two of the four sections.

---

## 5. Core Interaction Components (`src/components/common/`)

### 5.1 `PagePeelLayout`
State machine with one state: `openedSection: CornerPosition | null`. Owns the peel animation via Framer Motion `variants` keyed by corner (`peel_top_left`, `peel_top_right`, etc.), each collapsing the clip-path polygon to a single point at the opposite corner over `1.2s`.

### 5.2 `CornerButton`
128–192px (responsive) invisible hit-target in each corner; label text scales to `1.05×` and shifts to the accent maroon on hover. Pure Framer Motion `animate` prop, no CSS transitions.

### 5.3 `CornerLink`
A more elaborate **drag-to-navigate** corner affordance (used for cross-page nav, distinct from `CornerButton`'s click-to-peel): hovering grows a colored square from the corner; the user can **drag** the invisible handle toward the center, and crossing 80% of a 150px threshold triggers `router.push(href)`. The square is clipped into a triangular "folded paper corner" (`clip-path: polygon(...)`) with a subtle rotation on hover — a literal page-fold metaphor. Currently defined as a reusable primitive; not wired into `page.tsx` in favor of `CornerButton`, suggesting it's either legacy or reserved for a future "flip to next page" interaction between routes.

### 5.4 `HoverGrid`
A full-bleed grid of 50×50px cells computed from `window.innerWidth/Height`, each cell highlighting on `:hover` with a 0ms-in / 1000ms-out transition (`hover:duration-0 duration-1000`) — creates a "light trail" effect as the cursor moves across the Hero background.

### 5.5 `MagneticCursor`
Custom cursor replacing the native pointer on desktop (`md:` and up): a small bordered dot (16px) tracked at low-latency (`duration: 0.15`) plus a large soft blurred glow (250px, `blur-70px`, opacity 0.25) trailing behind it (`duration: 0.6`) — both driven by `gsap.quickTo` for perf. Colors invert on `[data-cursor-invert="true"]` sections (see §3.3).

### 5.6 `MagneticButton`
Generic wrapper that displaces its children toward the cursor on hover (`x * 0.3`, `y * 0.3` of cursor offset from center) via `gsap.to`, snapping back with an elastic ease on mouse-leave. Currently a standalone primitive not yet consumed by any section — likely reserved for future CTA buttons.

### 5.7 `SplitHeadline` / `SplitParagraph` / `LoopingHeadline`
Text-reveal primitives built on `split-type`:
- **SplitHeadline** — splits into chars, fades/rises them in with a staggered GSAP tween on mount.
- **SplitParagraph** — splits into lines, wraps each in an `overflow:hidden` div, and slides them up from `100%` — a classic "line reveal" effect.
- **LoopingHeadline** — cycles through an array of strings (used in `Hero` for `["Syed Haziq", "Frontend Developer", "UI Engineer"]`), animating chars in, holding, animating out, then advancing to the next string in a `useLayoutEffect` loop.

### 5.8 `Preloader`
Full-screen splash gating first paint. Simulates progress with randomized increments (`Math.random() * 15` per tick) until 100%, holds briefly, then displays "Heyyyyy" before sliding the whole overlay up (`y: "-100%"`) to reveal the site. Locks `body` scroll while active.

### 5.9 `LenisProvider`
Wraps the app in `ReactLenis` for inertia/smooth-scroll (`lerp: 0.05`, `duration: 1.5`).

### 5.10 `Template` (route-level, in `app/`)
Applied automatically by Next.js on every route change: content enters via an animated `clip-path` wipe from the bottom (`polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` → full rect) combined with a blur-to-sharp and slide-up, over `0.9s` with a custom cubic-bezier (`[0.76, 0, 0.24, 1]`) — the same "expo-ish" ease reused across the Preloader exit and peel transitions, giving the whole site one consistent motion signature.

---

## 6. Sections (`src/components/sections/`)

### 6.1 Hero
Full-viewport centerpiece: SVG fractal-noise texture overlay (`mix-blend-screen`, 15% opacity) + `HoverGrid` behind a centered `LoopingHeadline` cycling through name/role text. No CTA buttons — the four corners *are* the navigation.

### 6.2 About
Inverted section (`data-cursor-invert`, solid `#603434` fill, cream text). Two-column intro copy (bio + Instamedia/Syed Haziq blurb) animated in via GSAP `ScrollTrigger` (stagger 0.2s on scroll into view). Below it, a huge letter-by-letter "SYEDHAZIQ" wordmark spans the full width using `justify-between` on individual `<h2>` chars sized at `11.5vw` — a poster-scale signature treatment.

### 6.3 FeaturedWork
Light blush background (`#faebe3`). Large centered pull-quote about iterative craft, followed by a 2-column project grid (`Visual Symphony`, `Re:Label`, `Maybank Dashboard`, `Cinematic Portfolio`) — currently using Unsplash placeholder imagery pending real project shots. Cards: `4:3` rounded image with `scale-105` hover zoom, title below.

### 6.4 Experience
Neutral surface background. Left-column section title ("Where I've been") + right-column vertical timeline with a left border rail, icon medallions (`Briefcase`, `GraduationCap`, `Award` from Lucide) at each node, and a horizontal-scroll-reveal stagger (GSAP, `x: -30 → 0`). Includes an Instamedia internship entry, Diploma in Computer Science entry, and a certifications row (CompTIA Cloud+, freeCodeCamp Frontend) as pill chips.

### 6.5 Contact
Inverted footer-style section mirroring `About`'s maroon fill. Giant centered display headline ("Say hello, I don't bite.") at `10vw`, a pill CTA button (`mailto:` link) with an arrow-slide-on-hover micro-interaction, and a two-column footer strip (social links / location) below.

---

## 7. Motion Language — Summary

A single easing signature recurs across the whole site: **`cubic-bezier(0.76, 0, 0.24, 1)`** (a sharp, confident ease-in-out) is used for the Preloader exit, the route `Template` transition, and implicitly echoed in the corner-peel timing. Combined with:
- Clip-path wipes (never simple fades) for full-screen transitions
- GSAP `ScrollTrigger` stagger reveals for in-page content (0.15–0.2s stagger, `power3.out`)
- `split-type` line/char reveals for typography
- A magnetic, low-latency custom cursor as a constant ambient layer

...the overall motion identity is "editorial print brought to life" — paper-fold and peel metaphors, staggered typographic reveals, and a physically-reactive cursor, rather than generic fade/slide transitions.

---

## 8. Notable Gaps / Build Notes (for anyone cloning this)

- `FeaturedWork` project images are Unsplash placeholders — swap for real project screenshots.
- `CornerLink` (drag-to-navigate) and `MagneticButton` are built but not currently wired into any page — available primitives for extending navigation or CTAs.
- Social links in `Contact` for LinkedIn (`LI`) and `RESUME` are placeholder `href="#"`.
- No dark mode — the palette is fixed/light by design (maroon-on-cream), so a "dark theme" would need new tokens rather than a toggle.
- Local Geist font files are present but unused — safe to remove if not needed elsewhere.
- All copy/content is hard-coded directly in section components (no CMS/MDX layer) — fastest to edit, but means content changes require code edits/redeploys.