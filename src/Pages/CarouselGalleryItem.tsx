import { useState } from "react";
import { Box, Typography } from "@mui/material";
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
  const [open, setOpen] = useState(false);
  if (!artwork) {
    return <Typography variant="h6">No artwork selected</Typography>; // Handle undefined artwork safely
  }

  const coverImage =
    artwork.artwork_images?.find((img) => img.is_cover)?.url ??
    artwork.artwork_images?.[0]?.url;

  return (
    <>
      <Box
        key={artwork.artwork_id}
        id="cgi-top"
        sx={{
          display: "flex !important",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
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
      </Box>
      <ExhibitionArtwork
        open={open}
        onClose={() => setOpen(false)}
        parentPath=""
        artwork={{
          artwork_images: artwork.artwork_images,
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
