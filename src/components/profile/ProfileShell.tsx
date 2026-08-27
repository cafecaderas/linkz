import type { Profile } from "@/content/types";
import type { Theme } from "@/theme/types";
import { themeToCSSVariables } from "@/theme/tokens";
import { Avatar } from "./Avatar";
import { Background } from "./Background";
import { LinkList } from "./LinkList";
import { ProfileHeader } from "./ProfileHeader";
import styles from "./profile.module.css";

// The reuse point for the future builder's live-preview pane: feed it
// `profile` (whatever's loaded/being edited) and `draftTheme` (client state)
// instead of a persisted theme, and nothing else changes.
export function ProfileShell({ profile, theme }: { profile: Profile; theme: Theme }) {
  return (
    <div className={styles.shell} style={themeToCSSVariables(theme)}>
      <Background config={theme.background} />
      <div className={styles.content}>
        <Avatar
          src={profile.avatarUrl}
          alt={profile.displayName}
          shape={theme.layout.avatar.shape}
          size={theme.layout.avatar.size}
        />
        <ProfileHeader displayName={profile.displayName} bio={profile.bio} />
        <LinkList links={profile.links} iconConfig={theme.buttons.icon} />
      </div>
    </div>
  );
}
