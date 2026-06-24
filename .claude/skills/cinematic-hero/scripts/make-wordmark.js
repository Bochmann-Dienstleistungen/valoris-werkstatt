#!/usr/bin/env node
// Wortmarke → SVG-Letterpfade (für DrawSVG-Stroke UND Mask-Daten-URI).
// Nutzung: node make-wordmark.js "MARKE" out.json [fontPfad] [size=280] [tracking=-6]
// Benötigt: npm i opentype.js
// charToGlyph pro Buchstabe statt getPath(text) — umgeht GSUB-Crashes bei Variable Fonts.
const opentype = require('opentype.js');
const fs = require('fs');
const [,, word, out, fontArg, sizeArg, trackArg] = process.argv;
if (!word || !out) { console.error('usage: make-wordmark <WORT> <out.json> [font] [size] [tracking]'); process.exit(1); }
const fontPath = fontArg || '/System/Library/Fonts/Supplemental/Arial Black.ttf';
const size = parseInt(sizeArg || '280', 10);
const tracking = parseFloat(trackArg || '-6');

const f = opentype.parse(fs.readFileSync(fontPath).buffer);
const scale = size / f.unitsPerEm;
let x = 0; const letters = []; const bb = { x1: 1e9, y1: 1e9, x2: -1e9, y2: -1e9 };
for (const ch of word) {
  const g = f.charToGlyph(ch);
  const p = g.getPath(x, 0, size);
  const b = p.getBoundingBox();
  bb.x1 = Math.min(bb.x1, b.x1); bb.y1 = Math.min(bb.y1, b.y1);
  bb.x2 = Math.max(bb.x2, b.x2); bb.y2 = Math.max(bb.y2, b.y2);
  letters.push(p.toPathData(2));
  x += g.advanceWidth * scale + tracking;
}
const pad = 4;
const result = {
  viewBox: [(bb.x1 - pad).toFixed(1), (bb.y1 - pad).toFixed(1), (bb.x2 - bb.x1 + 2 * pad).toFixed(1), (bb.y2 - bb.y1 + 2 * pad).toFixed(1)].join(' '),
  width: Math.round(bb.x2 - bb.x1 + 2 * pad),
  height: Math.round(bb.y2 - bb.y1 + 2 * pad),
  letters
};
fs.writeFileSync(out, JSON.stringify(result));
console.log('ok', word, 'viewBox', result.viewBox);
