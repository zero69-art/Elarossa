"use client";

import { useState } from "react";

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function SafeImage({ fallbackSrc = "/image-fallback.svg", onError, ...props }: SafeImageProps) {
  const [src, setSrc] = useState(props.src);
  const [failed, setFailed] = useState(false);

  return (
    <img
      {...props}
      src={failed ? fallbackSrc : src}
      onError={(event) => {
        if (!failed) {
          setFailed(true);
          setSrc(fallbackSrc);
        }
        onError?.(event);
      }}
    />
  );
}
