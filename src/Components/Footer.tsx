import { Box, Typography, useMediaQuery } from "@mui/material";


const Footer = () => {
    const isMD = useMediaQuery("(min-width: 600px)");
    function getCurrentYear() {
        return new Date().getFullYear();
      }
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexShrink: "0", marginBottom: 1 }}>
        <Typography fontSize={isMD ? "12px" : "8px"}>© Contra Galleries, 2010 - {getCurrentYear()}</Typography>
    </Box>
  );
};

export default Footer