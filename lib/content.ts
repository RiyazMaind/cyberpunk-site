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
  /** First focusable element on the page. */
  skipLabel: "Skip to content",
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
  skipLabel: string;
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
        { label: "Telemetry", href: "#network" },
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
    readouts: [
      { label: "NODE", value: "NODE_07" },
      { label: "UPLINK", value: "ENCRYPTED" },
      { label: "LATENCY", value: "8.4ms" },
      { label: "CIPHER", value: "AES-256" },
    ],
    signal: { label: "SIGNAL STABLE", tone: "ok" },
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
    readouts: readonly StatusReadout[];
    signal: { readonly label: string; readonly tone: "ok" };
  };
};

/**
 * Section 6 - System Status HUD. The mesh is fictional and healthy: every
 * metric is inside its budget. `percent` is the bar fill, which is not always
 * the value itself - `caption` spells that out when the two differ.
 */
export type StatusMetric = {
  readonly label: string;
  readonly value: string;
  readonly tone: "cyan" | "purple" | "ok";
  readonly percent?: number;
  readonly caption?: string;
};

export const status = {
  eyebrow: "MESH UPLINK // LIVE",
  title: "NETWORK STATUS",
  description:
    "Relay telemetry sampled across the NULLBEACON mesh. Every metric is signed at the node before it reaches this panel, and any budget breach pages the on-call operator.",
  panel: {
    /** Panel label. Deliberately not "NETWORK STATUS" - that is the section
        heading, and repeating it announced the same phrase twice. */
    title: "MESH TELEMETRY",
    state: { label: "NOMINAL", tone: "ok" },
    timestamp: "SYNC 03:14:22 UTC",
  },
  metrics: [
    {
      label: "UPTIME",
      value: "99.998%",
      tone: "ok",
      percent: 99.998,
    },
    {
      label: "LATENCY",
      value: "8.4ms",
      tone: "ok",
      percent: 42,
      caption: "42% of the 20ms relay budget",
    },
    {
      label: "ACTIVE NODES",
      value: "41 / 41",
      tone: "cyan",
      percent: 100,
      caption: "Full mesh enrolled and responding",
    },
    {
      label: "THROUGHPUT",
      value: "8.7 TB/s",
      tone: "purple",
      percent: 87,
      caption: "87% of the 10 TB/s rated ceiling",
    },
    {
      label: "INTEGRITY",
      value: "100%",
      tone: "ok",
      percent: 100,
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: string;
  description: string;
  panel: {
    title: string;
    state: { readonly label: string; readonly tone: "ok" };
    timestamp: string;
  };
  metrics: readonly StatusMetric[];
};

/**
 * Section 7 - Feature cards. `identifier` is the top-of-card technical label,
 * `state` the bottom-of-card status strip. `tone` picks the HudPanel accent.
 */
export type Feature = {
  readonly identifier: string;
  readonly title: string;
  readonly description: string;
  readonly state: { readonly label: string; readonly tone: "ok" | "cyan" | "purple" };
  readonly tone?: "cyan" | "purple";
};

export const features = {
  eyebrow: "PROTOCOLS // CORE",
  title: "CAPABILITIES",
  description:
    "Three subsystems run underneath every NULLBEACON uplink. They are listed here in the order a packet meets them.",
  items: [
    {
      identifier: "PROTO_01",
      title: "ENCRYPTED MESH",
      description:
        "Every node participates in a hardened mesh. Traffic stays encrypted across the entire relay path, so no single hop can read, rewrite, or silently terminate a session.",
      state: { label: "ACTIVE", tone: "ok" },
      tone: "cyan",
    },
    {
      identifier: "PROTO_02",
      title: "ZERO-TRACE RELAY",
      description:
        "Relay infrastructure minimises retained metadata and never writes plaintext payloads to disk. Addresses rotate per session and are discarded when the last packet lands.",
      state: { label: "SECURE", tone: "cyan" },
      tone: "purple",
    },
    {
      identifier: "PROTO_03",
      title: "AUTONOMOUS ROUTING",
      description:
        "Traffic resolves the healthiest available route across the active mesh. Degraded nodes are removed from the path within two heartbeats, without operator input.",
      state: { label: "AUTONOMOUS", tone: "purple" },
      tone: "cyan",
    },
  ],
} as const satisfies {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly Feature[];
};

/**
 * Section 8 - Terminal / access. The console is fictional; `lines` is a fixed
 * transcript revealed one line at a time. No line is generated at runtime.
 */
export type TerminalLine = {
  readonly kind: "command" | "output" | "result";
  readonly text: string;
  /** Leading status marker, e.g. "[ OK ]". Only used by `result` lines. */
  readonly marker?: string;
  readonly tone?: "ok" | "cyan" | "purple";
};

export const terminal = {
  eyebrow: "ACCESS // SECURE CONSOLE",
  title: "OPEN A CHANNEL",
  description:
    "Operator sessions are negotiated per client and closed when the last packet is acknowledged. Nothing below is a live system: NULLBEACON is fictional and no traffic leaves this page.",
  window: {
    path: "operator@nullbeacon:~/uplink",
    /** Window-chrome dots. Decorative, and deliberately not traffic lights. */
    dots: ["ok", "cyan", "purple"] as const,
    prompt: "> ",
  },
  lines: [
    { kind: "command", text: "nullbeacon --status", tone: "cyan" },
    { kind: "output", text: "establishing encrypted uplink..." },
    { kind: "output", text: "negotiating ephemeral session keys" },
    { kind: "result", marker: "[ OK ]", text: "handshake complete", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "mesh integrity verified", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "active nodes 41/41", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "relay latency 8.4ms", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "cipher AES-256", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "route matrix synchronized", tone: "ok" },
    { kind: "result", marker: "[ OK ]", text: "uplink operational", tone: "ok" },
    { kind: "output", text: "session ready - awaiting operator", tone: "cyan" },
  ] as const satisfies readonly TerminalLine[],
  cta: {
    label: "OPEN SECURE CHANNEL",
    /** Explains why the CTA is not yet a link. */
    note: "Console provisioning is pending. This system is fictional.",
  },
} as const satisfies {
  eyebrow: string;
  title: string;
  description: string;
  window: {
    path: string;
    dots: readonly ("ok" | "cyan" | "purple")[];
    prompt: string;
  };
  lines: readonly TerminalLine[];
  cta: { label: string; note: string };
};
