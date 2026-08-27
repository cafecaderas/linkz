"use client";

import { useReducer, useState } from "react";
import { STUDIO_PREVIEW_PROFILE } from "@/lib/seed-data";
import { STUDIO_PRESETS } from "@/theme/presets";
import { initEditorState, themeEditorReducer } from "@/theme/theme-editor-reducer";
import { contentEditorReducer, initContentEditorState } from "@/content/profile-editor-reducer";
import { ContextPanel } from "./ContextPanel";
import { HistoryControls } from "./controls/HistoryControls";
import { SegmentedControl } from "./controls/SegmentedControl";
import { PreviewPane } from "./PreviewPane";
import { ProfileSection } from "./sections/ProfileSection";
import { LinksSection } from "./sections/LinksSection";
import { VibeSection } from "./sections/VibeSection";
import { BackgroundSection } from "./sections/BackgroundSection";
import { AccentSection } from "./sections/AccentSection";
import { TypographySection } from "./sections/TypographySection";
import { ButtonStyleSection } from "./sections/ButtonStyleSection";
import { ProfileImageSection } from "./sections/ProfileImageSection";
import { LayoutSection } from "./sections/LayoutSection";

export type StudioMode = "content" | "design";

export function StudioApp() {
  const [mode, setMode] = useState<StudioMode>("content");

  const [themeState, themeDispatch] = useReducer(themeEditorReducer, STUDIO_PRESETS[0].theme, initEditorState);
  const [contentState, contentDispatch] = useReducer(
    contentEditorReducer,
    STUDIO_PREVIEW_PROFILE,
    initContentEditorState,
  );

  const { draftTheme } = themeState;
  const { draftProfile } = contentState;
  const activePreset = STUDIO_PRESETS.find((preset) => preset.theme.id === draftTheme.id);

  const history =
    mode === "design"
      ? {
          canUndo: themeState.past.length > 0,
          canRedo: themeState.future.length > 0,
          onUndo: () => themeDispatch({ type: "UNDO" }),
          onRedo: () => themeDispatch({ type: "REDO" }),
          onReset: () => themeDispatch({ type: "RESET" }),
          resetLabel: "Reset theme",
        }
      : {
          canUndo: contentState.past.length > 0,
          canRedo: contentState.future.length > 0,
          onUndo: () => contentDispatch({ type: "UNDO" }),
          onRedo: () => contentDispatch({ type: "REDO" }),
          onReset: () => contentDispatch({ type: "RESET" }),
          resetLabel: "Reset content",
        };

  return (
    <div className="flex h-dvh flex-col bg-zinc-950 text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <span className="text-sm font-semibold tracking-[0.2em] text-white/80">LINKZ · STUDIO</span>

        <div className="flex items-center gap-3">
          <SegmentedControl<StudioMode>
            value={mode}
            options={[
              { value: "content", label: "Content" },
              { value: "design", label: "Design" },
            ]}
            onChange={setMode}
          />
          <HistoryControls {...history} />
        </div>
      </header>

      <div className="grid flex-1 grid-cols-[320px_1fr_260px] gap-4 overflow-hidden p-4">
        <div className="flex flex-col gap-4 overflow-y-auto pr-1">
          {mode === "content" ? (
            <>
              <ProfileSection profile={draftProfile} dispatch={contentDispatch} />
              <LinksSection profile={draftProfile} dispatch={contentDispatch} />
            </>
          ) : (
            <>
              <VibeSection presets={STUDIO_PRESETS} activePresetId={activePreset?.id ?? ""} dispatch={themeDispatch} />
              <BackgroundSection theme={draftTheme} dispatch={themeDispatch} />
              <AccentSection theme={draftTheme} dispatch={themeDispatch} />
              <TypographySection theme={draftTheme} dispatch={themeDispatch} />
              <ButtonStyleSection theme={draftTheme} dispatch={themeDispatch} />
              <ProfileImageSection theme={draftTheme} dispatch={themeDispatch} />
              <LayoutSection theme={draftTheme} dispatch={themeDispatch} />
            </>
          )}
        </div>

        <PreviewPane profile={draftProfile} theme={draftTheme} />

        <ContextPanel mode={mode} profile={draftProfile} theme={draftTheme} />
      </div>
    </div>
  );
}
