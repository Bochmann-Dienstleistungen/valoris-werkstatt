# GSAP ULTRA SKILL
**Trigger:** Immer lesen bevor eine VALORIS-Website gebaut wird.
**Ziel:** Websites auf gsap.com/showcase/ Niveau — keine statischen Seiten.

---

## CDN (nur cdnjs — funktioniert überall)

```html
<!-- PFLICHT — immer beide laden -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Optional für Flip-Animationen -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js"></script>

<!-- KEIN Lenis, KEIN Splitting.js — selbst implementieren (siehe unten) -->
```

```javascript
// Immer am Anfang
gsap.registerPlugin(ScrollTrigger);
```

---

## PATTERN 1 — Page Loader (ULTRA)

```html
<div id="loader" style="position:fixed;inset:0;z-index:9999;background:#080808;
  display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px">
  <div style="font-size:52px;font-weight:900;color:#f0ede6">VAL<span style="color:#c9a84c">O</span>RIS</div>
  <div style="width:180px;height:1px;background:rgba(201,168,76,0.2);position:relative;overflow:hidden">
    <div id="loader-fill" style="position:absolute;inset:0;width:0;background:#c9a84c"></div>
  </div>
  <div style="font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(201,168,76,0.6)">Webdesign & SEO</div>
</div>
```

```javascript
gsap.to('#loader-fill', {
  width: '100%', duration: 1.4, ease: 'power2.inOut',
  onComplete: () => {
    gsap.to('#loader', {
      scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'power4.inOut',
      onComplete: () => { document.getElementById('loader').style.display = 'none'; initPage(); }
    });
  }
});
```

---

## PATTERN 2 — SplitText (selbst implementiert, kein Plugin)

```javascript
function splitChars(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.innerHTML = [...el.textContent].map(c =>
      `<span style="display:inline-block;overflow:hidden"><span class="ch" style="display:inline-block">` +
      `${c === ' ' ? '&nbsp;' : c}</span></span>`
    ).join('');
  });
}

// Nutzung:
splitChars('.hero-title');
gsap.from('.hero-title .ch', {
  y: '110%',
  rotateZ: 6,
  stagger: 0.025,
  duration: 0.9,
  ease: 'power4.out',
  delay: 0.2
});
```

**Für Wörter statt Buchstaben:**
```javascript
function splitWords(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.innerHTML = el.textContent.split(' ').map(w =>
      `<span style="display:inline-block;overflow:hidden"><span class="wd" style="display:inline-block">${w}</span></span>`
    ).join(' ');
  });
}
gsap.from('.wd', { y: '100%', stagger: 0.06, duration: 0.8, ease: 'power3.out' });
```

---

## PATTERN 3 — Smooth Scroll (nativ, kein Lenis)

```javascript
// Methode A: ScrollTrigger.normalizeScroll (einfachste Lösung)
ScrollTrigger.normalizeScroll(true);

// Methode B: CSS scroll-behavior
// html { scroll-behavior: smooth; }
// + ScrollTrigger.config({ ignoreMobileResize: true });

// Methode C: Eigene RAF-Loop (echtes Lenis-Feeling)
let curr = 0, tgt = 0;
const lerp = (a, b, t) => a + (b - a) * t;
window.addEventListener('scroll', () => { tgt = window.scrollY; });
function loop() {
  curr = lerp(curr, tgt, 0.08);
  ScrollTrigger.update();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
```

---

## PATTERN 4 — ScrollTrigger Reveals

```javascript
// Universell — auf alle .rv Elemente anwenden
gsap.utils.toArray('.rv').forEach(el => {
  gsap.from(el, {
    opacity: 0, y: 52,
    duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

// Gestaffelt für Gruppen (z.B. Cards)
gsap.from('.card', {
  opacity: 0, y: 40, scale: 0.96,
  stagger: 0.1, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.cards', start: 'top 80%' }
});
```

---

## PATTERN 5 — Parallax

```javascript
// Hero-Hintergrundbild
gsap.to('.hero-img', {
  yPercent: -25, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Grid/Textur Parallax
gsap.to('.hero-grid', {
  yPercent: -18, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
});

// Text schneller als Seite
gsap.to('.parallax-text', {
  yPercent: -40, ease: 'none',
  scrollTrigger: { trigger: '.section', start: 'top bottom', end: 'bottom top', scrub: 1 }
});
```

---

## PATTERN 6 — Horizontaler Scroll (Services/Portfolio)

