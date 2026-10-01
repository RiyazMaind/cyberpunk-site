import { HudPanel } from "@/components/ui/hud-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusReadout } from "@/components/ui/status-readout";
import { cn } from "@/lib/cn";
import { status, type StatusMetric } from "@/lib/content";
import { bgTone, textTone } from "@/lib/tone";

const metrics: readonly StatusMetric[] = status.metrics;

export function StatusPanel() {
  return (
    <section
      id="network"
      aria-labelledby="network-heading"
      className="scroll-mt-16 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            headingId="network-heading"
            eyebrow={status.eyebrow}
            title={status.title}
            description={status.description}
            className="text-balance"
          />
        </div>

        <HudPanel className="p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-cyan/20 pb-4">
            {/* Panel label, not a section. A <p> keeps the document outline at
                h1 -> h2 (section) -> h3 (card title) with no panel-level noise. */}
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
              {status.panel.title}
            </p>
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.2em]">
              <span
                className={cn(
                  "flex items-center gap-2",
                  textTone[status.panel.state.tone],
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-1.5 w-1.5 rounded-full",
                    bgTone[status.panel.state.tone],
                  )}
                />
                {status.panel.state.label}
              </span>
              <span className="text-muted">{status.panel.timestamp}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-5">
            {metrics.map((metric) => (
              <StatusReadout
                key={metric.label}
                label={metric.label}
                value={metric.value}
                tone={metric.tone}
                percent={metric.percent}
                caption={metric.caption}
              />
            ))}
          </div>
        </HudPanel>
      </div>
    </section>
  );
}
