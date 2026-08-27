import type { Profile } from "@/content/types";
import type { Theme } from "@/theme/types";
import { BRUTALIST_DEMO_THEME } from "@/theme/presets/brutalist-demo";
import { NEON_DEMO_THEME } from "@/theme/presets/neon-demo";

const NEON_PROFILE: Profile = {
  id: "profile-neon",
  username: "neon",
  displayName: "DJ Nova",
  bio: "Bass, lights, chaos. New EP out now.",
  avatarUrl: "https://i.pravatar.cc/300?img=13",
  themeId: NEON_DEMO_THEME.id,
  links: [
    { id: "l1", profileId: "profile-neon", label: "Latest EP on SoundCloud", url: "https://soundcloud.com", order: 0, enabled: true, icon: "soundcloud" },
    { id: "l2", profileId: "profile-neon", label: "Watch on YouTube", url: "https://youtube.com", order: 1, enabled: true, icon: "youtube" },
    { id: "l3", profileId: "profile-neon", label: "Stream on Spotify", url: "https://spotify.com", order: 2, enabled: true, icon: "spotify" },
    { id: "l4", profileId: "profile-neon", label: "Follow on Instagram", url: "https://instagram.com", order: 3, enabled: true, icon: "instagram" },
    { id: "l5", profileId: "profile-neon", label: "Support on Patreon", url: "https://patreon.com", order: 4, enabled: true, icon: "patreon" },
  ],
};

// Reused as the static preview content in the Theme Studio — only the theme
// changes there, never the profile.
export const STUDIO_PREVIEW_PROFILE: Profile = {
  id: "profile-demo",
  username: "demo",
  displayName: "DJ Nova",
  bio: "Bass, lights, chaos. New EP out now.",
  avatarUrl: "https://i.pravatar.cc/300?img=33",
  themeId: BRUTALIST_DEMO_THEME.id,
  links: [
    { id: "l1", profileId: "profile-demo", label: "Latest EP on SoundCloud", url: "https://soundcloud.com", order: 0, enabled: true, icon: "soundcloud" },
    { id: "l2", profileId: "profile-demo", label: "Watch on YouTube", url: "https://youtube.com", order: 1, enabled: true, icon: "youtube" },
    { id: "l3", profileId: "profile-demo", label: "Stream on Spotify", url: "https://spotify.com", order: 2, enabled: true, icon: "spotify" },
    { id: "l4", profileId: "profile-demo", label: "Follow on Instagram", url: "https://instagram.com", order: 3, enabled: true, icon: "instagram" },
    { id: "l5", profileId: "profile-demo", label: "Support on Patreon", url: "https://patreon.com", order: 4, enabled: true, icon: "patreon" },
  ],
};

const THEMES_BY_ID: Record<string, Theme> = {
  [NEON_DEMO_THEME.id]: NEON_DEMO_THEME,
  [BRUTALIST_DEMO_THEME.id]: BRUTALIST_DEMO_THEME,
};

const PROFILES_BY_USERNAME: Record<string, Profile> = {
  [NEON_PROFILE.username]: NEON_PROFILE,
  [STUDIO_PREVIEW_PROFILE.username]: STUDIO_PREVIEW_PROFILE,
};

export function findSeedProfile(username: string): Profile | undefined {
  return PROFILES_BY_USERNAME[username];
}

export function findSeedTheme(themeId: string): Theme | undefined {
  return THEMES_BY_ID[themeId];
}
