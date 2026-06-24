---
name: cinematic-hero
description: Cinematischer Layer-Hero nach findrealestate.com-Mechanik (dekodiert 12.06.2026) — Subjekt wächst aus Nebel, Wolken teilen sich, Wortmarke wird gezeichnet, dann erscheint das Subjekt IN den Buchstaben. Nutzen bei PREMIUM/ULTRA-Builds, Hero-Sections, "cinematic", "3D-Scroll-Hero", "wie findrealestate", Branchen-Showcases. Enthält komplette Asset-Pipeline (Higgsfield + Vision-Cutout + Luminanz-Alpha).
---

# Cinematic Layer-Hero (findrealestate-Mechanik)

**Was es ist:** Der virale „3D-Scroll-Hero" ist KEIN Video und kein 3D — vier Foto-Layer
plus eine präzise GSAP-Timeline. Mechanik 1:1 aus dem minifizierten Next.js-Build von
findrealestate.com dekompiliert und in `~/output/schiwig-parallax-test/hero-v2.html`
verifiziert (Referenz-Implementierung, von dort klonen!).

**Wann einsetzen:** PREMIUM optional, ULTRA Pflicht-Kandidat. Immer wenn ein Kunde EIN
ikonisches Subjekt hat (Gebäude, Signature-Gericht, Produkt, Fahrzeug, Maschine).
Branchen-Showcases: `~/output/cinematic-heroes/` (Galerie, pro Branche ein fertiger Klon).

---

## Die 4 Layer

| Layer | Inhalt | Format |
|---|---|---|
| `back.jpg` | Himmel/Atmosphäre-Backplate | JPEG, cover |
| `house.png` | Freigestelltes Subjekt | PNG RGBA, unten beschnitten ok (Nebel verdeckt) |
| `cloud.png` | **Branchen-Eyecatcher** (s.u.) | PNG + Alpha |
| `smoke.png` | Nebel-/Haze-Band unten | PNG + Alpha, oben auslaufend |

## Branchen-Eyecatcher (PFLICHT — Frederic-Regel 12.06.2026)

**NIE einfach Wolken für jede Branche.** Der cloud/smoke-Layer ist das Markenzeichen
und muss zur Branche erzählen. Generator: `~/output/cinematic-heroes/_shared/make-atmosphere.js`
(Tint-Funktion für Umfärbungen + prozedurale SVG-Layer). Bewährte Zuordnung:

