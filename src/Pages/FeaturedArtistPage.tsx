import React from "react";
import { useNavigate } from "react-router";
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
    const navigate = useNavigate();
    const is520 = useMediaQuery("(min-width: 520px)");
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: 2 }}>
      <Typography variant="h3">{artist.name}</Typography>
      <Box sx={{ maxWidth: "700px", margin: 1 }}>
        <img src={artist?.image} alt={artist.name} style={{ width: "100%" }} />
      </Box>
      <Box sx={{ maxWidth: "700px", margin: 2 }}>
        <Typography>{artist?.info}</Typography>
      </Box>
      <Grid container sx={{ display: "flex", justifyContent: "center", flexDirection: is520 ? "row" : "column", alignItems: "center", margin: 1 }}>
        {artist.artworks.map((artwork, index) => (
            <Box 
            key={index} 
            onClick={() => navigate(`${artwork.title.replace(/\s+/g, "")}`, { state: artwork } )}
            sx={{ margin: 1, textAlign: "center", cursor: "pointer" }}>
            <img src={artwork.image} alt={artwork.title} />
            <Typography>{artwork.title}</Typography>
            <Typography>{artwork.info}</Typography>
            </Box>
        ))}
      </Grid>
    </Box>
  );
}



export default FeaturedArtistPage;
