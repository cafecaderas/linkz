import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import type { Link } from "@/content/types";
import { ToggleControl } from "./ToggleControl";

export function LinkRow({
  link,
  isFirst,
  isLast,
  onPatch,
  onDelete,
  onToggle,
  onMove,
}: {
  link: Link;
  isFirst: boolean;
  isLast: boolean;
  onPatch: (patch: Partial<Pick<Link, "label" | "url">>) => void;
  onDelete: () => void;
  onToggle: () => void;
  onMove: (direction: "up" | "down") => void;
}) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/20 p-3">
      {/* Decorative — reordering is via the chevrons below, this is not a drag handle */}
      <GripVertical size={16} className="mt-2 shrink-0 text-white/25" aria-hidden="true" />

      <div className="flex flex-1 flex-col gap-2">
        <input
          value={link.label}
          onChange={(e) => onPatch({ label: e.target.value })}
          placeholder="Link title"
          className="rounded-md border border-white/10 bg-black/30 px-2 py-1.5 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-fuchsia-400"
        />
        <input
          value={link.url}
          onChange={(e) => onPatch({ url: e.target.value })}
          placeholder="https://"
          className="rounded-md border border-white/10 bg-black/30 px-2 py-1.5 font-mono text-xs text-white/60 focus:outline-none focus:ring-1 focus:ring-fuchsia-400"
        />
        <ToggleControl label="Visible" checked={link.enabled} onChange={onToggle} />
      </div>

      <div className="flex shrink-0 flex-col gap-1">
        <button
          type="button"
          onClick={() => onMove("up")}
          disabled={isFirst}
          className="rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
          aria-label="Move link up"
        >
          <ChevronUp size={16} />
        </button>
        <button
          type="button"
          onClick={() => onMove("down")}
          disabled={isLast}
          className="rounded-md p-1 text-white/60 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-25"
          aria-label="Move link down"
        >
          <ChevronDown size={16} />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md p-1 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-300"
          aria-label="Delete link"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
