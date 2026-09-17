import fs from "node:fs";

const source = fs.readFileSync("lib/products.ts", "utf8");
const urls = [...source.matchAll(/(?:image|gallery):\s*\[?\s*["'](https?:\/\/[^"']+)["']/g)].map((match) => match[1]);

if (!urls.length) {
  throw new Error("No product media URLs found in lib/products.ts");
}

const uniqueUrls = [...new Set(urls)];
const failures = [];

for (const url of uniqueUrls) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (!response.ok) {
      failures.push(`${response.status} ${url}`);
    }
  } catch (error) {
    failures.push(`NETWORK ${url} (${error instanceof Error ? error.message : String(error)})`);
  }
}

console.log(`Checked ${uniqueUrls.length} unique product media URLs.`);

if (failures.length) {
  console.error("Broken or unreachable product media URLs:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("All product media URLs responded successfully.");
