import type { Theme } from "../types";

// Near-black, gold outline, elegant serif with wide tracking. Restraint
// as the luxury signal, not ornamentation.
export const LUXURY_THEME: Theme = {
  id: "luxury",
  name: "Luxury",
  version: 1,
  background: {
    kind: "solid",
    color: "#0b0b0d",
  },
  buttons: {
    archetype: "outline",
    background: { type: "transparent" },
    textColor: "#e9e2c9",
    border: { width: 1, color: "#c9a227", radius: 4 },
    opacity: 1,
    shadow: { color: "rgba(201,162,39,0.25)", blur: 14, spread: 0 },
    padding: { x: 22, y: 15 },
    size: { width: "full", height: 52 },
    font: { size: 13, weight: 500, letterSpacing: 2 },
    alignment: "center",
    icon: { show: false, placement: "left" },
    hover: { scale: 1.01, transitionMs: 200 },
  },
  typography: {
    heading: {
      family: "Georgia, serif",
      size: 26,
      weight: 600,
      letterSpacing: 1.5,
      lineHeight: 1.2,
      color: "#f2ecd8",
      align: "center",
    },
    body: {
      family: "system-ui, sans-serif",
      size: 14,
      weight: 300,
      letterSpacing: 0.5,
      lineHeight: 1.6,
      color: "#a39a7f",
      align: "center",
    },
  },
  layout: {
    contentWidth: 480,
    verticalSpacing: 28,
    horizontalPadding: 24,
    sectionSpacing: 36,
    buttonSpacing: 14,
    profileAlignment: "center",
    buttonWidth: "full",
    borderRadius: 4,
    avatar: { size: 96, shape: "circle" },
    density: "spacious",
  },
};
