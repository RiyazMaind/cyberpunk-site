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
  **Layout geometry does not belong there** - node coordinates, rotations and
  percentages go in a sibling module (`lib/mesh.ts`) so `content.ts` stays copy.
- Icons are **inline SVG** with `aria-hidden="true"`. No icon library.
- Sections are Server Components unless the pattern explicitly says `"use client"`.
- Every section is a `<section>` with an `id` and `aria-labelledby` pointing at its heading.
- Section spacing: `py-24` desktop, `py-16` mobile, content `max-w-6xl mx-auto px-6 md:px-8`.

## The three primitives

Everything on the page is built from these. Build them first.

### 1. `hud-panel` - the frame

```tsx
type HudPanelProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "cyan" | "purple";
  /** Primary moment only. Default false. See "Glow hierarchy" below. */
  glow?: boolean;
};

export function HudPanel({ children, className, tone = "cyan", glow = false }: HudPanelProps) {
  const accent = panel[tone];
  return (
    <div className={cn("relative border bg-surface/80 backdrop-blur-sm", accent.border, glow && accent.shadow, className)}>
      {/* corner ticks follow the panel tone */}
      <span aria-hidden className={cn("absolute -top-px -left-px h-3 w-3 border-t border-l", accent.tick)} />
      <span aria-hidden className={cn("absolute -top-px -right-px h-3 w-3 border-t border-r", accent.tick)} />
      <span aria-hidden className={cn("absolute -bottom-px -left-px h-3 w-3 border-b border-l", accent.tick)} />
      <span aria-hidden className={cn("absolute -bottom-px -right-px h-3 w-3 border-b border-r", accent.tick)} />
      {children}
    </div>
  );
}
```

- Corners are **decorative** -> always `aria-hidden`.
- The glow is a halo; the real `border` carries the edge. Never glow alone.
- `rounded-none`. Clipped corners, not rounded.
- **Corner ticks and border follow `tone`.** A purple panel with cyan ticks reads
  as two different components stacked. Ticks use the full tone colour
  (`border-purple`), the border the muted version (`border-purple/20`).

#### Glow hierarchy

`glow` is **opt-in and defaults to `false`**. Only the hero mesh sets it. The whole
page glowing at once reads as a light box; the border is what makes a panel read as
HUD, so most panels need no halo at all.

| Tier | Element | Treatment |
|---|---|---|
| Primary | hero headline | `text-glow-cyan` |
| Secondary | hero mesh panel, primary `neon-button` | `glow`, `shadow-glow-cyan` |
| Subtle | every other panel, feature card, terminal | border + ticks only, no shadow |

Keep at most **one** glowing panel on screen at a time.

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
  pulsing status dot with the label `ONLINE` in mono `text-ok` (tone read from
  `nav.status.tone`). The status label is hidden below `sm`, so the wordmark is never
  crowded at 320px.
- Right: 4 anchor links to section ids (`#system`, `#network`, `#protocol`, `#access`),
  mono, `text-sm`, `text-muted`, hover `text-cyan`, `transition-colors duration-200`.
- **There is no CTA button in the nav.** The nav is a thin anchor bar; the primary CTA
  lives in the hero and the terminal. Do not add one.
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
  aria-label={open ? closeLabel : openLabel}
  className="md:hidden h-11 w-11 ... focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
>
  {/* icon only; svg is aria-hidden, name comes from aria-label */}
</button>

<nav id="mobile-nav" hidden={!open} className="md:hidden ...">
  ...
