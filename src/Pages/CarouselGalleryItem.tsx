import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LazyImage from "../Components/LazyImage";
import InfoAccordion from "../Components/InfoAccordion";
import { ExhibitionArtwork as ExhibitionArtworkProps } from "../utils/global-types";
import ExhibitionArtwork from "./ExhibitionArtwork";
import OverlayCard from "../Components/OverlayCard";
import BrushIcon from "@mui/icons-material/Brush";

interface CarouselGalleryItemProps {
  artwork: ExhibitionArtworkProps | null;
}

const CarouselGalleryItem: React.FC<CarouselGalleryItemProps> = ({
  artwork,
}) => {
  if (!artwork) {
    return <Typography variant="h6">No artwork selected</Typography>; // Handle undefined artwork safely
  }
  const [open, setOpen] = useState(false);

  const isMd = useMediaQuery("(min-width: 900px)");

  const coverImage =
    artwork.artwork_images?.find((img) => img.is_cover)?.url ??
    artwork.artwork_images?.[0]?.url;

  return (
    <>
      <Box
        key={artwork.artwork_id}
        id="top"
        sx={{
          display: "flex !important",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <LazyImage
        src={coverImage}
        alt={artwork.title}
        width={isMd ? 500 : 350}
        height={400}
      /> */}
        <OverlayCard
          onClick={() => setOpen(true)}
          image={coverImage}
          width={320}
          path={`${artwork?.slug}`}
          state={{ state: artwork }}
          top={artwork?.title!.length > 1 ? artwork.title : "Untitled"}
          icon={<BrushIcon />}
          bottom={
            artwork?.artist_name && artwork?.artist_name!.length > 1
              ? artwork?.artist_name
              : "Unknown Artist"
          }
        />
        <Box
          sx={{
            maxWidth: "500px",
            textAlign: "center",
            marginTop: 1,
            width: "100%",
          }}
        >
          {/* <InfoAccordion 
          title={
            artwork?.artist_name?.length > 0 ? `${artwork.artist_name} - ${artwork.title}` : artwork.title
          }
          content={
            <>
            <Typography>{artwork?.year}</Typography>
            <Typography>{artwork?.material}</Typography>
            {artwork?.dimension?.length > 0 && (
              <Typography>{artwork.dimensions}</Typography>
            )}
            {artwork?.signed?.length > 0 && (
              <Typography>{artwork.signed}</Typography>
            )}
            {artwork?.info?.length > 0 && <Typography>{artwork.info}</Typography>}
            {artwork?.price?.length > 0 && <Typography>{artwork.price}</Typography>}
            {artwork?.artwork_images?.length > 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {artwork.artwork_images.map((img) => (
                  <LazyImage key={img.id} src={img.url} alt={`Image ${img.id}`} isThumbnail />
                ))}
              </Box>
            ) : (
              <></>
            )}
          </>}
        /> */}
        </Box>
      </Box>
      <ExhibitionArtwork
        open={open}
        onClose={() => setOpen(false)}
        parentPath=""
        artwork={{
          image: artwork.artwork_images[0].url,
          title: artwork.title ?? "Untitled",
          artist: artwork.artist_name ?? "Unknown Artist",
          year: artwork.year ?? 0,
          material: artwork.material ?? "",
          dimensions: artwork.dimensions ?? "",
          info: artwork.info ?? "",
          slug: artwork.slug ?? "",
        }}
      />
    </>
  );
};

export default CarouselGalleryItem;
