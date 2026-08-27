import type { Dispatch } from "react";
import type { StudioPreset } from "@/theme/presets";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { backgroundToStyle } from "@/theme/tokens";
import { OptionGrid } from "../controls/OptionGrid";
import { SectionCard } from "../controls/SectionCard";

export function VibeSection({
  presets,
  activePresetId,
  dispatch,
}: {
  presets: StudioPreset[];
  activePresetId: string;
  dispatch: Dispatch<ThemeEditorAction>;
}) {
  return (
    <SectionCard title="Vibe">
      <OptionGrid
        value={activePresetId}
        onChange={(id) => {
          const preset = presets.find((p) => p.id === id);
          if (preset) dispatch({ type: "LOAD_PRESET", theme: preset.theme });
        }}
        options={presets.map((preset) => ({
          value: preset.id,
          label: preset.label,
          preview: (
            <div
              className="flex h-12 w-full items-end rounded-md p-1.5"
              style={backgroundToStyle(preset.theme.background)}
            >
              <span
                className="h-2.5 w-8 rounded-full"
                style={{
                  backgroundColor: preset.theme.buttons.background.color ?? preset.theme.buttons.border.color,
                  border: `1px solid ${preset.theme.buttons.border.color}`,
                }}
              />
            </div>
          ),
        }))}
      />
      <p className="text-xs leading-relaxed text-white/40">
        Choosing a vibe resets Background, Accent, Typography, and Button style below to that vibe&apos;s defaults.
      </p>
    </SectionCard>
  );
}