</nav>
```

Required behaviors:

- `aria-expanded` reflects state; `aria-controls` points at the nav id.
- Use the **`hidden` attribute** rather than conditional rendering, so the closed nav is
  genuinely removed from the accessibility tree and the tab order.
- Close the drawer on link click, and on `Escape` - returning focus to the toggle.
- Icon-only controls need an accessible name: `aria-label` (or `sr-only` text), never
  an unlabelled `<button>`.
- Touch target is `h-11 w-11` (44px) minimum.
- Always render a hamburger affordance even if you also render links - verify no
  duplicate-focusable links by tabbing.

## Hero

`components/sections/hero.tsx` - Server Component.

Structure, top to bottom:

1. Grid backdrop: absolutely positioned `<div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />`.
2. Eyebrow chip: mono `text-xs uppercase tracking-[0.25em] text-cyan`, inside a
   `border-cyan/30` box.
3. Headline: `font-display font-bold tracking-tight leading-[0.95]`,
   `text-4xl sm:text-5xl md:text-6xl xl:text-7xl`. Use a cyan-to-purple gradient via
   `bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent`, plus
   `text-glow-cyan` (the page's only primary-tier glow). Include a
   `<span className="sr-only">` plain text for screen readers, and never let the
   headline wrap mid-word.

   **Why the ladder stops at 72px.** "THE NETWORK" is the longest line. In Chakra
   Petch Bold it needs roughly 495px, which exceeds the copy track at every breakpoint
   once the two-column split engages. An even `lg:grid-cols-2` leaves ~448px at 1024px
   and ~512px at 1440px, so `lg:text-8xl` (96px) forces a mid-phrase wrap on the
   widest line. `xl:text-7xl` plus a `1.2fr` copy track keeps the three authored lines
   intact from 320px to 1440px. Do not raise the top step without measuring the string.
4. Description: `max-w-xl text-base md:text-lg text-muted leading-relaxed`.
5. CTA row: `NeonButton` primary + ghost, `flex flex-col sm:flex-row gap-4`.
6. Scroll cue: a small mono `SCROLL` label with a downward chevron, `text-muted`.
   `aria-hidden` on the SVG, text stays in the DOM.

Two-column split (copy left, `hud-panel` visual right) at `lg`, stacked below. The
copy track is `lg:grid-cols-[1.2fr_1fr]` - see the headline note above. The mesh panel
is the **only** `glow` panel on the page, and it is `tone="purple"`, so its interior
rules are purple.

## System status panel

`components/sections/status-panel.tsx` - **Server Component** (animation is pure CSS).

Wrap in `hud-panel`. Inside: a header row (mono panel label + an `ok` dot and a mono
timestamp), then a grid of `status-readout` rows.

**The panel label must not repeat the section heading.** `SectionHeading` already
renders `NETWORK STATUS` as the `<h2>`; a panel label of `NETWORK STATUS` announced the
same phrase twice. The panel label is `MESH TELEMETRY`. It is a `<p>`, not a heading -
it labels a widget inside the section, so it must not add a level to the outline.

### `status-readout` anatomy

```tsx
<dl className="space-y-1.5">
  <div className="flex items-baseline justify-between gap-4">
    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
      <span aria-hidden className={cn("inline-block h-1.5 w-1.5 rounded-full", bgTone[tone])} />
      {label}
    </dt>
    <dd className="font-mono text-xs text-foreground tabular-nums">{value}</dd>
  </div>
  {/* bar - decorative, aria-hidden is sufficient. Do not also add role="presentation";
      it is redundant on an already-hidden element. */}
  <div aria-hidden className="h-1 w-full bg-surface-2">
    <div className={cn("h-full", bgTone[tone])} style={{ width: `${percent}%` }} />
  </div>
  {caption ? <p className="font-mono text-xs text-muted">{caption}</p> : null}
