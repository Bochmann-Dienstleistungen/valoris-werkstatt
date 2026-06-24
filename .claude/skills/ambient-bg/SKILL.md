---
name: ambient-bg
description: Ambient-Backgrounds & moderne Layouts — animierter Aurora/Gradient-Mesh (blur-Blobs), Film-Grain/Noise (SVG), Bento-Grid mit Glas-Effekt + Reveal. Nutzen bei PREMIUM/ULTRA für Hintergrund-Atmosphäre, dunkle Hero/Section-Bänder, moderne Raster-Layouts, "soll edel/teuer aussehen". Verifiziert 14.06.2026 im Animation Lab.
---

# Ambient Backgrounds & Bento

Atmosphäre + zeitgemäße Layouts. Live + verifiziert: `~/output/animation-lab/index.html` (Ambient-Section).
Alles rein CSS (performant). Eltern-Section `position:relative;overflow:hidden`, Content `z-index:2`.

## 1 · Aurora / Gradient-Mesh
Drei farbige Kreise, stark geblurrt, `mix-blend-mode:screen`, langsam driftend.
```css
.aurora{position:absolute;inset:-20%;z-index:0;filter:blur(70px);opacity:.55;pointer-events:none}
.aurora i{position:absolute;border-radius:50%;mix-blend-mode:screen;will-change:transform}
.aurora i:nth-child(1){width:44vw;height:44vw;background:var(--violet);left:-5%;top:-10%;animation:drift1 18s ease-in-out infinite alternate}
@keyframes drift1{to{transform:translate(18%,14%) scale(1.15)}}
/* i2/i3 = andere Farben, Positionen, Timings (20–22s) */
```
Farben aus der Marke ziehen; auf dunklem BG am stärksten.

## 2 · Film-Grain (SVG, kein Bild-Asset)
```css
.grain{position:absolute;inset:0;z-index:1;opacity:.06;pointer-events:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
```
opacity .04–.08 — subtil halten, sonst billig.

## 3 · Bento-Grid (Glas)
```css
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:160px;gap:16px}
.bento .b{background:rgba(18,20,27,.7);backdrop-filter:blur(8px);border:1px solid var(--line);border-radius:20px;overflow:hidden;position:relative}
.bento .b1{grid-column:span 2;grid-row:span 2}.bento .b2{grid-column:span 2}/* …gemischte Spans */
@media(max-width:760px){.bento{grid-template-columns:repeat(2,1fr)}.bento .b1{grid-column:span 2}}
```
Zellen mit Foto (`img` absolut, `object-fit:cover`) ODER Text mischen. Reveal pro Zelle via [[micro-fx]]/`.reveal`.

## Regeln
- Reduced-motion: alle Drift-Animationen `animation:none` (Aurora bleibt als statischer Verlauf schön).
- Performance: max. 3 Blobs, blur ≤ ~80px; nicht über Fließtext legen (Lesbarkeit). Grain pointer-events:none.
- Kombiniert gut mit [[kinetic-type]] (Headline) auf demselben dunklen Band.
