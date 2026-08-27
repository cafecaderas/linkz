import type { Dispatch } from "react";
import type { Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { FONT_PAIRINGS } from "@/theme/curated/typography";
import { OptionGrid } from "../controls/OptionGrid";
import { SectionCard } from "../controls/SectionCard";

function activePairingId(theme: Theme): string {
  const match = FONT_PAIRINGS.find(
    (pairing) =>
      pairing.heading.family === theme.typography.heading.family &&
      pairing.heading.weight === theme.typography.heading.weight,
  );
  return match?.id ?? "";
}

export function TypographySection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Typography">
      <OptionGrid
        columns={1}
        value={activePairingId(theme)}
        onChange={(id) => {
          const pairing = FONT_PAIRINGS.find((p) => p.id === id);
          if (!pairing) return;
          dispatch({ type: "PATCH_HEADING_FONT", patch: pairing.heading });
          dispatch({ type: "PATCH_BODY_FONT", patch: pairing.body });
        }}
        options={FONT_PAIRINGS.map((pairing) => ({
          value: pairing.id,
          label: pairing.label,
          preview: (
            <span
              className="text-lg text-white/90"
              style={{ fontFamily: pairing.heading.family, fontWeight: pairing.heading.weight }}
            >
              Aa — The quick fox
            </span>
          ),
        }))}
      />
    </SectionCard>
  );
}
