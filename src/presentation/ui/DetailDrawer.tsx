import { entityById, getModel } from "@/presentation/engine/enrich";
import { useDeck } from "@/presentation/engine/store";
import { ACCENT_HEX } from "@/presentation/engine/types";

export function DetailDrawer() {
  const open = useDeck((s) => s.detailOpen);
  const close = useDeck((s) => s.closeDrawers);
  const index = useDeck((s) => s.index);
  const selectedId = useDeck((s) => s.selectedEntityId);
  const selectEntity = useDeck((s) => s.selectEntity);
  const openSource = useDeck((s) => s.openSource);
  if (!open) return null;
  const model = getModel(index);
  const selected = entityById(model, selectedId);
  if (!selected) return null;
  const detail = selectedId ? model.details[selectedId] : undefined;
  const hasSource = Boolean(selectedId && model.sources[selectedId]?.length);
  const related = model.edges.filter((e) => e.from === selected.id || e.to === selected.id);

  return (
    <div data-hud className="pointer-events-auto absolute inset-0 z-30 flex justify-end bg-void/70 backdrop-blur-sm">
      <div
        className="flex h-full w-full max-w-xl flex-col overflow-y-auto border-l border-border bg-surface p-6 sm:p-8"
        style={{ touchAction: "pan-y" }}
        role="dialog"
        aria-label="Deep dive"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: ACCENT_HEX[selected.accent] }}>
              Layer 2 · Machine open
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-wide">{selected.label}</h2>
            {selected.subtitle && <p className="mt-1 text-base text-muted">{selected.subtitle}</p>}
          </div>
          <button type="button" onClick={close} className="min-h-11 text-sm text-muted hover:text-fg">
            Close
          </button>
        </div>
        <section className="space-y-6 text-base leading-relaxed">
          {detail?.overview && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Overview</h3>
              <p className="mt-2 text-fg/90">{detail.overview}</p>
            </div>
          )}
          {detail?.sections?.map((sec) => (
            <div key={sec.heading}>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">{sec.heading}</h3>
              <p className="mt-2 text-fg/90">{sec.body}</p>
            </div>
          ))}
          <div>
            <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Mechanism</h3>
            <p className="mt-2 text-fg/90">{detail?.mechanism ?? selected.summary.join(" ")}</p>
          </div>
          {detail?.structure && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Structure</h3>
              <p className="mt-2 text-fg/90">{detail.structure}</p>
            </div>
          )}
          {detail?.causeEffect && detail.causeEffect.length > 0 && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Cause → Effect</h3>
              <ul className="mt-2 space-y-2">
                {detail.causeEffect.map((line) => (
                  <li key={line} className="text-fg/90">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detail?.examples && detail.examples.length > 0 && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Examples</h3>
              <ul className="mt-2 space-y-2">
                {detail.examples.map((line) => {
                  const parts = line.split("↔").map((s) => s.trim());
                  if (parts.length === 2) {
                    return (
                      <li key={line} className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-2 text-fg/90">
                        <span>{parts[0]}</span>
                        <span className="font-mono text-xs text-gold">↔</span>
                        <span>{parts[1]}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={line} className="text-fg/90">
                      {line}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {detail?.implications && detail.implications.length > 0 && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Implications</h3>
              <ul className="mt-2 space-y-2">
                {detail.implications.map((line) => (
                  <li key={line} className="text-fg/90">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selected.summary.length > 0 && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Layer 1</h3>
              <ul className="mt-2 space-y-2">
                {selected.summary.map((line) => (
                  <li key={line} className="text-fg/90">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detail?.residual && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-crimson uppercase">Boundary / residual</h3>
              <p className="mt-2 text-fg/90">{detail.residual}</p>
            </div>
          )}
          {detail?.currentStatus && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-teal uppercase">Status</h3>
              <p className="mt-2 font-mono text-sm text-fg/90">{detail.currentStatus}</p>
            </div>
          )}
          {related.length > 0 && (
            <div>
              <h3 className="font-mono text-xs tracking-[0.16em] text-gold uppercase">Related</h3>
              <ul className="mt-2 space-y-2">
                {related.map((e) => {
                  const otherId = e.from === selected.id ? e.to : e.from;
                  const other = entityById(model, otherId);
                  return (
                    <li key={`${e.from}-${e.to}`}>
                      <button type="button" className="text-left text-gold hover:underline" onClick={() => selectEntity(otherId)}>
                        {other?.label ?? otherId}
                      </button>
                      <span className="text-muted"> — {e.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
        {hasSource && (
          <button
            type="button"
            onClick={openSource}
            className="mt-8 min-h-11 self-start rounded-full border border-gold/50 bg-gold/10 px-4 text-sm text-gold"
          >
            Open source excerpt
          </button>
        )}
      </div>
    </div>
  );
}
