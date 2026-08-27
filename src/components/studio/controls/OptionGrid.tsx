import type { ReactNode } from "react";

// The core "opinionated preset" picker: a small grid of visually-previewed
// cards, not a wall of raw parameters. Powers Vibe/Background/Typography/
// Button style — each just supplies a different `preview` node per option.
export function OptionGrid<T extends string>({
  label,
  value,
  options,
  onChange,
  columns = 2,
}: {
  label?: string;
  value: T;
  options: { value: T; label: string; preview: ReactNode }[];
  onChange: (value: T) => void;
  columns?: 1 | 2;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-white/80">{label}</span>}
      <div className={`grid gap-2 ${columns === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex flex-col gap-2 rounded-lg border p-2 text-left transition-colors ${
                selected ? "border-fuchsia-400 bg-fuchsia-500/10" : "border-white/10 bg-black/20 hover:border-white/25"
              }`}
            >
              {option.preview}
              <span className={`text-xs font-medium ${selected ? "text-white" : "text-white/70"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
