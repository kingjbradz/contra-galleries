import { Box, Typography } from "@mui/material";

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

interface CarouselGalleryItemProps {
  artwork: Artwork | null;
}

const CarouselGalleryItem: React.FC<CarouselGalleryItemProps> = ({
  artwork,
}) => {
  if (!artwork) {
    return <Typography variant="h6">No artwork selected</Typography>; // Handle undefined artwork safely
  }

  return (
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
        src={artwork.cover}
        alt={artwork.title}
        style={{ maxWidth: "500px", maxHeight: "200px" }}
      />
      <Box sx={{ maxWidth: "75%", textAlign: "center", marginTop: 1 }}>
        {artwork.artist.length > 0 && (
          <Typography variant="h4" marginBottom={1}>
            {artwork.artist}
          </Typography>
        )}
        {artwork.title.length > 0 && 
        <Typography sx={{ fontStyle: "italic" }} marginBottom={1}>
          {artwork.title}
        </Typography>}
        <Typography marginBottom={1}>
          {artwork.year}
        </Typography>
        <Typography marginBottom={1}>{artwork.material}</Typography>
        {artwork.dimensions.length > 0 && (
          <Typography marginBottom={1}>{artwork.dimensions}</Typography>
        )}
        {artwork.signed.length > 0 && (
          <Typography marginBottom={1}>{artwork.signed}</Typography>
        )}
        {artwork.info.length > 0 && (
          <Typography marginBottom={1}>{artwork.info}</Typography>
        )}
        {artwork.price.length > 0 && (
          <Typography marginBottom={1}>{artwork.price}</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            height: "200px"
          }}
        >
          {artwork.images.map((i, index) => (
            <img
              key={index}
              src={i}
              alt={`Image ${index}`}
              style={{ maxWidth: "200px",
                 margin: "8px 8px 32px 0",
                 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselGalleryItem;
