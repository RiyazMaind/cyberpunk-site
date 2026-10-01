import type { CSSProperties } from "react";
import { HudPanel } from "@/components/ui/hud-panel";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/cn";
import { hero } from "@/lib/content";
import { meshLinks, meshNodes } from "@/lib/mesh";
import { bgTone, textTone } from "@/lib/tone";

function NodeMesh() {
  return (
    <HudPanel tone="purple" glow className="p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {hero.mesh.title}
        </p>
        <p
          className={cn(
            "flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em]",
            textTone[hero.mesh.signal.tone],
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full",
              bgTone[hero.mesh.signal.tone],
            )}
          />
          {hero.mesh.liveLabel}
        </p>
      </div>

      <div
        aria-hidden="true"
        className="relative mt-6 aspect-square w-full"
      >
        {meshLinks.map((link) => (
          <span
            key={link.id}
            style={
              {
                width: link.length,
                transform: `rotate(${link.angle})`,
              } satisfies CSSProperties
            }
            className="absolute top-1/2 left-1/2 h-px origin-left bg-cyan/25"
          />
        ))}

        {meshNodes.map((node) => (
          <span
            key={node.id}
            style={{ left: node.left, top: node.top }}
            className={cn(
              "absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
              bgTone[node.tone],
              textTone[node.tone],
            )}
          >
            <span className="absolute inset-0 rounded-full border border-current opacity-40" />
          </span>
        ))}

        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-cyan/60 bg-surface/80">
          <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-dot" />
        </span>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-purple/15 pt-4 sm:grid-cols-2">
        {hero.mesh.readouts.map((readout) => (
          <div
            key={readout.label}
            className="flex items-baseline justify-between gap-3"
          >
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {readout.label}
            </dt>
            <dd className="font-mono text-xs text-foreground tabular-nums">
              {readout.value}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className={cn(
          "mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em]",
          textTone[hero.mesh.signal.tone],
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            bgTone[hero.mesh.signal.tone],
          )}
        />
        {hero.mesh.signal.label}
      </p>
    </HudPanel>
  );
}

export function Hero() {
  return (
    <section
      id="system"
      aria-labelledby="hero-heading"
      className="relative py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* Copy track 1.2fr / mesh 1fr. An even split at `lg` leaves ~448px for the headline,
          too narrow for "THE NETWORK" at 72px; this gives ~520px. */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="inline-flex border border-cyan/30 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            {hero.eyebrow}
          </p>

          {/* Size ladder stops at `xl:text-7xl` (72px), never 96px. "THE NETWORK" is the
            longest line; measured against Chakra Petch Bold's uppercase advance widths
            it needs roughly 495px, which is wider than an even two-column split can
            offer at the 1024px breakpoint and forced a mid-phrase wrap. 36 / 48 / 60 /
            72px holds the three intended lines from 320px through 1440px. */}
          <h1
            id="hero-heading"
            className="mt-6 font-display font-bold tracking-tight leading-[0.95] text-4xl sm:text-5xl md:text-6xl xl:text-7xl"
          >
            <span className="sr-only">{hero.headline.plain}</span>
            <span
              aria-hidden="true"
              className="bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent text-glow-cyan"
            >
              {hero.headline.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <NeonButton href={hero.ctas.primary.href}>
              {hero.ctas.primary.label}
            </NeonButton>
            <NeonButton href={hero.ctas.secondary.href} variant="ghost">
              {hero.ctas.secondary.label}
            </NeonButton>
          </div>

          <p className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {hero.scrollCue}
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-3 w-3"
            >
              <path d="M2 4l4 4 4-4" />
            </svg>
          </p>
        </div>

        <NodeMesh />
      </div>
    </section>
  );
}
