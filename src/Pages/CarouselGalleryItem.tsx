import {
  Box,
  Typography,
  useMediaQuery,
} from "@mui/material";
import LazyImage from "../Components/LazyImage";
import InfoAccordion from "../Components/InfoAccordion";

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
  isLoading: boolean | null;
}

const CarouselGalleryItem: React.FC<CarouselGalleryItemProps> = ({
  artwork
}) => {
  if (!artwork) {
    return <Typography variant="h6">No artwork selected</Typography>; // Handle undefined artwork safely
  }

  const isMd = useMediaQuery("(min-width: 900px)");

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
      <LazyImage
        src={artwork.cover}
        alt={artwork.title}
        width={isMd ? 500 : 350}
        height={400}
      />
      <Box
        sx={{
          maxWidth: "500px",
          textAlign: "center",
          marginTop: 1,
          width: "100%"
        }}
      >
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 1,
          }}
        >
          {artwork.artist.length > 0 && (
            <Typography variant="h4">{artwork.artist}</Typography>
          )}
        </Box> */}
        <InfoAccordion 
          title={
            artwork.artist.length > 0 ? `${artwork.artist} - ${artwork.title}` : artwork.title
          }
          content={
            <>
            <Typography>{artwork.year}</Typography>
            <Typography>{artwork.material}</Typography>
            {artwork.dimensions.length > 0 && (
              <Typography>{artwork.dimensions}</Typography>
            )}
            {artwork.signed.length > 0 && (
              <Typography>{artwork.signed}</Typography>
            )}
            {artwork.info.length > 0 && <Typography>{artwork.info}</Typography>}
            {artwork.price.length > 0 && <Typography>{artwork.price}</Typography>}
            {artwork.images.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {artwork.images.map((src, index) => (
                  <LazyImage key={index} src={src} alt={`Image ${index}`} isThumbnail />
                ))}
              </Box>
            ) : (
              <></>
            )}
          </>}
        />
      </Box>
    </Box>
  );
};

export default CarouselGalleryItem;

{/* <pre>{JSON.stringify(artwork, null, 2)}</pre> */}