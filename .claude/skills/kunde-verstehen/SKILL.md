---
name: kunde-verstehen
description: Discovery-Framework, das vor jedem Kundenprojekt ein vollständiges Kundenprofil erstellt — damit schon nach dem ersten Gespräch eine perfekt zugeschnittene Demo entsteht. Nutzen bei „Neuer Kunde", „Demo:", Telefonat-Nachbereitung, oder bevor irgendein Build startet.
---

# Kunde verstehen — Discovery vor jedem Build

Ziel: den Kunden **maximal verstehen, BEVOR gebaut wird**. Ergebnis ist ein **Kundenprofil**, das
Niveau-Anker, Design-Richtung, primäre CTA, Paket/Preis und Pitch-Winkel festlegt. Speist direkt die
Build-Loop-SOP in der CLAUDE.md (Schritt 0 + 1). Bei jedem neuen Kunden / nach jedem Erstgespräch laufen.

Pro Frage markiert:
- 🔎 = selbst recherchieren (Website fetchen, Google Maps/Profil, Branche, Wettbewerber)
- 💬 = von Frederic geben lassen (weiß er aus dem Gespräch, kann ich nicht von außen wissen)
- 🧠 = ableiten/annehmen, wenn undefiniert — und die Annahme klar als Annahme kennzeichnen

## 1 · Betrieb & Angebot
- 🔎 Was macht der Betrieb? Kerngeschäft in einem Satz.
- 🔎 Welche Dienstleistungen/Produkte? Welche sind die wichtigsten / margenstärksten zum Bewerben?
- 🔎🧠 USP — was unterscheidet ihn vom Wettbewerb? Worauf ist er stolz?
- 🔎 Zielgruppe: B2B/B2C, Privat/Gewerbe, regional/überregional? Einzugsgebiet?

## 2 · Inhaber & Mensch
- 🔎💬 Wer ist der Inhaber? Name, Rolle, Geschichte/Werdegang.
- 🧠💬 Wünsche & Ziele — falls nicht gesagt, ableiten: mehr Anfragen? Personal finden (Recruiting)?
  Premium-Image? Regional dominieren? Betrieb verkaufsfertig/Nachfolge? Entlastung (weniger Telefon)?
- 💬 **Charakter/Typ** (gibst DU mir — von außen nicht erkennbar): bodenständig/skeptisch/preisbewusst
  vs. ehrgeizig/statusorientiert/„will das Beste"? Schnell-Entscheider vs. braucht Sicherheit? →
  bestimmt Ton der Demo, Pitch-Stil und Anrede (Du/Sie).
- 🔎🧠 Schmerzpunkt / „warum jetzt?": Was nervt an der aktuellen Lage/Website? Was ist der Auslöser?
- 🧠 Tech-Affinität: will er selbst pflegen oder alles abgeben? → Betreuung-Upsell (ab 299 €/Mo).
- 💬 **No-Gos:** Was will der Inhaber auf KEINEN Fall? (Design/Farben, Ton, bestimmte Inhalte,
  Wettbewerber dem man nicht ähneln soll, Tabu-Themen) → spart teure Fehlversuche, VOR dem Build klären.

## 3 · Finanzielle Einordnung (wie viel kann man verlangen?)
- 🔎🧠 **Auftragswert:** Was bringt EIN Kundenauftrag bei ihm? (Dachdecker 5–30k vs. Friseur 30 €) →
  bestimmt, was ein Lead und damit die Website wert ist, und wie selbstbewusst der Preis sein darf.
- 🔎 Betriebsgröße (Mitarbeiter, Standorte, Fuhrpark) als Budget-Indiz.
- 🔎🧠 Marktlage / Wettbewerbsdruck in Branche + Region.
- 🔎 Schon Marketing-Budget / Google Ads aktiv? Investiert er bereits in Sichtbarkeit?
- → **Ableitung:** Paket (Starter/Premium/Individual) + Preisspielraum + Add-on-Potenzial.

## 4 · Digitaler Status quo
- 🔎 Aktuelle Website: vorhanden? Zustand, Alter, mobil, was fehlt / was ist peinlich?
- 🔎 Google-Profil + Bewertungen (Sterne/Anzahl)? Social Media aktiv (FB/Insta/TikTok)?
- 🔎💬 Vorhandene Assets: Logo (in guter Auflösung?), echte Fotos, Texte, Referenzen, Auszeichnungen?
  → Was können wir vorab holen, damit die Demo ECHT wirkt statt generisch?

## 5 · Wettbewerb
- 🔎 2–3 regionale Wettbewerber ansehen + wie deren Websites aussehen → Benchmark + bewusste
  Differenzierung („was hat keiner von denen?").

## 6 · Conversion-Ziel der Seite
- 🧠💬 Was soll die Website PRIMÄR bewirken? Anruf · Anfrage-Formular · Online-Bestellung ·
  Terminbuchung · Recruiting/Bewerbungen? → die EINE wichtigste Call-to-Action.

## 7 · Markenwelt / Emotion
- 🧠 Welches Gefühl soll die Seite vermitteln? (seriös · warm · edel · bodenständig · modern ·
  traditionsreich) Passt zum Charakter des Inhabers (s. 2).
- 🧠 Branchentypische Bildwelt / Materialien → Basis für Assets + Signature-Element.

## → Output: Kundenprofil (kompakt, in `project_<kunde>` Memory festhalten)
- 1-Satz-Steckbrief + Inhaber + **Charakter**
- **Paket-Empfehlung + Preis(spielraum) + Add-ons** (aus Abschnitt 3)
- **Niveau-Anker** (welcher bestehende VALORIS-Build ist der Maßstab) + **Signature-Element**
- **Primäre CTA** / Conversion-Ziel
- **Pitch-Winkel:** was bringt GENAU diesen Inhaber zum Abschluss
- **No-Gos** des Inhabers (was auf keinen Fall)
- **Lücken:** was fehlt noch (von Frederic zu holen) — v. a. Charakter 💬 + No-Gos + Assets

**Regel:** Fehlen Pflicht-Infos (besonders Charakter 💬), GEZIELT bei Frederic nachfragen — nicht raten.
Annahmen (🧠) immer als solche kennzeichnen, damit Frederic sie schnell bestätigen/korrigieren kann.
