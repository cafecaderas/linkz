import type { FontSpec } from "../types";

export interface FontPairing {
  id: string;
  label: string;
  heading: Pick<FontSpec, "family" | "weight" | "letterSpacing" | "lineHeight">;
  body: Pick<FontSpec, "family" | "weight" | "letterSpacing" | "lineHeight">;
}

// Only family/weight/letterSpacing/lineHeight — deliberately leaves size
// and color alone so a pairing composes cleanly on top of whatever Vibe
// or Accent is already active instead of overwriting them.
export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "modern",
    label: "Modern",
    heading: { family: "system-ui, sans-serif", weight: 700, letterSpacing: 0, lineHeight: 1.2 },
    body: { family: "system-ui, sans-serif", weight: 400, letterSpacing: 0, lineHeight: 1.5 },
  },
  {
    id: "editorial",
    label: "Editorial",
    heading: { family: "Georgia, serif", weight: 700, letterSpacing: 0, lineHeight: 1.15 },
    body: { family: "Georgia, serif", weight: 400, letterSpacing: 0, lineHeight: 1.6 },
  },
  {
    id: "display",
    label: "Display",
    heading: { family: "'Orbitron', system-ui, sans-serif", weight: 800, letterSpacing: 1, lineHeight: 1.15 },
    body: { family: "system-ui, sans-serif", weight: 500, letterSpacing: 0.3, lineHeight: 1.5 },
  },
  {
    id: "mono",
    label: "Mono Underground",
    heading: { family: "'Courier New', monospace", weight: 700, letterSpacing: 0, lineHeight: 1.2 },
    body: { family: "'Courier New', monospace", weight: 400, letterSpacing: 0, lineHeight: 1.5 },
  },
];