```javascript
const track = document.getElementById('cards-track');

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth) + 96,
  ease: 'none',
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top top',
    end: () => '+=' + (track.scrollWidth - window.innerWidth + 96),
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  }
});
```

```css
.services-section { overflow: hidden; }
#cards-track { display: flex; gap: 20px; padding: 0 48px; width: max-content; }
.card { flex-shrink: 0; width: 340px; }
```

---

## PATTERN 7 — Counter Animation

```javascript
document.querySelectorAll('.counter').forEach(el => {
  const target = parseInt(el.dataset.target);
  const obj = { v: 0 };
  gsap.to(obj, {
    v: target, duration: 2.2, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 82%' },
    onUpdate() { el.textContent = Math.round(obj.v); }
  });
});
```

```html
<span class="counter" data-target="47">0</span>
```

---

## PATTERN 8 — Image Reveal (Curtain)

```javascript
// Vorhang-Effekt von links nach rechts öffnet
gsap.to('.img-cover', {
  scaleX: 0, transformOrigin: 'right',
  duration: 1.3, ease: 'power4.inOut',
  scrollTrigger: { trigger: '.about', start: 'top 65%' }
});
```

```html
<div style="position:relative;overflow:hidden">
  <img src="foto.jpg" alt="">
  <div class="img-cover" style="position:absolute;inset:0;background:#080808;transform-origin:right"></div>
</div>
```

---

## PATTERN 9 — Custom Cursor

```css
body { cursor: none; }
.cursor {
  position: fixed; top: 0; left: 0; z-index: 9998;
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid #c9a84c; pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}
.cursor-dot {
  position: fixed; top: 0; left: 0; z-index: 9999;
  width: 4px; height: 4px; border-radius: 50%;
  background: #c9a84c; pointer-events: none;
  transform: translate(-50%, -50%);
}
@media (max-width: 768px) { .cursor, .cursor-dot { display: none; } body { cursor: auto; } }
```

```javascript
const cur = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');

window.addEventListener('mousemove', e => {
  gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power2.out' });
  gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.07 });
});

document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => gsap.to(cur, { scale: 2.5, duration: 0.3 }));
  el.addEventListener('mouseleave', () => gsap.to(cur, { scale: 1, duration: 0.3 }));
});
```

---

## PATTERN 10 — Magnetic Button

```javascript
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)' });
  });
});
```

---

## PATTERN 11 — Nav Hide on Scroll

```javascript
let lastY = 0;
ScrollTrigger.create({
  onUpdate: self => {
    const y = self.scroll();
    gsap.to('nav', {
      y: y > lastY && y > 100 ? -80 : 0,
      duration: 0.4, ease: 'power2.out'
    });
    lastY = y;
  }
});
```

---

## PATTERN 12 — Pinned Text + Scrollende Bilder

```javascript
// Text bleibt stehen, rechts scrollen Bilder durch
gsap.timeline({
  scrollTrigger: {
    trigger: '.pin-section',
    start: 'top top',
    end: '+=300%',
    scrub: 1,
    pin: '.pin-text'
  }
})
.to('.pin-img-1', { yPercent: -100, ease: 'none' })
.to('.pin-img-2', { yPercent: -100, ease: 'none' });
```

---

## PATTERN 13 — Marquee Text (infinite loop)

```javascript
const marquees = document.querySelectorAll('.marquee-track');
marquees.forEach(el => {
  const clone = el.innerHTML;
  el.innerHTML += clone; // doppeln für nahtlosen Loop
  const w = el.scrollWidth / 2;
  gsap.to(el, { x: -w, duration: 20, ease: 'none', repeat: -1 });
});
```

```html
<div style="overflow:hidden;white-space:nowrap">
  <div class="marquee-track" style="display:inline-flex;gap:40px">
    <span>Webdesign</span><span>•</span><span>SEO</span><span>•</span><span>Zwickau</span><span>•</span>
  </div>
</div>
```

---

## PATTERN 14 — Section Transitions (Wipe)

```javascript
// Sektion B wischt über Sektion A
gsap.to('.section-b', {
  clipPath: 'inset(0% 0% 0% 0%)',
  ease: 'none',
  scrollTrigger: {
    trigger: '.section-b',
    start: 'top bottom',
    end: 'top top',
    scrub: 1
  }
});
// CSS: .section-b { clip-path: inset(0% 0% 100% 0%); position: sticky; top: 0; }
```

---

## PATTERN 15 — Before/After Slider

