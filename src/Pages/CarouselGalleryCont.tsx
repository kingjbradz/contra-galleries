//@ts-ignore
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { usePrivateGalleryData } from "../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselGalleryItem from "./CarouselGalleryItem";

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

const CarouselGalleryCont = () => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = usePrivateGalleryData();
  const [activeIndex, setActiveIndex] = useState(0);

  const collection = data as Collection | null;
  const artworks: Artwork[] = collection?.artworks ?? [];
 
  // Sync URL ID with Slider index
  useEffect(() => {
    if (id && artworks.length) {
      const index = artworks.findIndex(
        (artwork) => artwork.id.toString() === id
      );
      if (index !== -1) {
        setActiveIndex(index);
        sliderRef.current?.slickGoTo(index);
      }
    }
  }, [id, artworks]);

  // Handle slide change
  const handleSlideChange = (newIndex: number) => {
    setActiveIndex(newIndex);
    const newId = artworks[newIndex]?.id;
    if (newId) {
      navigate(`/${newId}`);
    }
  };

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
            padding: "0 8px",
            
          }}
        >
          <a>
            <img
              src={artworks[i]?.cover} // Use artwork thumbnail
              alt={`Thumbnail ${i + 1}`}
              style={{
                height: "25px",
                width: "25px",
                objectFit: "cover",
                marginRight: "8px",
                borderRadius: "16px",
                border: i === activeIndex ? "2px solid black" : "none", // Highlight active thumbnail
              }}
            />
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
        flexGrow: 1,
        textAlign: "center",
        // height: "80%",
        position: "absolute",
        width: "90%",
        "& .slick-slider, & .slick-list, & .slick-track": {
          height: "100%",
        },
        "& .slick-dots li": {
          margin: "0 16px"
        }
      }}
    >
      <Typography 
        variant="h4"
        sx={{
          marginBottom: 4
      }}>{collection?.name}</Typography>
      <Slider ref={sliderRef} {...settings}>
        {artworks.map((artwork) => (
          <CarouselGalleryItem artwork={artwork} />
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselGalleryCont;
