export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-sm text-white/80">
      {label && <span>{label}</span>}
      <div className="flex overflow-hidden rounded-md border border-white/15">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 px-2 py-1.5 text-xs font-medium transition-colors ${
              option.value === value
                ? "bg-fuchsia-500 text-white"
                : "bg-black/30 text-white/60 hover:bg-white/10"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