```javascript
const container = document.querySelector('.comparison');
const after = document.querySelector('.comp-after');
const handle = document.querySelector('.comp-handle');
let dragging = false;

handle.addEventListener('mousedown', () => dragging = true);
window.addEventListener('mouseup', () => dragging = false);
window.addEventListener('mousemove', e => {
  if (!dragging) return;
  const r = container.getBoundingClientRect();
  const pct = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
  gsap.to(after, { clipPath: `inset(0 ${100 - pct}% 0 0)`, duration: 0.1 });
  gsap.to(handle, { left: pct + '%', duration: 0.1 });
});

// Touch support
handle.addEventListener('touchmove', e => {
  const r = container.getBoundingClientRect();
  const pct = Math.max(0, Math.min(100, (e.touches[0].clientX - r.left) / r.width * 100));
  gsap.to(after, { clipPath: `inset(0 ${100 - pct}% 0 0)`, duration: 0.1 });
  gsap.to(handle, { left: pct + '%', duration: 0.1 });
});
```

---

## CSS Basis (immer setzen)

```css
:root {
  --gold: #c9a84c;
  --gold2: #e8c97a;
  --dark: #080808;
  --dark2: #111111;
  --dark3: #1a1a1a;
  --white: #f0ede6;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* GSAP übernimmt das */
body { background: var(--dark); color: var(--white); overflow-x: hidden; }

/* Animierte Elemente: immer will-change setzen */
.hero-title, .hero-img, nav { will-change: transform; }

/* Alle ScrollTrigger-Reveal Elemente vorbereiten */
.rv { opacity: 0; transform: translateY(48px); }
```

---

## Performance-Regeln

1. `will-change: transform` auf alle animierten Elemente setzen
2. `gsap.set()` statt CSS für Initialzustand
3. `ScrollTrigger.refresh()` nach `window.onload` aufrufen
4. Magnetic/Cursor via `matchMedia` auf Mobile deaktivieren:
```javascript
gsap.matchMedia().add('(min-width: 769px)', () => {
  // Cursor + Magnetic hier initialisieren
});
```
5. `invalidateOnRefresh: true` bei Pin-Sections immer setzen
6. Bei vielen ScrollTrigger-Instanzen: `ScrollTrigger.batch()` nutzen

---

## Paket → Animation Matrix

| Animation | BASIS | STANDARD | PREMIUM | ULTRA |
|-----------|-------|----------|---------|-------|
| Scroll Reveals | ✅ | ✅ | ✅ | ✅ |
| Hero Fade-in | ✅ | ✅ | ✅ | ✅ |
| WhatsApp Pulse | ✅ | ✅ | ✅ | ✅ |
| SplitText Hero | ❌ | ✅ | ✅ | ✅ |
| Counter Zähler | ❌ | ✅ | ✅ | ✅ |
| Nav Hide Scroll | ❌ | ✅ | ✅ | ✅ |
| Smooth Scroll | ❌ | ✅ | ✅ | ✅ |
| Parallax | ❌ | ❌ | ✅ | ✅ |
| Horizontal Scroll | ❌ | ❌ | ✅ | ✅ |
| Image Curtain | ❌ | ❌ | ✅ | ✅ |
| Magnetic Buttons | ❌ | ❌ | ✅ | ✅ |
| Marquee Text | ❌ | ❌ | ✅ | ✅ |
| Before/After Slider | ❌ | ❌ | ✅ | ✅ |
| Custom Cursor | ❌ | ❌ | ❌ | ✅ |
| Page Loader | ❌ | ❌ | ❌ | ✅ |
| Section Wipe | ❌ | ❌ | ❌ | ✅ |
| Pinned Scroll | ❌ | ❌ | ❌ | ✅ |
| Particle Effects | ❌ | ❌ | ❌ | ✅ |

---

## Selbst-Lernregel

Nach jedem Build: neue Patterns oder Optimierungen am Ende dieser Datei dokumentieren.
Format: `## GELERNT [Datum]: [Was wurde besser gemacht]`

## GELERNT 12.06.2026: Cinematic Layer-Hero (findrealestate-Mechanik)

Der virale „3D-Scroll-Hero" ist 4 Foto-Layer + GSAP, kein Video. Komplette Mechanik,
Timeline-Werte und Asset-Pipeline (Higgsfield → Vision-Cutout → Luminanz-Alpha →
Wortmarken-Pfade) als eigener Skill: `~/.claude/skills/cinematic-hero/SKILL.md`.
**Pflicht-Kandidat für jede ULTRA-Hero-Section, optional bei PREMIUM.**
Referenz-Implementierung: `~/output/schiwig-parallax-test/hero-v2.html`,
Branchen-Klone: `~/output/cinematic-heroes/`.
Ausnahme zur Lenis-Regel oben: NUR für diese Mechanik ist Lenis erlaubt
(natives Scrollen ruckelt beim scrub:0.1-Crossfade).

