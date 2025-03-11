import { Box, Typography } from "@mui/material";

interface Artwork {
  id: string;
  title: string;
  image: string;
  artist: string;
}

interface CarouselGalleryItemProps {
  artwork: Artwork | null;
}

const CarouselGalleryItem: React.FC<CarouselGalleryItemProps> = ({ artwork }) => {
  if (!artwork) {
    return <Typography variant="h6">No artwork selected</Typography>; // Handle undefined artwork safely
  }

  return (
    <Box sx={{ textAlign: "center", mb: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        {artwork?.title}
      </Typography>
      <Typography variant="subtitle1">{artwork?.artist}</Typography>
    </Box>
  );
};

export default CarouselGalleryItem;
