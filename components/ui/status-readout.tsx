import { cn } from "@/lib/cn";
import { bgTone, type Tone } from "@/lib/tone";

type StatusReadoutProps = {
  label: string;
  value: string;
  tone?: Tone;
  /** 0-100. Renders the static bar when present. */
  percent?: number;
  /** What the bar measures, when it is not the value itself. */
  caption?: string;
};

export function StatusReadout({
  label,
  value,
  tone = "cyan",
  percent,
  caption,
}: StatusReadoutProps) {
  const hasBar = typeof percent === "number" && Number.isFinite(percent);
  const width = hasBar ? Math.min(100, Math.max(0, percent)) : 0;

  return (
    <dl className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <span
            aria-hidden="true"
            className={cn("inline-block h-1.5 w-1.5 rounded-full", bgTone[tone])}
          />
          {label}
        </dt>
        <dd className="font-mono text-xs text-foreground tabular-nums">
          {value}
        </dd>
      </div>

      {hasBar ? (
        <div aria-hidden="true" className="h-1 w-full bg-surface-2">
          <div
            className={cn("h-full", bgTone[tone])}
            style={{ width: `${width}%` }}
          />
        </div>
      ) : null}

      {hasBar && caption ? (
        <p className="font-mono text-xs text-muted">{caption}</p>
      ) : null}
    </dl>
  );
}
