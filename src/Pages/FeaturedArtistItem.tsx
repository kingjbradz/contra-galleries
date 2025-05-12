import { useLocation } from "react-router";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LazyImage from "../Components/LazyImage";

interface ArtworkDetails {
  image: string;
  title: string;
  year: number;
  type: string;
  info: string;
}

const FeaturedArtistItem = () => {
  const location = useLocation();
  const artwork = location.state as ArtworkDetails | null;
  const isMd = useMediaQuery("(min-width: 900px)");

  if (!artwork) {
    return <Typography>No artwork details available.</Typography>;
  }

  return (
    <Box sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}>
      <LazyImage
        src={artwork.image}
        alt={artwork.title}
        width={isMd ? 500 : 350}
        height={"100%"}
      />
      <Typography sx={{ marginTop: 1 }}>{artwork.title}</Typography>
      <Typography>{artwork.year}</Typography>
      <Typography>{artwork.type}</Typography>
      <Typography>{artwork.info}</Typography>
    </Box>
  );
};

export default FeaturedArtistItem;
