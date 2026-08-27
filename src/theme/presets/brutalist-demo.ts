import type { Theme } from "../types";

// Raw, hard-edged, high-contrast. The opposite pole from neon-demo, proving
// the same schema can render two unrecognizably different profiles.
export const BRUTALIST_DEMO_THEME: Theme = {
  id: "brutalist-demo",
  name: "Brutalist",
  version: 1,
  background: {
    kind: "solid",
    color: "#f5f2e8",
  },
  buttons: {
    archetype: "brutalist",
    background: { type: "solid", color: "#f5f2e8" },
    textColor: "#0a0a0a",
    border: { width: 3, color: "#0a0a0a", radius: 0 },
    opacity: 1,
    shadow: { color: "#0a0a0a", blur: 0, spread: 6 },
    padding: { x: 20, y: 16 },
    size: { width: "full", height: 56 },
    font: { size: 16, weight: 700, letterSpacing: 0.5 },
    alignment: "left",
    icon: { show: false, placement: "left" },
    hover: { scale: 1, colorShift: "#0a0a0a", transitionMs: 80 },
  },
  typography: {
    heading: {
      family: "'Helvetica Neue', Arial, sans-serif",
      size: 34,
      weight: 900,
      letterSpacing: -0.5,
      lineHeight: 1.05,
      color: "#0a0a0a",
      align: "left",
    },
    body: {
      family: "'Helvetica Neue', Arial, sans-serif",
      size: 16,
      weight: 500,
      letterSpacing: 0,
      lineHeight: 1.4,
      color: "#0a0a0a",
      align: "left",
    },
  },
  layout: {
    contentWidth: 520,
    verticalSpacing: 20,
    horizontalPadding: 24,
    sectionSpacing: 32,
    buttonSpacing: 16,
    profileAlignment: "left",
    buttonWidth: "full",
    borderRadius: 0,
    avatar: { size: 88, shape: "square" },
    density: "spacious",
  },
};
