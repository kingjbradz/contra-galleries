import Grid from "@mui/material/Grid2";
import {
  useMediaQuery,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import { Exhibition } from "../utils/global-types";
import OverlayCard from "../Components/OverlayCard";

const ExhibitionPage = ({ exhibition }: { exhibition: Exhibition }) => {
  const is520 = useMediaQuery("(min-width: 520px)");

  return (
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
        minHeight="280px"
        key={index}
        image={artwork.artwork_images[0].url}
        width={320}
        path={`${artwork?.slug}`}
        state={{ state: artwork}}
        top={artwork?.title!.length > 1 ? artwork.title : "Untitled"}
        icon={<BrushIcon />}
        bottom= {artwork?.artist_name && artwork?.artist_name!.length > 1
          ? artwork?.artist_name
          : "Unknown Artist"}

        />
      ))}
    </Grid>
  );
};

export default ExhibitionPage;
