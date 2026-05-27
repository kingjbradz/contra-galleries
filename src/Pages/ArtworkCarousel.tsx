import React, { useState, useCallback, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ArtworkCarouselProps {
  images?: { url: string }[];
  title?: string;
}

export default function ArtworkCarousel({ images = [], title }: ArtworkCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      if (images.length <= 1) return;
      setIndex(next);
    },
    [images.length]
  );

  const prev = useCallback(() => {
    go((index - 1 + images.length) % images.length);
  }, [go, index, images.length]);

  const next = useCallback(() => {
    go((index + 1) % images.length);
  }, [go, index, images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <Box
      sx={{ position: "absolute", inset: 0, overflow: "hidden", userSelect: "none" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, i) => (
        <Box
          key={img.url}
          component="img"
          src={img.url}
          alt={`${title} — image ${i + 1}`}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.9) contrast(1.05)",
            opacity: i === index ? 1 : 0,
            transition: "opacity 400ms ease",
            willChange: "opacity",
          }}
        />
      ))}

      {images.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(4px)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" }, zIndex: 2, p: "4px",
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={next}
            size="small"
            sx={{
              position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
              bgcolor: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(4px)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" }, zIndex: 2, p: "4px",
            }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>

          {images?.length > 1 ? <Box
            sx={{
              position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: "6px", zIndex: 2, padding: "4px"
            }}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={() => go(i)}
                sx={{
                  width: i === index ? 18 : 7, height: 7, borderRadius: "4px",
                  bgcolor: i === index ? "#fff" : "rgba(255,255,255,0.45)",
                  cursor: "pointer",
                  transition: "width 250ms ease, background-color 250ms ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </Box> : <></>}

          <Box
            sx={{
              position: "absolute", top: 8, right: 8,
              bgcolor: "rgba(0,0,0,0.5)", color: "#fff",
              fontSize: "11px", fontFamily: "monospace",
              px: "6px", py: "2px", borderRadius: "4px",
              backdropFilter: "blur(4px)", zIndex: 2, letterSpacing: "0.05em",
            }}
          >
            {index + 1} / {images.length}
          </Box>
        </>
      )}
    </Box>
  );
}