import type { Dispatch } from "react";
import type { Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { ACCENT_COLORS } from "@/theme/curated/accents";
import { SectionCard } from "../controls/SectionCard";
import { SwatchRow } from "../controls/SwatchRow";

function activeAccentId(theme: Theme): string {
  const match = ACCENT_COLORS.find((accent) => accent.hex.toLowerCase() === theme.buttons.border.color.toLowerCase());
  return match?.id ?? "";
}

export function AccentSection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Accent">
      <SwatchRow
        value={activeAccentId(theme)}
        onChange={(id) => {
          const accent = ACCENT_COLORS.find((a) => a.id === id);
          if (!accent) return;
          dispatch({ type: "PATCH_BUTTON_BORDER", patch: { color: accent.hex } });
          if (theme.buttons.shadow) {
            dispatch({ type: "PATCH_BUTTON_SHADOW", patch: { color: accent.hex } });
          }
        }}
        options={ACCENT_COLORS.map((accent) => ({ value: accent.id, label: accent.label, hex: accent.hex }))}
      />
    </SectionCard>
  );
}
