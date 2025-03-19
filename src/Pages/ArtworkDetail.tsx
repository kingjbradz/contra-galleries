import { Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { usePrivateGalleryData } from "../api";

const ArtworkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = usePrivateGalleryData(null);

  if (isLoading) return <p>Loading...</p>;

  const artwork = data?.find((artwork: any) => artwork.id === Number(id));

  if (!artwork) return <p>Artwork not found</p>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      <img src={artwork.image} alt={artwork.title} style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain" }} />
      <Typography variant="h4">{artwork.title}</Typography>
      <Typography variant="h6">{artwork.artist}</Typography>
      <button onClick={() => navigate("/")}>Go Back</button>
    </Box>
  );
};

export default ArtworkDetail;
