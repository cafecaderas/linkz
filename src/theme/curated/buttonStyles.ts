import type { ButtonArchetype, ButtonTheme } from "../types";

export interface ButtonStyleOption {
  id: ButtonArchetype;
  label: string;
  border: { width: number; radius: number };
  background: { type: ButtonTheme["background"]["type"]; blur?: number };
  // null = no shadow. Color is intentionally absent here — ButtonStyleSection
  // fills it in from whatever's already active (Accent, or the current
  // shadow's color) so Button style never fights Accent over color.
  shadow: { blur: number; spread: number; glow?: boolean } | null;
  hover: ButtonTheme["hover"];
}

export const BUTTON_STYLES: ButtonStyleOption[] = [
  {
    id: "pill",
    label: "Pill",
    border: { width: 0, radius: 999 },
    background: { type: "solid" },
    shadow: null,
    hover: { scale: 1.03, glow: false, transitionMs: 150 },
  },
  {
    id: "glass",
    label: "Glass",
    border: { width: 1, radius: 16 },
    background: { type: "glass", blur: 12 },
    shadow: { blur: 16, spread: 0, glow: false },
    hover: { scale: 1.02, glow: false, transitionMs: 180 },
  },
  {
    id: "solid",
    label: "Solid",
    border: { width: 0, radius: 10 },
    background: { type: "solid" },
    shadow: null,
    hover: { scale: 1.02, transitionMs: 150 },
  },
  {
    id: "outline",
    label: "Outline",
    border: { width: 1.5, radius: 8 },
    background: { type: "transparent" },
    shadow: null,
    hover: { scale: 1.01, transitionMs: 120 },
  },
  {
    id: "neon",
    label: "Neon",
    border: { width: 1.5, radius: 999 },
    background: { type: "glass", blur: 12 },
    shadow: { blur: 20, spread: 0, glow: true },
    hover: { scale: 1.05, glow: true, transitionMs: 200 },
  },
  {
    id: "brutalist",
    label: "Brutalist",
    border: { width: 3, radius: 0 },
    background: { type: "solid" },
    shadow: { blur: 0, spread: 5, glow: false },
    hover: { scale: 1, transitionMs: 80 },
  },
];