## GELERNT 21.06.2026: Lightweight-Animations-Layer (vom LM-Services-Build geerntet)

Fremd-Build `lmservices-zwickau.de` (von einem anderen Entwickler) macht vieles richtig **ohne GSAP** — reines IntersectionObserver + CSS. Übernehmen bei STARTER (wo GSAP Overkill ist) und als Verfeinerung bei PREMIUM. Konsistentes Easing-Token überall: **`cubic-bezier(.4,0,.2,1)`** (Material-Standard).
**Was er vergaß → wir ergänzen IMMER:** `prefers-reduced-motion`-Guard + self-hosted Fonts (er hatte 0 reduced-motion).

### A — Word-Reveal Headline (Blur + Lift, gestaffelt) — sein Signature-Effekt
Wörter steigen mit Blur-Auflösung ein. Edler als reines Char-Slide.
```css
@keyframes wordReveal{0%{opacity:0;filter:blur(12px);transform:translateY(20px)}to{opacity:1;filter:blur(0);transform:translateY(0)}}
.word{display:inline-block;white-space:pre;opacity:0}
.word.go{animation:wordReveal .85s cubic-bezier(.4,0,.2,1) forwards}
@media(prefers-reduced-motion:reduce){.word{opacity:1!important;animation:none!important}}
```
```javascript
document.querySelectorAll('.reveal-words').forEach(el=>{
  el.innerHTML = el.textContent.trim().split(' ').map(w=>`<span class="word">${w} </span>`).join('');
  el.querySelectorAll('.word').forEach((w,i)=>{ w.style.animationDelay=(i*0.12)+'s'; w.classList.add('go'); });
});
```

### B — Vanilla Scroll-Reveal-System (kein GSAP nötig)
```css
.reveal{opacity:0;transform:translateY(28px);transition:opacity .6s cubic-bezier(.4,0,.2,1),transform .6s cubic-bezier(.4,0,.2,1)}
.reveal.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1!important;transform:none!important}}
```
```javascript
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){ e.target.style.transitionDelay=(([...e.target.parentNode.children].indexOf(e.target)%6)*0.07)+'s';
    e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:0.2,rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal,.steps-line').forEach(el=>io.observe(el));
```

### C — Spotlight-Bento-Grid (Maus-folgendes Glow — KEIN verbotener Cursor)
Glow folgt der Maus via CSS-Variablen (kein Custom-Cursor → globale Regel bleibt eingehalten). Auf Touch automatisch aus.
```css
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.bento-item{position:relative;overflow:hidden;border:1.5px solid rgba(0,0,0,.12);border-radius:16px;padding:2rem;background:var(--card);transition:transform .15s ease,border-color .3s ease;will-change:transform}
.bento-item::before{content:"";position:absolute;width:400px;height:400px;border-radius:50%;top:var(--my,-200px);left:var(--mx,-200px);transform:translate(-50%,-50%);background:radial-gradient(circle,var(--spot,rgba(199,163,90,.18)) 0,transparent 65%);opacity:0;transition:opacity .3s ease;pointer-events:none}
.bento-item:hover::before{opacity:1}
.bento-item.lg{grid-column:span 2}
@media(hover:none){.bento-item::before{display:none}}
```
```javascript
if(matchMedia('(hover:hover)').matches) document.querySelectorAll('.bento-item').forEach(c=>
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');}));
```

### D — Animierte Prozess-Linie (Steps füllen sich beim Scroll)
```css
.steps-line{position:absolute;left:0;top:var(--line-top);height:2px;width:0;background:var(--ink);transition:width 1.2s cubic-bezier(.4,0,.2,1)}
.steps-line.in{width:100%}
@media(prefers-reduced-motion:reduce){.steps-line{transition:none;width:100%}}
```
Trigger über denselben IntersectionObserver wie B (`.add('in')`). Mobil als vertikale Variante (`height`/`width:3px`).

**Einsatzregel:** A+B+C+D heben schon STARTER sichtbar über die Konkurrenz — ohne GSAP-Gewicht. Bei PREMIUM/ULTRA mit den GSAP-Patterns oben kombinieren. Easing IMMER `cubic-bezier(.4,0,.2,1)`.
Referenz-Analyse archiviert: lmservices-zwickau.de (Custom-Build, IntersectionObserver + CSS, kein Wix mehr).
