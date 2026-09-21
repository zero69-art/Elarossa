import { NextResponse } from "next/server";
import { products } from "@/lib/products";

/**
 * Proxies CJ product videos with required Referer so the browser can play them.
 * Only allows video URLs that belong to products in our catalog.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const product = products.find((p) => p.slug === slug);
  const videoUrl = product?.video;
  if (!videoUrl || !videoUrl.includes("cjdropshipping.com")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const upstream = await fetch(videoUrl, {
      headers: {
        Referer: "https://developers.cjdropshipping.com/",
        "User-Agent": "ElarossaMedia/1.0",
      },
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: "Upstream video unavailable" }, { status: 502 });
    }
    const contentType = upstream.headers.get("content-type") || "video/mp4";
    const body = upstream.body;
    if (!body) return NextResponse.json({ error: "Empty video" }, { status: 502 });

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  } catch {
    return NextResponse.json({ error: "Video fetch failed" }, { status: 502 });
  }
}
