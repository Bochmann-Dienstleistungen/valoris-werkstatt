---
name: morph-hero
description: Scroll-Morph-Hero — vollflächiger Medien-Header (Foto ODER Video) zoomt/morpht beim Scrollen in eine gerundete, „angedockte" Karte, während sich der Seiteninhalt darunter formt. Verifiziert 14.06.2026 (Schiwig Objektseiten). Nutzen bei PREMIUM-Builds als Hero-Option, „Zoom-Effekt", „Video-Header der reinmorpht", Detail-/Objekt-/Produktseiten. Funktioniert ohne freigestellte Assets — anders als cinematic-hero (4-Layer-Foto-Mechanik).
---

# Morph-Hero (Scroll-Zoom-Dock)

**Was es ist:** Ein vollflächiger Medien-Header (Foto oder Video) liegt zu Beginn randlos
über dem Viewport. Beim Scrollen **schrumpft + rundet** er sich zu einer schwebenden Karte
(„dockt in die Seite"), während der Overlay-Titel weghebt und der eigentliche Seiteninhalt
darunter hochkommt und sich um die Karte formt. Frederic-Liebling für Objektseiten — als
Effekt-Option für PREMIUM markiert (14.06.2026).

**Abgrenzung:** NICHT der `cinematic-hero` (das ist die 4-Foto-Layer-findrealestate-Mechanik
mit freigestelltem Subjekt + Wortmarke). Morph-Hero braucht KEIN Cutout, KEINE Wolken,
kein Higgsfield-Asset — ein einziges Foto oder ein Walkthrough-Video reicht. Beide nutzen
dieselbe Lenis+ScrollTrigger-Basis.

**Wann einsetzen:** PREMIUM optional (bei jedem Premium-Build als Variante anbieten).
Ideal für Detailseiten mit EINEM starken Medium: Immobilien-Objekt, Produkt, Gericht,
Projekt-Case, Fahrzeug. Bei Immobilien Walkthrough-Video im Header → siehe
`reference_immo_walkthrough_pipeline` (Higgsfield Kling 3.0).

---

## Referenz-Implementierung

`~/.claude/skills/morph-hero/reference.html` — self-contained, klonbar, verifiziert.
Live-Beispiel mit Video: `~/output/schiwig-objektsuche/objekt.html`.

## Skelett

```
section.hero-root   → height:210vh; position:relative          (Scroll-Distanz für den Morph)
  div.hero-stage    → position:sticky; top:0; height:100vh; overflow:hidden; bg:paper
    div.media-wrap  → position:absolute; inset:0; border-radius:0
                      background:<foto> center/cover  ← IMMER setzen (Poster-Fallback!)
      video|img     → object-fit:cover (Video legt sich übers Hintergrundfoto)
      ::after       → dunkler Verlauf für Text-Lesbarkeit
    .hero-overlay   → z-index:3; color:#fff; Titel/Preis (will-change:transform,opacity)
    .scrollcue
main.content        → margin-top:-12vh; border-radius:28px 28px 0 0; bg:paper; z-index:5
```

## Scroll-Timeline (exakt, verifiziert)

```js
const tl = gsap.timeline();
tl.to('#mediaWrap', {borderRadius:28, scale:.78, duration:1, ease:'none'}, 0)  // Zoom+Dock
  .to('#heroOverlay', {yPercent:-30, opacity:0, duration:.6, ease:'none'}, 0)  // Titel hebt weg
  .to('#scrollcue',  {opacity:0, duration:.2}, 0);
ScrollTrigger.create({trigger:'#heroRoot', start:'top top', end:'bottom bottom', scrub:.1, animation:tl});
```

- `scrub:.1` (NICHT 1 — träge), `ease:'none'` auf den scrub-getriebenen Tweens.
- `transform-origin` der media-wrap default center → zoomt mittig. Für „nach oben docken"
  optional `transformOrigin:'top center'`.
- Inhalt-Reveals separat: pro `.reveal` ein ScrollTrigger `onEnter:add('in')` + 1,8s-Failsafe.

## CDN-Stack

```html
<script src="https://unpkg.com/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
```
Lenis-Kopplung: `lenis.on('scroll',ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`

## ⚠️ Zwei harte Fallen (kosten sonst die ganze Seite)

1. **NIE eine Top-Level-Variable `l` deklarieren.** GSAP/Lenis belegen global ein `l` →
   `const l = …` wirft „Identifier 'l' already declared" und das KOMPLETTE Inline-Script
   bricht ab (kein Titel, kein Foto, kein Effekt). Sprechende Namen nutzen (`obj`, `item`).
2. **Video-`poster` rendert nicht zuverlässig.** Das Hero-Foto IMMER zusätzlich als
   CSS `background-image` auf `.media-wrap` setzen — dann ist auch vor/ohne Videostart
   ein Bild da, und weißer Titel steht nie auf Weiß.

## Pflicht-Regeln

- `prefers-reduced-motion`: Hero auf statisch (`hero-root height:auto`, stage `position:relative` ~90vh),
  alle `.reveal` sichtbar, keine Timeline. Block ist im Template.
- KEIN Custom Cursor (globale Regel). Assets lokal, kein Hotlinking.
- **Verifizieren mit Scroll-Phasen** — Chrome-Einzelscreenshot reicht NICHT. No-Dependency-
  CDP-Skript (Node 24 built-in WebSocket → Chrome `--remote-debugging-port=9222`,
  Phasen bei 0/33/66/100% Scroll): Vorlage `~/output/schiwig-objektsuche` bzw. `/tmp/cdp-phases.mjs`.

## Drop-in-Rezept für einen PREMIUM-Build

1. `reference.html` kopieren, Markenfarben/Fonts an den Kunden anpassen.
2. `.media-wrap` background-image = bestes Foto; bei Video zusätzlich `<video autoplay muted loop playsinline>`.
3. Overlay-Texte + Content-Sektionen befüllen.
4. Timeline-Werte sind gut so; nur `scale` (0.7–0.82) und `hero-root height` (180–230vh)
   justieren, wenn der Morph kürzer/länger laufen soll.
5. Phasen-Screenshots schießen, prüfen, ausliefern.
