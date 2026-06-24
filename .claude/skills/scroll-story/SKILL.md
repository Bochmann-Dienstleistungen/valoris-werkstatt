---
name: scroll-story
description: Scroll-Storytelling-Mechaniken — Pinned Sections, horizontale Scroll-Galerie (vertikal gesteuert), stapelnde Karten (card-stack), Sticky Bild/Text-Paare. Nutzen bei PREMIUM/ULTRA-Scrollseiten, Leistungs-/Prozess-/Portfolio-Strecken, "Agentur-Scroll", "horizontal scrollen". Verifiziert 14.06.2026 im Animation Lab.
---

# Scroll-Storytelling

Vier Agentur-Mechaniken. Live + verifiziert: `~/output/animation-lab/index.html`.
Basis: Lenis + GSAP ScrollTrigger, scrub `.1`. ⚠️ Nie Top-Level-Variable `l`.

## 1 · Horizontale Scroll-Galerie (vertikal getrieben)
Track horizontal, Section gepinnt, x = vertikaler Scroll.
```html
<section class="horiz"><div class="sticky"><div class="htrack" id="t">…panels…</div></div></section>
```
```css
.horiz{height:300vh}.horiz .sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;overflow:hidden}
.htrack{display:flex;gap:30px;padding:0 8vw}.hpanel{flex:0 0 70vw}
```
```js
const t=document.getElementById('t'); const dist=()=>t.scrollWidth-innerWidth+innerWidth*0.16;
gsap.to(t,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'.horiz',start:'top top',end:()=>'+='+dist(),scrub:.1,invalidateOnRefresh:true}});
```
`invalidateOnRefresh:true` = korrekt bei Resize.

## 2 · Card-Stack (sticky, kein JS)
```css
.stack .card{position:sticky;top:14vh;height:74vh;margin-bottom:30px;border-radius:24px;overflow:hidden}
```
Jede Karte bleibt stehen, die nächste schiebt darüber. Optional GSAP: leichte `scale` der unteren Karte beim Verlassen.

## 3 · Sticky Bild/Text-Paar (Editorial)
Grid 1fr/1fr, linke `.media{position:sticky;top:14vh}`, rechts mehrere `.steps>div{padding:14vh 0}`.
Ruhig, hochwertig, kein JS nötig.

## 4 · Pin (Basis)
```js
ScrollTrigger.create({trigger:'#sec',start:'top top',end:'+=120%',pin:true,scrub:.1});
```

## Regeln
- Reduced-motion: `.horiz{height:auto}`, sticky→static, track `flex-wrap:wrap`, transform none. Block ins CSS.
- Mobile: flex-basis der Panels auf ~84vw. Verifizieren mit Scroll-Phasen (CDP).
- Pairt gut mit [[morph-hero]] (Hero) + [[kinetic-type]] (Titel).
