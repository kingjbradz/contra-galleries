import React from "react";
import { useNavigate, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Sidebar from "./Sidebar";
import InstagramButton from "./InstagramButton";

const navItems = [
  { text: "About", path: "/about" },
  { text: "Gallery", path: "/gallery" },
  { text: "Contact", path: "/contact" },
];

const Navbar = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const isMD = useMediaQuery(" (min-width: 600px) ");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexShrink: "0", height: "50px" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
        {isMD && <Typography variant="h5">Contra Galleries</Typography>}
          {isMD ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: "inherit",
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", sm: "flex" },
                  marginLeft: 1,
                  minHeight: "inherit",
                }}
              >
                {navItems.map(({ text, path }) => {
                  return (
                    <React.Fragment key={text}>
                      <Button
                        onClick={() => navigate(path)}
                        sx={{
                          color:
                            path === location.pathname
                              ? "grey.500"
                              : "common.white",
                          borderRadius: 0,
                          marginLeft: 2,
                        }}
                      >
                        {text}
                      </Button>
                    </React.Fragment>
                  );
                })}
              </Box>
              <InstagramButton marginLeft={4} />
            </Box>
          ) : (
            <Box>
              <IconButton
                sx={{
                  maxWidth: "40px",
                  display: "flex",
                  justifyContent: "unset",
                  color: "common.white"
                }}
                onClick={handleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleSidebar={handleSidebar}
                navItems={navItems}
                location={location}
                navigate={navigate}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;