| Branche | cloud-Layer | smoke-Layer |
|---|---|---|
| Immobilien/Bau | echte Wolken (weiß) | Nebel (weiß) |
| Handwerk | Sägestaub-Wolke (gold getintet #c9914f) | Goldstaub-Haze #d9b078 |
| Gastronomie | Dampfschwaden (weiß, alpha ×0.8) | Tellerdampf (weiß) |
| Reinigung/Service | Seifenblasen (prozedural SVG: Rim+Highlight) | Schaum-Haze #e9fbfd |
| Einzelhandel | goldenes Bokeh (prozedural, blur 9) | warmer Haze #f0d6ad |
| Neue Branche | erst fragen: „Was fliegt/schwebt in dieser Welt?" — Funken (Metallbau), Blütenblätter (Friseur/Floristik), Konfetti (Events), Schnee (Winterdienst) | passend getinteter Haze |

Monochrome Elemente (Staub, Dampf, Schaum, Licht): Higgsfield „weiß auf schwarz" →
lum-alpha → tint. Farbige/strukturierte (Blüten, Funken, Konfetti): Higgsfield auf
schwarz → Vision-Cutout, ODER prozedural als SVG wenn geometrisch (Bokeh, Blasen).

**Logo-Intro-Variante (statt Scroll-Hero):** Loader im Fleischi-Muster — Subjekt zentral
(droppt/schwebt rein), fallende Branchen-Partikel via Web Animations API (rotierend, mit
`.onfinish=fall` als Endlos-Loop), Logo-Block (eyebrow + Char-Flip-Wortmarke + Shimmer-Sweep
+ Sub), Progress-Bar, Replay-Button, 3D-Tilt auf mousemove, Auto-Loop alle ~5,5 s mit
`enterSite`-Exit. Referenzen: `~/output/derfleischi/loader.html` (Würste an Stange),
`~/output/cinematic-heroes/beauty/` (LUMIÈRE: Rosenblätter+Goldstaub+Serumflasche, Rosé/Gold)
und `friseur/` (COIFFEUR: Schere mit Glint-Sweep über Mask-Silhouette + fallende Haarschnipsel,
Honig/Gold). Subjekt kann Higgsfield-Foto-Cutout ODER hochwertiges Inline-SVG sein (bei kurzem
Intro auf dunklem Grund reicht SVG und wirkt „designed"). Eyecatcher-Assets prozedural:
`_shared/make-beauty-salon.js` (gold-dust, rose-petal, hair-clip ×3).
**Hintergrund (optional, gibt Tiefe):** Higgsfield-Bokeh-Standbild (`assets/bg.jpg`),
stark geblurrt + abgedunkelt (sharp blur 8 + brightness .5–.62), als `.bgmedia`-Layer ganz
hinten mit CSS Ken-Burns-Drift (scale 1.06→1.16 + translate, ~26s alternate) und dunklem
Radial+Linear-Overlay für Lesbarkeit. **Higgsfield-VIDEO geht NICHT auf Starter-Plan**
(„Requires plus plan or higher") → Bild + Ken-Burns statt Video; wirkt für Bokeh ohnehin
dezenter. Glint-Maske beim Foto-Subjekt = `url(assets/<subjekt>.png)` (Alpha maskiert den
Sweep auf die Silhouette). KI-Produktfotos erfinden gern Labels (z.B. Serumflasche „AURA
ESSENCE") — bei echtem Kunden labelfrei nachgenerieren oder mit Kundenmarke.

**Ambient-Engine (im Template enthalten):** `const AMBIENT = 'clouds'|'sawdust'|'steam'|'bubbles'|'bokeh'`
— spawnt DOM-Partikel mit GSAP-Loops (Blasen steigen einzeln, Bokeh twinkelt, Staub
rieselt diagonal, Dampfschwaden ziehen hoch) + Layer-Drift. WICHTIG: Drift animiert die
INNEREN `img`-Elemente, die Scroll-Timeline die Wrapper-Divs — sonst Property-Konflikt
auf `x`. Partikel-Container `.ambient` liegt z-index 2, pointer-events:none. Alles im
prefers-reduced-motion-Guard. Neue Branche = neuer AMBIENT-Typ im Template + Zeile in
build.js (`ambient: '...'`).

## Layout-Skelett

```
section.hero-root   → height:500vh; margin-bottom:-100vh; visibility:hidden (Intro blendet ein)
  div.hero-top      → position:sticky; top:0; height:100vh
    .back .house .composite(.house-Kopie) .clouds(.cloud×2) .logo(SVG) .smoke
    .content (Headline/Sub/CTA)
  div.hero-bottom .overlap → zweiter Nebel + Verlauf in Folge-Sektion
```

- Subjekt: `top:60–72vh`, `transform-origin:bottom center` — ragt unten aus dem Viewport,
  nur die Oberkante schaut anfangs aus dem Nebel
- `.composite`: identische Subjekt-Kopie in einem Div mit `mask-image` = Daten-URI-SVG
  der Wortmarken-Letterpfade → „Subjekt in den Buchstaben"
- `.logo`: dieselben Pfade als Stroke (`fill:transparent; stroke:#fff; 2.5px`), zentriert
- Wolken: außerhalb des Canvas positioniert (`left/right:-340px`), top 20–25%

## Scroll-Timeline (exakte Referenzwerte)

```js
// Lenis + ScrollTrigger, scrub 0.1 (NICHT 1 — das tötet den Look)
const tl = gsap.timeline();
tl.to([house, houseComp], {y:'-40%', scale:1.3, duration:1}, 0)
  .to(smoke,   {y:'0%', duration:1}, 0)          // CSS-Start: translateY(70%)
  .to(cloudL,  {x:'-15%', duration:1}, 0)
  .to(cloudR,  {x:'15%', duration:1}, 0)
  .to(content, {y:'20%', scale:.9, duration:1}, 0)
  .to(content, {opacity:0, duration:.2}, 0)
  .to(logo,    {opacity:1, duration:.01}, .1)
  .fromTo(logoPaths, {drawSVG:'0%'}, {drawSVG:'100%', duration:.3}, .1)
  .to(logo,    {opacity:0, duration:.2}, .28)
  .to(composite, {opacity:1, duration:.1}, .3)   // Crossfade: Subjekt → in Buchstaben
  .to(house,     {opacity:0, duration:.1}, .3);
ScrollTrigger.create({trigger:root, animation:tl, start:'top top', end:'bottom top', scrub:.1});
```

## Intro-Choreografie (einmalig, alles expo.out)

root autoAlpha .6s · Title-Lines slide-up (overflow:hidden-Wrapper, 2s, stagger .1) ·
Text/CTA fade ab .4 · back from scale 1.1 (5s!) · cloudL from y 50% (3s) ·
cloudR from y 100% (4s) · Subjekt-img from opacity 0 + y 10% (3s) ·
Start: `setTimeout(()=>requestAnimationFrame(()=>intro.play()),200)`

## CDN-Stack

```html
<script src="https://unpkg.com/lenis@1.3.4/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/DrawSVGPlugin.min.js"></script>
```

DrawSVG ist seit GSAP 3.13 gratis (Webflow-Übernahme). Lenis ist HIER erlaubt —
Ausnahme von der gsap-ultra-Regel, weil die Mechanik mit nativem Scroll ruckelt.
Lenis-Kopplung: `lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);`

---

## Asset-Pipeline (alles getestet, Scripts in scripts/)

1. **Subjekt generieren** — Higgsfield `nano_banana_pro`, 21:9, resolution 2k (~2 Credits):
   „<Subjekt>, standing free against a clean <Stimmung> sky, photorealistic, no people"
   → Vision-Cutout braucht freien Hintergrund. Bei echtem Kundenfoto: direkt zu Schritt 2.
2. **Freistellen** — `swift scripts/cutout.swift in.png out.png`
   (macOS Vision, schneidet sauber inkl. Bäumen/Details). Danach sharp `.trim({threshold:10})`
   + 2× Lanczos-Upscale.
3. **Backplate** — DASSELBE Bild geblurrt: sharp `.resize({width:3000}).blur(45).modulate({saturation:1.15})`
   → Lichtstimmung passt automatisch zum Subjekt.
4. **Wolke + Nebel** — Higgsfield: „white cumulus cloud / wide band of white fog, on pure
   solid black background" → `node scripts/lum-alpha.js in.png out.png [gamma]`
   (Luminanz wird Alphakanal, Farbe weiß). Einmal erzeugt = wiederverwendbar,
   Master-Kopien liegen in `~/output/cinematic-heroes/_shared/`.
5. **Wortmarke** — `node scripts/make-wordmark.js "MARKE" out.json`
   (opentype.js, Arial Black, charToGlyph pro Buchstabe — umgeht GSUB-Crash bei Variable
   Fonts). JSON = `{viewBox, width, height, letters[]}` → ins HTML injizieren; gleiche
   Pfade für Stroke-SVG UND Mask-Daten-URI. Kurze Wörter (5–8 Buchstaben) maskieren am besten.

## Regeln

- Subjekt-Cutout ist breit statt quadratisch? → `.house{top:62vh}` ohne fixe Höhe,
  `img{width:100%;height:auto}`, Mobile: `img{width:175%;margin-left:-37.5%}`
- Folge-Sektion hell ODER `.overlay`-Verlauf in die Sektionsfarbe — Referenz läuft in
  Weiß aus, gegen Dunkel wirkt die Nebelkante sonst hart
- `prefers-reduced-motion`: Hero auf 100vh statisch, alles sichtbar (Block im Template)
- KEIN Custom Cursor (globale Regel). Kein Hotlinking — alle Assets lokal in assets/
- Förder-Builds (SAB): KEINE KI-Subjects — nur echte Kundenfotos durch die Pipeline
- Verifizieren: Puppeteer-Phasen-Shots bei 0% / 30% / 62% / 95% Scroll (Chrome
  --screenshot reicht NICHT bei GSAP)
