import { useLocation } from "react-router";
import { Box, Typography } from "@mui/material";

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

  if (!artwork) {
    return <Typography>No artwork details available.</Typography>;
  }

  return (
    <Box sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}>
      <img src={artwork.image} alt={artwork.title} />
      <Typography>{artwork.title}</Typography>
      <Typography>{artwork.year}</Typography>
      <Typography>{artwork.type}</Typography>
      <Typography>{artwork.info}</Typography>
    </Box>
  );
};

export default FeaturedArtistItem;
