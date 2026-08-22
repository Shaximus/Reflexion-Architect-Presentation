export function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="sacred-ring size-[20rem] sm:size-[32rem]" />
        <div className="sacred-ring sacred-ring-rev absolute size-[14rem] border-teal/30 sm:size-[23rem]" />
        <div className="sacred-ring absolute size-[9rem] border-crimson/50 sm:size-[14rem]" />
        <div className="absolute size-5 rounded-full bg-crimson shadow-[0_0_50px_#e94560]" />
      </div>

      <div className="relative z-10 max-w-xl">
        <p className="font-mono text-xs tracking-[0.35em] text-gold uppercase">
          Hillsborough Baptist Church · August 24, 2026
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none font-semibold tracking-[0.12em] text-crimson sm:text-7xl">
          THE ARCHITECT
        </h1>
        <p className="mt-5 text-base text-muted italic sm:text-lg">“All complexity is just binary wearing costumes.”</p>
        <p className="mt-3 text-sm tracking-wide text-dim">Curtis Kingsley (Shax) · Reflexion Software · The Pentarchy</p>
        <button
          type="button"
          onClick={onEnter}
          className="mt-10 min-h-12 rounded-full border border-gold/60 bg-gold/10 px-8 text-sm tracking-[0.22em] text-gold uppercase hover:bg-gold/20"
        >
          Enter the Substrate
        </button>
        <p className="mt-4 text-sm text-dim">Arrows travel · V toggles 3D/2D · click a relic · E explores · ? for the guide</p>
      </div>
    </div>
  );
}
