---
name: micro-fx
description: Micro-Interactions die teuer wirken — Magnetic Buttons, 3D-Tilt-Cards, Image-Reveal (clip on scroll), animierte Counter/Zahlen, Link-Underline-Draw. Nutzen bei PREMIUM/ULTRA für Buttons, Cards, Stats, Links, Hover-Details. KEIN Custom Cursor, KEINE Maus-Parallax (globale Regel). Verifiziert 14.06.2026 im Animation Lab.
---

# Micro-Interactions

Die Detailschicht. Live + verifiziert: `~/output/animation-lab/index.html` (Micro-Section).
⚠️ Globale Regel: KEIN Custom Cursor, KEINE seitenweite Maus-Parallax → siehe [[feedback_no_cursor]].
Magnetic/Tilt sind erlaubt (lokale Hover-Effekte auf EINEM Element), siehe [[reference_premium_animations]], [[feedback_motion_ultra]].

## 1 · Magnetic Button (Hover, nicht global)
Listener am ELTERN-Element, Button folgt der Maus mit Faktor .4, Reset bei leave.
```js
parent.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();
  btn.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.4}px,${(e.clientY-(r.top+r.height/2))*.4}px)`;});
parent.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)');
```
`will-change:transform` auf den Button.

## 2 · 3D-Tilt-Card
```js
card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
  const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`perspective(700px) rotateY(${px*12}deg) rotateX(${-py*12}deg) scale(1.03)`;});
card.addEventListener('mouseleave',()=>card.style.transform='perspective(700px) rotateY(0) rotateX(0) scale(1)');
```
CSS: `transform-style:preserve-3d;transition:transform .15s ease`.

## 3 · Image-Reveal (clip beim Scrollen)
Overlay-Balken via `::before{transform:scaleX(1);transform-origin:right}` → bei `.shown` `scaleX(0)`, Bild von `scale(1.05)`→`scale(1)`.
```js
ScrollTrigger.create({trigger:'#img',start:'top 80%',onEnter:()=>img.classList.add('shown')});
```

## 4 · Animierte Counter
```js
ScrollTrigger.create({trigger:'#c',start:'top 80%',once:true,onEnter:()=>{
  document.querySelectorAll('#c b').forEach(b=>{const to=+b.dataset.to,suf=b.dataset.suffix||'';
    gsap.to({v:0},{v:to,duration:1.6,ease:'power2.out',onUpdate(){b.textContent=Math.round(this.targets()[0].v)+suf;}});});}});
```
`<b data-to="190" data-suffix="+">0</b>`

## 5 · Link-Underline-Draw (reines CSS)
```css
a::after{content:"";position:absolute;left:0;bottom:-3px;height:2px;width:100%;background:var(--gold);
  transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.22,1,.36,1)}
a:hover::after{transform:scaleX(1)}
```

## Regeln
- Touch/reduced-motion: Magnetic & Tilt deaktivieren (Pointer-Check / reduceMotion-Guard), Counter=Endwert sofort.
- Verifizieren mit Scroll-Phasen (CDP). ⚠️ Nie Top-Level-Variable `l`.
