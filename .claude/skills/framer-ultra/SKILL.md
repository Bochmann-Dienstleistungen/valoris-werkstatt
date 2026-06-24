---
name: framer-ultra
description: Framer-Tool-Workflow für VALORIS ULTRA-Pakete — die echte Framer-App nutzen, um 10+-seitige Premium-Sites zu bauen, zu animieren und auf Framer Hosting (+ Custom Domain via Cloudflare) zu deployen. Deckt ab: Layout/Stacks/Breakpoints, Components & Variants, CMS (Listings/Blog), Scroll- & Magic-Motion-Effekte, Code-Components, SEO/Schema/Custom-Code, Figma→Framer-Rebuild, Publish & Domain. Nutzen bei „ULTRA", „auf Framer bauen", „Framer-Site", „Framer hosten/deployen", Objekt-/Listing-Seiten, mehrseitige Premium-Builds. Erstellt 14.06.2026.
---

# Framer-ULTRA — Tool-Workflow

**Wofür:** Framer ist der GUI-Web-Baukasten, auf dem VALORIS **ULTRA-Pakete** laufen
(`CLAUDE.md`: „ULTRA → Framer Hosting + Cloudflare Custom Domain", „Figma Dev Mode →
Claude Code baut nach"). Framer ist KEIN Code-Editor — man designt visuell auf einem Canvas,
und Framer rendert daraus eine React-Site. Dieser Skill ist der Fahrplan, um darin eine
Premium-Site abzuliefern.

**Meine (Claude) realistische Rolle — ehrlich:**
1. **Struktur & Inhalt vorbereiten** — Seitenbaum, Section-Reihenfolge, Copy (DE), SEO-Texte,
   Schema.org-JSON-LD, Code-Component-Snippets. Das liefere ich fertig, du fügst es ein.
2. **Computer-Use** — die Framer.app (`/Applications/Framer.app`) direkt bedienen für
   wiederkehrende/aufwändige Schritte (Seiten anlegen, Stacks bauen, CMS befüllen, Publish).
   Vorher `request_access` für „Framer".
3. **Figma→Framer-Rebuild planen** — aus einem Figma-Design oder einer Clone-Vorlage die
   Framer-Struktur ableiten.
> Framer ist visuell-first: ich „code" keine Framer-Site wie HTML. Erwartung: ich plane,
> texte, baue Custom-Code/Components und fahre die App per Computer-Use — kein `index.html`.

---

## 0 · Wann Framer, wann nicht
- **Framer:** ULTRA (9.990 €) — 10+ Seiten, CMS-Listings, Premium-Motion, schneller Redesign-Zyklus, Kunde soll evtl. selbst Inhalte pflegen.
- **NICHT Framer:** BASIS/STANDARD/PREMIUM → self-contained HTML/CSS/JS bleibt (GitHub Pages/Netlify). Framer-Hosting kostet monatlich → nur im ULTRA-Preis gedeckt.

## 1 · Projekt-Setup
- Neues Projekt → **Breakpoints** prüfen: Desktop (≥1200), Tablet (~810), Phone (~390). Immer alle drei durchgestalten, Desktop zuerst.
- **Fonts:** VALORIS-Tokens (Cormorant/Fraunces + Inter) als Custom Fonts hochladen oder Google-Fonts wählen.
- **Farben/Tokens:** Marken-Styles als Color-/Text-Styles anlegen (Anthrazit/Graphit + Gold/Safran) → konsistent + schnell änderbar.
- **Assets:** Bilder/Videos in Framer hochladen (NICHT extern hotlinken — vgl. Pexels-Selfhost-Regel). Vorher komprimieren (Perf!).

## 2 · Layout — Stacks zuerst
- **Stack** = Auto-Layout (Flexbox): Richtung, Gap, Padding, Distribution. 90% des Layouts baust du mit verschachtelten Stacks, nicht mit absoluten Pins.
- **Grid** für Karten-/Galerie-Raster. **Fixed/Relative/Fill/Fit** Sizing bewusst setzen.
- **Pins** nur für Overlays/Sticky. Breakpoint-Overrides: Stack-Richtung auf Phone oft von horizontal → vertikal.
- Sektionen als wiederverwendbare **Frames** strukturieren (Hero, Leistungen, Featured, Vertrauen, Team, Kontakt, Footer).

## 3 · Components & Variants
- Wiederkehrendes (Buttons, Cards, Nav, Footer) als **Component** → einmal ändern, überall aktualisiert.
- **Variants** für Zustände (Default/Hover/Active) → Hover-Interaktion = „on hover → variant", mit **Smart Animate (Magic Motion)** für weiche Übergänge.
- Instanzen mit Property-Overrides (Text/Bild pro Verwendung).

## 4 · CMS — der ULTRA-Hebel
- **Collections** anlegen: z.B. `Objekte` (Listings), `Team`, `Blog`, `Standorte`.
- Felder: Titel, Slug, Bilder, Preis, m², Lage, Rich-Text, Referenzen.
- **Collection-Liste** auf eine Section binden → eine Karte gestalten, Framer multipliziert über alle Einträge. Filter/Sort einstellbar.
- **Dynamische Detailseiten:** CMS-Template-Seite → automatisch eine URL pro Eintrag (`/objekte/[slug]`). Perfekt für Makler-Listings / Leistungsseiten / Blog.
- Kunde kann später Einträge selbst pflegen (Verkaufsargument).

## 5 · Motion & Effekte (Framer-nativ, kein GSAP nötig)
- **Appear/Scroll-Effekte:** Elemente faden/sliden beim Scrollen rein (built-in „Effects" / Scroll Transforms). Sparsam + konsistent (eine Bewegungssprache).
- **Scroll-Transforms:** Parallax-auf-SCROLL, Sticky-Sections, Pin. ✅ erlaubt.
- **Magic Motion / Page Transitions:** weiche Übergänge zwischen Seiten/Variants.
- **Video-Hero:** Hintergrund-Video (stumm, autoplay, loop) — Standard für ULTRA.
- ⛔ **GLOBALE REGEL:** KEIN Custom Cursor, KEIN Maus-Parallax / mausgetriebene Animation
  (siehe Memory `feedback-no-cursor`). Nur Scroll-/Hover-/Zeit-basiert.

## 6 · Code-Components & Overrides (wenn No-Code nicht reicht)
- **Code Components** (React + Motion/Framer Motion) für Custom-Widgets (z.B. WhatsApp-FAB, Rechner, Live-Daten, eingebettete 3D/Scrubber).
- **Overrides** = kleine Code-Snippets, die ein Layer-Verhalten erweitern.
- Den Frame-Scrubber / Three.js-Explosion aus dem Schiwig-Build kann man als Code-Component (oder via `<iframe>`/Embed) einbinden, wenn ULTRA das braucht.
- Diese Snippets liefere ich fertig — du fügst sie in Framers Code-Editor ein.

## 7 · SEO, Recht, Tracking
- **Pro Seite:** Title, Meta-Description, OG-Image, Slug, Canonical (Page Settings). Sitemap generiert Framer automatisch.
- **Custom Code** (Site Settings → Custom Code, `<head>`/`<body>`): Schema.org JSON-LD (LocalBusiness/RealEstateAgent), Google Tag Manager / Analytics, Cookie-Banner.
- **Formulare:** Framers natives Form-Element ODER Embed mit Formspree (`mlgpooqw`). DSGVO-Hinweis + Consent.
- **Pflicht:** Impressum + Datenschutz (§5 TMG + DSGVO), WhatsApp-Button → `wa.me/4915254190819`, dynamisches Footer-Jahr.

## 8 · Figma → Framer
- Framer kann Figma-Frames importieren/einfügen (Plugin/Paste) — Layout kommt grob mit, **Auto-Layout/Stacks und Responsive musst du in Framer nachziehen**.
- Realistisch oft schneller: Figma als **Vorlage**, in Framer sauber mit Stacks neu aufbauen. „Figma Dev Mode → Claude Code baut nach" heißt hier: ich leite Struktur/Tokens/Specs ab, wir bauen in Framer.

## 9 · Publish & Custom Domain (Cloudflare)
1. **Publish** → Staging-URL `projekt.framer.website` (sofort live, zum Vorzeigen).
2. **Custom Domain:** Framer Site-Settings → Domains → Domain eintragen → Framer zeigt DNS-Records.
3. In **Cloudflare** DNS setzen (A/AAAA oder CNAME laut Framer-Vorgabe). SSL macht Framer automatisch.
4. Custom Domain + Publishing brauchen einen **bezahlten Framer-Plan** → im ULTRA-Preis einkalkuliert (Plan/Preis bei framer.com aktuell prüfen, nicht aus dem Kopf zitieren).
5. Nach Go-Live: Search Console + Sitemap einreichen.

## 10 · Übergabe
- Kunde bekommt Zugang zum CMS (falls er pflegen soll) oder reine Übergabe.
- Doku: wie Inhalte ändern, wie publishen.
- Performance-Check (Bilder optimiert, Lighthouse), Mobile-QA über alle Breakpoints.

---

## Schnell-Checkliste ULTRA-Framer-Build
- [ ] Breakpoints Desktop/Tablet/Phone alle gestaltet
- [ ] Marken-Tokens (Farben/Fonts) als Styles
- [ ] Stacks statt absoluter Pins
- [ ] Nav/Footer/Buttons als Components+Variants
- [ ] CMS-Collections + dynamische Detailseiten
- [ ] Scroll-/Hover-Motion konsistent — KEIN Cursor/Maus-FX
- [ ] Video-Hero, WhatsApp-FAB, Formular
- [ ] SEO pro Seite + Schema.org Custom-Code
- [ ] Impressum + Datenschutz + Cookie-Banner
- [ ] Publish → Custom Domain via Cloudflare → SSL
- [ ] Mobile-QA + Lighthouse + Search Console

**Verknüpft:** `feedback-no-cursor` (kein Maus-FX), Pexels-Selfhost-Regel, `cinematic-hero`/
`morph-hero` (Effekt-Konzepte als Custom-Component portierbar), Schiwig-V.P.S. (Frame-Scrubber
als Embed/Code-Component für ULTRA).

---

## Kuratierte Framer-Assets (16.06.2026, Quelle „Free framer assets pt.15")

Marketplace-Komponenten + framer.university-Remixes — nur im INDIVIDUAL/Framer-Build nutzbar (in HTML-Premium den Effekt selbst nachbauen). Vor Einsatz globale Regeln prüfen: KEIN seitenweiter Maus-/Cursor-FX, KEINE Scanlines.

**Keeper (frei — einsetzen):**
- **Particle Sphere** — rotierende, interaktive Partikel-Kugel → Tech/Startup-Hero. ⚠️ cursor-reaktiv → nur EIN Hero-Element, nicht seitenweit. https://framer.university/resources/particle-sphere-component-for-framer
- **Motion Tiles** — animierte Bento-Kacheln → moderne Leistungs-/Bento-Layouts. https://www.framer.com/marketplace/components/motion-tiles/
- **Gallery Spin** — rotierende Galerie → Portfolio/Referenzen. https://www.framer.com/marketplace/components/gallery-spin/

**Nische (frei, situativ):**
- **Circular CD Selection** — CD-Kreis + Tastatur-Nav → nur Musik/Kreativ-Kunden. https://framer.university/resources/circular-cd-selection-in-framer
- **SpectraNoise** — Noise/Gradient-Hintergrund → redundant zu Skill `ambient-bg`, in Framer aber praktisch. https://www.framer.com/marketplace/components/spectranoise/

**Paid (nur bei bezahltem INDIVIDUAL-Job → über Freigabe-Queue kaufen):**
- **3D Parallax Grid** (Interface Studio) — 3D-Parallax-Karussell, starker Showcase. https://www.framer.com/marketplace/components/3d-parallax-grid/
- **Vortex Gallery Pro** — Wirbel-Karussell, eher gimmicky. https://www.framer.com/marketplace/components/vortex-gallery-pro/

**Skip:**
- **X-Ray Hover** — Skull-Reveal + CRT-Scanlines → bricht „keine Scanline"-Regel, zu nischig.
