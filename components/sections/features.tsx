import { HudPanel } from "@/components/ui/hud-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { features, type Feature } from "@/lib/content";
import { bgTone, textTone } from "@/lib/tone";

const items: readonly Feature[] = features.items;

/** Interior rules follow the card tone, matching the convention inside every other
    panel (hero mesh, terminal window chrome). Label colour comes from `textTone`. */
const ruleBorder = {
  cyan: "border-cyan/15",
  purple: "border-purple/15",
} as const;

/** Hover border scales per tone so the purple card stays distinct but identical in form. */
const hoverBorder = {
  cyan: "hover:border-cyan/45",
  purple: "hover:border-purple/45",
} as const;

export function Features() {
  return (
    <section
      id="protocol"
      aria-labelledby="protocol-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          headingId="protocol-heading"
          eyebrow={features.eyebrow}
          title={features.title}
          description={features.description}
          className="text-balance"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature) => {
            const tone = feature.tone ?? "cyan";

            return (
              <HudPanel
                key={feature.identifier}
                tone={feature.tone}
                className={cn(
                  "flex h-full flex-col p-6",
                  "transition-[border-color,transform] duration-200 ease-out",
                  "hover:-translate-y-0.5",
                  hoverBorder[tone],
                  "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.2em]",
                    textTone[tone],
                  )}
                >
                  {feature.identifier}
                </span>

                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>

                {/* mt-auto pins the strip to the card floor so all three align
                    across a row regardless of description length. */}
                <div className="mt-auto pt-6">
                  <div
                  className={cn(
                    "flex items-center gap-2 border-t pt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted",
                    ruleBorder[tone],
                  )}
                >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full",
                        bgTone[feature.state.tone],
                      )}
                    />
                    {feature.state.label}
                  </div>
                </div>
              </HudPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