</dl>
```

The readout is a `<dl>` because each row really is a term/value pair - label, value,
and an optional caption explaining what the bar measures when it is not the value
itself.

Rules:

- The bar is **decorative** -> `aria-hidden`. The `value` text above it already
  conveys the information, so it must be real text, not an ARIA value. `aria-hidden`
  alone is enough; do not stack `role="presentation"` on top of it.
- `tabular-nums` on values so digits do not shift while animating.
- Status color maps to the palette: nominal `ok`, degraded `warn`, critical `alert`.
  Never use `alert` red for anything decorative. Both the dot and the bar read the
  same `bgTone[tone]`.
- Five readouts stack one per row (`grid-cols-1 gap-x-10 gap-y-5`); the panel is
  already in a two-column page grid, so the readouts must not become two columns too.
- Bars render at their final width. A one-shot fill animation is permitted by the
  motion budget, but it must be pure CSS (a keyframe, not a JS tween) and must collapse
  under `prefers-reduced-motion`. Do not add a per-frame width transition.

## Feature cards

`components/sections/features.tsx` - Server Component.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Each card is a `hud-panel` with `p-6` and:

- A mono `identifier` label (`PROTO_01`) at the top in the card tone.
- `h3` in `font-display font-semibold text-lg text-foreground`.
- Body in `text-sm text-muted leading-relaxed`.
- Hover: `hover:-translate-y-0.5` plus a tone border change (`hover:border-cyan/45` /
  `hover:border-purple/45`), inside `transition-[border-color,transform] duration-200
  ease-out`. **No shadow on hover** - feature cards sit in the subtle tier, and a
  `shadow-glow-*` here competes with the hero mesh for the secondary glow.
- A status strip pinned to the card floor with `mt-auto pt-6`, its interior
  `border-t` in the **card tone** so a purple card does not get a cyan rule.
- Icons are optional. Add a 24x24 inline SVG only if it carries information the
  label does not; decorative iconography on three parallel cards is noise.
- Add `motion-reduce:transition-none motion-reduce:hover:translate-y-0` alongside any
  hover transform.
- Cards are **not** links unless they navigate. If a card is a link, make the whole card
  one `<a>` with an accessible name - never a nested interactive element.
- Exactly three. Do not invent a fourth, and do not pad to a count of four.

## Terminal section

`components/sections/terminal.tsx` - **client component**, the second of two interactive
islands. `"use client"` at the top.

Structure:

- `hud-panel tone="purple"` (no `glow` - the terminal is subtle tier) wrapping a
  window chrome row: three small dots from `terminal.window.dots`
  (`rounded-full`, `aria-hidden`) plus a mono path label. The dots are `ok` / `cyan` /
  `purple`, **not** `ok` / `warn` / `alert` traffic lights - real traffic-light colours
  read as status, and nothing here is a status.
- Body: a `<p>` per line, `font-mono text-xs sm:text-sm`, `whitespace-pre-wrap`,
  `break-words` (long lines must not cause horizontal scroll).
- A prompt line `> ` followed by the typed output, then a block cursor:
  `inline-block h-4 w-2 bg-cyan animate-blink`.
- Command / result / output must stay distinguishable. Map `kind` to a tone through
  the shared `textTone` (`cyan` / `foreground` / `muted`) - do not hand-write the
  strings per line.
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
- **Column labels are `<p>`, never `<h2>`.** They label a navigation column, they are
  not document sections. Real `<h2>`s there add noise to the page heading outline for
  no navigational benefit.
- A status strip above the columns: mono `text-xs text-muted` with `ok`/`cyan` dots
  (build time, region, protocol version) - pull real values from `lib/content.ts`.
- Bottom bar: mono `text-xs text-muted` legal line with the fictional product name and
  year. Year comes from `new Date().getFullYear()` at render.
- Every footer `href` must resolve to a real section `id`. There are four anchors on
  the page (`#system`, `#network`, `#protocol`, `#access`); repeating one under a
  label that promises a different destination is a dead link in disguise.

## Cross-pattern checks

- **No `rounded-full` on any panel, card, or button.** Only status dots and tiny badges.
- **No section ships with a hardcoded string.** Everything traces to `lib/content.ts`.
- **`app/page.tsx` composes sections only** - no markup, no styling, no strings.
- If you invent a new visual pattern, add it to this file so the next agent reuses it
  instead of reinventing it.
