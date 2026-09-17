import fs from "node:fs";

const source = fs.readFileSync("lib/cj-catalog.ts", "utf8");
const pidMatches = [...source.matchAll(/pid:\s*"([^"]+)"/g)].map((m) => m[1]);
const urlMatches = [...source.matchAll(/sourceUrl:\s*"(https:\/\/www\.cjdropshipping\.com\/product\/[^\"]+)"/g)].map((m) => m[1]);
const names = [...source.matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
const videoFlags = [...source.matchAll(/videoGalleryObserved:\s*(true|false)/g)].map((m) => m[1] === "true");

const unique = (items) => new Set(items).size === items.length;
const errors = [];

if (pidMatches.length !== names.length) errors.push(`PID/name count mismatch: ${pidMatches.length}/${names.length}`);
if (pidMatches.length !== urlMatches.length) errors.push(`PID/sourceUrl count mismatch: ${pidMatches.length}/${urlMatches.length}`);
if (!unique(pidMatches)) errors.push("Duplicate CJ product PID detected");
if (!unique(urlMatches)) errors.push("Duplicate CJ source URL detected");
if (pidMatches.some((pid) => !pid.trim())) errors.push("Blank CJ PID detected");
if (names.some((name) => !name.trim())) errors.push("Blank product name detected");

for (const url of urlMatches) {
  if (!url.includes("/product/") || !url.endsWith(".html")) errors.push(`Malformed CJ source URL: ${url}`);
}

if (errors.length) {
  console.error("CJ catalog validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const videoCount = videoFlags.filter(Boolean).length;
console.log(`CJ catalog integrity OK: ${pidMatches.length} sourced products; ${videoCount} with CJ video galleries observed.`);
console.log("All entries remain sample-required/live-check until exact variant inventory, shipping and physical sample quality are confirmed.");
