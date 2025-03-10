import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
  Typography,
} from "@mui/material";
import InstagramButton from "./InstagramButton";

const AltNavbar: React.FC = () => {
  const isMD = useMediaQuery("(min-width: 750px)");


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexShrink: "0",
        height: "50px",
      }}
    >
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMD && (
            <Typography
              variant="h5"
              sx={{
                cursor: "pointer"
              }}
              onClick={() => window.location.href = "https://contragalleries.com"}
            >
              Contra Galleries - Private
            </Typography>
          )}
          {isMD ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: "inherit",
              }}
            >
              <InstagramButton marginLeft={4} />
            </Box>
          ) : (
            <Box>
              <IconButton
                sx={{
                  maxWidth: "40px",
                  display: "flex",
                  justifyContent: "unset",
                  color: "common.white",
                }}
                onClick={() => window.location.href = "https://contragalleries.com"}
              >
                <HomeIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AltNavbar;
