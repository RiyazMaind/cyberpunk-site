---
name: cyberpunk-design-system
description: Use when building or reviewing ANY visual surface in cyberpunk-site - hero sections, nav, panels, cards, terminal, footer, or any new component. Defines the non-negotiable token contract (exact hex palette, glow recipes, font pairing, border weights, motion limits) so the site stays visually consistent. Triggers on "cyberpunk", "neon", "HUD", "glow", "theme", "palette", "color", "font", "brand", or any new section or component in this repo.
---

# Cyberpunk Design System

The source of truth for every visual decision in `cyberpunk-site`. If a value is not
listed here, do not invent one - extend this file or use an existing token.

This skill defines **what the values are**. For **how to register them in Tailwind v4**
read `neon-tokens-tailwind4`. For **how to assemble components from them** read
`hud-ui-patterns`. Before declaring any work done read `page-composition-checklist`.

## Stack constraints (hard rules)

- **Next.js 16.3.7, App Router, React 19.** See `AGENTS.md` at the repo root - read
  `node_modules/next/dist/docs/` before assuming any API. Never reintroduce removed APIs.
- **Tailwind CSS v4.3.3, CSS-first.** There is **no `tailwind.config.js` and there must
  never be one.** All tokens live in `@theme` inside `app/globals.css`.
- **Zero runtime dependencies.** The only packages in `package.json` are `next`,
  `react`, `react-dom`. Do not add `clsx`, `tailwind-merge`, `framer-motion`,
  `lucide-react`, `class-variance-authority`, or any icon/animation library. Icons are
  inline SVG. Class merging is `lib/cn.ts` (a hand-written 3-line helper).
- **Zero image assets.** Every visual is CSS. Do not generate or download images.

## Color palette

The three backgrounds, and the only permitted surfaces:

| Token        | Hex       | Use                                                   |
| ------------ | --------- | ----------------------------------------------------- |
| `void`       | `#05050a` | Page background, `<body>`, full-bleed section grounds  |
| `surface`    | `#0b0b14` | Panels, cards, terminal window, nav backdrop          |
| `surface-2`  | `#11111d` | Raised elements: status bars, code chips, hovered card |

Accents and text - these hex values are verified against WCAG:

| Token      | Hex       | Contrast on `void` | Contrast on `surface-2` | Job                                  |
| ---------- | --------- | ------------------ | ----------------------- | ------------------------------------ |
| `cyan`     | `#22d3ee` | **11.25**          | 10.36                   | Primary neon, links, focus rings, CTA |
| `purple`   | `#a855f7` | **5.14**           | 4.73                    | Secondary neon, gradient partner     |
| `magenta`  | `#f0abfc` | **11.56**          | 10.64                   | Rare accent, highlight only          |
| `muted`    | `#74839b` | **5.29**           | 4.87                    | Body copy, descriptions, labels      |
| `ok`       | `#34d399` | 10.58              | 9.74                    | "Nominal" / passing status            |
| `warn`     | `#fbbf24` | 12.18              | 11.21                   | Degraded / warning status             |
| `alert`    | `#f43f5e` | 5.54               | 5.10                    | Failure / critical status             |

### Contrast rules that are not negotiable

- **`muted` is `#74839b`, not darker.** The obvious-looking choice `#6b7a8f` measures
  4.48 on `surface` and **fails** WCAG AA for body text. `#74839b` was chosen because it
  clears 4.5:1 on all three backgrounds. Do not "darken it for aesthetics".
- Text may only use `cyan`, `purple`, `magenta`, `muted`, `ok`, `warn`, `alert`, or
  near-white `#e8ecf4`. Anything below 4.5:1 on its background is a bug.
- `purple` at 4.73:1 is legal for text but reads dimmer than `cyan`. Prefer `cyan` for
  anything the user must read; reserve `purple` for decorative glows and borders.
