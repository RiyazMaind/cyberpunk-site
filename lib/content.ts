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

export type MeshNode = {
  readonly id: string;
  readonly left: string;
  readonly top: string;
  readonly tone: "ok" | "warn" | "cyan";
};

export type MeshLink = {
  readonly id: string;
  /** CSS rotation applied to a 1px rule anchored at the mesh centre. */
  readonly angle: string;
  readonly length: string;
};

export const hero = {
  eyebrow: "SECURE MESH // NODE 07",
  headline: {
    lines: ["THE NETWORK", "AFTER THE", "NETWORK"],
    /** Read by assistive tech in place of the gradient-clipped text. */
    plain: "The network after the network",
  },
  description:
    "NULLBEACON builds hardened communication infrastructure for systems that cannot afford to disappear. 41 relay nodes, end-to-end encrypted, zero telemetry.",
  ctas: {
    primary: { label: "INITIALIZE UPLINK", href: "#access" },
    secondary: { label: "VIEW NETWORK", href: "#network" },
  },
  scrollCue: "SCROLL",
  mesh: {
    title: "NODE MESH",
    liveLabel: "LIVE",
    centerNode: {
      id: "node_07",
      label: "NODE_07",
    },
    readouts: [
      { label: "NODE", value: "NODE_07" },
      { label: "UPLINK", value: "ENCRYPTED" },
      { label: "LATENCY", value: "8.4ms" },
      { label: "CIPHER", value: "AES-256" },
    ],
    signal: { label: "SIGNAL STABLE", tone: "ok" },
    nodes: [
      { id: "n1", left: "50%", top: "7%", tone: "cyan" },
      { id: "n2", left: "79%", top: "25%", tone: "cyan" },
      { id: "n3", left: "79%", top: "75%", tone: "warn" },
      { id: "n4", left: "50%", top: "93%", tone: "cyan" },
      { id: "n5", left: "21%", top: "75%", tone: "ok" },
      { id: "n6", left: "21%", top: "25%", tone: "cyan" },
    ],
    links: [
      { id: "l1", angle: "-90deg", length: "43%" },
      { id: "l2", angle: "-41deg", length: "39%" },
      { id: "l3", angle: "41deg", length: "39%" },
      { id: "l4", angle: "90deg", length: "43%" },
      { id: "l5", angle: "139deg", length: "39%" },
      { id: "l6", angle: "219deg", length: "39%" },
    ],
  },
} as const satisfies {
  eyebrow: string;
  headline: { lines: readonly string[]; plain: string };
  description: string;
  ctas: Record<"primary" | "secondary", NavLink>;
  scrollCue: string;
  mesh: {
    title: string;
    liveLabel: string;
    centerNode: { id: string; label: string };
    readouts: readonly StatusReadout[];
    signal: { readonly label: string; readonly tone: "ok" };    nodes: readonly MeshNode[];
    links: readonly MeshLink[];
  };
};
