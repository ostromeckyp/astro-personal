#!/usr/bin/env node
// Builds the icon set from one SVG. Rerun after changing the mark: node scripts/generate-icons.mjs
import fs from "node:fs";
import sharp from "sharp";

const INK = "#000002";
const SAKURA = "#FA0980";

// The aperture mark from the design system, on the site's ground.
// Thick gaps and a large centre keep it readable at 16px.
function apertureSvg(radius) {
  const cx = 64;
  const blades = Array.from({ length: 8 }, (_, i) => {
    const a = ((i * 45 - 90) * Math.PI) / 180;
    const b = (((i + 1) * 45 - 90) * Math.PI) / 180;
    const point = (angle) => `${(cx + 46 * Math.cos(angle)).toFixed(2)} ${(cx + 46 * Math.sin(angle)).toFixed(2)}`;
    return `<path d="M${cx} ${cx}L${point(a)}A46 46 0 0 1 ${point(b)}Z"/>`;
  }).join("");
  const gaps = [0, 45, 90, 135]
    .map((deg) => `<line x1="${cx}" y1="10" x2="${cx}" y2="118" transform="rotate(${deg} ${cx} ${cx})"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="${radius}" fill="${INK}"/><g fill="${SAKURA}">${blades}</g><g stroke="${INK}" stroke-width="6">${gaps}</g><circle cx="${cx}" cy="${cx}" r="14" fill="${INK}"/></svg>\n`;
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

const rounded = apertureSvg(28);
// iOS applies its own mask and Android may too, so these stay square.
const square = apertureSvg(0);

fs.writeFileSync("app/icon.svg", rounded);
fs.writeFileSync("app/apple-icon.png", await png(square, 180));
fs.writeFileSync("public/icon-192.png", await png(square, 192));
fs.writeFileSync("public/icon-512.png", await png(square, 512));
const sizes = [16, 32, 48];
fs.writeFileSync("app/favicon.ico", toIco(await Promise.all(sizes.map(async (size) => ({ size, data: await png(rounded, size) })))));
