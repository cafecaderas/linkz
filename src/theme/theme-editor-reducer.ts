import type {
  BackgroundConfig,
  BackgroundEffects,
  ButtonTheme,
  FontSpec,
  GradientStop,
  LayoutTheme,
  Theme,
} from "./types";

export interface EditorState {
  initialTheme: Theme;
  draftTheme: Theme;
  past: Theme[];
  future: Theme[];
  lastPatch: { type: string; time: number } | null;
}

export type ThemeEditorAction =
  | { type: "PATCH_BACKGROUND"; patch: Partial<BackgroundConfig> }
  | { type: "SWITCH_BACKGROUND_KIND"; background: BackgroundConfig }
  | { type: "PATCH_BACKGROUND_EFFECTS"; patch: Partial<BackgroundEffects> }
  | { type: "PATCH_GRADIENT_STOP"; index: number; patch: Partial<GradientStop> }
  | { type: "PATCH_BUTTONS"; patch: Partial<ButtonTheme> }
  | { type: "PATCH_BUTTON_BACKGROUND"; patch: Partial<ButtonTheme["background"]> }
  | { type: "PATCH_BUTTON_BORDER"; patch: Partial<ButtonTheme["border"]> }
  | { type: "PATCH_BUTTON_SHADOW"; patch: Partial<NonNullable<ButtonTheme["shadow"]>> }
  | { type: "SET_BUTTON_SHADOW"; shadow: ButtonTheme["shadow"] }
  | { type: "PATCH_BUTTON_SIZE"; patch: Partial<ButtonTheme["size"]> }
  | { type: "PATCH_HEADING_FONT"; patch: Partial<FontSpec> }
  | { type: "PATCH_BODY_FONT"; patch: Partial<FontSpec> }
  | { type: "PATCH_LAYOUT"; patch: Partial<LayoutTheme> }
  | { type: "PATCH_AVATAR"; patch: Partial<LayoutTheme["avatar"]> }
  | { type: "LOAD_PRESET"; theme: Theme }
  | { type: "RESET" }
  | { type: "UNDO" }
  | { type: "REDO" };

export function initEditorState(theme: Theme): EditorState {
  return { initialTheme: theme, draftTheme: theme, past: [], future: [], lastPatch: null };
}

// ---------- per-subtree patch helpers: the only place that spreads Theme ----------

function patchBackground(theme: Theme, patch: Partial<BackgroundConfig>): Theme {
  return { ...theme, background: { ...theme.background, ...patch } as BackgroundConfig };
}

function patchBackgroundEffects(theme: Theme, patch: Partial<BackgroundEffects>): Theme {
  return {
    ...theme,
    background: { ...theme.background, effects: { ...theme.background.effects, ...patch } } as BackgroundConfig,
  };
}

function patchGradientStop(theme: Theme, index: number, patch: Partial<GradientStop>): Theme {
  if (theme.background.kind !== "gradient") return theme;
  const stops = theme.background.stops.map((stop, i) => (i === index ? { ...stop, ...patch } : stop));
  return { ...theme, background: { ...theme.background, stops } };
}

function patchButtons(theme: Theme, patch: Partial<ButtonTheme>): Theme {
  return { ...theme, buttons: { ...theme.buttons, ...patch } };
}

function patchButtonBackground(theme: Theme, patch: Partial<ButtonTheme["background"]>): Theme {
  return { ...theme, buttons: { ...theme.buttons, background: { ...theme.buttons.background, ...patch } } };
}

function patchButtonBorder(theme: Theme, patch: Partial<ButtonTheme["border"]>): Theme {
  return { ...theme, buttons: { ...theme.buttons, border: { ...theme.buttons.border, ...patch } } };
}

const DEFAULT_BUTTON_SHADOW: NonNullable<ButtonTheme["shadow"]> = { color: "#000000", blur: 12, spread: 0 };

function patchButtonShadow(theme: Theme, patch: Partial<NonNullable<ButtonTheme["shadow"]>>): Theme {
  return {
    ...theme,
    buttons: { ...theme.buttons, shadow: { ...(theme.buttons.shadow ?? DEFAULT_BUTTON_SHADOW), ...patch } },
  };
}

// Direct assignment, unlike patchButtonShadow's merge — needed so a button
// style can fully clear a shadow (Pill/Solid/Outline have none) rather than
// only ever adding fields to whatever shadow already existed.
function setButtonShadow(theme: Theme, shadow: ButtonTheme["shadow"]): Theme {
  return { ...theme, buttons: { ...theme.buttons, shadow } };
}

function patchButtonSize(theme: Theme, patch: Partial<ButtonTheme["size"]>): Theme {
  return { ...theme, buttons: { ...theme.buttons, size: { ...theme.buttons.size, ...patch } } };
}

