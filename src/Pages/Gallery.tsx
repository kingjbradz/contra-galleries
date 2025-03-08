import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid2";
import { Box, Typography, CircularProgress, useMediaQuery } from "@mui/material";
import { useGeneralGalleryData } from "../api";

interface Artwork {
  title: string;
  image: string;
  artist: string;
}

const Gallery = () => {
  const navigate = useNavigate();
  const is520 = useMediaQuery("(min-width: 520px)");
  const { data, isLoading } = useGeneralGalleryData();

  const artworks: Artwork[] = (data as Artwork[]) ?? [];

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <CircularProgress sx={{ color: "common.black" }} />
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: is520 ? "row" : "column",
        alignItems: "center",
        margin: 1,
      }}
    >
      {artworks.map((artwork, index) => (
        <Box
          key={index} 
          onClick={() => navigate(`${artwork.title.replace(/\s+/g, "")}`, { state: artwork })}
          sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}
        >
          <img src={artwork.image} alt={artwork.title} />
          <Typography>{artwork.title}</Typography>
          <Typography>{artwork.artist}</Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default Gallery;
