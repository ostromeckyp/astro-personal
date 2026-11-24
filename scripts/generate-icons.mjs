#!/usr/bin/env node
// Builds the icon set from one SVG. Rerun after changing the mark: node scripts/generate-icons.mjs
import fs from "node:fs";
import sharp from "sharp";

const INK = "#000002";
const ACCENT = "#CCFF00";

// The bracket-spark mark: code brackets around an AI spark.
// Round caps and a large spark keep it readable at 16px.
function markSvg(radius) {
  const r = 24;
  const k = r * 0.14;
  const c = 64;
  const spark = `M${c} ${c - r}Q${c + k} ${c - k} ${c + r} ${c}Q${c + k} ${c + k} ${c} ${c + r}Q${c - k} ${c + k} ${c - r} ${c}Q${c - k} ${c - k} ${c} ${c - r}Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="${radius}" fill="${INK}"/><g fill="none" stroke="${ACCENT}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><polyline points="38,40 18,64 38,88"/><polyline points="90,40 110,64 90,88"/></g><path fill="${ACCENT}" d="${spark}"/></svg>\n`;
}

const png = (svg, size) => sharp(Buffer.from(svg), { density: 1200 }).resize(size, size).png().toBuffer();

/** An ICO file is a small directory followed by PNG images. */
function toIco(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}

const rounded = markSvg(28);
// iOS applies its own mask and Android may too, so these stay square.
const square = markSvg(0);

fs.writeFileSync("app/icon.svg", rounded);
fs.writeFileSync("app/apple-icon.png", await png(square, 180));
fs.writeFileSync("public/icon-192.png", await png(square, 192));
fs.writeFileSync("public/icon-512.png", await png(square, 512));
// Square logo for profiles such as LinkedIn (recommended 400x400); not served by the site.
fs.mkdirSync("brand", { recursive: true });
fs.writeFileSync("brand/logo-400.png", await png(square, 400));
fs.writeFileSync("brand/logo-1024.png", await png(square, 1024));
const sizes = [16, 32, 48];
fs.writeFileSync("app/favicon.ico", toIco(await Promise.all(sizes.map(async (size) => ({ size, data: await png(rounded, size) })))));
