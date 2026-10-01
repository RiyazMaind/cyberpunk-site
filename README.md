# NULLBEACON

Single-page cyberpunk product site. Next.js 16 App Router, React 19, Tailwind v4
(CSS-first). Every visual is CSS - there are no image assets and no runtime
dependencies beyond `next`, `react`, `react-dom`.

All product copy is fictional.

## Commands

```bash
npm run dev      # dev server
npm run lint     # eslint (core-web-vitals + typescript)
npx tsc --noEmit # typecheck
npm run build    # authoritative for CSS output and client/server boundaries
npm run start    # serve the production build
```

## Layout

- `app/globals.css` - the only place design tokens are declared (`@theme`). There is
  no `tailwind.config.js` and there must never be one.
- `lib/theme.ts` - typed mirror of the tokens, for inline `style` and SVG values
  where a Tailwind class cannot reach.
- `lib/tone.ts` - semantic tone -> class maps (`textTone`, `bgTone`). The single
  source for what colour an `ok` / `warn` / `cyan` signal wears.
- `lib/content.ts` - all user-visible copy, as typed constants.
- `lib/mesh.ts` - hero mesh geometry. Layout data, deliberately not in `content.ts`.
- `components/ui/` - the primitives: `hud-panel`, `neon-button`, `section-heading`,
  `status-readout`.
- `components/sections/` - `hero`, `status-panel`, `features`, `terminal`.
- `components/layout/` - `site-nav`, `site-footer`.

`app/page.tsx` is composition only: it imports sections and places them.

## Client components

Exactly two islands carry `"use client"`, each for a stated reason:

1. `components/layout/site-nav.tsx` - mobile drawer disclosure state.
2. `components/sections/terminal.tsx` - line-by-line reveal, with a static final
   state under `prefers-reduced-motion`.

Everything else is a Server Component with pure-CSS or static rendering.

## Design system

The visual contract lives in `.opencode/skills/`, not in this file:

- `cyberpunk-design-system` - palette, type, glow hierarchy, motion budget.
- `neon-tokens-tailwind4` - how tokens are registered in `@theme`.
- `hud-ui-patterns` - component recipes.
- `page-composition-checklist` - the verification gate. Read it before calling any
  work done.