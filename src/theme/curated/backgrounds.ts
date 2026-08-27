import type { BackgroundConfig } from "../types";

export interface BackgroundMood {
  id: string;
  label: string;
  config: BackgroundConfig;
}

// Independent of Vibe — picking one swaps the whole background config via
// SWITCH_BACKGROUND_KIND, leaving buttons/typography/layout untouched.
export const BACKGROUND_MOODS: BackgroundMood[] = [
  {
    id: "solid-dark",
    label: "Solid Dark",
    config: { kind: "solid", color: "#0a0a0a" },
  },
  {
    id: "solid-light",
    label: "Solid Light",
    config: { kind: "solid", color: "#f5f2e8" },
  },
  {
    id: "soft-gradient",
    label: "Soft Gradient",
    config: {
      kind: "gradient",
      gradientType: "linear",
      angle: 145,
      stops: [
        { color: "#1e1b4b", position: 0 },
        { color: "#312e81", position: 100 },
      ],
    },
  },
  {
    id: "bold-gradient",
    label: "Bold Gradient",
    config: {
      kind: "gradient",
      gradientType: "linear",
      angle: 135,
      stops: [
        { color: "#ff00c8", position: 0 },
        { color: "#7000ff", position: 50 },
        { color: "#00e5ff", position: 100 },
      ],
      animated: { enabled: true, durationMs: 8000 },
    },
  },
  {
    id: "grain-noir",
    label: "Grain / Noir",
    config: {
      kind: "solid",
      color: "#050505",
      effects: {
        noise: { enabled: true, opacity: 0.08 },
        vignette: { enabled: true, intensity: 0.5 },
      },
    },
  },
];
