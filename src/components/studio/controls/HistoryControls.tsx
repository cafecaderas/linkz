// Generic Undo/Redo/Reset row, reused by both the Theme and Content editors —
// StudioApp wires it to whichever reducer's callbacks match the active mode.
export function HistoryControls({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  resetLabel,
}: {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onUndo}
        disabled={!canUndo}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={onRedo}
        disabled={!canRedo}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Redo
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-red-500/20 hover:text-red-200"
      >
        {resetLabel}
      </button>
    </div>
  );
}
