import { cn } from "@/lib/cn";
import { footer, legalLine } from "@/lib/content";
import { bgTone } from "@/lib/tone";

export function SiteFooter() {
  return (
    <footer className="border-t border-cyan/15 bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="font-display text-base font-bold uppercase tracking-widest text-cyan">
              {footer.wordmark}
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {footer.groups.map((group) => (
              <div key={group.id}>
                {/* Column labels, not document sections. A <p> keeps them out of the page
                    heading outline - they are navigation, not structure. */}
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className={cn(
                          "inline-block py-2 text-sm text-muted",
                          "transition-colors duration-200 ease-out hover:text-cyan",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-cyan/15 pt-6">
          {footer.statusStrip.map((readout) => (
            <div key={readout.label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  bgTone[readout.tone],
                )}
              />
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {readout.label}
              </dt>
              <dd className="font-mono text-xs tabular-nums text-foreground">
                {readout.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          {legalLine(new Date().getFullYear())}
        </p>
      </div>
    </footer>
  );
}
