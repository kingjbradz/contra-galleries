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
import { useFeaturedArtistsData } from "../api"; // Import API hook

// Define TypeScript types
interface NavItem {
  text: string;
  path: string;
}

interface Artist {
  name: string;
}

const staticNavItems: NavItem[] = [
  { text: "Gallery", path: "/gallery" },
  { text: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMD = useMediaQuery("(min-width: 750px)");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { data: artists, isLoading } = useFeaturedArtistsData();

  const handleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  // Create dynamic artist routes safely
  const artistNavItems: NavItem[] = artists
    ? artists
        .map((artist: Artist) => ({
          text: artist.name,
          path: `/${artist.name.replace(/\s+/g, "")}`, // Remove spaces for cleaner URLs
        }))
    : [];

  // Combine static and dynamic nav items
  const navItems: NavItem[] = [...artistNavItems, ...staticNavItems];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexShrink: "0", height: "64px" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMD && <Typography variant="h5" onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>Contra Galleries</Typography>}
          {isMD ? (
            <Box sx={{ display: "flex", alignItems: "center", minHeight: "inherit" }}>
              <Box sx={{ display: { xs: "none", sm: "flex" }, marginLeft: 1, minHeight: "inherit" }}>
                {isLoading ? (
                  ""
                ) : (
                  navItems.map(({ text, path }) => (
                    <Button
                      key={text}
                      onClick={() => navigate(path)}
                      sx={{
                        color: path === location.pathname ? "grey.500" : "common.white",
                        borderRadius: 0,
                        marginLeft: 2,
                      }}
                    >
                      {text}
                    </Button>
                  ))
                )}
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
                  color: "common.white",
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