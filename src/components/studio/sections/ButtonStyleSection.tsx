import type { Dispatch } from "react";
import type { Theme } from "@/theme/types";
import type { ThemeEditorAction } from "@/theme/theme-editor-reducer";
import { BUTTON_STYLES } from "@/theme/curated/buttonStyles";
import { OptionGrid } from "../controls/OptionGrid";
import { SectionCard } from "../controls/SectionCard";

export function ButtonStyleSection({ theme, dispatch }: { theme: Theme; dispatch: Dispatch<ThemeEditorAction> }) {
  return (
    <SectionCard title="Button style">
      <OptionGrid
        value={theme.buttons.archetype}
        onChange={(id) => {
          const style = BUTTON_STYLES.find((s) => s.id === id);
          if (!style) return;

          dispatch({ type: "PATCH_BUTTONS", patch: { archetype: style.id, hover: style.hover } });
          dispatch({ type: "PATCH_BUTTON_BORDER", patch: style.border });

          // Style owns shape, never color — reuse whatever color is already
          // active (from Accent, or the current border) so switching styles
          // never fights Accent over hue. A "solid"/"glass" style still
          // needs *some* fill color though: if the previous style was
          // transparent (e.g. an Outline vibe), buttons.background.color is
          // undefined, so fall back to the border color rather than
          // rendering an invisible button.
          const backgroundColor = theme.buttons.background.color ?? theme.buttons.border.color;
          dispatch({
            type: "PATCH_BUTTON_BACKGROUND",
            patch: { ...style.background, color: style.background.type === "transparent" ? undefined : backgroundColor },
          });

          const shadowColor = theme.buttons.shadow?.color ?? theme.buttons.border.color;
          dispatch({
            type: "SET_BUTTON_SHADOW",
            shadow: style.shadow ? { ...style.shadow, color: shadowColor } : undefined,
          });
        }}
        options={BUTTON_STYLES.map((style) => (
          {
            value: style.id,
            label: style.label,
            preview: (
              <div className="flex h-10 w-full items-center justify-center rounded-md bg-white/5">
                <div
                  className="h-6 w-16"
                  style={{
                    borderRadius: Math.min(style.border.radius, 12),
                    borderWidth: style.border.width,
                    borderStyle: "solid",
                    borderColor: "rgba(255,255,255,0.5)",
                    backgroundColor: style.background.type === "transparent" ? "transparent" : "rgba(255,255,255,0.15)",
                    backdropFilter: style.background.blur ? `blur(${style.background.blur}px)` : undefined,
                    boxShadow: style.shadow ? `0 ${style.shadow.spread}px ${style.shadow.blur}px rgba(255,255,255,0.35)` : "none",
                  }}
                />
              </div>
            ),
          }
        ))}
      />
    </SectionCard>
  );
}
