# _SUGGESTIONS_3D.md — optional suggestions only

Everything in this file is an **optional suggestion**. Nothing here is required for the
2026-08-24 presentation; the fixes that were required are already applied (see the 3D
agent's report). No content/copy is discussed here — machinery only.

## 1. Dual source of truth: `src/presentation/engine/content.ts` vs `src/lib/presentation/scenes.ts`

These two files are **byte-identical** (same md5 as of 2026-08-22). Only the dead legacy
stack imports `src/lib/presentation/scenes.ts`:

- `src/components/presentation/Presentation.tsx`
- `src/components/presentation/Overlay.tsx`
- `src/components/presentation/world/CanvasScene.tsx`

None of those components are reachable from the live route (`src/routes/index.tsx` renders
`src/presentation/ui/Presentation.tsx`). The live tree only uses two files from the legacy
stack: `src/components/presentation/audio.ts` and `src/components/presentation/world/Starfield.tsx`.

**Recommended dedupe (in order of preference):**

1. Delete the dead legacy stack (`src/components/presentation/{Presentation,Overlay,Intro}.tsx`,
   `world/{CanvasScene,Visuals,CameraRig}.tsx`) together with `src/lib/presentation/`
   (`scenes.ts`, `store.ts`, `types.ts`), and move `audio.ts` + `world/Starfield.tsx` into
   `src/presentation/` so the old directory disappears entirely. One tree, one source of truth.
2. If deleting feels too aggressive two days before the presentation: change the three legacy
   imports to `@/presentation/engine/content` and delete `src/lib/presentation/scenes.ts` only.
   Zero runtime difference (the files are identical), and drift becomes impossible.

Either way, do it AFTER the 24th or behind a quick smoke test — it touches nothing the live
route renders, but the days before a presentation are the wrong time for tree surgery unless
someone is watching the result.

## 2. 3D label glyph coverage

3D labels now render from self-hosted `/fonts/Outfit-Medium.ttf`. The full offline sweep of
all 25 scenes attempted **zero** CDN fallback requests, so every glyph the deck currently
draws is covered. If future copy adds exotic glyphs to entity labels (e.g. `↔` U+2194 —
today it only appears in DOM text, never in 3D labels), troika will try its CDN fallback for
that one glyph and lose it when offline. Cheap guard if that ever matters: pass a
`characters` preload string, or keep 3D labels to Latin-1 punctuation.

## 3. Untracked work-in-progress modules

`src/presentation/visuals/three/camera.ts` (rich camera grammar) and
`materials.ts`/`semantic.tsx` (the KnowledgeNode/CausalLink vocabulary) exist but the scene
files still use `primitives.tsx` and the legacy `camera` tuple. That's fine — they are
additive — but they are currently **untracked in git**. Suggest committing them (and
`public/fonts/`) so the presentation machine's checkout actually contains them.

## 4. Present-day operational notes (not code changes)

- The dev harness injects `https://grok.com/grok-app-builder/extensions.js` in dev mode. It
  fails gracefully offline, but for the presentation prefer `npm run build` + `npm run preview`
  (or at least confirm the dev overlay 404 is silent on the venue network).
- Headless screenshot probes occasionally capture a single all-black frame
  (ReadPixels/compositor race, `preserveDrawingBuffer: false`). If anyone automates deck
  screenshots later, capture two frames apart and keep the non-black one; do not "fix" the
  app for this.
- `THREE.Clock` deprecation warning in the console comes from a dependency, is harmless, and
  is not worth chasing this week.
