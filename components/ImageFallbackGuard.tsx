"use client";

import { useEffect } from "react";

const FALLBACK_SRC = "/image-fallback.svg";

export default function ImageFallbackGuard() {
  useEffect(() => {
    const handleError = (event: Event) => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement)) return;
      if (image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.src = FALLBACK_SRC;
    };

    document.addEventListener("error", handleError, true);
    return () => document.removeEventListener("error", handleError, true);
  }, []);

  return null;
}
