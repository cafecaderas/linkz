import type { Dispatch } from "react";
import type { Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { BACKGROUND_MOODS } from "@/theme/curated/backgrounds";
import { backgroundToStyle } from "@/theme/tokens";
import { OptionGrid } from "../controls/OptionGrid";
import { SectionCard } from "../controls/SectionCard";

function activeMoodId(theme: Theme): string {
  const match = BACKGROUND_MOODS.find((mood) => JSON.stringify(mood.config) === JSON.stringify(theme.background));
  return match?.id ?? "";
}

export function BackgroundSection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Background">
      <OptionGrid
        value={activeMoodId(theme)}
        onChange={(id) => {
          const mood = BACKGROUND_MOODS.find((m) => m.id === id);
          if (mood) dispatch({ type: "SWITCH_BACKGROUND_KIND", background: mood.config });
        }}
        options={BACKGROUND_MOODS.map((mood) => ({
          value: mood.id,
          label: mood.label,
          preview: <div className="h-10 w-full rounded-md" style={backgroundToStyle(mood.config)} />,
        }))}
      />
    </SectionCard>
  );
}
