import fs from "node:fs";

const errors = [];

const products = fs.readFileSync("lib/products.ts", "utf8");
const pids = [...products.matchAll(/cjPid:\s*"([^"]+)"/g)].map((m) => m[1]);
const slugs = [...products.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);

if (!pids.length) errors.push("No cjPid entries found in lib/products.ts");
if (pids.some((p) => !p.trim())) errors.push("Blank cjPid detected");
if (new Set(pids).size !== pids.length) errors.push("Duplicate cjPid detected in products.ts");
if (new Set(slugs).size !== slugs.length) errors.push("Duplicate slug detected in products.ts");

const sampleRequired = (products.match(/qualityStatus:\s*"sample-required"/g) || []).length;
const approved = (products.match(/qualityStatus:\s*"approved"/g) || []).length;

if (fs.existsSync("lib/cj-catalog.ts")) {
  const source = fs.readFileSync("lib/cj-catalog.ts", "utf8");
  const catalogPids = [...source.matchAll(/pid:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (catalogPids.length && new Set(catalogPids).size !== catalogPids.length) {
    errors.push("Duplicate PID in lib/cj-catalog.ts");
  }
}

if (errors.length) {
  console.error("CJ / catalog validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Catalog integrity OK: ${slugs.length} products, ${pids.length} CJ PIDs, ${sampleRequired} sample-required, ${approved} approved.`
);
