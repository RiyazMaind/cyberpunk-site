/**
 * Typed mirror of the design tokens declared in `app/globals.css`.
 *
 * Use these constants only where a Tailwind class cannot reach: inline `style`
 * values, SVG `fill` / `stroke`, canvas or WebGL colors. Everything else should
 * use the Tailwind utilities generated from `@theme`.
 *
 * The palette is closed. Do not add a color here that is not registered in
 * `app/globals.css` and documented in `.opencode/skills/cyberpunk-design-system`.
 * Source of truth: `.opencode/skills/cyberpunk-design-system/SKILL.md`.
 */

/** Page background, `<body>`, full-bleed section grounds. WCAG contrast base. */
export const VOID = "#05050a";
/** Panels, cards, terminal window, nav backdrop. */
export const SURFACE = "#0b0b14";
/** Raised elements: status bars, code chips, hovered cards. */
export const SURFACE_2 = "#11111d";

/** Primary neon, links, focus rings, CTA. 11.25:1 on `void`. */
export const CYAN = "#22d3ee";
/** Secondary neon, gradient partner. 5.14:1 on `void`, 4.73:1 on `surface-2`. */
export const PURPLE = "#a855f7";
/** Rare accent, highlight only. 11.56:1 on `void`. */
export const MAGENTA = "#f0abfc";

/** Body copy, descriptions, labels. 5.29:1 on `void`. Never `#6b7a8f`. */
export const MUTED = "#74839b";

/** "Nominal" / passing status. */
export const OK = "#34d399";
/** Degraded / warning status. */
export const WARN = "#fbbf24";
/** Failure / critical status. Never decorative. */
export const ALERT = "#f43f5e";

/** Near-white body text. */
export const FOREGROUND = "#e8ecf4";

/** `Chakra_Petch` - headlines, buttons, nav wordmark, stat values. */
export const FONT_DISPLAY =
  "var(--font-chakra-petch), ui-sans-serif, system-ui, sans-serif";
/** `Geist_Mono` - terminal output, status labels, values, badges. */
export const FONT_MONO = "var(--font-geist-mono), ui-monospace, monospace";

/** Weights `Chakra_Petch` is instantiated with via `next/font/google`. */
export const FONT_DISPLAY_WEIGHTS = [400, 500, 600, 700] as const;

export type ThemeColor =
  | "void"
  | "background"
  | "surface"
  | "surface-2"
  | "cyan"
  | "purple"
  | "magenta"
  | "muted"
  | "ok"
  | "warn"
  | "alert"
  | "foreground";

export type ThemeFontWeight = (typeof FONT_DISPLAY_WEIGHTS)[number];

export const theme = {
  color: {
    void: VOID,
    /** Alias of `void`; use when the value is consumed as a backdrop. */
    background: VOID,
    surface: SURFACE,
    "surface-2": SURFACE_2,
    cyan: CYAN,
    purple: PURPLE,
    magenta: MAGENTA,
    muted: MUTED,
    ok: OK,
    warn: WARN,
    alert: ALERT,
    foreground: FOREGROUND,
  },
  font: {
    display: FONT_DISPLAY,
    mono: FONT_MONO,
  },
} as const satisfies {
  color: Record<ThemeColor, string>;
  font: Record<"display" | "mono", string>;
};
