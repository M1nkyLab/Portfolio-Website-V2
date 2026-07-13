# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Overview

This is a **Next.js 14 portfolio website** with advanced animations and interactions. It's a modern, high-performance personal portfolio featuring:

- **App Router**: Pages organized in `src/app/` using Next.js 13+ App Router convention
- **Smooth Scrolling**: Lenis (via `@studio-freight/react-lenis`) for momentum-based scroll
- **Animation Libraries**: Framer Motion and GSAP for complex animations
- **Custom Cursor**: Magnetic cursor component replacing default browser cursor on desktop
- **Dynamic Text Animations**: Split-text and looping headline utilities
- **SEO**: Metadata, sitemap, robots.txt, and Vercel Speed Insights integrated

## Architecture & Key Patterns

### Component Organization

```
src/
├── app/                          # Next.js app router pages
│   ├── layout.tsx                # Root layout with providers (Lenis, MagneticCursor, Preloader)
│   ├── template.tsx              # Page-level transitions
│   ├── globals.css               # CSS variables + Tailwind setup
│   ├── page.tsx                  # Home page with PagePeelLayout
│   ├── about/, background/, contact/, experience/, work/
│   ├── robots.ts                 # SEO robots.txt generation
│   └── sitemap.ts                # SEO sitemap generation
├── components/
│   ├── common/                   # Reusable UI primitives
│   │   ├── LenisProvider.tsx      # Smooth scroll provider
│   │   ├── MagneticCursor.tsx     # Custom cursor component
│   │   ├── Preloader.tsx          # Loading animation
│   │   ├── PagePeelLayout.tsx     # Main layout component (4-quadrant peel effect)
│   │   ├── SplitHeadline.tsx      # Text splitting animation utilities
│   │   ├── MagneticButton.tsx     # Interactive button with magnetic effect
│   │   ├── HoverGrid.tsx          # Grid hover effect component
│   │   ├── CornerButton/Link.tsx  # Corner navigation elements
│   │   └── ScrollReveal.tsx       # Scroll-triggered reveal animations
│   ├── layout/
│   │   └── LandingHero.tsx        # Landing page hero
│   └── sections/                 # Page sections
│       ├── Hero.tsx              # Main hero section
│       ├── About.tsx, Contact.tsx, Experience.tsx, FeaturedWork.tsx
└── hooks/                        # Custom React hooks
    ├── useMousePosition.ts       # Tracks cursor position for magnetic effects
    ├── useScrollAnimation.ts     # Scroll-triggered animations
    └── useVideoScrub.ts          # Video scrubbing on scroll
```

### Critical Architectural Decisions

1. **PagePeelLayout**: The main home page uses a unique "peel" layout component that renders 4 quadrants (`top-left`, `top-right`, `bottom-left`, `bottom-right`) with peek/peel interactions. This is the central interactive pattern on the site.

2. **Providers**: All global providers (Lenis, MagneticCursor, Preloader, SpeedInsights) live in `src/app/layout.tsx` and wrap the entire app. Client-side providers like `LenisProvider` are marked with `"use client"`.

3. **Styling**: Color scheme uses CSS variables defined in `globals.css` under the `--syedhaziq-*` namespace and exposed via Tailwind's `extend.colors.syedhaziq`. Fonts: Clash Display (headings), Switzer (body), DM Mono (code).

4. **Animation Entry Points**:
   - **Scroll-based**: `useScrollAnimation` hook observes intersection
   - **Cursor-based**: `useMousePosition` powers magnetic cursor and button effects
   - **Page-level**: `template.tsx` can add entrance/exit transitions between pages

5. **Custom Cursor**: Replaces browser cursor on `md` breakpoint and up (`@media (min-width: 768px)`). Hidden input-heavy forms via `[data-lenis-prevent]`.

## Key Dependencies

- **Next.js 14**: App Router, Image optimization, built-in SEO
- **Framer Motion**: Component-level animations and page transitions
- **GSAP**: Complex timeline and callback-based animations
- **@studio-freight/react-lenis**: Smooth, momentum-based scrolling
- **split-type**: Text splitting for staggered animations
- **Tailwind + clsx**: Styling; `clsx` + `tailwind-merge` for conditional class merging
- **Vercel Speed Insights**: Performance monitoring

## Code Style & Conventions

- **Component Exports**: Default exports only (all components are server components unless `"use client"` declared)
- **Type Annotations**: Full TypeScript strict mode enforced
- **Naming**: PascalCase for components/hooks, camelCase for functions/variables
- **CSS Variables**: Use Tailwind's color scale (e.g., `text-syedhaziq-text`) instead of direct color hex
- **Animation**: Prefer Framer Motion for React component animations; use GSAP only for complex DOM manipulation
- **Responsive**: Mobile-first Tailwind classes; custom cursor disabled on mobile

## Git Workflow

- Main branch: `main`
- Commit message format: `type: description` (e.g., `feat: add scroll reveal animation`)
- Types: `feat`, `fix`, `chore`, `refactor`, `docs`
- SEO-related changes (`robots.ts`, `sitemap.ts`) are tracked in git history for production deployments

## Performance & Testing Notes

- **Vercel Deployment**: App is deployed to Vercel with Speed Insights enabled
- **Type Checking**: Run `npm run lint` before committing (includes ESLint + type checking)
- **No Unit Tests**: Currently no test suite; feature validation is manual through browser testing
- **Bundle Size**: Monitor via Vercel Analytics when adding animation libraries

## Common Workflows

### Adding a New Animated Section
1. Create component in `src/components/sections/`
2. If scroll-triggered, import `useScrollAnimation` hook
3. Wrap text in `SplitHeadline` or `SplitParagraph` for staggered animation
4. Export as default and import in relevant page file

### Modifying Colors/Styling
1. Update CSS variables in `globals.css` (`:root` section)
2. Reference via Tailwind classes (e.g., `bg-syedhaziq-gold`)
3. Never hardcode hex colors in components

### Adding Page Routes
1. Create directory under `src/app/` (e.g., `src/app/new-page/`)
2. Add `page.tsx` (automatically becomes a route)
3. Import layout components from `src/components/`
4. Update navigation links in `CornerLink.tsx` or relevant nav component
