/**
 * Self-hosted font for every troika/drei `<Text>` in the 3D stage.
 *
 * Without an explicit `font`, drei's `<Text>` suspends on troika's DEFAULT
 * font, which is fetched from a CDN at runtime (unicode-font-resolver on
 * cdn.jsdelivr.net). Offline, that fetch rejects and the Suspense boundary
 * around the whole canvas never resolves — the 3D stage freezes on the
 * previous scene or goes black. The deck must render identically with no
 * network in the room (see src/routes/__root.tsx), so the label font is
 * served from /public/fonts like the CSS fonts.
 *
 * troika-three-text parses .ttf/.otf/.woff only — NOT .woff2 — which is why
 * this file exists alongside the .woff2 files used by styles.css.
 *
 * GLYPH COVERAGE (2026-08-23 audit): troika falls back to the CDN PER GLYPH —
 * any codepoint missing from this font file re-triggers the jsdelivr fetch
 * even though the font itself is self-hosted. Outfit-Medium.ttf lacks the
 * notation used by the Ladder Operator scenes (subscripts U+2080-2099, ∀ ⇒ Δ
 * ∧ ≠ ⟺), so the deck now ships Outfit-Medium-Notation.ttf: Outfit Medium
 * with those glyphs merged in from Noto Sans / Noto Sans Math (both 1000 upem,
 * outlines verified). Outfit glyphs are byte-identical to the original.
 * If a FUTURE 3D label adds a codepoint outside this file's cmap, the CDN
 * fallback returns — check coverage with fontTools before adding notation.
 */
export const LABEL_FONT_URL = "/fonts/Outfit-Medium-Notation.ttf";
