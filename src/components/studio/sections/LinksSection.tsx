import { Plus } from "lucide-react";
import type { Dispatch } from "react";
import type { Profile } from "@/content/types";
import type { ContentEditorAction } from "@/content/profile-editor-reducer";
import { LinkRow } from "../controls/LinkRow";
import { SectionCard } from "../controls/SectionCard";

export function LinksSection({ profile, dispatch }: { profile: Profile; dispatch: Dispatch<ContentEditorAction> }) {
  const sorted = [...profile.links].sort((a, b) => a.order - b.order);

  return (
    <SectionCard title="Links">
      {sorted.map((link, index) => (
        <LinkRow
          key={link.id}
          link={link}
          isFirst={index === 0}
          isLast={index === sorted.length - 1}
          onPatch={(patch) => dispatch({ type: "PATCH_LINK", id: link.id, patch })}
          onDelete={() => dispatch({ type: "DELETE_LINK", id: link.id })}
          onToggle={() => dispatch({ type: "TOGGLE_LINK", id: link.id })}
          onMove={(direction) => dispatch({ type: "MOVE_LINK", id: link.id, direction })}
        />
      ))}

      <button
        type="button"
        onClick={() => dispatch({ type: "ADD_LINK" })}
        className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/20 py-2 text-sm text-white/60 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white/90"
      >
        <Plus size={16} />
        Add Link
      </button>
    </SectionCard>
  );
}
