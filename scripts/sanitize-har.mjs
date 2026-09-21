#!/usr/bin/env node
/**
 * Sanitize Playwright/Chrome HAR files before commit or share.
 *
 * Usage:
 *   node scripts/sanitize-har.mjs path/to/file.har
 *   node scripts/sanitize-har.mjs e2e/fixtures/*.har
 *   npm run har:sanitize -- e2e/fixtures/shop-api.har
 *
 * Writes in place. Creates a .bak alongside the first time unless --no-bak.
 */
import fs from "node:fs";
import path from "node:path";

const REDACTED = "[REDACTED]";
const args = process.argv.slice(2).filter((a) => a !== "--no-bak");
const noBak = process.argv.includes("--no-bak");

if (!args.length) {
  console.error("Usage: node scripts/sanitize-har.mjs <file.har> [more.har...] [--no-bak]");
  process.exit(1);
}

const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "x-auth-token",
  "x-access-token",
  "x-csrf-token",
  "proxy-authorization",
  "cj-access-token",
  "stripe-signature",
]);

const SENSITIVE_QUERY = /^(token|key|api_?key|access_?token|refresh_?token|session|sid|sig|signature|password|secret|auth|client_secret|code)$/i;

const SENSITIVE_JSON_KEYS =
  /^(password|passwd|email|phone|telephone|mobile|address|ssn|card|cardNumber|cvv|cvc|client_secret|authorization|token|accessToken|access_token|refreshToken|refresh_token|apiKey|api_key|secret|idToken|id_token|stripeKey|cjApiKey)$/i;

/** Patterns that look like live secrets in free text */
const SECRET_PATTERNS = [
  /\bsk_(live|test)_[A-Za-z0-9]+\b/g,
  /\bpk_(live|test)_[A-Za-z0-9]+\b/g,
  /\brk_(live|test)_[A-Za-z0-9]+\b/g,
  /\bcs_(live|test)_[A-Za-z0-9]+\b/g,
  /\bBearer\s+[A-Za-z0-9._\-]+/gi,
  /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, // JWT
];

function redactString(text) {
  if (!text || typeof text !== "string") return text;
  let out = text;
  for (const re of SECRET_PATTERNS) {
    out = out.replace(re, REDACTED);
  }
  return out;
}

function redactJson(value) {
  if (Array.isArray(value)) return value.map(redactJson);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (SENSITIVE_JSON_KEYS.test(k)) out[k] = REDACTED;
      else out[k] = redactJson(v);
    }
    return out;
  }
  if (typeof value === "string") return redactString(value);
  return value;
}

function cleanUrl(raw) {
  try {
    const u = new URL(raw);
    for (const key of [...u.searchParams.keys()]) {
      if (SENSITIVE_QUERY.test(key)) u.searchParams.set(key, "REDACTED");
    }
    return redactString(u.toString());
  } catch {
    return redactString(raw);
  }
}

function cleanHeaders(headers = []) {
  return headers.map((h) => {
    const name = String(h.name || "");
    if (SENSITIVE_HEADERS.has(name.toLowerCase())) {
      return { ...h, value: REDACTED };
    }
    return { ...h, value: redactString(String(h.value ?? "")) };
  });
}

function cleanText(text, mime = "") {
  if (!text) return text;
  const trimmed = text.trim();
  if (/json/i.test(mime) || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.stringify(redactJson(JSON.parse(text)));
    } catch {
      return redactString(text);
    }
  }
  return redactString(text);
}

function sanitizeHar(har) {
  let entries = 0;
  for (const entry of har.log?.entries || []) {
    entries += 1;
    if (entry.request) {
      entry.request.url = cleanUrl(entry.request.url);
      entry.request.headers = cleanHeaders(entry.request.headers || []);
      entry.request.cookies = [];
      if (entry.request.queryString) {
        entry.request.queryString = entry.request.queryString.map((q) =>
          SENSITIVE_QUERY.test(q.name) ? { ...q, value: "REDACTED" } : { ...q, value: redactString(String(q.value ?? "")) }
        );
      }
      if (entry.request.postData?.text) {
        entry.request.postData.text = cleanText(
          entry.request.postData.text,
          entry.request.postData.mimeType || ""
        );
      }
    }
    if (entry.response) {
      entry.response.headers = cleanHeaders(entry.response.headers || []);
      entry.response.cookies = [];
      const content = entry.response.content;
      if (content?.text) {
        content.text = cleanText(content.text, content.mimeType || "");
      }
    }
  }
  return entries;
}

let failed = 0;
for (const file of args) {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved)) {
    console.error(`Missing: ${file}`);
    failed += 1;
    continue;
  }
  let har;
  try {
    har = JSON.parse(fs.readFileSync(resolved, "utf8"));
  } catch (e) {
    console.error(`Invalid JSON: ${file}`, e.message);
    failed += 1;
    continue;
  }
  if (!har.log?.entries) {
    console.error(`Not a HAR (missing log.entries): ${file}`);
    failed += 1;
    continue;
  }
  if (!noBak) {
    const bak = resolved + ".bak";
    if (!fs.existsSync(bak)) fs.copyFileSync(resolved, bak);
  }
  const n = sanitizeHar(har);
  fs.writeFileSync(resolved, JSON.stringify(har, null, 2) + "\n");
  console.log(`Sanitized ${file} (${n} entries)`);
}

if (failed) process.exit(1);
