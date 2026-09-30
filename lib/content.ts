/*
 * All user-visible copy for the site. Nothing here is a real company, product,
 * or claim - NULLBEACON and everything below it is fictional world-building for
 * a single-page product site.
 *
 * Edit copy here, never in JSX.
 */

export type NavLink = {
  readonly label: string;
  readonly href: `#${string}`;
};

export type FooterGroup = {
  readonly id: string;
  readonly heading: string;
  readonly links: readonly NavLink[];
};

export type StatusReadout = {
  readonly label: string;
  readonly value: string;
};

export const nav = {
  wordmark: "NULLBEACON",
  wordmarkHref: "#content",
  status: {
    label: "ONLINE",
    tone: "ok",
  },
  links: [
    { label: "SYSTEM", href: "#system" },
    { label: "NETWORK", href: "#network" },
    { label: "PROTOCOL", href: "#protocol" },
    { label: "ACCESS", href: "#access" },
  ],
  drawer: {
    id: "mobile-nav",
    openLabel: "Open navigation",
    closeLabel: "Close navigation",
    navLabel: "Primary mobile",
  },
} as const satisfies {
  wordmark: string;
  wordmarkHref: `#${string}`;
  status: { label: string; tone: "ok" | "warn" | "alert" };
  links: readonly NavLink[];
  drawer: {
    id: string;
    openLabel: string;
    closeLabel: string;
    navLabel: string;
  };
};

export const navPrimaryLabel = "Primary";

export const footer = {
  wordmark: "NULLBEACON",
  tagline: "ENCRYPTED UPLINK SYSTEMS",
  groups: [
    {
      id: "system",
      heading: "SYSTEM",
      links: [
        { label: "Overview", href: "#system" },
        { label: "Nodes", href: "#network" },
        { label: "Status", href: "#protocol" },
      ],
    },
    {
      id: "network",
      heading: "NETWORK",
      links: [
        { label: "Mesh", href: "#network" },
        { label: "Relay", href: "#protocol" },
        { label: "Security", href: "#access" },
      ],
    },
    {
      id: "access",
      heading: "ACCESS",
      links: [
        { label: "Console", href: "#access" },
        { label: "Documentation", href: "#protocol" },
        { label: "Contact", href: "#access" },
      ],
    },
  ],
  statusStrip: [
    { label: "SYSTEM STATUS", value: "OPERATIONAL", tone: "ok" },
    { label: "UPTIME", value: "99.998%", tone: "cyan" },
    { label: "ENCRYPTION", value: "AES-256", tone: "cyan" },
  ],
} as const satisfies {
  wordmark: string;
  tagline: string;
  groups: readonly FooterGroup[];
  statusStrip: readonly (StatusReadout & {
    readonly tone: "ok" | "cyan";
  })[];
};

/** Year is injected at render so it never drifts from the source. */
export function legalLine(year: number): string {
  return `${footer.wordmark} // SECURE CHANNEL // ${year}`;
}
