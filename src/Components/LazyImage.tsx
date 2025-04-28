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
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 40,
  height = 40,
  style = {},
  className = "",
  borderRadius,
  border
}) => {
  const [loaded, setLoaded] = useState(false);

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
            margin: "8px 8px 0 0",
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
            margin: "8px 8px 0px 0",
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
