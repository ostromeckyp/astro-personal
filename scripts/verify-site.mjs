#!/usr/bin/env node
// Checks the redesign's hard rules:
//   --bodies <ref>  post bodies are byte-identical to <ref> (only frontmatter may change)
//   --html          built pages contain no design placeholders or artifact asset URLs
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

const args = process.argv.slice(2);
const failures = [];
const bodiesAt = args.indexOf("--bodies");
if (bodiesAt !== -1) failures.push(...checkBodies(args[bodiesAt + 1]));
if (args.includes("--html")) failures.push(...checkHtml());

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("verify-site: ok");
