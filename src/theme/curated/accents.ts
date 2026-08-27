export interface AccentColor {
  id: string;
  label: string;
  hex: string;
}

// Deliberately narrow scope: an accent only ever recolors the button
// border and (if present) the button glow/shadow — see AccentSection.tsx.
// It does not try to retint backgrounds or text; those are Background's
// and Typography's job.
export const ACCENT_COLORS: AccentColor[] = [
  { id: "fuchsia", label: "Fuchsia", hex: "#ff2fb0" },
  { id: "cyan", label: "Cyan", hex: "#22d3ee" },
  { id: "amber", label: "Amber", hex: "#f5a524" },
  { id: "emerald", label: "Emerald", hex: "#22c55e" },
  { id: "violet", label: "Violet", hex: "#8b5cf6" },
  { id: "rose", label: "Rose", hex: "#fb7185" },
  { id: "gold", label: "Gold", hex: "#c9a227" },
  { id: "slate", label: "Slate", hex: "#94a3b8" },
];
