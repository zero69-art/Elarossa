#!/usr/bin/env node
/**
 * CI helper: find all .har under e2e/fixtures and sanitize in place (no .bak).
 * Exits 0 when no HAR files exist.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "e2e", "fixtures");

function collect(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    if (name.endsWith(".bak")) continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out.push(...collect(p));
    else if (name.endsWith(".har")) out.push(p);
  }
  return out;
}

const files = collect(root);
if (!files.length) {
  console.log("No HAR fixtures under e2e/fixtures — skipping sanitize.");
  process.exit(0);
}

const sanitizer = path.join(__dirname, "sanitize-har.mjs");
const result = spawnSync(process.execPath, [sanitizer, ...files, "--no-bak"], {
  stdio: "inherit",
});
process.exit(result.status ?? 1);
