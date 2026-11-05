#!/usr/bin/env node
// Blends a Real-ESRGAN upscale with the original hero, keeping skin natural while gaining sharpness.
// Full AI output looks waxy on faces, so the original stays half of the mix.
//
//   realesrgan-ncnn-vulkan -i original.jpg -o upscaled.png -n realesrgan-x4plus -s 4 -f png
//   node scripts/blend-hero.mjs original.jpg upscaled.png
//
// `original.jpg` must be the 1920×1080 source from git history, not the current blended file.
import sharp from "sharp";

const [original, upscaled] = process.argv.slice(2);
if (!original || !upscaled) {
  console.error("Usage: node scripts/blend-hero.mjs <original> <upscaled>");
  process.exit(1);
}

const WIDTH = 3840;
const HEIGHT = 2160;
const AI_SHARE = 0.5;

const pixels = (input) => sharp(input).resize(WIDTH, HEIGHT, { kernel: "lanczos3" }).removeAlpha().raw().toBuffer();
const [base, ai] = await Promise.all([pixels(original), pixels(upscaled)]);
const mixed = Buffer.alloc(base.length);
for (let i = 0; i < base.length; i++) mixed[i] = Math.round(base[i] * (1 - AI_SHARE) + ai[i] * AI_SHARE);

const out = await sharp(mixed, { raw: { width: WIDTH, height: HEIGHT, channels: 3 } })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/images/hero-key-visual-4k.jpg");
console.log(`${out.width}×${out.height}, ${Math.round(out.size / 1024)} KB`);
