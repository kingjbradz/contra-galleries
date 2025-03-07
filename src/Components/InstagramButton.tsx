import { IconButton } from "@mui/material";
import { Instagram } from "@mui/icons-material";

interface InstagramButtonProps {
    marginLeft?: number | string;
  }

const InstagramButton: React.FC<InstagramButtonProps> = ({ marginLeft }) => {
  return (
    <IconButton
      sx={{
        color: "common.white",
        marginLeft: marginLeft,
      }}
      onClick={() =>
        window.open("https://www.instagram.com/contragalleries", "_blank")
      }
    >
      <Instagram />
    </IconButton>
  );
};

export default InstagramButton;
