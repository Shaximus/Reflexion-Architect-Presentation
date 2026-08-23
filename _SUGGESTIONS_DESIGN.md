# Design pass — optional suggestions (not applied)

These are optional, wording-level suggestions collected during the visual pass.
Nothing here was changed in the deck; all copy is verbatim as received.

## Layout-adjacent copy observations

1. **Scene 1 duplication.** The header shows "THE ARCHITECT" and the stage
   hero repeats the same act/quote content. Purely as composition, the title
   scene could give the stage quote the full frame (header suppressed on
   scene 1 only). No wording change — just where the same words appear.

2. **Long edge labels on graph scenes.** A few relationship labels
   ("precognition feeds translation…") get truncated at 2D graph scale.
   Shorter alternate labels (or a two-word form for the graph, with the full
   sentence kept in the Inspector's "Why connected" list, where it already
   appears in full) would remove every remaining truncation.

3. **"MOUNTING THE WORLD" loader.** It appears briefly when the 3D canvas
   lazy-loads. If a second variant is ever wanted for the church audience,
   something like "PREPARING THE STAGE" reads more neutrally on a projector —
   cosmetic only, current text works.

4. **Help overlay closing line.** "Sunday driver: arrows through the acts…"
   is presenter-facing shorthand. If the audience will ever see the help
   screen on the projector, consider whether that line is for them or for the
   operator. No change needed if the help screen stays presenter-only.

## Projection-day practical notes (not copy)

- Fonts are now self-hosted (`public/fonts` + `@font-face` in
  `src/styles.css`); the deck no longer needs internet for typography.
- The deck's root type scale is fluid (`clamp` on `html font-size`), tuned so
  1920×1080 projection lands at ~18px base. If the projector runs at
  1280×720, everything scales down proportionally and remains legible, but a
  quick on-site check of the evidence table from the back row is worth 30
  seconds.
- If the venue projector is low-contrast, raising the projector's brightness
  is preferable to lightening the theme; every text layer now sits at or
  above ~5:1 against the background, with body text above 7:1.
