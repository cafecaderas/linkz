// Content only: what the profile says, never how it looks. Style lives in
// src/theme/types.ts and is referenced by id, never embedded here.

export interface Link {
  id: string;
  profileId: string;
  label: string;
  url: string;
  icon?: string;
  order: number;
  enabled: boolean;
}

export interface Profile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  links: Link[];
  themeId: string;
}
