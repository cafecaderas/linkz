"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";

// Data URL, not an object URL: it's a plain string that drops straight into
// Profile.avatarUrl and rides along in undo/redo snapshots with no lifecycle
// to manage (a blob URL would need explicit revocation that breaks if a
// past snapshot holding it is restored via Undo).
export function AvatarControl({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary user-uploaded data/remote URLs, not a next/image asset */}
      <img src={value} alt="Avatar preview" className="h-14 w-14 rounded-full object-cover" />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10"
      >
        <Upload size={14} />
        Upload image
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
