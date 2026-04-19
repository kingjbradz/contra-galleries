import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid2";
import { Box, Typography, CircularProgress, useMediaQuery } from "@mui/material";
import { Exhibition } from "../utils/global-types";

const ExhibitionPage = ( { exhibition }: { exhibition: Exhibition } ) => {
  const navigate = useNavigate();
  const is520 = useMediaQuery("(min-width: 520px)");

  // const artworks: Artwork[] = (exhibition.exhibition_artworks as Artwork[]) ?? [];

  // if (isLoading) {
  //   return (
  //     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
  //       <CircularProgress sx={{ color: "common.black" }} />
  //     </Box>
  //   );
  // }

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
        <Box
          key={index} 
          onClick={() => navigate(`${artwork?.slug}`, { state: artwork })}
          sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}
        >
          <img src={artwork.artwork_images[0].url} alt={artwork.name} style={{ height: 300, width: 300 }} />
          <Typography>{artwork.name}</Typography>
          <Typography>{artwork.artist_name}</Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default ExhibitionPage;