function patchHeadingFont(theme: Theme, patch: Partial<FontSpec>): Theme {
  return { ...theme, typography: { ...theme.typography, heading: { ...theme.typography.heading, ...patch } } };
}

function patchBodyFont(theme: Theme, patch: Partial<FontSpec>): Theme {
  return { ...theme, typography: { ...theme.typography, body: { ...theme.typography.body, ...patch } } };
}

function patchLayout(theme: Theme, patch: Partial<LayoutTheme>): Theme {
  return { ...theme, layout: { ...theme.layout, ...patch } };
}

function patchAvatar(theme: Theme, patch: Partial<LayoutTheme["avatar"]>): Theme {
  return { ...theme, layout: { ...theme.layout, avatar: { ...theme.layout.avatar, ...patch } } };
}

// ---------- history ----------

// A single slider drag fires onChange continuously; without coalescing, one
// gesture would spam dozens of undo steps. Consecutive patches of the same
// action type within this window collapse into one history frame.
const COALESCE_WINDOW_MS = 400;

function pushHistory(state: EditorState, actionType: string): Pick<EditorState, "past" | "future" | "lastPatch"> {
  const now = Date.now();
  const coalesce = state.lastPatch?.type === actionType && now - state.lastPatch.time < COALESCE_WINDOW_MS;
  return {
    past: coalesce ? state.past : [...state.past, state.draftTheme],
    future: [],
    lastPatch: { type: actionType, time: now },
  };
}

function applyPatch(state: EditorState, actionType: string, nextTheme: Theme): EditorState {
  return { ...state, ...pushHistory(state, actionType), draftTheme: nextTheme };
}

// ---------- reducer ----------

export function themeEditorReducer(state: EditorState, action: ThemeEditorAction): EditorState {
  switch (action.type) {
    case "PATCH_BACKGROUND":
      return applyPatch(state, action.type, patchBackground(state.draftTheme, action.patch));
    case "SWITCH_BACKGROUND_KIND":
      return applyPatch(state, action.type, { ...state.draftTheme, background: action.background });
    case "PATCH_BACKGROUND_EFFECTS":
      return applyPatch(state, action.type, patchBackgroundEffects(state.draftTheme, action.patch));
    case "PATCH_GRADIENT_STOP":
      return applyPatch(state, action.type, patchGradientStop(state.draftTheme, action.index, action.patch));
    case "PATCH_BUTTONS":
      return applyPatch(state, action.type, patchButtons(state.draftTheme, action.patch));
    case "PATCH_BUTTON_BACKGROUND":
      return applyPatch(state, action.type, patchButtonBackground(state.draftTheme, action.patch));
    case "PATCH_BUTTON_BORDER":
      return applyPatch(state, action.type, patchButtonBorder(state.draftTheme, action.patch));
    case "PATCH_BUTTON_SHADOW":
      return applyPatch(state, action.type, patchButtonShadow(state.draftTheme, action.patch));
    case "SET_BUTTON_SHADOW":
      return applyPatch(state, action.type, setButtonShadow(state.draftTheme, action.shadow));
    case "PATCH_BUTTON_SIZE":
      return applyPatch(state, action.type, patchButtonSize(state.draftTheme, action.patch));
    case "PATCH_HEADING_FONT":
      return applyPatch(state, action.type, patchHeadingFont(state.draftTheme, action.patch));
    case "PATCH_BODY_FONT":
      return applyPatch(state, action.type, patchBodyFont(state.draftTheme, action.patch));
    case "PATCH_LAYOUT":
      return applyPatch(state, action.type, patchLayout(state.draftTheme, action.patch));
    case "PATCH_AVATAR":
      return applyPatch(state, action.type, patchAvatar(state.draftTheme, action.patch));
    case "LOAD_PRESET":
      return {
        ...state,
        draftTheme: action.theme,
        past: [...state.past, state.draftTheme],
        future: [],
        lastPatch: null,
      };
    case "RESET":
      return {
        ...state,
        draftTheme: state.initialTheme,
        past: [...state.past, state.draftTheme],
        future: [],
        lastPatch: null,
      };
    case "UNDO": {
      if (state.past.length === 0) return state;
      const previous = state.past[state.past.length - 1];
      return {
        ...state,
        draftTheme: previous,
        past: state.past.slice(0, -1),
        future: [state.draftTheme, ...state.future],
        lastPatch: null,
      };
    }
    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[0];
      return {
        ...state,
        draftTheme: next,
        past: [...state.past, state.draftTheme],
        future: state.future.slice(1),
        lastPatch: null,
      };
    }
  }
}
