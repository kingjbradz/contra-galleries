//@ts-ignore
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { usePrivateGalleryData } from "../api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselGalleryCont = () => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = usePrivateGalleryData();
  const [activeIndex, setActiveIndex] = useState(0);

  interface Artwork {
    id: number;
    title: string;
    image: string;
    artist: string;
    year: string;
    info: string;
    material: string;
  }

  const artworks: Artwork[] = (data as Artwork[]) ?? [];

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
              src={artworks[i]?.image} // Use artwork thumbnail
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
        paddingTop: 1,
        flexGrow: 1,
        height: "80%",
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
      <Slider ref={sliderRef} {...settings}>
        {artworks.map((artwork) => (
          <Box
            key={artwork.id}
            sx={{
              display: "flex !important",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              style={{ maxWidth: "50%" }}
            />
            <Box sx={{ maxWidth: "75%", textAlign: "center" }}>
              <Typography variant="h4" marginBottom={1}>{artwork.artist}</Typography>
              <Typography sx={{ fontStyle: "italic" }} marginBottom={1}>{artwork.title}, {artwork.year}</Typography>
              <Typography marginBottom={1}>{artwork.material}</Typography>
              <Typography marginBottom={1}>{artwork.info}</Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselGalleryCont;
