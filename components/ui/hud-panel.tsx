import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HudPanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "purple";
  /**
   * Glow hierarchy. `true` marks a primary moment (the hero mesh). `false` is
   * the default for content panels below the fold, where the 1px border carries
   * the edge and a halo would make the whole page read as illuminated.
   */
  glow?: boolean;
};

/** Accent scales per tone. Ticks follow tone so a panel reads as one object. */
const panel = {
  cyan: {
    border: "border-cyan/20",
    tick: "border-cyan",
    shadow: "shadow-glow-cyan",
  },
  purple: {
    border: "border-purple/20",
    tick: "border-purple",
    shadow: "shadow-glow-purple",
  },
} as const;

export function HudPanel({
  children,
  className,
  tone = "cyan",
  glow = false,
}: HudPanelProps) {
  const accent = panel[tone];

  return (
    <div
      className={cn(
        "relative border bg-surface/80 backdrop-blur-sm",
        accent.border,
        glow && accent.shadow,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-px -left-px h-3 w-3 border-t border-l",
          accent.tick,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-px -right-px h-3 w-3 border-t border-r",
          accent.tick,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-px -left-px h-3 w-3 border-b border-l",
          accent.tick,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-px -right-px h-3 w-3 border-b border-r",
          accent.tick,
        )}
      />
      {children}
    </div>
  );
}
