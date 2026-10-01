/*
 * Geometry for the hero node mesh. This is layout data, not copy, so it is kept
 * out of lib/content.ts: node positions are percentages of the square mesh box
 * and link angles are CSS rotations applied to a 1px rule anchored at centre.
 */

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

export const meshNodes = [
  { id: "n1", left: "50%", top: "7%", tone: "cyan" },
  { id: "n2", left: "79%", top: "25%", tone: "cyan" },
  { id: "n3", left: "79%", top: "75%", tone: "warn" },
  { id: "n4", left: "50%", top: "93%", tone: "cyan" },
  { id: "n5", left: "21%", top: "75%", tone: "ok" },
  { id: "n6", left: "21%", top: "25%", tone: "cyan" },
] as const satisfies readonly MeshNode[];

export const meshLinks = [
  { id: "l1", angle: "-90deg", length: "43%" },
  { id: "l2", angle: "-41deg", length: "39%" },
  { id: "l3", angle: "41deg", length: "39%" },
  { id: "l4", angle: "90deg", length: "43%" },
  { id: "l5", angle: "139deg", length: "39%" },
  { id: "l6", angle: "219deg", length: "39%" },
] as const satisfies readonly MeshLink[];
