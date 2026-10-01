"use client";

import { useEffect, useState } from "react";
import { HudPanel } from "@/components/ui/hud-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { terminal, type TerminalLine } from "@/lib/content";
import { bgTone, textTone } from "@/lib/tone";

const lines: readonly TerminalLine[] = terminal.lines;

/** One line every 380ms - eleven lines settles in ~4s, then stops for good. */
const REVEAL_MS = 380;

/** Command / result / output must stay distinguishable at a glance and to a
    screen reader: the prompt carries the command, results read as values. */
const lineTone = {
  command: textTone.cyan,
  result: textTone.foreground,
  output: textTone.muted,
} as const satisfies Record<TerminalLine["kind"], string>;

export function Terminal() {
  // Server render and first client render both start at 0, so markup matches.
  const [revealed, setRevealed] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (query.matches) {
        setReduced(true);
        setRevealed(lines.length);
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || revealed >= lines.length) return;
    const timer = window.setTimeout(() => {
      setRevealed((current) => Math.min(lines.length, current + 1));
    }, REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [revealed, reduced]);

  const settled = revealed >= lines.length;

  return (
    <section
      id="access"
      aria-labelledby="access-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
<SectionHeading
            headingId="access-heading"
            eyebrow={terminal.eyebrow}
            title={terminal.title}
            description={terminal.description}
            className="text-balance"
          />
        </div>

        <div className="flex flex-col gap-6">
          <HudPanel tone="purple">
            <div className="flex items-center justify-between gap-4 border-b border-purple/20 bg-surface-2/60 px-4 py-3">
              <div
                className="flex shrink-0 items-center gap-2"
                aria-hidden="true"
              >
                {terminal.window.dots.map((tone) => (
                  <span
                    key={tone}
                    className={cn(
                      "inline-block h-2 w-2 rounded-full",
                      bgTone[tone],
                    )}
                  />
                ))}
              </div>
              <span className="truncate font-mono text-xs text-muted">
                {terminal.window.path}
              </span>
            </div>

            {/* Every line is always in the DOM. The reveal only changes opacity,
                so the transcript stays readable to assistive tech and to search. */}
            <div className="space-y-1 p-4 font-mono text-xs leading-relaxed sm:text-sm">
              {lines.map((line, index) => (
                <p
                  key={line.text}
                  className={cn(
                    "break-words whitespace-pre-wrap transition-opacity duration-300 motion-reduce:transition-none",
                    index < revealed ? "opacity-100" : "opacity-0",
                    "motion-reduce:opacity-100",
                    lineTone[line.kind],
                  )}
                >
                  {line.kind === "command" ? (
                    <span className="text-muted">{terminal.window.prompt}</span>
                  ) : null}
                  {line.marker ? (
                    <span className={cn("mr-2", textTone[line.tone ?? "ok"])}>
                      {line.marker}
                    </span>
                  ) : null}
                  {line.text}
                </p>
              ))}
              <p className="break-words whitespace-pre-wrap">
                <span className="text-muted">{terminal.window.prompt}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "ml-0.5 inline-block h-4 w-2 bg-cyan align-middle",
                    !reduced && !settled && "animate-blink motion-reduce:animate-none",
                  )}
                />
              </p>
            </div>
          </HudPanel>

          <div className="flex flex-col items-start gap-3">
            <NeonButton>{terminal.cta.label}</NeonButton>
            <p className="font-mono text-xs text-muted">{terminal.cta.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
