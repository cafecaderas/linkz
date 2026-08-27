import type { Dispatch } from "react";
import type { Profile } from "@/content/types";
import type { ContentEditorAction } from "@/content/profile-editor-reducer";
import { AvatarControl } from "../controls/AvatarControl";
import { SectionCard } from "../controls/SectionCard";

export function ProfileSection({ profile, dispatch }: { profile: Profile; dispatch: Dispatch<ContentEditorAction> }) {
  return (
    <SectionCard title="Profile">
      <div className="flex flex-col gap-1.5 text-sm text-white/80">
        <span>Avatar</span>
        <AvatarControl
          value={profile.avatarUrl}
          onChange={(avatarUrl) => dispatch({ type: "PATCH_PROFILE", patch: { avatarUrl } })}
        />
      </div>

      <label className="flex flex-col gap-1.5 text-sm text-white/80">
        <span>Display name</span>
        <input
          value={profile.displayName}
          onChange={(e) => dispatch({ type: "PATCH_PROFILE", patch: { displayName: e.target.value } })}
          className="rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-fuchsia-400"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-white/80">
        <span>Bio</span>
        <textarea
          value={profile.bio}
          onChange={(e) => dispatch({ type: "PATCH_PROFILE", patch: { bio: e.target.value } })}
          rows={3}
          className="resize-none rounded-md border border-white/15 bg-black/40 px-2 py-1.5 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-fuchsia-400"
        />
      </label>

      <div className="flex flex-col gap-1.5 text-sm text-white/80">
        <span>Page URL</span>
        <span className="rounded-md bg-white/5 px-2 py-1.5 font-mono text-xs text-white/40">
          linkz.com/{profile.username}
        </span>
      </div>
    </SectionCard>
  );
}
