---
name: neon-tokens-tailwind4
description: Use when adding, renaming, or debugging any design token, color, font, shadow, animation, or custom utility in cyberpunk-site - especially anything touching app/globals.css or the @theme block. Explains this repo's CSS-first Tailwind v4 setup and the @utility authoring rules. Triggers on "@theme", "globals.css", "@utility", "tailwind.config", "token", "custom color", "add a shade", "animation not working", "class does nothing", or when a Tailwind class fails to generate.
---

# Neon Tokens - Tailwind v4 CSS-first in this repo

## The one rule that breaks everything if forgotten

**This project has no `tailwind.config.js` and must never get one.**

Tailwind v4 is CSS-first: configuration lives in CSS. `postcss.config.mjs` runs
`@tailwindcss/postcss`, and `app/globals.css` starts with `@import "tailwindcss"`.
All design tokens are declared in an `@theme` block inside that file.

If you need a new color, shadow, font, or animation, you add it to `@theme` in
`app/globals.css`. Creating `tailwind.config.ts`, using `theme.extend`, or using
`@tailwind base/components/utilities` directives are all wrong for this project.

Verify versions if unsure:

```bash
node -e "console.log(require('tailwindcss/package.json').version)"
```

## File layout

- `app/globals.css` - the **only** place tokens are declared.
- `lib/theme.ts` - typed TS constants mirroring the same hex values, for use in
  inline `style` or SVG `fill`/`stroke` where a Tailwind class cannot reach.
- `lib/cn.ts` - hand-written className joiner. **Do not install `clsx` or
  `tailwind-merge`.**

## `@theme` namespaces that matter here

Tailwind v4 generates utilities from namespaced CSS custom properties. The namespaces
in use for this site:

| Prefix in CSS          | Generates                        | Example                     |
| ---------------------- | -------------------------------- | --------------------------- |
| `--color-*`            | `text-*`, `bg-*`, `border-*`, `ring-*` | `--color-cyan` -> `text-cyan`  |
| `--font-*`             | `font-*`                         | `--font-display` -> `font-display` |
| `--shadow-*`           | `shadow-*`                       | `--shadow-glow-cyan` -> `shadow-glow-cyan` |
| `--animate-*`          | `animate-*`                      | `--animate-blink` -> `animate-blink` |
| `--text-*`             | `text-<size>`                    | `--text-hero` -> `text-hero` |
| `--spacing`            | spacing scale                    | base unit                   |
| `--breakpoint-*`       | `sm:`, `md:`, `lg:` ...          | responsive variants         |

**Important:** `--color-*` and `--text-*` share a namespace prefix with the `text-*`
utility. A custom `--text-hero` becomes `text-hero` (a font size), while
`--color-hero` becomes `text-hero` (a color). Avoid naming collisions.

## Adding a color

Add one line inside the existing `@theme` block in `app/globals.css`, and mirror it in
`lib/theme.ts`:

```css
@theme {
  --color-cyan: #22d3ee;
}
```

Tailwind immediately yields `text-cyan`, `bg-cyan`, `border-cyan`, `ring-cyan`, plus
every opacity modifier (`bg-cyan/10`, `border-cyan/20`, ...). Do not hand-write
`rgba()` in a className when a token exists.

### Before adding any new color

