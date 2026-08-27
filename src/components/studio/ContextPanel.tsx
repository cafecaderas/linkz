import type { Profile } from "@/content/types";
import type { Theme } from "@/theme/types";
import type { StudioMode } from "./StudioApp";

export function ContextPanel({ mode, profile, theme }: { mode: StudioMode; profile: Profile; theme: Theme }) {
  const visibleLinks = profile.links.filter((link) => link.enabled).length;

  return (
    <div className="flex flex-col gap-4 text-sm text-white/60">
      {mode === "content" ? (
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Page content</div>
          <div className="mt-1 text-white/90">
            {visibleLinks} of {profile.links.length} links visible
          </div>
        </div>
      ) : (
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">Active theme</div>
          <div className="mt-1 text-white/90">{theme.name}</div>
        </div>
      )}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 leading-relaxed">
        {mode === "content"
          ? "Content controls edit structured profile data — the same data the public page renders, nothing here is a mockup."
          : "Every control here edits theme data, not CSS. The public profile renderer reads that same data — nothing about this page is a mockup."}
      </div>
    </div>
  );
}
