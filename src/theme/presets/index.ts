import type { Theme } from "../types";
import { BRUTALIST_DEMO_THEME } from "./brutalist-demo";
import { NEON_DEMO_THEME } from "./neon-demo";
import { MINIMAL_THEME } from "./minimal";
import { EDITORIAL_THEME } from "./editorial";
import { LUXURY_THEME } from "./luxury";
import { RETRO_THEME } from "./retro";

export interface StudioPreset {
  id: string;
  label: string;
  theme: Theme;
}

export const STUDIO_PRESETS: StudioPreset[] = [
  { id: BRUTALIST_DEMO_THEME.id, label: "Brutalist", theme: BRUTALIST_DEMO_THEME },
  { id: NEON_DEMO_THEME.id, label: "Neon", theme: NEON_DEMO_THEME },
  { id: MINIMAL_THEME.id, label: "Minimal", theme: MINIMAL_THEME },
  { id: EDITORIAL_THEME.id, label: "Editorial", theme: EDITORIAL_THEME },
  { id: LUXURY_THEME.id, label: "Luxury", theme: LUXURY_THEME },
  { id: RETRO_THEME.id, label: "Retro", theme: RETRO_THEME },
];
