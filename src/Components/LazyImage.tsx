import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
  borderRadius?: string | number | null;
  border?: string | null;
  isThumbnail?: boolean | null;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 40,
  height = 40,
  style = {},
  className = "",
  borderRadius,
  border,
  isThumbnail
}) => {
  const [loaded, setLoaded] = useState(false);
  const isThumbnailDeclaration = isThumbnail ? "8px 8px 0 0" : ""

  // Handles case when image is cached and onLoad doesn't fire
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{
            margin: isThumbnailDeclaration,
            borderRadius: borderRadius ?? 1,
            ...style,
          }}
        />
      )}
      {loaded && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{
            display: "block",
            width,
            height,
            margin: isThumbnailDeclaration,
            objectFit: "cover",
            borderRadius: borderRadius ?? 4,
            border: border ?? "none",
            ...style,
          }}
          className={className}
        />
      )}
    </>
  );
};

export default LazyImage;
