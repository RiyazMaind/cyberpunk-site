/*
 * Semantic tone -> class maps. The single source for "what colour does an `ok` /
 * `warn` / `cyan` signal wear", so a status dot, a status label and a status bar
 * can never drift apart between sections.
 *
 * These are class strings, not CSS values: the colours themselves are registered
 * in `app/globals.css` under `@theme`. See `.opencode/skills/cyberpunk-design-system`
 * for the closed palette and `.opencode/skills/neon-tokens-tailwind4` for why there
 * is no `tailwind.config.js`.
 */

/**
 * Every palette token that is legal to use as a signal colour. `muted` and
 * `foreground` are included because terminal lines and readouts key off them too.
 */
export type Tone =
  | "cyan"
  | "purple"
  | "magenta"
  | "muted"
  | "ok"
  | "warn"
  | "alert"
  | "foreground";

/** Text tone. Never combine with an opacity modifier - that breaks contrast. */
export const textTone = {
  cyan: "text-cyan",
  purple: "text-purple",
  magenta: "text-magenta",
  muted: "text-muted",
  ok: "text-ok",
  warn: "text-warn",
  alert: "text-alert",
  foreground: "text-foreground",
} as const satisfies Record<Tone, string>;

/** Fill tone for dots, bars and chips. Same palette, same names. */
export const bgTone = {
  cyan: "bg-cyan",
  purple: "bg-purple",
  magenta: "bg-magenta",
  muted: "bg-muted",
  ok: "bg-ok",
  warn: "bg-warn",
  alert: "bg-alert",
  foreground: "bg-foreground",
} as const satisfies Record<Tone, string>;