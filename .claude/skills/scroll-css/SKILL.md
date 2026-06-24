---
name: scroll-css
description: >
  Scroll-Driven Animations in reinem CSS (animation-timeline: view()/scroll()) —
  Reveals, Parallax und Scroll-Fortschritt OHNE JavaScript. Federleicht, läuft auf
  dem Compositor (kein Main-Thread-Ruckeln), graceful degradation in älteren Browsern.
  Nutzen bei JEDEM Paket (auch STARTER) für sanfte Scroll-Reveals, wenn GSAP zu schwer
  wäre — und als Ergänzung zu [[micro-fx]] / [[scroll-story]] bei PREMIUM/INDIVIDUAL.
  Erkannt im Weekly Lab KW26 (23.06.2026): Browser-Support ~85 %+ (Chrome/Edge/Safari;
  Firefox hinter Flag) → produktionsreif für kosmetische Effekte.
---

# scroll-css — Scroll-Effekte ohne JavaScript

**Warum:** `animation-timeline` bindet eine CSS-Animation an die Scroll-Position
statt an die Uhr. Das läuft auf dem Compositor → buttrig, kein JS, kein Layout-Thrash.
Versteht ein Browser es nicht, wird die Zeile **ignoriert** und der Effekt fällt
einfach weg (Inhalt bleibt sichtbar) — perfekte progressive Enhancement.

## Wann nutzen vs. GSAP
- **scroll-css:** einfache Reveals, Parallax, Fortschrittsbalken, Sticky-Scale. STARTER-tauglich (0 KB JS).
- **GSAP/ScrollTrigger ([[scroll-story]], [[micro-fx]]):** Pin-Sequenzen, getimte Multi-Step-Storys, Scrubbing mit Logik, horizontale Scroll-Galerien.
- Beides kombinierbar: Basis-Reveals in CSS, die Wow-Sequenz in GSAP.

## PFLICHT-Regeln
1. **Immer `prefers-reduced-motion`-Ausstieg** (Animationen auf `none`/`auto`).
2. **Kein Inhalt darf ohne den Effekt verschwinden** — Startzustand nie `opacity:0` ohne Fallback. Lösung: Effekt in `@supports (animation-timeline: view)` kapseln.
3. Sparsam (Frequenz-Regel aus [[emil-design-eng]]): nicht jede Section zappeln lassen.

## 1) Scroll-Reveal (Einblenden beim Eintreten)
```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal-in linear both;
      animation-timeline: view();          /* Timeline = Sichtbarkeit des Elements */
      animation-range: entry 0% entry 60%; /* startet beim Reinscrollen, fertig bei 60% */
    }
  }
}
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: none; }
}
```
Ohne `@supports`-Block bleibt `.reveal` normal sichtbar — sicher.

## 2) Parallax (Tiefe ohne JS)
```css
@supports (animation-timeline: view()) {
  .parallax-img {
    animation: drift linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;
  }
}
@keyframes drift { from { transform: translateY(-8%); } to { transform: translateY(8%); } }
```

## 3) Scroll-Fortschrittsbalken (oben fixiert)
```css
.progress {
  position: fixed; top: 0; left: 0; height: 3px; width: 100%;
  background: var(--brass); transform-origin: 0 50%; transform: scaleX(0);
}
@supports (animation-timeline: scroll()) {
  .progress {
    animation: grow linear both;
    animation-timeline: scroll(root block); /* Timeline = ganzes Dokument */
  }
}
@keyframes grow { to { transform: scaleX(1); } }
```

## 4) Sticky-Scale / Hero-Zoom beim Scrollen
```css
@supports (animation-timeline: view()) {
  .hero-zoom { animation: hz linear both; animation-timeline: view(); animation-range: exit 0% exit 100%; }
}
@keyframes hz { to { transform: scale(1.12); filter: brightness(.8); } }
```

## Range-Spickzettel
- `entry` — während das Element ins Viewport eintritt (gut für Reveals).
- `exit` — während es hinausscrollt (gut für Parallax-Abgänge/Hero-Zoom).
- `cover` — gesamte Zeit, die es sichtbar ist (durchgehender Parallax).
- `contain` — solange es voll im Viewport liegt.

## Safari-Wirklichkeit + JS-Fallback (WICHTIG)
Stand 2026: Chrome/Edge ✓, Firefox hinter Flag, **Safari spielt `animation-timeline` (noch) NICHT** → dort
bleibt die Seite statisch sichtbar (graceful degradation), aber **ohne Bewegung**. Wenn der Kunde
„ich seh keine Animation" sagt, ist es fast immer Safari als Standard-Browser.

→ Für **kundensichtbare Builds**: Effekte feature-detecten und bei fehlendem Support per **schlankem
JS-Fallback** nachrüsten, damit auch Safari-Nutzer Bewegung sehen:
```js
var ok = window.CSS && CSS.supports && CSS.supports('animation-timeline','view()');
if(!ok){
  document.documentElement.classList.add('js-fallback');     // CSS-Fallback-Pfad aktivieren
  // Reveals via IntersectionObserver (.in), Progress/Parallax/Zoom via rAF + getBoundingClientRect
}
```
```css
html.js-fallback .reveal{opacity:0;transform:translateY(40px);transition:.7s var(--ease)}
html.js-fallback .reveal.in{opacity:1;transform:none}
```
So bleibt CSS der Standard (0 KB JS, wo möglich) und Safari kriegt trotzdem die Show.
**Referenz-Implementierung:** `/Users/freddy/output/scroll-css-demo/index.html` (Detektion + Badge + voller Fallback).

## Verifikation (im Lab getestet)
Headless-Screenshot mit Scroll-Position rendert die Effekte; in Safari/Chrome live geprüft.
Fällt in Firefox (ohne Flag) sauber auf statisch zurück — kein Bruch.
Quelle: MDN „CSS scroll-driven animations", Chrome for Developers, joshwcomeau.com (Weekly Lab KW26).
