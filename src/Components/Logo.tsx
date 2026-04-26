import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <Typography variant="h4" fontFamily="Poppins" sx={{ lineHeight: 1 }}>
        CONTRA
      </Typography>
      <Typography
        variant="h6"
        fontFamily="Poppins"
        sx={{ lineHeight: 1, letterSpacing: "5px", paddingLeft: "2px" }}
      >
        GALLERIES
      </Typography>
    </Box>
  );
};

export default Logo;
