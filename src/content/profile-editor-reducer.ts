import type { Link, Profile } from "./types";

export interface ContentEditorState {
  initialProfile: Profile;
  draftProfile: Profile;
  past: Profile[];
  future: Profile[];
  lastPatch: { key: string; time: number } | null;
}

export type ContentEditorAction =
  | { type: "PATCH_PROFILE"; patch: Partial<Pick<Profile, "displayName" | "bio" | "avatarUrl">> }
  | { type: "ADD_LINK" }
  | { type: "PATCH_LINK"; id: string; patch: Partial<Pick<Link, "label" | "url">> }
  | { type: "DELETE_LINK"; id: string }
  | { type: "TOGGLE_LINK"; id: string }
  | { type: "MOVE_LINK"; id: string; direction: "up" | "down" }
  | { type: "RESET" }
  | { type: "UNDO" }
  | { type: "REDO" };

export function initContentEditorState(profile: Profile): ContentEditorState {
  return { initialProfile: profile, draftProfile: profile, past: [], future: [], lastPatch: null };
}

// ---------- patch helpers ----------

function patchProfile(profile: Profile, patch: Partial<Pick<Profile, "displayName" | "bio" | "avatarUrl">>): Profile {
  return { ...profile, ...patch };
}

// Links keep a dense 0..n-1 `order` after any structural change — LinkList
// sorts by `order`, so gaps/duplicates would silently drift the render order.
function withReindexedOrder(links: Link[]): Link[] {
  return links.map((link, index) => ({ ...link, order: index }));
}

function addLink(profile: Profile): Profile {
  const newLink: Link = {
    id: crypto.randomUUID(),
    profileId: profile.id,
    label: "New Link",
    url: "https://",
    order: profile.links.length,
    enabled: true,
  };
  return { ...profile, links: [...profile.links, newLink] };
}

function patchLink(profile: Profile, id: string, patch: Partial<Pick<Link, "label" | "url">>): Profile {
  return {
    ...profile,
    links: profile.links.map((link) => (link.id === id ? { ...link, ...patch } : link)),
  };
}

function deleteLink(profile: Profile, id: string): Profile {
  return { ...profile, links: withReindexedOrder(profile.links.filter((link) => link.id !== id)) };
}

function toggleLink(profile: Profile, id: string): Profile {
  return {
    ...profile,
    links: profile.links.map((link) => (link.id === id ? { ...link, enabled: !link.enabled } : link)),
  };
}

function moveLink(profile: Profile, id: string, direction: "up" | "down"): Profile {
  const sorted = [...profile.links].sort((a, b) => a.order - b.order);
  const from = sorted.findIndex((link) => link.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from === -1 || to < 0 || to >= sorted.length) return profile;

  const [moved] = sorted.splice(from, 1);
  sorted.splice(to, 0, moved);
  return { ...profile, links: withReindexedOrder(sorted) };
}

// ---------- history ----------

// Mirrors theme-editor-reducer.ts's coalescing idea, but PATCH_LINK is keyed
// per-link (not just by action type): editing two different links' fields
// within the coalesce window must not merge into one undo step that reverts
// both at once. Every other action here is a discrete click, so a plain
// type key is fine for those, same as the theme reducer.
const COALESCE_WINDOW_MS = 400;

function coalesceKey(action: ContentEditorAction): string {
  return action.type === "PATCH_LINK" ? `PATCH_LINK:${action.id}` : action.type;
}

function pushHistory(state: ContentEditorState, key: string): Pick<ContentEditorState, "past" | "future" | "lastPatch"> {
  const now = Date.now();
  const coalesce = state.lastPatch?.key === key && now - state.lastPatch.time < COALESCE_WINDOW_MS;
  return {
    past: coalesce ? state.past : [...state.past, state.draftProfile],
    future: [],
    lastPatch: { key, time: now },
  };
}

function applyPatch(state: ContentEditorState, key: string, nextProfile: Profile): ContentEditorState {
  return { ...state, ...pushHistory(state, key), draftProfile: nextProfile };
}

// ---------- reducer ----------

export function contentEditorReducer(state: ContentEditorState, action: ContentEditorAction): ContentEditorState {
  switch (action.type) {
    case "PATCH_PROFILE":
      return applyPatch(state, coalesceKey(action), patchProfile(state.draftProfile, action.patch));
    case "ADD_LINK":
      return applyPatch(state, coalesceKey(action), addLink(state.draftProfile));
    case "PATCH_LINK":
      return applyPatch(state, coalesceKey(action), patchLink(state.draftProfile, action.id, action.patch));
    case "DELETE_LINK":
      return applyPatch(state, coalesceKey(action), deleteLink(state.draftProfile, action.id));
    case "TOGGLE_LINK":
      return applyPatch(state, coalesceKey(action), toggleLink(state.draftProfile, action.id));
    case "MOVE_LINK":
      return applyPatch(state, coalesceKey(action), moveLink(state.draftProfile, action.id, action.direction));
    case "RESET":
      return {
        ...state,
        draftProfile: state.initialProfile,
        past: [...state.past, state.draftProfile],
        future: [],
        lastPatch: null,
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        ...state,
        draftProfile: previous,
        past: state.past.slice(0, -1),
        future: [state.draftProfile, ...state.future],
        lastPatch: null,
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        draftProfile: next,
        past: [...state.past, state.draftProfile],
        future: state.future.slice(1),
        lastPatch: null,
      };
    }
  }
}
