import type { Dispatch } from "react";
import type { LayoutTheme, Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { SectionCard } from "../controls/SectionCard";
import { SegmentedControl } from "../controls/SegmentedControl";

const SIZE_OPTIONS: { value: "small" | "medium" | "large"; label: string; px: number }[] = [
  { value: "small", label: "Small", px: 72 },
  { value: "medium", label: "Medium", px: 96 },
  { value: "large", label: "Large", px: 128 },
];

function activeSizeId(size: number): "small" | "medium" | "large" {
  return SIZE_OPTIONS.reduce((closest, option) =>
    Math.abs(option.px - size) < Math.abs(closest.px - size) ? option : closest,
  ).value;
}

export function ProfileImageSection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Profile image">
      <SegmentedControl<LayoutTheme["avatar"]["shape"]>
        label="Shape"
        value={theme.layout.avatar.shape}
        options={[
          { value: "circle", label: "Circle" },
          { value: "square", label: "Square" },
          { value: "rounded", label: "Rounded" },
        ]}
        onChange={(shape) => dispatch({ type: "PATCH_AVATAR", patch: { shape } })}
      />
      <SegmentedControl
        label="Size"
        value={activeSizeId(theme.layout.avatar.size)}
        options={SIZE_OPTIONS.map(({ value, label }) => ({ value, label }))}
        onChange={(id) => {
          const size = SIZE_OPTIONS.find((option) => option.value === id)?.px;
          if (size) dispatch({ type: "PATCH_AVATAR", patch: { size } });
        }}
      />
    </SectionCard>
  );
}
