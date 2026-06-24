#!/usr/bin/env node
// Luminanz → Alphakanal: weiß-auf-schwarz-Bild wird weißes Alpha-Cutout (Wolke/Nebel).
// Nutzung: node lum-alpha.js <in.png> <out.png> [gamma=1.2] [width=2400]
// Benötigt: npm i sharp (im selben Ordner oder global auflösbar)
const sharp = require('sharp');
const [,, src, dst, gammaArg, widthArg] = process.argv;
if (!src || !dst) { console.error('usage: lum-alpha <in> <out> [gamma] [width]'); process.exit(1); }
const gamma = parseFloat(gammaArg || '1.2');
const width = parseInt(widthArg || '2400', 10);

(async () => {
  const base = await sharp(src).resize({ width, kernel: 'lanczos3' }).toBuffer();
  const alpha = await sharp(base).greyscale().gamma(gamma).toColourspace('b-w')
    .raw().toBuffer({ resolveWithObject: true });
  const { info } = alpha;
  const white = await sharp({ create: { width: info.width, height: info.height, channels: 3, background: '#ffffff' } })
    .raw().toBuffer();
  await sharp(white, { raw: { width: info.width, height: info.height, channels: 3 } })
    .joinChannel(alpha.data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .png().toFile(dst);
  console.log('ok', dst, info.width + 'x' + info.height, 'gamma', gamma);
})();
