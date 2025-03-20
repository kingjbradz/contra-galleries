import React from "react";
import { useNavigate, useLocation } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import PrivateSidebar from "./PrivateSidebar";
import InstagramButton from "./InstagramButton";
import { usePrivateArtistListData } from "../api";

interface NavItem {
  text: string;
  path: string;
}

interface Artist {
  name: string;
}

const staticNavItems: NavItem[] = [
  { text: "Main Website", path: "https://contragalleries.com" },
  { text: "General Gallery", path: "/1" },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { data: list, isLoading } = usePrivateArtistListData();

  const handleSidebar = () => {
    setSidebarOpen((current) => !current);
  };

  // Create dynamic artist routes safely
  const artistNavItems: NavItem[] =
    !isLoading && list.artists?.length > 0
      ? list.artists?.map((artist: Artist, index: any) => ({
          key: index,
          text: artist.name,
          path: `/${artist.name.replace(/\s+/g, "").toLowerCase()}/1`, // Remove spaces for cleaner URLs
        }))
      : [];

  // Combine static and dynamic nav items
  const navItems: NavItem[] = [...staticNavItems, ...artistNavItems];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexShrink: "0",
        height: "64px",
      }}
    >
      <CssBaseline />
      <AppBar sx={{ bgcolor: "common.black", boxShadow: 0 }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              sx={{
                maxWidth: "40px",
                color: "common.white",
              }}
              onClick={handleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Box
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                marginBottom: 1,
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">Contra Galleries</Typography>
              <Typography>Private</Typography>
            </Box>
            <Box>
              <InstagramButton marginLeft={4} />
            </Box>
            <PrivateSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              handleSidebar={handleSidebar}
              navItems={navItems}
              location={location}
              navigate={navigate}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