Read `cyberpunk-design-system`. A new color needs:
1. A stated job it does that no existing token covers.
2. A WCAG contrast measurement against `void` (#05050a), `surface` (#0b0b14), and
   `surface-2` (#11111d). 4.5:1 for text, 3:1 for borders/non-text UI.
3. A note in `cyberpunk-design-system/SKILL.md` so the palette stays closed.

Palette creep is the main failure mode of this kind of site. Prefer composing with
`cyan` + `purple` and existing opacity modifiers over introducing new hues.

## Adding a custom utility

Tailwind v4 uses `@utility` (not v3's `@layer utilities`). `@utility` works with
variants and is tree-shakeable; plain classes inside `@layer utilities` are not
variant-aware.

Static utility:

```css
@utility text-glow-cyan {
  text-shadow: 0 0 18px rgb(34 211 238 / 0.55), 0 0 42px rgb(168 85 247 / 0.35);
}
```

Functional utility (needed when the utility takes an argument, e.g. `@utility bg-grid-*`):

```css
@utility bg-grid-* {
  background-image:
    linear-gradient(to right, rgb(34 211 238 / 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(34 211 238 / 0.05) 1px, transparent 1px);
  background-size: --value(--spacing(12)) --value(--spacing(12));
}
```

Use `--value()` for spacing arguments so the utility respects the theme scale.
`@utility` bodies do not support `@media` or nested selectors directly - put those in a
plain `@layer utilities` block instead, or move the media query to a variant.

## Complex visuals that utilities cannot express

Grid backdrop, HUD corner brackets, scanlines, and gradient text go in a plain
`@layer utilities` block in `globals.css`, not in `@utility`:

```css
@layer utilities {
  .bg-grid {
    background-image:
      linear-gradient(to right, rgb(34 211 238 / 0.045) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(34 211 238 / 0.045) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  @media (max-width: 767px) {
    .bg-grid { background-size: 32px 32px; }
  }
}
```

Keep this block **small and closed**. It is the styling escape hatch; every line here is
a decision that cannot be made inline in JSX. Prefer a Tailwind arbitrary value
(`bg-[linear-gradient(...)]`) in the component when the rule is used exactly once.

## Animations

Declare the `@keyframes` at top level in `globals.css`, then register the animation in
`@theme`:

```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@theme {
  --animate-blink: blink 1s steps(2) infinite;
}
```

`--animate-blink` yields `animate-blink`. Note that `animation` shorthands inside
`@theme` are applied verbatim; do not include the `animation-name` twice.

The allowed animation set and their exact durations/easings are fixed in
`cyberpunk-design-system` (Motion budget). Do not add new ones without updating that
skill and confirming `prefers-reduced-motion` coverage.

## The `prefers-reduced-motion` requirement

`globals.css` contains a global reduced-motion block that collapses animation. Any new
animation must either be covered by it or add its own guard:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-blink,
  .scan { animation: none !important; }
}
```

Pure-CSS animations are covered globally. JS-driven animation (the terminal typing
loop, the IntersectionObserver reveal in `components/motion/reveal.tsx`) **must** read
the media query itself and render a static final state. See `page-composition-checklist`.

## Fonts

`app/layout.tsx` loads fonts through `next/font/google`. Two facts that cause build
errors when forgotten:

- `Chakra_Petch` has **no variable axis**, so `weight` is **required**. Allowed:
  `300 | 400 | 500 | 600 | 700`, or an array of them.
- `Geist_Mono` takes the usual options and supports a variable axis.

Fonts must be referenced through their CSS variable (`font-display`,
`font-mono`), never through a class name copied off a CDN.

## Debugging a class that does nothing

In order:

1. Is the token declared in `@theme`? No token -> no utility. This is the usual cause.
2. Is it a `@utility` (needs a definition) vs a bare class you invented in JSX?
3. Is the class in the className actually static and complete? Arbitrary values with
   spaces need underscores: `bg-[rgb(0_0_0_/_0.5)]`.
4. Is a variant ordering problem? v4 sorts by variant order, not className order.
5. Does a conflicting utility override it? Check specificity and later-in-cascade wins.
6. **Production check.** Some CSS-ordering differences only appear in `next build`.
   Run `npm run build` before claiming a styling bug is fixed.

## Verification commands

```bash
npm run lint        # eslint-config-next, core-web-vitals
npm run typecheck   # tsc --noEmit  (add this script; it is not in package.json by default)
npm run build       # authoritative for CSS output and ordering
npm run dev         # visual verification
```

Do not claim styling work is complete on the basis of `next dev` alone.
