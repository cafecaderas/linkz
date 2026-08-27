import type { ReactNode } from "react";

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">{title}</h3>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
