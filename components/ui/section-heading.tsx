import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  /** Target for the owning <section aria-labelledby>. */
  headingId: string;
  title: string;
  eyebrow?: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  headingId,
  title,
  eyebrow,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={headingId}
        className={cn(
          "font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight",
          eyebrow && "mt-3",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-muted leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
