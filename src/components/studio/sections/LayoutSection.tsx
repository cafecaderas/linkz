import type { Dispatch } from "react";
import type { Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { DENSITY_OPTIONS } from "@/theme/curated/density";
import { SectionCard } from "../controls/SectionCard";
import { SegmentedControl } from "../controls/SegmentedControl";

export function LayoutSection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Layout">
      <SegmentedControl
        label="Density"
        value={theme.layout.density}
        options={DENSITY_OPTIONS.map(({ id, label }) => ({ value: id, label }))}
        onChange={(id) => {
          const option = DENSITY_OPTIONS.find((o) => o.id === id);
          if (!option) return;
          const { avatarSize, ...layoutPatch } = option.patch;
          dispatch({ type: "PATCH_LAYOUT", patch: layoutPatch });
          dispatch({ type: "PATCH_AVATAR", patch: { size: avatarSize } });
        }}
      />
    </SectionCard>
  );
}
