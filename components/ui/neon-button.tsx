import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type NeonButtonProps = {
  /**
   * Navigates with an <a> because a CTA that jumps to a section is not an action.
   * Omit it to render a non-interactive <span> - used where the destination does
   * not exist yet, so the CTA reads as pending instead of a dead link.
   */
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

const frame =
  "inline-flex items-center justify-center gap-2 px-7 py-3 font-display text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-200 ease-out";

const interactive = {
  primary:
    "border border-cyan/60 bg-cyan/10 text-cyan shadow-glow-cyan hover:bg-cyan/20 hover:shadow-glow-cyan-hover",
  ghost:
    "border border-purple/30 text-purple hover:border-purple/60 hover:bg-purple/10",
} as const;

/** Pending: same footprint, dashed and muted, nothing to hover or focus. */
const pending = {
  primary: "border border-dashed border-cyan/30 text-muted",
  ghost: "border border-dashed border-purple/25 text-muted",
} as const;

export function NeonButton({
  href,
  children,
  variant = "primary",
  className,
}: NeonButtonProps) {
  if (!href) {
    return (
      <span
        data-pending="true"
        className={cn(frame, pending[variant], className)}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        frame,
        interactive[variant],
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
        className,
      )}
    >
      {children}
    </a>
  );
}
