---
name: hud-ui-patterns
description: Use when implementing the nav bar, hero, system status panel, feature cards, terminal section, footer, or any HUD/terminal-inspired UI element in cyberpunk-site. Provides copy-paste component recipes, the status-readout anatomy, and the mobile drawer pattern. Triggers on "nav", "hero", "status panel", "feature card", "terminal", "footer", "drawer", "HUD", "corner brackets", "typing effect", "scroll cue", or when starting any new section in this repo.
---

# HUD / Terminal UI Patterns

Recipes for assembling cyberpunk-site sections from the tokens in
`cyberpunk-design-system`. Every token used here must already exist in `@theme`
(see `neon-tokens-tailwind4`), and every component built from these recipes must pass
`page-composition-checklist` before it is reported as done.

Rules that apply to **all** patterns below:

- Copy lives in `lib/content.ts`. Never hardcode user-visible strings in JSX.
- Icons are **inline SVG** with `aria-hidden="true"`. No icon library.
- Sections are Server Components unless the pattern explicitly says `"use client"`.
- Every section is a `<section>` with an `id` and `aria-labelledby` pointing at its heading.
- Section spacing: `py-24` desktop, `py-16` mobile, content `max-w-6xl mx-auto px-6 md:px-8`.

## The three primitives

Everything on the page is built from these. Build them first.

### 1. `hud-panel` - the glowing frame

```tsx
type HudPanelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "cyan" | "purple";
};

export function HudPanel({ children, className, tone = "cyan" }: HudPanelProps) {
  return (
    <div
      className={cn(
        "relative border border-cyan/20 bg-surface/80 backdrop-blur-sm",
        "shadow-glow-cyan",
        tone === "purple" && "border-purple/25 shadow-glow-purple",
        className,
      )}
    >
      {/* corner ticks */}
      <span aria-hidden className="absolute -top-px -left-px h-3 w-3 border-t border-l border-cyan/60" />
      <span aria-hidden className="absolute -top-px -right-px h-3 w-3 border-t border-r border-cyan/60" />
      <span aria-hidden className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cyan/60" />
      <span aria-hidden className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cyan/60" />
      {children}
    </div>
  );
}
```

- Corners are **decorative** -> always `aria-hidden`.
- The glow is a halo; the real `border` carries the edge. Never glow alone.
- `rounded-none`. Clipped corners, not rounded.

### 2. `neon-button`

```tsx
export function NeonButton({
  href, children, variant = "primary",
}: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-7 py-3",
        "font-display text-sm font-semibold uppercase tracking-[0.15em]",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
        variant === "primary"
          ? "border border-cyan/60 bg-cyan/10 text-cyan shadow-glow-cyan hover:bg-cyan/20 hover:shadow-glow-cyan-hover"
          : "border border-purple/30 text-purple hover:border-purple/60 hover:bg-purple/10",
      )}
    >
      {children}
    </a>
  );
}
```

- A link-styled CTA uses `<a>`. Do not use `<button>` for navigation.
- Always include a `focus-visible` ring. Neon-on-black makes the browser default ring
  easy to miss - `outline-cyan` is not optional.

### 3. `section-heading`

Eyebrow + heading, the recurring top-of-section signature:

```tsx
<p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">{eyebrow}</p>
<h2 id={headingId} className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
  {title}
</h2>
```

Uppercase wide-tracked mono eyebrow above a tight-tracked display heading. Reuse this
pairing in every section; it is what visually stitches the page together.

## Navigation bar

`components/layout/site-nav.tsx` - **client component**, the only nav that needs state.

- Sticky top, `z-50`, `bg-void/80 backdrop-blur-md`, bottom `border-cyan/15`.
- Left: wordmark, `font-display font-bold tracking-widest text-cyan uppercase`, plus a
  pulsing status dot with the label `ONLINE` in mono `text-ok`.
- Center/right: 4 anchor links to section ids (`#features`, `#terminal`, ...), mono,
  `text-sm`, `text-muted`, hover `text-cyan`, with a `transition-colors duration-200`.
- Right end: a small neon CTA button.
- **Active/hover indicator:** a 1px underline that grows, not a background fill. Keep it
  subtle.

### Mobile drawer (required)

Below `md`, links collapse into a disclosure button. This is the part that fails most
often, so follow it exactly:

```tsx
const [open, setOpen] = useState(false);

<button
  type="button"
  onClick={() => setOpen((v) => !v)}
  aria-expanded={open}
  aria-controls="mobile-nav"
  className="md:hidden ... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
>
  {/* icon only; visually hidden label */}
  <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
</button>

<nav id="mobile-nav" hidden={!open} className="md:hidden ...">
  ...
</nav>
```

Required behaviors:

- `aria-expanded` reflects state; `aria-controls` points at the nav id.
- Use the **`hidden` attribute** rather than conditional rendering, so the closed nav is
  genuinely removed from the accessibility tree and the tab order.
- Close the drawer on link click, and on `Escape`.
- Icon-only controls need `sr-only` text.
- Always render a hamburger affordance even if you also render links - verify no
  duplicate-focusable links by tabbing.

## Hero

`components/sections/hero.tsx` - Server Component.

Structure, top to bottom:

