import { useNavigate, useParams } from "react-router";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArtworkCarousel from "./ArtworkCarousel";
import { ArtworkImage } from "../utils/global-types";

interface ArtworkDetails {
  title?: string;
  artist?: string;
  year?: number | string;
  material?: string;
  dimensions?: string;
  info?: string;
  slug?: string;
  artwork_images?: ArtworkImage[];
}

interface ExhibitionArtworkProps {
  artwork: ArtworkDetails | null;
  parentPath: string;
  open?: boolean;
  onClose?: () => void;
}

const ExhibitionArtwork = ({
  artwork,
  parentPath,
  open: openProp,
  onClose: onCloseProp,
}: ExhibitionArtworkProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const open = openProp !== undefined ? openProp : !!id && !!artwork;
  const handleClose = () => {
    void (onCloseProp ? onCloseProp() : navigate(parentPath));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
            height: "calc(100% - 64px)",
          },
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        size="small"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 10,
          bgcolor: "rgba(0,0,0,0.5)", color: "#fff",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.5)"
          }
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {artwork && (
          <Box
            sx={{
              display: "grid",
              height: "100%", // this allows the image to take full height
              minHeight: 480,
            }}
          >
            <Box
              sx={{
                position: "relative",
                minHeight: { xs: 260, sm: "auto" },
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <ArtworkCarousel
                images={artwork?.artwork_images}
                title={artwork?.title}
              />
              {/* Info side */}
              <Box
                sx={{
                  position: "fixed",
                  background: "black",
                  padding: artwork?.artwork_images!.length > 1 ? "8px 8px 16px 8px" : "8px",
                  marginBottom: "8px",
                  borderRadius: "8px",
                }}
              >
                <Typography>{artwork.material}</Typography>
                <Typography>{artwork.title}</Typography>
                <Typography>{artwork.artist}</Typography>
                <Typography>{artwork.year}</Typography>
                <Typography>{artwork.dimensions}</Typography>
                <Typography>{artwork.info}</Typography>
                <Box />
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExhibitionArtwork;
