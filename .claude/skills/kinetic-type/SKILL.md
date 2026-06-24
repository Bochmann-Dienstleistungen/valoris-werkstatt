---
name: kinetic-type
description: Kinetische Typografie für Headlines — Wort/Zeichen-Reveal (Masken-Slide), Scramble/Decode-Text, Gradient-Shimmer, Variable-Font-Gewicht beim Scrollen, Lauftext-Marquee. Nutzen bei PREMIUM/ULTRA-Heroes, dramatischen Section-Titeln, "Text-Animation", "Headline soll knallen". Verifiziert 14.06.2026 im Animation Lab.
---

# Kinetic Typography

Fünf Headline-Effekte, alle ohne Extra-Plugin (kein SplitText nötig — manuelles Wrappen).
Live + verifiziert: `~/output/animation-lab/index.html` (Hero + „Variable Weight"-Section + Marquee).

## 1 · Wort/Zeilen-Reveal (Masken-Slide)
Jedes Wort/jede Zeile in `.line-mask{overflow:hidden}`, innen `.word{transform:translateY(110%)}`.
```js
gsap.to('.hero h1 .word',{y:'0%',duration:1.1,ease:'expo.out',stagger:.12,delay:.2});
```
Für Zeichen-Reveal: Text per JS in `<span>` pro Buchstabe splitten, gleiche Timeline mit kleinerem stagger (.03).

## 2 · Scramble / Decode (kein Plugin)
```js
const target='> Dein Text.', chars='ABC…#%&/0123456789';
let frame=0;(function tick(){let o='';for(let i=0;i<target.length;i++)o+= i<frame/2?target[i]:chars[Math.random()*chars.length|0];
el.textContent=o;frame++; frame/2<target.length+1?requestAnimationFrame(tick):el.textContent=target;})();
```
`frame/2` = Entschlüsselungs-Tempo. In reduced-motion direkt `el.textContent=target`.

## 3 · Gradient-Shimmer (reines CSS)
```css
.shimmer{background:linear-gradient(100deg,var(--gold) 20%,#fff 45%,var(--gold) 70%);
  background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  animation:shim 4s linear infinite}
@keyframes shim{to{background-position:-200% center}}
```

## 4 · Variable-Font-Gewicht beim Scrollen
Variable Font laden (Google: `Inter:wght@100..900`). Gewicht an Scroll koppeln:
```js
ScrollTrigger.create({trigger:'#el',start:'top 80%',end:'bottom 30%',scrub:.2,
  onUpdate:s=>el.style.fontVariationSettings=`'wght' ${200+s.progress*700}`});
```

## 5 · Marquee (reines CSS, performant)
Inhalt DOPPELT in `.track`, dann:
```css
.marquee{overflow:hidden;white-space:nowrap}
.track{display:inline-block;animation:scrollx 26s linear infinite}
@keyframes scrollx{to{transform:translateX(-50%)}}
```

## Regeln
- Reduced-motion: Reveal sofort sichtbar, Scramble=Endtext, Shimmer/Marquee animation:none.
- CDN-Stack & Lenis wie morph-hero. ⚠️ Nie Top-Level-Variable `l` (GSAP/Lenis-Konflikt).
- Verifizieren mit Scroll-Phasen (CDP), nicht Einzel-Screenshot.
