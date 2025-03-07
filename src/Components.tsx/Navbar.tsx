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
  useTheme,
} from "@mui/material";
import Sidebar from "./Sidebar";
import SocialLinks from "./SocialLinks";

const navItems = [
  { text: "Home", path: "/" },
  { text: "About", path: "/about" },
  { text: "Gallery", path: "/gallery" },
  { text: "Contact", path: "/contact" },
];

const Navbar = () => { 
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMD = useMediaQuery(" (min-width: 950px) ");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexShrink: "0", height: "50px" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "brand.secondary", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
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
                {navItems.map(({ text, path }, index) => {
                  return (
                    <React.Fragment key={text}>
                      <Button
                        onClick={() => 
                          path.includes("https") ? 
                          window.open(path, "_blank")
                          : 
                          navigate(path)
                          }
                        sx={{
                          color:
                            path === location.pathname
                              ? "brand.particle"
                              : "brand.primary",
                          borderRadius: 0,
                          marginLeft: 2,
                          fontWeight: 700
                        }}
                      >
                        {text}
                      </Button>
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          ) : (
            <Box>
              <IconButton
                sx={{
                  color: "brand.primary",
                  maxWidth: "40px",
                  display: "flex",
                  justifyContent: "unset",
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
                theme={theme}
                location={location}
                navigate={navigate}
              />
            </Box>
          )}
          {!isMD && <Box sx={{ marginRight: 5 }} />}
          {isMD && <SocialLinks /> }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;