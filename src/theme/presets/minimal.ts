import type { Theme } from "../types";

// Clean, quiet, neutral. Thin outline buttons, generous whitespace, nothing
// shouting for attention — the opposite pole from Neon/Retro.
export const MINIMAL_THEME: Theme = {
  id: "minimal",
  name: "Minimal",
  version: 1,
  background: {
    kind: "solid",
    color: "#fafafa",
  },
  buttons: {
    archetype: "outline",
    background: { type: "transparent" },
    textColor: "#18181b",
    border: { width: 1, color: "#18181b", radius: 10 },
    opacity: 1,
    padding: { x: 20, y: 14 },
    size: { width: "full", height: 50 },
    font: { size: 14, weight: 500, letterSpacing: 0.2 },
    alignment: "center",
    icon: { show: false, placement: "left" },
    hover: { scale: 1.01, transitionMs: 120 },
  },
  typography: {
    heading: {
      family: "system-ui, sans-serif",
      size: 22,
      weight: 600,
      letterSpacing: -0.2,
      lineHeight: 1.25,
      color: "#18181b",
      align: "center",
    },
    body: {
      family: "system-ui, sans-serif",
      size: 15,
      weight: 400,
      letterSpacing: 0,
      lineHeight: 1.5,
      color: "#71717a",
      align: "center",
    },
  },
  layout: {
    contentWidth: 480,
    verticalSpacing: 24,
    horizontalPadding: 24,
    sectionSpacing: 32,
    buttonSpacing: 12,
    profileAlignment: "center",
    buttonWidth: "full",
    borderRadius: 10,
    avatar: { size: 88, shape: "circle" },
    density: "comfortable",
  },
};
