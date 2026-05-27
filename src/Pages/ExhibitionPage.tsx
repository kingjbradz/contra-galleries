import { useParams } from "react-router";
import Grid from "@mui/material/Grid2";
import { useMediaQuery } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import { Exhibition } from "../utils/global-types";
import OverlayCard from "../Components/OverlayCard";
import ExhibitionArtwork from "./ExhibitionArtwork";

const ExhibitionPage = ({ exhibition }: { exhibition: Exhibition }) => {
  const is520 = useMediaQuery("(min-width: 520px)");
  const { id } = useParams();

  const selectedArtwork = id
    ? exhibition?.artworks?.find((a) => a.slug === id) ?? null
    : null;

  const parentPath = `/${exhibition.slug}`;

  return (
    <>
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
        {exhibition?.artworks?.map((artwork, index) => (
          <OverlayCard
            // minHeight="280px"
            key={index}
            image={artwork.artwork_images[0].url}
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
        ))}
      </Grid>
      <ExhibitionArtwork
        artwork={
          selectedArtwork
            // ? {
            //     image: selectedArtwork.artwork_images[0].url,
            //     title: selectedArtwork.title ?? "Untitled",
            //     artist: selectedArtwork.artist_name ?? "Unknown Artist",
            //     year: selectedArtwork.year ?? 0,
            //     material: selectedArtwork.material ?? "",
            //     dimensions: selectedArtwork.dimensions ?? "",
            //     info: selectedArtwork.info ?? "",
            //     slug: selectedArtwork.slug ?? "",
            //     artwork_images: selectedArtwork.images ?? []
            //   }
             ? selectedArtwork
            : null
        }
        parentPath={parentPath}
      />
    </>
  );
};

export default ExhibitionPage;
