#!/usr/bin/env node
// Checks the redesign's hard rules:
//   --bodies <ref>  post bodies are byte-identical to <ref> (only frontmatter may change)
//   --html          built pages contain no design placeholders or artifact asset URLs
//   --seo           built pages have canonicals, sound titles and descriptions, share tags and valid JSON-LD
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const PLACEHOLDERS = [
  "[from", "[day rate", "[ — ]", "[meetups", "[members", "[since", "[year", "[venue", "[Podcast",
  "[two working", "[Privacy", "[Shown with", "[estimated", "[time ", "[duplicate", "[salons", "[forms",
  "[share of", "[Client testimonial", "[Name, role", "/_blob/",
];

function checkBodies(ref) {
  const failures = [];
  for (const file of fs.readdirSync("content/blog").filter((f) => f.endsWith(".md"))) {
    const p = path.posix.join("content/blog", file);
    const before = execFileSync("git", ["show", `${ref}:${p}`], { encoding: "utf8" });
    // gray-matter caches by input, so bypass it to compare the two parses independently.
    const a = matter(before, { excerpt: false, language: "yaml" }).content;
    const b = matter(fs.readFileSync(p, "utf8"), { excerpt: false, language: "yaml" }).content;
    if (a !== b) failures.push(p);
  }
  return failures.map((f) => `body changed: ${f}`);
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(html|rsc)$/.test(entry.name)) yield full;
  }
}

function checkHtml() {
  const failures = [];
  for (const file of walk(".next/server/app")) {
    const text = fs.readFileSync(file, "utf8");
    for (const needle of PLACEHOLDERS) {
      if (text.includes(needle)) failures.push(`${file}: ${needle}`);
    }
  }
  return failures;
}

const SITE_URL = "https://www.ostromecki.dev";
const TITLE_LIMIT = 70;
const DESCRIPTION_LIMIT = 160;

const decode = (text) =>
  text.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function* builtPages(dir, base = dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* builtPages(full, base);
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("_")) {
      const route = `/${path.relative(base, full).replace(/\.html$/, "")}`;
      yield { file: full, route: route === "/index" ? "/" : route };
    }
  }
}

function checkSeo() {
  const failures = [];
  for (const { file, route } of builtPages(".next/server/app")) {
    const html = fs.readFileSync(file, "utf8");
    const meta = (attr, name) => html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1];
    const fail = (message) => failures.push(`${route}: ${message}`);

    // Next drops the trailing slash of the root URL.
    const expected = route === "/" ? SITE_URL : `${SITE_URL}${route}`;
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical !== expected) fail(`canonical is ${canonical}, expected ${expected}`);

    const title = decode(html.match(/<title>([^<]*)/)?.[1] ?? "");
    if (!title) fail("no title");
    if (!route.startsWith("/blog/") && title.length > TITLE_LIMIT) fail(`title is ${title.length} characters`);

    const description = decode(meta("name", "description") ?? "");
    if (!description) fail("no description");
    if (description.length > DESCRIPTION_LIMIT) fail(`description is ${description.length} characters`);

    for (const name of ["og:title", "og:url", "og:image", "og:site_name"]) {
      if (!meta("property", name)) fail(`no ${name}`);
    }
    for (const [, block] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try {
        JSON.parse(block);
      } catch {
        fail("JSON-LD does not parse");
      }
    }
  }
  return failures;
}

const args = process.argv.slice(2);
const failures = [];
const bodiesAt = args.indexOf("--bodies");
if (bodiesAt !== -1) failures.push(...checkBodies(args[bodiesAt + 1]));
if (args.includes("--html")) failures.push(...checkHtml());
if (args.includes("--seo")) failures.push(...checkSeo());

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("verify-site: ok");
