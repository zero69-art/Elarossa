#!/usr/bin/env node
/**
 * Fail if HAR files still look like they contain secrets.
 *
 * Usage:
 *   node scripts/scan-har.mjs e2e/fixtures/*.har
 *   npm run har:scan -- e2e/fixtures
 */
import fs from "node:fs";
import path from "node:path";

const roots = process.argv.slice(2);
if (!roots.length) {
  console.error("Usage: node scripts/scan-har.mjs <file.har|dir>...");
  process.exit(1);
}

const PATTERNS = [
  { name: "Stripe live/test secret", re: /\bsk_(live|test)_[A-Za-z0-9]{10,}\b/ },
  { name: "Stripe publishable key", re: /\bpk_(live|test)_[A-Za-z0-9]{10,}\b/ },
  { name: "Stripe client secret", re: /\bcs_(live|test)_[A-Za-z0-9]{10,}\b/ },
  { name: "Bearer token", re: /\bBearer\s+[A-Za-z0-9._\-]{20,}/i },
  { name: "JWT", re: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/ },
];

function collectHarFiles(root) {
  const abs = path.resolve(root);
  if (!fs.existsSync(abs)) return [];
  const st = fs.statSync(abs);
  if (st.isFile()) return abs.endsWith(".har") ? [abs] : [];
  const out = [];
  for (const name of fs.readdirSync(abs)) {
    const p = path.join(abs, name);
    if (name.endsWith(".bak")) continue;
    if (fs.statSync(p).isDirectory()) out.push(...collectHarFiles(p));
    else if (name.endsWith(".har")) out.push(p);
  }
  return out;
}

function headerStillSensitive(text, headerName) {
  const re = new RegExp(
    `"name"\\s*:\\s*"${headerName}"[\\s\\S]{0,160}?"value"\\s*:\\s*"([^\"]*)"`,
    "gi"
  );
  let m;
  while ((m = re.exec(text)) !== null) {
    const value = m[1];
    if (!value || value === "[REDACTED]" || value === "REDACTED") continue;
    if (value.length >= 4) return true;
  }
  return false;
}

const files = [...new Set(roots.flatMap(collectHarFiles))];
if (!files.length) {
  console.log("No HAR files found — nothing to scan.");
  process.exit(0);
}

let issues = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const { name, re } of PATTERNS) {
    if (re.test(text)) {
      console.error(`SECRET? ${name} in ${file}`);
      issues += 1;
    }
  }
  for (const header of ["Authorization", "Cookie", "Set-Cookie", "CJ-Access-Token", "X-Api-Key"]) {
    if (headerStillSensitive(text, header)) {
      console.error(`SECRET? ${header} header not redacted in ${file}`);
      issues += 1;
    }
  }
}

if (issues) {
  console.error(`\n${issues} potential secret(s) found. Run: npm run har:sanitize -- <file>`);
  process.exit(1);
}

console.log(`HAR secret scan OK (${files.length} file(s)).`);
