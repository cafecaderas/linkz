import type { LayoutTheme } from "../types";

export interface DensityOption {
  id: LayoutTheme["density"];
  label: string;
  patch: Pick<
    LayoutTheme,
    "density" | "verticalSpacing" | "horizontalPadding" | "sectionSpacing" | "buttonSpacing" | "contentWidth"
  > & { avatarSize: number };
}

export const DENSITY_OPTIONS: DensityOption[] = [
  {
    id: "compact",
    label: "Compact",
    patch: {
      density: "compact",
      verticalSpacing: 14,
      horizontalPadding: 16,
      sectionSpacing: 20,
      buttonSpacing: 8,
      contentWidth: 440,
      avatarSize: 72,
    },
  },
  {
    id: "comfortable",
    label: "Comfortable",
    patch: {
      density: "comfortable",
      verticalSpacing: 24,
      horizontalPadding: 24,
      sectionSpacing: 32,
      buttonSpacing: 13,
      contentWidth: 500,
      avatarSize: 96,
    },
  },
  {
    id: "spacious",
    label: "Spacious",
    patch: {
      density: "spacious",
      verticalSpacing: 32,
      horizontalPadding: 32,
      sectionSpacing: 44,
      buttonSpacing: 18,
      contentWidth: 560,
      avatarSize: 112,
    },
  },
];
