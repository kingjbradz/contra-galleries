// carousel component
//@ts-ignore
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { usePrivateGalleryData } from "../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselGalleryItem from "./CarouselGalleryItem";
import { useLocation } from "react-router-dom"
import { useGalleryName } from "../Components/PrivateGalleryComponentName";
import LazyImage from "../Components/LazyImage";

interface Artwork {
  id: number;
  artist: string;
  title: string;
  dimensions: string;
  material: string;
  cover: string;
  year: string;
  info: string;
  signed: string;
  price: string;
  images: [];
}

interface Collection {
  name: string;
  artworks: Artwork[];
}

interface ArtistProp {
  url: string;
  name: string;
  id: number;
}

const CarouselGalleryCont = ({ artist }: { artist?: ArtistProp }) => {
  const { setName } = useGalleryName()
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const { id: artworkIdFromParams } = useParams();
  const { data, isLoading, refetch } = usePrivateGalleryData(artist?.url ?? null); // Pass artist.url to the hook
  const [activeIndex, setActiveIndex] = useState(0);

  const collection = data as Collection | null;
  const artworks: Artwork[] = collection?.artworks ?? [];

  // Sync URL ID with Slider index
  useEffect(() => {
    if (artworkIdFromParams && artworks.length) {
      const index = artworks.findIndex(
        (artwork) => artwork.id.toString() === artworkIdFromParams
      );
      if (index !== -1) {
        setActiveIndex(index);
        sliderRef.current?.slickGoTo(index);
      }
    }
  }, [artworkIdFromParams, artworks]);

  // Handle slide change
  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
    const newId = artworks[newIndex]?.id;
    if (newId) {
  
      const artistName = artist?.name?.replace(/\s+/g, ""); // This would be the artist name if it exists
  
      if (artistName) {
        // If an artist name exists, navigate to the artist's page and update the artwork ID
        navigate(`/${artistName}/${newId}`, { replace: true });
      } else {
        // If no artist name exists (general gallery), just update the ID part of the URL
        // This ensures you don't get into a situation where you end up with something like "/1/1"
        navigate(`/${newId}`, { replace: true });
      }
    }
  };

  // Refetch data when the artist prop changes
  useEffect(() => {
    if (artist?.url) {
      refetch(); // Trigger a manual refetch with the new URL
    }
    // Optionally reset activeIndex when the artist changes
    setActiveIndex(0);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0, false); // Go to the first slide without animation
    }
  }, [artist, refetch]);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    afterChange: handleSlideChange, // Update URL on slide change
    customPaging: function (i: number) {
      return (
        <div
          style={{
            // padding: "0 8px",
          }}
        >
          <a>
            <LazyImage
              src={artworks[i]?.cover}
              alt={`Thumbnail ${i + 1}`}
              width={25}
              height={25}
              borderRadius={"16px"}
              border={i === activeIndex ? "2px solid black" : "none"} // Highlight active thumbnail
            />
            {/* <img
              src={artworks[i]?.cover} // Use artwork thumbnail
              alt={`Thumbnail ${i + 1}`}
              style={{
                height: "25px",
                width: "25px",
                objectFit: "cover",
                // marginRight: "8px",
                borderRadius: "16px",
                border: i === activeIndex ? "2px solid black" : "none", // Highlight active thumbnail
              }}
            /> */}
          </a>
        </div>
      );
    },
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
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
        position: "absolute",
        paddingTop: 1,
        width: "100%",
        height: "80%",
        // "& .slick-slider, & .slick-list, & .slick-track": {
        //   height: "100%",
        // },
        "& .slick-slider, & .slick-list, & .slick-track, & .slick-slide": {
          height: "100%",
        },
        "& .slick-dots li": {
          margin: "0 8px",
        },
        "& .slick-slide": {
          "& > div": {
            height: "100%"
          }
        }
      }}
    >
      {/* {collection?.name && <Typography variant="h5" sx={{ marginBottom: 1 }}>
        {collection?.name}
      </Typography>} */}
      <Slider ref={sliderRef} {...settings}>
        {artworks.map((artwork) => (
          <CarouselGalleryItem key={artwork.id} artwork={artwork} isLoading={isLoading} />
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselGalleryCont;