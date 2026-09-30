import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HudPanelProps = {
  children: ReactNode;
  className?: string;
  tone?: "cyan" | "purple";
};

export function HudPanel({
  children,
  className,
  tone = "cyan",
}: HudPanelProps) {
  return (
    <div
      className={cn(
        "relative border border-cyan/20 bg-surface/80 backdrop-blur-sm",
        "shadow-glow-cyan",
        tone === "purple" && "border-purple/25 shadow-glow-purple",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute -top-px -left-px h-3 w-3 border-t border-l border-cyan/60"
      />
      <span
        aria-hidden="true"
        className="absolute -top-px -right-px h-3 w-3 border-t border-r border-cyan/60"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-cyan/60"
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-cyan/60"
      />
      {children}
    </div>
  );
}
