import { Box, Typography, useMediaQuery } from "@mui/material";

const Footer = () => {
  const isMD = useMediaQuery("(min-width: 600px)");
  function getCurrentYear() {
    return new Date().getFullYear();
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: "0",
        marginBottom: 1,
        marginTop: 2,
        fontSize: isMD ? "12px" : "8px",
      }}
    >

      <Typography fontSize="inherit">
        ⚲ 141 West 28th St 11th Floor New York, NY 10001
      </Typography>
      <Typography fontSize="inherit">
        © Contra Galleries, 2010 - {getCurrentYear()}
      </Typography>

    </Box>
  );
};

export default Footer;