1. Grid backdrop: absolutely positioned `<div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />`.
2. Eyebrow chip: mono `text-xs uppercase tracking-[0.25em] text-cyan`, inside a
   `border-cyan/30` box.
3. Headline: `font-display font-bold tracking-tight leading-[0.95]`,
   `text-5xl md:text-7xl lg:text-8xl`. Use a cyan-to-purple gradient via
   `bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent`, plus
   `text-glow-cyan`. Include `<span className="sr-only">` plain text if the gradient
   risks reducing legibility, and never let the headline wrap mid-word.
4. Description: `max-w-xl text-base md:text-lg text-muted leading-relaxed`.
5. CTA row: `NeonButton` primary + ghost, `flex flex-col sm:flex-row gap-4`.
6. Scroll cue: a small mono `SCROLL` label with a downward chevron, `text-muted`.
   `aria-hidden` on the animation, text stays in the DOM.

Two-column split (copy left, `hud-panel` visual right) at `lg`, stacked below.

## System status panel

`components/sections/status-panel.tsx` - **Server Component** (animation is pure CSS).

Wrap in `hud-panel`. Inside: a header row (mono title `SYSTEM STATUS` + an `ok` dot and
a mono timestamp), then a grid of `status-readout` rows.

### `status-readout` anatomy

```tsx
<div className="space-y-1.5">
  <div className="flex items-baseline justify-between gap-4">
    <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{label}</span>
    <span className="font-mono text-xs text-foreground tabular-nums">{value}</span>
  </div>
  {/* bar */}
  <div role="presentation" className="h-1 w-full bg-surface-2" aria-hidden>
    <div
      className="h-full bg-cyan transition-[width] duration-700 ease-out"
      style={{ width: `${percent}%` }}
    />
  </div>
</div>
```

Rules:

- The bar is **decorative** -> `aria-hidden`. The `value` text above it already
  conveys the information, so it must be real text, not an ARIA value.
- `tabular-nums` on values so digits do not shift while animating.
- Status color maps to the palette: nominal `ok`, degraded `warn`, critical `alert`.
  Never use `alert` red for anything decorative.
- Grid: `grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6`.
- Animate bar width from 0 with a CSS transition on mount. Do not use a JS tween.

## Feature cards

`components/sections/features.tsx` - Server Component.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Each card is a `hud-panel` with `p-6` and:

- A 24x24 inline SVG icon, `stroke="currentColor"`, wrapped in
  `text-cyan`, `aria-hidden`.
- `h3` in `font-display font-semibold text-lg text-foreground`.
- Body in `text-sm text-muted leading-relaxed`.
- Hover: `hover:border-cyan/45 hover:shadow-glow-cyan-hover` and `hover:-translate-y-0.5`,
  all inside `transition-all duration-200 ease-out`.
- Cards are **not** links unless they navigate. If a card is a link, make the whole card
  one `<a>` with an accessible name - never a nested interactive element.
- Exactly three. Do not invent a fourth, and do not pad to a count of four.

## Terminal section

`components/sections/terminal.tsx` - **client component**, the only other interactive
island. `"use client"` at the top.

Structure:

- `hud-panel tone="purple"` wrapping a window chrome row: three small dots
  (`ok`, `warn`, `alert`, `rounded-full`, `aria-hidden`) plus a mono path label
  `operator@netrunner:~/uplink`.
- Body: `<pre>`-styled block, `font-mono text-xs sm:text-sm`, `whitespace-pre-wrap`,
  `break-words` (long lines must not cause horizontal scroll).
- A prompt line `~/net $` followed by the typed output, then a block cursor:
  `inline-block h-4 w-2 bg-cyan animate-blink`.
- **Cursor is `aria-hidden`.** The text is already in the DOM for screen readers.
- Animate by revealing lines on an interval with `useEffect` + `setTimeout`, cleaning up
  in the effect return. When all lines are shown, stop the timer permanently.
- **Reduced motion is mandatory:** read
  `window.matchMedia("(prefers-reduced-motion: reduce)").matches` in an effect, and if
  reduced, render the **final full state immediately** with no typing and no cursor
  animation. Do not simply shorten the animation - render it complete and static.
- Loop or not: the spec allows **one** pass. Prefer one pass; a loop that never settles
  is a motion-budget violation.

## Footer

`components/layout/site-footer.tsx` - Server Component.

- Top border `border-cyan/15`, `bg-surface/40`.
- Three link columns (`sm:grid-cols-3`), each heading mono `text-xs uppercase
  tracking-[0.2em] text-cyan`, links `text-sm text-muted hover:text-cyan`, focus rings
  included.
- A status strip above the columns: mono `text-xs text-muted` with `ok`/`cyan` dots
  (build time, region, protocol version) - pull real values from `lib/content.ts`.
- Bottom bar: mono `text-xs text-muted` legal line with the fictional product name and
  year. Year comes from `new Date().getFullYear()` at render.

## Cross-pattern checks

- **No `rounded-full` on any panel, card, or button.** Only status dots and tiny badges.
- **No section ships with a hardcoded string.** Everything traces to `lib/content.ts`.
- **`app/page.tsx` composes sections only** - no markup, no styling, no strings.
- If you invent a new visual pattern, add it to this file so the next agent reuses it
  instead of reinventing it.
