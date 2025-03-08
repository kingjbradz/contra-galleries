import { useLocation } from "react-router";
import { Box, Typography } from "@mui/material";

interface GalleryItemProps {
  name: string;
}

const GalleryItem = () => {
    const location = useLocation();
  return (
    <Box
      sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}
    >
      <img src={location.state.image} alt={location.state.title} />
      <Typography>{location.state.title}</Typography>
      <Typography>{location.state.artist}</Typography>
      <Typography>{location.state.year}</Typography>
      <Typography>{location.state.type}</Typography>
      <Typography>{location.state.info}</Typography>
    </Box>
  );
};

export default GalleryItem;