- Neon borders and glows are non-text UI components and must clear **3:1**. Both
  `cyan` and `purple` clear that comfortably (11.25 and 5.14).

### Opacity discipline

Neon at reduced opacity is used for **borders and decorative glows only**:

- Resting border: `border-cyan/20`
- Hover/active border: `border-cyan/45`
- Strong/selected border: `border-cyan/70`

**Never apply reduced opacity to text.** If a label needs to look dimmer, use a darker
token, not `text-cyan/50`. This is the single most common accessibility regression in
neon UIs.

## Typography

Exactly two families, both self-hosted through `next/font/google` (zero runtime cost):

- **Display: `Chakra_Petch`** - headlines, section headings, buttons, nav wordmark,
  stat values. Weights `400`, `500`, `600`, `700`.
- **Mono: `Geist_Mono`** - terminal output, status labels, values, badges, legal footer
  line, anything that should read as machine output.

`Chakra_Petch` has **no variable font axis** - `next/font/google` requires an explicit
`weight`. Omitting it is a type error.

Type rules:

- Headlines: `font-semibold` or `font-bold`, **tight tracking** (`tracking-tight`,
  `-0.02em` to `-0.03em`), tight leading (`leading-[0.95]` to `leading-tight`).
  Wide tracking destroys the condensed-tech feel.
- Eyebrow / kicker labels above headlines: mono, `text-xs` or `text-sm`, `uppercase`,
  `tracking-[0.2em]`, `text-cyan`. These are a signature motif - reuse them.
- Body copy: mono or `muted`, `leading-relaxed`, never wider than ~65ch.
- Status values: mono, `tabular-nums` so digits do not jitter during animation.
- Never use `font-thin`/`font-extralight` on `void` - it disappears.

## Token registration contract

These `@theme` lines **must exist** in `app/globals.css` for the component recipes in
`hud-ui-patterns` to compile. Do not rename them - the classnames are part of the
contract. See `neon-tokens-tailwind4` for the mechanics.

```css
@theme {
  /* palette */
  --color-void: #05050a;
  --color-surface: #0b0b14;
  --color-surface-2: #11111d;
  --color-cyan: #22d3ee;
  --color-purple: #a855f7;
  --color-magenta: #f0abfc;
  --color-muted: #74839b;
  --color-ok: #34d399;
  --color-warn: #fbbf24;
  --color-alert: #f43f5e;
  --color-foreground: #e8ecf4;

  /* fonts */
  --font-display: var(--font-chakra-petch), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;

  /* glows - consumed as shadow-glow-cyan / -hover / -purple */
  --shadow-glow-cyan: 0 0 12px -2px rgb(34 211 238 / 0.35);
  --shadow-glow-cyan-hover: 0 0 20px -2px rgb(34 211 238 / 0.55);
  --shadow-glow-purple: 0 0 12px -2px rgb(168 85 247 / 0.35);

  /* animations - consumed as animate-blink / animate-pulse-dot */
  --animate-blink: blink 1s steps(2) infinite;
  --animate-pulse-dot: pulse-dot 2s ease-in-out infinite;
}
```

`--color-foreground` replaces the boilerplate `--foreground` and is used as
`text-foreground` throughout. The existing `@theme inline` block also maps
`--color-background`, `--font-sans`, and `--font-mono`; **keep `--font-mono` aligned
with the value above** and leave the block's other entries intact. The scaffold's
`@media (prefers-color-scheme: dark)` override is **removed** - this site is dark only,
and leaving it lets the OS setting fight the theme.

Two named custom utilities are also required, defined in a plain `@layer utilities`
block per `neon-tokens-tailwind4`:

- `.bg-grid` - the static grid backdrop (48px cells, cyan at ~4.5%, edge-faded).
- `.text-glow-cyan` - `text-shadow: 0 0 18px rgb(34 211 238 / 0.55), 0 0 42px rgb(168 85 247 / 0.35)`.

