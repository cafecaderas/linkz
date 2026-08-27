import type { Profile } from "@/content/types";
import type { Theme } from "@/theme/types";
import { DEFAULT_THEME } from "@/theme/defaults";
import { findSeedProfile, findSeedTheme } from "./seed-data";

export interface ProfileWithTheme {
  profile: Profile;
  theme: Theme;
}

// Async on purpose: this signature matches what a real DB-backed lookup will
// look like (Priority 6), so swapping the seed data for a query later won't
// change any call site.
export async function getProfileByUsername(username: string): Promise<ProfileWithTheme | null> {
  const profile = findSeedProfile(username);
  if (!profile) return null;

  const theme = findSeedTheme(profile.themeId) ?? DEFAULT_THEME;
  return { profile, theme };
}
