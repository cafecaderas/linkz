export function SwatchRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string;
  value: T;
  options: { value: T; label: string; hex: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && <span className="text-sm text-white/80">{label}</span>}
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              title={option.label}
              aria-label={option.label}
              className={`h-8 w-8 rounded-full transition-transform ${
                selected ? "scale-110 ring-2 ring-white ring-offset-2 ring-offset-zinc-950" : "hover:scale-105"
              }`}
              style={{ backgroundColor: option.hex }}
            />
          );
        })}
      </div>
    </div>
  );
}
