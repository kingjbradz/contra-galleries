import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography, useMediaQuery } from "@mui/material";

interface FeaturedArtist {
  name: string;
  image: string;
  info: string;
  artworks: Array<any>; 
}

interface FeaturedArtistPageProps {
  artist: FeaturedArtist;
}

const FeaturedArtistPage: React.FC<FeaturedArtistPageProps> = ({ artist }) => {
    const is520 = useMediaQuery("(min-width: 520px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      <Typography variant="h3">{artist.name}</Typography>
      {/* Optionally display other artist details */}
      <img src={artist?.image} alt={artist.name} />
      <Typography>{artist?.info}</Typography>
      <Grid container sx={{ display: "flex", justifyContent: "center", flexDirection: is520 ? "row" : "column", alignItems: "center", marginTop: "1em" }}>
        {artist.artworks.map((artwork, index) => (
            <Box key={index} sx={{ margin: 1, textAlign: "center" }}>
            <img src={artwork.image} alt={artwork.title} />
            <Typography>{artwork.title}</Typography>
            <Typography>{artwork.description}</Typography>
            </Box>
        ))}
      </Grid>
    </Box>
  );
}

{/* <Grid container sx={{ display: "flex", justifyContent: "center", flexDirection: is520 ? "row" : "column", alignItems: "center", marginTop: "1em" }}>
{artist.artworks.map((e, index) => (
  <>
<Box sx={{ marginBottom: 2  }}>
  <img src={e.img} alt={e.name} style={{ width: "100%", cursor: "pointer", marginBottom: "8px" }} onClick={() => window.open(e.insta, "_blank")}  />
  <Typography sx={{ color: "brand.secondary" }}>{e.name}</Typography>
  <Typography sx={{ color: "brand.secondary" }}>{e.date}</Typography>
 </Box>
    </>
))}
</Grid> */}

export default FeaturedArtistPage;
