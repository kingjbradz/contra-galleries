import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import { Exhibition } from "../utils/global-types";

const ExhibitionPage = ({ exhibition }: { exhibition: Exhibition }) => {
  const navigate = useNavigate();
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
        <Card
          key={index}
          sx={{
            minHeight: "280px",
            width: 320,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            margin: 1,
          }}
          onClick={() => navigate(`${artwork?.slug}`, { state: artwork })}
        >
          {/* Image fills the card */}
          <Box
            component="img"
            src={artwork.artwork_images[0].url}
            loading="lazy"
            alt=""
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
            }}
          />

          {/* Text content pinned to bottom */}
          <CardContent
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Typography variant="h6" sx={{ color: "#fff" }}>
              {artwork?.title!.length > 1 ? artwork.title : "Untitled"}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <BrushIcon fontSize="small" />
              {artwork?.artist_name && artwork?.artist_name!.length > 1
                ? artwork?.artist_name
                : "Unknown Artist"}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );
};

export default ExhibitionPage;
