import { ACCENT_HEX, type Entity } from "@/presentation/engine/types";
import { wrapText } from "./Graph";
import { AccentKicker, CardGrid, StatStrip } from "./Cards";

export function NestedShells({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const shells = [
    { id: entities.find((e) => e.id.includes("layer-11"))?.id, r: 44, accent: "#e94560", label: "L11 Substrate", sub: "Binary · 0 / 1" },
    { id: entities.find((e) => e.id.includes("layer-10"))?.id, r: 34, accent: "#e4c36b", label: "L10 Host", sub: "Admin / Creator" },
    { id: entities.find((e) => e.id.includes("l4"))?.id ?? "vm:l4", r: 24, accent: "#4ecdc4", label: "L4 Time", sub: "The player feeling time" },
    { id: entities.find((e) => e.id.includes("l3"))?.id ?? "vm:l3", r: 16, accent: "#00d4ff", label: "L3 Space", sub: "GPU · neurons · cabinet" },
    { id: entities.find((e) => e.id.includes("you-are-here"))?.id, r: 8, accent: "#f3efe6", label: "You", sub: "Earth = the game" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      <text x="88" y="12" textAnchor="end" fill="#9a958c" fontSize="2.4" fontFamily="Outfit, sans-serif">
        isolate a layer
      </text>
      {shells.map((s, i) => {
        const selected = selectedId === s.id;
        const dim = Boolean(selectedId && !selected);
        return (
          <g
            key={s.label}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={s.label}
            opacity={dim ? 0.12 : 1}
            onClick={(ev) => {
              ev.stopPropagation();
              s.id && onSelect(selected ? null : s.id);
            }}
          >
            <circle
              cx="42"
              cy="52"
              r={selected ? s.r + 1.2 : s.r}
              fill={`${s.accent}${selected ? "28" : "14"}`}
              stroke={s.accent}
              strokeWidth={selected ? 1.05 : 0.38}
            />
            <text x="42" y={52 - s.r + 5} textAnchor="middle" fill={s.accent} fontSize="2.6" fontFamily="Outfit, sans-serif">
              {s.label}
            </text>
            {selected && (
              <text x="42" y={52 - s.r + 8.4} textAnchor="middle" fill="#9a958c" fontSize="2.1" fontFamily="Outfit, sans-serif">
                {s.sub}
              </text>
            )}
            {i === shells.length - 1 && <circle cx="42" cy="52" r="2.4" fill="#e94560" />}
          </g>
        );
      })}
      <text x="88" y="92" textAnchor="end" fill="#5c5852" fontSize="2.2" fontFamily="Outfit, sans-serif">
        host contains guest
      </text>
    </svg>
  );
}

export function FusionFields({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const sky = entities.find((e) => e.id.includes("instinct"));
  const earth = entities.find((e) => e.id.includes("ego"));
  const vegito = entities.find((e) => e.id.includes("vegito"));
  const game = entities.find((e) => e.id.includes("earth-as-the-game"));
  const field = (id: string | undefined, x: number, y: number, w: number, h: number, fill: string, label: string, sub?: string) => {
    const selected = selectedId === id;
    const dim = Boolean(selectedId && !selected);
    return (
      <g
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={label}
        opacity={dim ? 0.16 : 1}
        onClick={(ev) => {
          ev.stopPropagation();
          id && onSelect(selected ? null : id);
        }}
      >
        <rect x={x} y={y} width={w} height={h} rx="2.4" fill={`${fill}1c`} stroke={fill} strokeWidth={selected ? 0.85 : 0.32} />
        {wrapText(label, 22).map((ln, i) => (
          <text
            key={ln}
            x={x + w / 2}
            y={y + h / 2 - (sub ? 1.6 : (wrapText(label, 22).length - 1) * 1.6) + i * 3.2}
            textAnchor="middle"
            fill="#f3efe6"
            fontSize="2.8"
            fontFamily="Cinzel, serif"
          >
            {ln}
          </text>
        ))}
        {sub && (
          <text x={x + w / 2} y={y + h / 2 + 3.2} textAnchor="middle" fill="#9a958c" fontSize="2.2" fontFamily="Outfit, sans-serif">
            {sub}
          </text>
        )}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      <text x="50" y="7" textAnchor="middle" fill="#4ecdc4" fontSize="2.4" fontFamily="Outfit, sans-serif">
        SKY — ONENESS — HOST
      </text>
      {field(sky?.id, 8, 10, 84, 22, "#4ecdc4", sky?.label ?? "Ultra Instinct", sky?.subtitle)}
      {field(vegito?.id, 22, 36, 56, 22, "#e4c36b", vegito?.label ?? "VEGITO", "interference zone")}
      {field(earth?.id, 8, 62, 84, 20, "#e94560", earth?.label ?? "Ultra Ego", earth?.subtitle)}
      {game && field(game.id, 22, 85, 56, 10, "#9d4edd", "Earth as the Game")}
      <text x="50" y="99" textAnchor="middle" fill="#e94560" fontSize="2.2" fontFamily="Outfit, sans-serif">
        EARTH — WILL — GUEST
      </text>
    </svg>
  );
}

export function EarthBoard({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const arena = entities.find((e) => e.id.includes("arena"));
  const ego = entities.find((e) => e.id.includes("ego"));
  const instinct = entities.find((e) => e.id.includes("instinct"));
  const bridge = entities.find((e) => e.id.includes("bridge"));
  const cell = (id: string | undefined, x: number, y: number, w: number, h: number, fill: string, label: string, sub?: string) => {
    const selected = selectedId === id;
    const dim = Boolean(selectedId && !selected);
    return (
      <g
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={label}
        opacity={dim ? 0.16 : 1}
        onClick={(ev) => {
          ev.stopPropagation();
          id && onSelect(selected ? null : id);
        }}
      >
        <rect x={x} y={y} width={w} height={h} rx="2.2" fill={`${fill}1a`} stroke={fill} strokeWidth={selected ? 0.85 : 0.32} />
        <text x={x + w / 2} y={y + h / 2 - 1} textAnchor="middle" fill="#f3efe6" fontSize="3" fontFamily="Cinzel, serif">
          {label}
        </text>
        {sub && (
          <text x={x + w / 2} y={y + h / 2 + 3.4} textAnchor="middle" fill="#9a958c" fontSize="2.1" fontFamily="Outfit, sans-serif">
            {sub}
          </text>
        )}
      </g>
    );
  };
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      {cell(instinct?.id, 8, 6, 84, 20, "#e4c36b", "Ultra Instinct — Sky", "Goku · Oneness · Host")}
      {cell(bridge?.id, 34, 30, 32, 14, "#9d4edd", "Bridge", "game skill ↔ life skill")}
      {cell(arena?.id, 8, 48, 84, 22, "#4ecdc4", "The Arena", "Earth = the proving ground")}
      {cell(ego?.id, 8, 74, 84, 20, "#e94560", "Ultra Ego — Earth", "Vegeta · Will · Guest")}
    </svg>
  );
}

export function RefereeBoard({
  selectedId,
  onSelect,
  entities,
}: {
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  entities: Entity[];
}) {
  const finding = selectedId?.includes("worthy")
    ? "worthy"
    : selectedId?.includes("unworthy")
      ? "unworthy"
      : selectedId?.includes("integrity")
        ? "breach"
        : null;
  const findings = entities.filter((e) => e.group !== "row");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      <rect x="6" y="6" width="88" height="58" rx="2.2" fill="#101014" stroke="#2a2a33" />
      <text x="50" y="13" textAnchor="middle" fill="#9a958c" fontSize="2.2" fontFamily="Outfit, sans-serif">
        world boundary
      </text>
      <path
        d="M14 56 L38 20 L68 38 L90 16"
        fill="none"
        stroke="#3dcc6d"
        strokeWidth={finding === "worthy" ? 1.3 : 0.28}
        opacity={finding && finding !== "worthy" ? 0.12 : 1}
      />
      <path
        d="M14 16 L46 46 L90 56"
        fill="none"
        stroke="#e4c36b"
        strokeWidth={finding === "unworthy" ? 1.3 : 0.28}
        strokeDasharray="1.6 1.3"
        opacity={finding && finding !== "unworthy" ? 0.12 : 1}
      />
      <circle cx="20" cy="50" r="3.4" fill="#e94560" />
      <text x="20" y="58.5" textAnchor="middle" fill="#f3efe6" fontSize="2.2">
        Actor
      </text>
      <circle cx="82" cy="20" r="3.4" fill="#4ecdc4" />
      <text x="82" y="28.5" textAnchor="middle" fill="#f3efe6" fontSize="2.2">
        Objective
      </text>
      <rect
        x="42"
        y="28"
        width="16"
        height="16"
        fill={finding === "breach" ? "#e94560" : "#18181f"}
        stroke="#e4c36b"
        strokeWidth="0.45"
        opacity={finding === "breach" ? 1 : 0.55}
      />
      <text x="50" y="37.6" textAnchor="middle" fill="#e4c36b" fontSize="2.1">
        {finding === "breach" ? "FREEZE" : "ZONE"}
      </text>
      {finding === "unworthy" && (
        <text x="50" y="61" textAnchor="middle" fill="#e4c36b" fontSize="2.4" fontFamily="Outfit, sans-serif">
          repositioned — advantage stripped
        </text>
      )}
      {finding === "worthy" && (
        <text x="50" y="61" textAnchor="middle" fill="#3dcc6d" fontSize="2.4" fontFamily="Outfit, sans-serif">
          permitted path — ingenuity held
        </text>
      )}
      {finding === "breach" && (
        <text x="50" y="61" textAnchor="middle" fill="#e94560" fontSize="2.4" fontFamily="Outfit, sans-serif">
          contest frozen — receipts preserved
        </text>
      )}
      {findings.map((e, i) => {
        const x = 6 + i * 31.5;
        const selected = selectedId === e.id;
        return (
          <g
            key={e.id}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={e.label}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect(selected ? null : e.id);
            }}
          >
            <rect
              x={x}
              y="70"
              width="29.5"
              height="24"
              rx="1.8"
              fill="#101014"
              stroke={ACCENT_HEX[e.accent]}
              strokeWidth={selected ? 0.75 : 0.32}
            />
            <text x={x + 14.75} y="80" textAnchor="middle" fill="#f3efe6" fontSize="2.4" fontFamily="Cinzel, serif">
              {e.label}
            </text>
            <text x={x + 14.75} y="86.5" textAnchor="middle" fill="#9a958c" fontSize="2" fontFamily="Outfit, sans-serif">
              {e.accent === "green" ? "permit" : e.accent === "gold" ? "correct" : "invalidate"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function LodPyramid({
  entities,
  selectedId,
  onSelect,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}) {
  const ordered = ["dormant", "scripted", "alert", "engaged", "coordinated", "apex"]
    .map((k) => entities.find((t) => t.id.includes(k)))
    .filter(Boolean) as Entity[];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" onClick={() => onSelect(null)}>
      <text x="50" y="8" textAnchor="middle" fill="#9a958c" fontSize="2.4" fontFamily="Outfit, sans-serif">
        cost rises with height — camouflage is the trick
      </text>
      {ordered.map((t, i) => {
        const w = 74 - i * 9;
        const y = 84 - i * 13;
        const x = 50 - w / 2;
        const selected = selectedId === t.id;
        const dim = Boolean(selectedId && !selected);
        return (
          <g
            key={t.id}
            className="cursor-pointer"
            opacity={dim ? 0.18 : 1}
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect(selected ? null : t.id);
            }}
          >
            <rect
              x={x}
              y={y}
              width={w}
              height="11"
              rx="1"
              fill={`${ACCENT_HEX[t.accent]}24`}
              stroke={ACCENT_HEX[t.accent]}
              strokeWidth={selected ? 0.75 : 0.32}
            />
            <text x="50" y={y + 7.2} textAnchor="middle" fill="#f3efe6" fontSize="2.6" fontFamily="Outfit, sans-serif">
              {t.label}
              {t.subtitle ? `  ·  ${t.subtitle}` : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CharacterSheet({
  entities,
  selectedId,
  onSelect,
  present,
}: {
  entities: Entity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  present?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-auto p-1 sm:gap-4 sm:p-2">
      <StatStrip entities={entities} selectedId={selectedId} onSelect={onSelect} />
      <div className="min-h-0 flex-1">
        <CardGrid entities={entities} selectedId={selectedId} onSelect={onSelect} present={present} columns={2} />
      </div>
    </div>
  );
}

export { AccentKicker };
