import type { Theme } from "../types";

// Magazine-style: serif heading, warm cream, left-aligned, soft boxy
// buttons. Reads more like a masthead than an app.
export const EDITORIAL_THEME: Theme = {
  id: "editorial",
  name: "Editorial",
  version: 1,
  background: {
    kind: "solid",
    color: "#f2ede4",
  },
  buttons: {
    archetype: "soft",
    background: { type: "solid", color: "#e7ddc9" },
    textColor: "#2b2420",
    border: { width: 0, color: "transparent", radius: 8 },
    opacity: 1,
    shadow: { color: "rgba(43,36,32,0.12)", blur: 8, spread: 0 },
    padding: { x: 20, y: 15 },
    size: { width: "full", height: 52 },
    font: { size: 15, weight: 500, letterSpacing: 0 },
    alignment: "left",
    icon: { show: false, placement: "left" },
    hover: { scale: 1, transitionMs: 150 },
  },
  typography: {
    heading: {
      family: "Georgia, serif",
      size: 28,
      weight: 700,
      letterSpacing: 0,
      lineHeight: 1.15,
      color: "#2b2420",
      align: "left",
    },
    body: {
      family: "Georgia, serif",
      size: 16,
      weight: 400,
      letterSpacing: 0,
      lineHeight: 1.6,
      color: "#5c5347",
      align: "left",
    },
  },
  layout: {
    contentWidth: 560,
    verticalSpacing: 24,
    horizontalPadding: 28,
    sectionSpacing: 36,
    buttonSpacing: 14,
    profileAlignment: "left",
    buttonWidth: "full",
    borderRadius: 8,
    avatar: { size: 84, shape: "square" },
    density: "spacious",
  },
};