Their matching `@keyframes` (`blink`, `pulse-dot`) go at the top level of
`globals.css`. Nothing else should be invented.

## Borders and glow

- **Thin borders are the signature.** Default `border` (1px). `border-2` only for
  focused or active state. Never `border-4`.
- Corners are **clipped, not rounded**. Use `rounded-none` or at absolute most
  `rounded-sm`. Fully rounded pills read as friendly/consumer, not HUD. Pills are
  permitted only for status dots and tiny badges.
- **Glow recipes.** Use the registered `--shadow-glow-*` tokens (`shadow-glow-cyan`,
  `shadow-glow-cyan-hover`, `shadow-glow-purple`) and `.text-glow-cyan` exactly as
  declared above. Do not hand-write a new `box-shadow` value in a component; if a new
  glow is genuinely needed, register a token here first.

- **Glow is a halo, never a border substitute.** A glowing element must still have a
  real `border`.
- At most **one** element per section carries a strong glow. If everything glows,
  nothing does.

## Grid background

- **Static CSS grid only.** No animation, no canvas, no JS.
- 1px lines, cyan at **~4-5% opacity**, cell size `48px` desktop / `32px` mobile.
- Must **fade out toward the edges** via a radial mask so it never competes with text.
- Grid sits at `pointer-events-none` and `aria-hidden`, behind all content.
- The grid is a texture, not a feature. If contrast against body text drops below 4.5:1,
  lower the grid opacity - never lower the text contrast.

## Motion budget

Subtle means subtle. The full allowed set:

| Motion                | Duration | Easing              | Applies to                    |
| --------------------- | -------- | ------------------- | ----------------------------- |
| Hover/focus transition | 200ms   | `ease-out`          | borders, color, shadow, opacity |
| Panel / bar fill      | 700ms    | `ease-out`          | status bars, one-time on mount |
| Scroll reveal         | 600ms    | `ease-out`          | fade + 8px rise, once         |
| Cursor blink          | 1s      | `steps(2)`          | terminal cursor only          |
| Status dot pulse      | 2s      | `ease-in-out`       | small dots only               |

Hard limits:

- **No parallax. No looping background animation. No scroll-jacking. No auto-playing
  carousels. No infinite transitions on anything large.**
- Nothing animates more than twice, ever. The status dot may loop.
- Transform + opacity only. Animating `width`, `height`, `top`, or `box-shadow` on a
  per-frame basis causes layout thrash.
- **`prefers-reduced-motion: reduce` is mandatory.** Every animation, transition, and
  scroll-reveal must collapse to instant/no-motion. See `page-composition-checklist`.

## Spacing and layout

- Section vertical rhythm: `py-24` desktop, `py-16` mobile. Consistent across all
  sections - this is what makes the page feel designed rather than assembled.
- Max content width `max-w-6xl`, gutters `px-6` mobile / `px-8` desktop.
- Feature grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- Negative space is part of the aesthetic. Do not fill panels to look "rich".

## Server vs client components

Server Components by default. The site ships **only three** client islands:

1. `components/layout/site-nav.tsx` - mobile drawer needs state
2. `components/sections/terminal.tsx` - typing loop needs state
3. `components/motion/reveal.tsx` - IntersectionObserver

Everything else stays a Server Component with pure-CSS animation. Adding a fourth
`"use client"` boundary needs a stated reason. Do not mark a whole section client-side
because one child needs interactivity - pass the interactive leaf through as a child.

## Copy

Realistic, specific, fictional cyberpunk product copy. No lorem ipsum, no "Feature One",
no placeholder bracketed text. See `lib/content.ts` - **all** user-visible copy lives
there as typed constants so copy can be edited without touching JSX.

Tone: terse, technical, confident. Numbers and units over adjectives. Mono-flavored
vocabulary (`uplink`, `latency`, `node`, `bandwidth`, `encrypted`). Never sarcastic, never
embarrassing - this should read as a real product page.
