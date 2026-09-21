import fs from "node:fs";

const source = fs.readFileSync("lib/products.ts", "utf8");
const urls = [...source.matchAll(/https?:\/\/[^\s"'`,\]}]+/g)].map((match) => match[0]);

if (!urls.length) {
  throw new Error("No product media URLs found in lib/products.ts");
}

function isVideoUrl(url) {
  return (
    /\.mp4(\?|$)/i.test(url) ||
    url.includes("download-only-api.cjdropshipping.com") ||
    url.includes("video-cf.cjdropshipping.com") ||
    url.includes("/video/")
  );
}

const uniqueUrls = [...new Set(urls)];
const imageUrls = uniqueUrls.filter((u) => !isVideoUrl(u));
const videoUrls = uniqueUrls.filter(isVideoUrl);
const failures = [];

for (const url of imageUrls) {
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      headers: { "User-Agent": "Elarossa-QA/1.0" },
    });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "Elarossa-QA/1.0", Range: "bytes=0-0" },
      });
    }
    if (!response.ok) {
      failures.push(`${response.status} ${url}`);
    }
  } catch (error) {
    failures.push(`NETWORK ${url} (${error instanceof Error ? error.message : String(error)})`);
  }
}

console.log(`Checked ${imageUrls.length} image URLs (${videoUrls.length} video URLs skipped — served via app proxy).`);

if (failures.length) {
  console.error("Broken or unreachable product image URLs:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("All product image URLs responded successfully.");
