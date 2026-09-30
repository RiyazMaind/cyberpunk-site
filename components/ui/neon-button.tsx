import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type NeonButtonProps = {
  /** Navigates with an <a> because a CTA that jumps to a section is not an action. */
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function NeonButton({
  href,
  children,
  variant = "primary",
  className,
}: NeonButtonProps) {
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
        className,
      )}
    >
      {children}
    </a>
  );
}
