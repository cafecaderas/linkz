import type { Profile } from "@/content/types";
import type { Theme } from "@/theme/types";
import { ProfileShell } from "@/components/profile/ProfileShell";

// The single source of rendering truth: this is the exact same ProfileShell
// the public /[username] route uses. No copy, no second style pipeline —
// it always shows the live combination of draft content + draft theme,
// regardless of which studio mode is active.
export function PreviewPane({ profile, theme }: { profile: Profile; theme: Theme }) {
  return (
    <div className="h-full overflow-y-auto rounded-2xl border border-white/10 bg-black/20">
      <ProfileShell profile={profile} theme={theme} />
    </div>
  );
}
