import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ArtworkDetails {
  image?: string;
  title?: string;
  artist?: string;
  year?: number | string;
  material?: string;
  dimensions?: string;
  info?: string;
  slug?: string;
}

interface ExhibitionArtworkProps {
  artwork: ArtworkDetails | null;
  parentPath: string;
  open?: boolean;
  onClose?: () => void;
}

const ExhibitionArtwork = ({ artwork, parentPath, open: openProp, onClose: onCloseProp }: ExhibitionArtworkProps) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const open = openProp !== undefined ? openProp : !!id && !!artwork; 

  const handleClose = () => {
    onCloseProp ? onCloseProp() : navigate(parentPath); 
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // TransitionComponent={SlideUp}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#111110",
            color: "#f0ece3",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "rgba(240,236,227,0.4)",
          zIndex: 10,
          "&:hover": { color: "#f0ece3", bgcolor: "rgba(255,255,255,0.05)" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {artwork && (
          <Box
            sx={{
              display: "grid",
              // gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              minHeight: 480,
            }}
          >
            {/* Image side */}
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 260, sm: "auto" },
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={artwork.image}
                alt={artwork.title}
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9) contrast(1.05)",
                }}
              />
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, transparent 60%, #111110 100%)",
                }}
              />
            </Box>

            {/* Info side */}
            <Box>
              <Typography>{artwork.material}</Typography>

              <Typography>{artwork.title}</Typography>

              <Typography>{artwork.artist}</Typography>

              <Box />

              <Box sx={{ display: "flex", gap: 4, mb: 3.5 }}>
                <Box>
                  <Typography>Year</Typography>
                  <Typography>{artwork.year}</Typography>
                </Box>
                <Box>
                  <Typography>Medium</Typography>
                  <Typography>{artwork.dimensions}</Typography>
                </Box>
              </Box>

              <Typography>{artwork.info}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExhibitionArtwork;
