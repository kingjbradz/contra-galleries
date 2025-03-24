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
      id="top"
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
        style={{ maxWidth: "500px", maxHeight: "400px" }}
      />
      <Box sx={{ maxWidth: "75%", textAlign: "center", marginTop: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {artwork.artist.length > 0 && (
            <Typography variant="h4">
              {artwork.artist}
            </Typography>
          )}
          {artwork.title.length > 0 && 
          <Typography sx={{ fontStyle: "italic" }}>
            {artwork.title}
          </Typography>}
          <Typography>
            {artwork.year}
          </Typography>
          <Typography>{artwork.material}</Typography>
          {artwork.dimensions.length > 0 && (
            <Typography>{artwork.dimensions}</Typography>
          )}
          {artwork.signed.length > 0 && (
            <Typography>{artwork.signed}</Typography>
          )}
          {artwork.info.length > 0 && (
            <Typography>{artwork.info}</Typography>
          )}
          {artwork.price.length > 0 && (
            <Typography>{artwork.price}</Typography>
          )}
        </Box>
        {artwork.images.length > 0 ? 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center"
            // height: "200px"
          }}
        >
          {artwork.images.map((i, index) => (
            <img
              key={index}
              src={i}
              alt={`Image ${index}`}
              style={{ 
                // maxWidth: "200px",
                height: "40px",
                width: "40px",
                margin: "8px 8px 32px 0",
               }}
            />
          ))}
        </Box> : <br />}
      </Box>
    </Box>
  );
};

export default CarouselGalleryItem;
