"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { nav, navPrimaryLabel } from "@/lib/content";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeDrawer = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan/15 bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:px-8">
        <div className="flex items-center gap-4">
          <a
            href={nav.wordmarkHref}
            className={cn(
              "font-display text-sm font-bold uppercase tracking-widest text-cyan",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
            )}
          >
            {nav.wordmark}
          </a>
          <span className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ok sm:flex">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-ok animate-pulse-dot"
            />
            {nav.status.label}
          </span>
        </div>

        <nav aria-label={navPrimaryLabel} className="hidden md:block">
          <ul className="flex items-center gap-2">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "group relative inline-block py-3 font-mono text-sm uppercase tracking-[0.15em]",
                    "text-muted transition-colors duration-200 ease-out hover:text-cyan",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 bottom-1 h-px origin-left bg-cyan",
                      "scale-x-0 transition-transform duration-200 ease-out",
                      "group-hover:scale-x-100 group-focus-visible:scale-x-100",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={nav.drawer.id}
          aria-label={open ? nav.drawer.closeLabel : nav.drawer.openLabel}
          className={cn(
            "flex h-11 w-11 items-center justify-center border border-cyan/30 text-cyan",
            "transition-colors duration-200 ease-out hover:border-cyan/60 hover:bg-cyan/10",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
            "md:hidden",
          )}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-5 w-5"
          >
            {open ? (
              <path strokeLinecap="square" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="square" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id={nav.drawer.id}
        aria-label={nav.drawer.navLabel}
        hidden={!open}
        className="border-t border-cyan/15 bg-surface/90 md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-6 py-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeDrawer}
                className={cn(
                  "flex items-center py-3 font-mono text-sm uppercase tracking-[0.15em] text-muted",
                  "transition-colors duration-200 ease-out hover:text-cyan",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
