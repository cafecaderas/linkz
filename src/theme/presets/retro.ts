import type { Theme } from "../types";

// Warm sunset gradient, chunky cream pill buttons with a hard offset
// shadow — nostalgic, playful, tactile.
export const RETRO_THEME: Theme = {
  id: "retro",
  name: "Retro",
  version: 1,
  background: {
    kind: "gradient",
    gradientType: "linear",
    angle: 160,
    stops: [
      { color: "#ff9a56", position: 0 },
      { color: "#ff6a88", position: 55 },
      { color: "#a86bde", position: 100 },
    ],
  },
  buttons: {
    archetype: "retro",
    background: { type: "solid", color: "#fff4e0" },
    textColor: "#2b1d0e",
    border: { width: 2.5, color: "#2b1d0e", radius: 999 },
    opacity: 1,
    shadow: { color: "#2b1d0e", blur: 0, spread: 4 },
    padding: { x: 22, y: 15 },
    size: { width: "full", height: 54 },
    font: { size: 15, weight: 700, letterSpacing: 0.3 },
    alignment: "center",
    icon: { show: false, placement: "left" },
    hover: { scale: 1, transitionMs: 100 },
  },
  typography: {
    heading: {
      family: "'Helvetica Neue', Arial, sans-serif",
      size: 30,
      weight: 800,
      letterSpacing: 0,
      lineHeight: 1.15,
      color: "#fff8ef",
      shadow: { color: "rgba(43,29,14,0.35)", blur: 10, offsetX: 0, offsetY: 2 },
      align: "center",
    },
    body: {
      family: "'Helvetica Neue', Arial, sans-serif",
      size: 15,
      weight: 500,
      letterSpacing: 0,
      lineHeight: 1.5,
      color: "rgba(255,248,239,0.9)",
      align: "center",
    },
  },
  layout: {
    contentWidth: 500,
    verticalSpacing: 24,
    horizontalPadding: 24,
    sectionSpacing: 32,
    buttonSpacing: 14,
    profileAlignment: "center",
    buttonWidth: "full",
    borderRadius: 999,
    avatar: { size: 96, shape: "circle" },
    density: "comfortable",
  },
};
