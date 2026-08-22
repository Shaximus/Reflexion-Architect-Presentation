import { entityById, getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";

export function SourceDrawer() {
  const open = useDeck((s) => s.sourceOpen);
  const close = useDeck((s) => s.closeDrawers);
  const index = useDeck((s) => s.index);
  const selectedId = useDeck((s) => s.selectedEntityId);
  if (!open) return null;
  const model = getModel(index);
  const selected = entityById(model, selectedId);
  const sources = (selectedId && model.sources[selectedId]) || [];
  const fallback = index <= 15 ? `/sources/slide-${String(index + 1).padStart(2, "0")}.png` : undefined;

  return (
    <div data-hud className="pointer-events-auto absolute inset-0 z-30 flex justify-end bg-void/70 backdrop-blur-sm">
      <div
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-surface p-6 sm:p-8"
        style={{ touchAction: "pan-y" }}
        role="dialog"
        aria-label="Source"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-gold uppercase">Layer 3 · Source</p>
            <h2 className="mt-2 font-display text-2xl tracking-wide">{selected?.label ?? model.title}</h2>
          </div>
          <button type="button" onClick={close} className="min-h-11 text-sm text-muted hover:text-fg">
            Close
          </button>
        </div>
        {sources.length === 0 && !fallback && (
          <p className="text-base text-muted">No excerpt is attached to this node. The Layer 1 wording is the claim.</p>
        )}
        <div className="space-y-8">
          {sources.map((s) => (
            <article key={`${s.title}-${s.section ?? ""}`} className="rounded-2xl border border-border bg-raised p-5">
              <p className="font-display text-lg text-fg">{s.title}</p>
              {s.section && <p className="mt-1 font-mono text-xs tracking-wide text-gold">{s.section}</p>}
              <blockquote className="mt-4 text-base leading-relaxed text-fg/90 italic">“{s.excerpt}”</blockquote>
              {s.why && <p className="mt-3 text-sm text-muted">{s.why}</p>}
              {s.artifact && (
                <img
                  src={s.artifact}
                  alt={s.title}
                  className="mt-4 w-full rounded-xl border border-border"
                  crossOrigin="anonymous"
                />
              )}
            </article>
          ))}
          {fallback && sources.every((s) => s.artifact !== fallback) && (
            <article className="rounded-2xl border border-border bg-raised p-5">
              <p className="font-display text-lg">Original slide artifact</p>
              <p className="mt-1 text-sm text-muted">Retained as provenance. The interactive stage is the reconstruction.</p>
              <img
                src={fallback}
                alt={`${model.title} original slide`}
                className="mt-4 w-full rounded-xl border border-border"
                crossOrigin="anonymous"
              />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
