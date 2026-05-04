// carousel component
//@ts-ignore
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselGalleryItem from "./CarouselGalleryItem";
import LazyImage from "../Components/LazyImage";
import { Exhibition, ExhibitionArtwork } from "../utils/global-types";

const CarouselGalleryCont = ({ exhibition }: { exhibition?: Exhibition }) => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const { artworkSlug } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const artworks: ExhibitionArtwork[] = exhibition?.artworks ?? [];

  // Sync slider position to URL slug on load / artwork list change
  useEffect(() => {
    if (artworkSlug && artworks.length) {
      const index = artworks.findIndex((artwork) => artwork.slug === artworkSlug);
      if (index !== -1) {
        setActiveIndex(index);
        sliderRef.current?.slickGoTo(index);
      }
    }
  }, [artworkSlug, artworks]);

  // Reset slider when the exhibition itself changes
  useEffect(() => {
    setActiveIndex(0);
    sliderRef.current?.slickGoTo(0, false);
  }, [exhibition?.slug]);

  // Update active index state and navigate to the new artwork's URL
  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
    const artwork = artworks[newIndex];
    if (artwork?.slug && exhibition?.slug) {
      navigate(`/${exhibition.slug}/${artwork.slug}`, { replace: true });
    }
  };

  // Resolve cover image for a given artwork, falling back to first image
  const getCoverImage = (artwork: ExhibitionArtwork): string | undefined => {
    return (
      artwork.artwork_images?.find((img) => img.is_cover)?.url ??
      artwork.artwork_images?.[0]?.url
    );
  };

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    afterChange: handleSlideChange,
    customPaging: (i: number) => (
      <div>
        <a>
          <LazyImage
            src={getCoverImage(artworks[i])}
            alt={`Thumbnail ${i + 1}`}
            width={25}
            height={25}
            borderRadius="16px"
            border={i === activeIndex ? "2px solid black" : "none"}
          />
        </a>
      </div>
    ),
  };

  if (!exhibition) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <CircularProgress sx={{ color: "common.black" }} />
      </Box>
    );
  }

  return (
    <Box
      className="slider-container"
      sx={{
        textAlign: "center",
        paddingTop: 1,
        width: "100%",
        "& .slick-slider": {
          height: "100%",
          position: "initial",
          display: "",
          boxSizing: "",
        },
        "& .slick-slider, & .slick-list, & .slick-track, & .slick-slide": {
          height: "100%",
        },
        "& .slick-dots li": {
          margin: "0 8px",
        },
        "& .slick-dots": {
          bottom: "5px !important",
        },
        "& .slick-slide": {
          "& > div": {
            height: "100%",
          },
        },
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {artworks.map((artwork) => (
          <CarouselGalleryItem key={artwork.slug} artwork={artwork} />
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselGalleryCont;