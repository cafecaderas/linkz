// The theme schema: presentation only. Never import content types here.

export interface Theme {
  id: string;
  name: string;
  version: 1;
  background: BackgroundConfig;
  buttons: ButtonTheme;
  typography: TypographyTheme;
  layout: LayoutTheme;
}

// ---------- Background ----------

export type BackgroundConfig =
  | SolidBackground
  | GradientBackground
  | ImageBackground
  | PatternBackground
  | VideoBackground
  | ParticlesBackground;

export interface BackgroundEffects {
  noise?: { enabled: boolean; opacity: number };
  vignette?: { enabled: boolean; intensity: number };
}

interface BackgroundBase {
  effects?: BackgroundEffects;
}

export interface SolidBackground extends BackgroundBase {
  kind: "solid";
  color: string;
}

export interface GradientStop {
  color: string;
  position: number; // 0-100
}

export interface GradientBackground extends BackgroundBase {
  kind: "gradient";
  gradientType: "linear" | "radial" | "conic";
  angle?: number; // degrees, linear only
  stops: GradientStop[];
  animated?: { enabled: boolean; durationMs: number };
}

export interface ImageBackground extends BackgroundBase {
  kind: "image";
  src: string;
  position: { x: number; y: number }; // percentages
  scale: number; // 1 = cover, >1 = zoomed in
  overlay?: { color: string; opacity: number };
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

export interface PatternBackground extends BackgroundBase {
  kind: "pattern";
  pattern: "dots" | "grid" | "stripes" | "waves";
  color: string;
  backgroundColor: string;
  scale: number;
}

// Typed today, not rendered by the MVP renderer — future slots, no schema
// rewrite needed when they ship.
export interface VideoBackground extends BackgroundBase {
  kind: "video";
  src: string;
  loop: boolean;
  muted: boolean;
  overlay?: { color: string; opacity: number };
}

export interface ParticlesBackground extends BackgroundBase {
  kind: "particles";
  preset: string;
  color: string;
  density: number;
}

// ---------- Buttons ----------

// A UI label used to pre-fill the property values below when a user picks a
// starting point in the builder. Components never branch on this — there is
// exactly one LinkButton, styled entirely from the concrete props.
export type ButtonArchetype =
  | "pill"
  | "square"
  | "glass"
  | "outline"
  | "solid"
  | "neon"
  | "retro"
  | "brutalist"
  | "soft"
  | "3d"
  | "custom";

export interface ButtonTheme {
  archetype: ButtonArchetype;
  background: {
    type: "solid" | "gradient" | "glass" | "transparent";
    color?: string;
    gradient?: GradientStop[];
    blur?: number;
  };
  textColor: string;
  border: { width: number; color: string; radius: number };
  opacity: number;
  shadow?: { color: string; blur: number; spread: number; glow?: boolean };
  padding: { x: number; y: number };
  size: { width: "auto" | "full" | number; height: number };
  font: { family?: string; size: number; weight: number; letterSpacing: number };
  alignment: "left" | "center" | "right";
  icon: { show: boolean; placement: "left" | "right" };
  hover: { scale: number; colorShift?: string; glow?: boolean; transitionMs: number };
}

// ---------- Typography ----------

export interface FontSpec {
  family: string;
  size: number;
  weight: number;
  letterSpacing: number;
  lineHeight: number;
  color: string;
  shadow?: { color: string; blur: number; offsetX: number; offsetY: number };
  align: "left" | "center" | "right";
}

export interface TypographyTheme {
  heading: FontSpec;
  body: FontSpec;
}

// ---------- Layout ----------

export interface LayoutTheme {
  contentWidth: number;
  verticalSpacing: number;
  horizontalPadding: number;
  sectionSpacing: number;
  buttonSpacing: number;
  profileAlignment: "left" | "center" | "right";
  buttonWidth: "full" | "auto" | number;
  borderRadius: number;
  avatar: { size: number; shape: "circle" | "square" | "rounded" };
  density: "compact" | "comfortable" | "spacious";
}
