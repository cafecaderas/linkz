import type { CSSProperties } from "react";
import type { BackgroundConfig, GradientStop, Theme } from "./types";

// Pure, synchronous, no DOM/network access — this is what lets a future
// builder re-derive the var map on every keystroke/slider tick with no
// round-trip.
export function themeToCSSVariables(theme: Theme): CSSProperties {
  const { buttons, typography, layout } = theme;

  return {
    "--content-width": `${layout.contentWidth}px`,
    "--vertical-spacing": `${layout.verticalSpacing}px`,
    "--horizontal-padding": `${layout.horizontalPadding}px`,
    "--section-spacing": `${layout.sectionSpacing}px`,
    "--button-spacing": `${layout.buttonSpacing}px`,
    "--layout-border-radius": `${layout.borderRadius}px`,
    "--avatar-size": `${layout.avatar.size}px`,
    "--profile-alignment": layout.profileAlignment,

    "--button-bg": buttons.background.color ?? "transparent",
    "--button-text": buttons.textColor,
    "--button-border-color": buttons.border.color,
    "--button-border-width": `${buttons.border.width}px`,
    "--button-radius": `${buttons.border.radius}px`,
    "--button-opacity": `${buttons.opacity}`,
    "--button-padding-x": `${buttons.padding.x}px`,
    "--button-padding-y": `${buttons.padding.y}px`,
    "--button-height": `${buttons.size.height}px`,
    "--button-width": buildButtonWidth(buttons.size.width),
    "--button-font-size": `${buttons.font.size}px`,
    "--button-font-weight": `${buttons.font.weight}`,
    "--button-letter-spacing": `${buttons.font.letterSpacing}px`,
    "--button-hover-scale": `${buttons.hover.scale}`,
    "--button-transition": `${buttons.hover.transitionMs}ms`,
    "--button-shadow": buildButtonShadow(theme),
    "--button-backdrop-blur": buttons.background.blur ? `blur(${buttons.background.blur}px)` : "none",

    "--font-heading": typography.heading.family,
    "--font-heading-size": `${typography.heading.size}px`,
    "--font-heading-weight": `${typography.heading.weight}`,
    "--font-heading-letter-spacing": `${typography.heading.letterSpacing}px`,
    "--font-heading-line-height": `${typography.heading.lineHeight}`,
    "--font-heading-color": typography.heading.color,
    "--font-heading-align": typography.heading.align,
    "--font-heading-text-shadow": buildTextShadow(typography.heading.shadow),

    "--font-body": typography.body.family,
    "--font-body-size": `${typography.body.size}px`,
    "--font-body-weight": `${typography.body.weight}`,
    "--font-body-letter-spacing": `${typography.body.letterSpacing}px`,
    "--font-body-line-height": `${typography.body.lineHeight}`,
    "--font-body-color": typography.body.color,
    "--font-body-align": typography.body.align,
  } as CSSProperties;
}

function buildButtonWidth(width: Theme["buttons"]["size"]["width"]): string {
  if (width === "full") return "100%";
  if (width === "auto") return "auto";
  return `${width}px`;
}

function buildTextShadow(shadow: Theme["typography"]["heading"]["shadow"]): string {
  if (!shadow) return "none";
  return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${shadow.color}`;
}

function buildButtonShadow(theme: Theme): string {
  const { shadow } = theme.buttons;
  if (!shadow) return "none";
  const glow = shadow.glow ? `, 0 0 ${shadow.blur * 2}px ${shadow.spread}px ${shadow.color}` : "";
  return `0 ${shadow.spread}px ${shadow.blur}px rgba(0,0,0,0.2)${glow}`;
}

// Compound values (N-stop gradients, filter stacks) can't be expressed as
// flat CSS vars, so they're composed here in JS and applied as inline style
// on the background layer directly.
export function backgroundToStyle(bg: BackgroundConfig): CSSProperties {
  switch (bg.kind) {
    case "solid":
      return { backgroundColor: bg.color };
    case "gradient":
      return { backgroundImage: buildGradientCSS(bg) };
    case "image":
      return {
        backgroundImage: `url(${bg.src})`,
        backgroundPosition: `${bg.position.x}% ${bg.position.y}%`,
        backgroundSize: `${bg.scale * 100}%`,
        filter: buildImageFilterCSS(bg),
      };
    case "pattern":
      return {
        backgroundColor: bg.backgroundColor,
        backgroundImage: buildPatternCSS(bg),
        backgroundSize: `${bg.scale}px ${bg.scale}px`,
      };
    // Video/particles aren't rendered by the MVP renderer yet. Falling back
    // instead of throwing means theme JSON written by a future app version
    // won't crash an older deployed renderer.
    default:
      return { backgroundColor: "#111111" };
  }
}

function buildGradientCSS(bg: Extract<BackgroundConfig, { kind: "gradient" }>): string {
  const stops = sortStops(bg.stops)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");
  if (bg.gradientType === "radial") return `radial-gradient(circle, ${stops})`;
  if (bg.gradientType === "conic") return `conic-gradient(from ${bg.angle ?? 0}deg, ${stops})`;
  return `linear-gradient(${bg.angle ?? 180}deg, ${stops})`;
}

function sortStops(stops: GradientStop[]): GradientStop[] {
  return [...stops].sort((a, b) => a.position - b.position);
}

function buildImageFilterCSS(bg: Extract<BackgroundConfig, { kind: "image" }>): string {
  const parts: string[] = [];
  if (bg.blur) parts.push(`blur(${bg.blur}px)`);
  if (bg.brightness !== undefined) parts.push(`brightness(${bg.brightness})`);
  if (bg.contrast !== undefined) parts.push(`contrast(${bg.contrast})`);
  if (bg.saturation !== undefined) parts.push(`saturate(${bg.saturation})`);
  return parts.length ? parts.join(" ") : "none";
}

function buildPatternCSS(bg: Extract<BackgroundConfig, { kind: "pattern" }>): string {
  switch (bg.pattern) {
    case "dots":
      return `radial-gradient(${bg.color} 1.5px, transparent 1.5px)`;
    case "grid":
      return `linear-gradient(${bg.color} 1px, transparent 1px), linear-gradient(90deg, ${bg.color} 1px, transparent 1px)`;
    case "stripes":
      return `repeating-linear-gradient(45deg, ${bg.color}, ${bg.color} 2px, transparent 2px, transparent 12px)`;
    case "waves":
      return `radial-gradient(circle at 50% 50%, transparent 20%, ${bg.color} 21%, transparent 22%)`;
  }
}
